import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface BusinessContext {
  id: string;
  user_id: string;
  name: string;
  industry: string;
  business_type: string;
  target_countries: string[];
  target_cities: string | null;
  campaign_goal: string;
  currency: string;
  budget_range: string | null;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export function useBusinessContexts() {
  const [contexts, setContexts] = useState<BusinessContext[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchContexts = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('business_contexts')
        .select('*')
        .order('is_default', { ascending: false })
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setContexts(data || []);
    } catch (error) {
      console.error('Failed to fetch business contexts:', error);
      toast.error('Failed to load saved contexts');
    } finally {
      setIsLoading(false);
    }
  };

  const saveContext = async (context: Omit<BusinessContext, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Check if we already have 3 contexts
      if (contexts.length >= 3) {
        // Find the oldest context (by created_at)
        const oldestContext = contexts.reduce((oldest, current) => {
          return new Date(current.created_at) < new Date(oldest.created_at) ? current : oldest;
        });
        
        // Delete the oldest context
        await supabase
          .from('business_contexts')
          .delete()
          .eq('id', oldestContext.id);
        
        toast.info(`Removed oldest context "${oldestContext.name}" to make room for the new one`);
      }

      const { data, error } = await supabase
        .from('business_contexts')
        .insert({
          ...context,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      
      await fetchContexts();
      toast.success('Context saved successfully');
      return data;
    } catch (error) {
      console.error('Failed to save context:', error);
      toast.error('Failed to save context');
      return null;
    }
  };

  const updateContext = async (id: string, updates: Partial<BusinessContext>) => {
    try {
      const { error } = await supabase
        .from('business_contexts')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      
      await fetchContexts();
      toast.success('Context updated successfully');
    } catch (error) {
      console.error('Failed to update context:', error);
      toast.error('Failed to update context');
    }
  };

  const deleteContext = async (id: string) => {
    try {
      const { error } = await supabase
        .from('business_contexts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      await fetchContexts();
      toast.success('Context deleted successfully');
    } catch (error) {
      console.error('Failed to delete context:', error);
      toast.error('Failed to delete context');
    }
  };

  useEffect(() => {
    fetchContexts();
  }, []);

  return {
    contexts,
    isLoading,
    saveContext,
    updateContext,
    deleteContext,
    refetch: fetchContexts,
  };
}
