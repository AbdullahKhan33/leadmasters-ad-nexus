import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AIBusinessContext, AICampaignSuggestions } from '@/types/ai-campaign';
import { toast } from 'sonner';

export function useCampaignAI() {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<AICampaignSuggestions | null>(null);
  const [businessContext, setBusinessContext] = useState<AIBusinessContext | null>(null);

  const generateSuggestions = async (context: AIBusinessContext) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('campaign-ai-assistant', {
        body: context
      });

      if (error) {
        console.error('Edge function error:', error);
        throw error;
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setSuggestions(data);
      setBusinessContext(context);
      toast.success('AI suggestions generated successfully!');
      return data;
    } catch (error) {
      console.error('Failed to generate AI suggestions:', error);
      toast.error('Failed to generate AI suggestions. Please try again.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const clearSuggestions = () => {
    setSuggestions(null);
    setBusinessContext(null);
  };

  const restoreFromDraft = (context: AIBusinessContext | null, savedSuggestions: AICampaignSuggestions | null) => {
    if (context && savedSuggestions) {
      setBusinessContext(context);
      setSuggestions(savedSuggestions);
    }
  };

  return {
    isLoading,
    suggestions,
    businessContext,
    generateSuggestions,
    clearSuggestions,
    restoreFromDraft
  };
}
