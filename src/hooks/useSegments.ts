import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Segment } from "@/types/segments";
import { useToast } from "@/hooks/use-toast";

export function useSegments() {
  const [segments, setSegments] = useState<Segment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchSegments = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('segments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setSegments(data || []);
    } catch (error: any) {
      console.error('Error fetching segments:', error);
      toast({
        title: "Error",
        description: "Failed to load segments",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSegments();
  }, []);

  const createSegment = async (segmentData: Partial<Segment>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Calculate lead count based on criteria
      const leadCount = await calculateLeadCount(segmentData.criteria || {});

      const { data, error } = await supabase
        .from('segments')
        .insert([{
          name: segmentData.name || 'Untitled Segment',
          description: segmentData.description,
          criteria: segmentData.criteria || {},
          color: segmentData.color || '#8B5CF6',
          is_active: segmentData.is_active ?? true,
          lead_count: leadCount,
          user_id: user.id,
        }])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Segment created successfully",
      });

      await fetchSegments();
      return data;
    } catch (error: any) {
      console.error('Error creating segment:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create segment",
        variant: "destructive",
      });
      return null;
    }
  };

  const updateSegment = async (id: string, updates: Partial<Segment>) => {
    try {
      // Recalculate lead count if criteria changed
      if (updates.criteria) {
        const leadCount = await calculateLeadCount(updates.criteria);
        updates.lead_count = leadCount;
      }

      const { error } = await supabase
        .from('segments')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Segment updated successfully",
      });

      await fetchSegments();
    } catch (error: any) {
      console.error('Error updating segment:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update segment",
        variant: "destructive",
      });
    }
  };

  const deleteSegment = async (id: string) => {
    try {
      const { error } = await supabase
        .from('segments')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Segment deleted successfully",
      });

      await fetchSegments();
    } catch (error: any) {
      console.error('Error deleting segment:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete segment",
        variant: "destructive",
      });
    }
  };

  const calculateLeadCount = async (criteria: any): Promise<number> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return 0;

      let query = supabase
        .from('leads')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', user.id);

      // Apply filters based on criteria
      if (criteria.status && criteria.status.length > 0) {
        query = query.in('status', criteria.status);
      }

      if (criteria.source && criteria.source.length > 0) {
        query = query.in('source', criteria.source);
      }

      if (criteria.category && criteria.category.length > 0) {
        query = query.in('category', criteria.category);
      }

      if (criteria.list && criteria.list.length > 0) {
        query = query.in('list', criteria.list);
      }

      if (criteria.ai_score_min !== undefined) {
        query = query.gte('ai_score', criteria.ai_score_min);
      }

      if (criteria.ai_score_max !== undefined) {
        query = query.lte('ai_score', criteria.ai_score_max);
      }

      if (criteria.created_after) {
        query = query.gte('created_at', criteria.created_after);
      }

      if (criteria.created_before) {
        query = query.lte('created_at', criteria.created_before);
      }

      if (criteria.has_email) {
        query = query.not('email', 'is', null);
      }

      if (criteria.has_phone) {
        query = query.not('phone', 'is', null);
      }

      const { count, error } = await query;

      if (error) throw error;

      return count || 0;
    } catch (error) {
      console.error('Error calculating lead count:', error);
      return 0;
    }
  };

  return {
    segments,
    isLoading,
    createSegment,
    updateSegment,
    deleteSegment,
    refetch: fetchSegments,
  };
}
