import { useState, useCallback } from 'react';
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
      const normalizedContext = {
        ...context,
        websiteUrl: (context as any).websiteUrl ?? (context as any).website_url,
        campaignGoal: (context as any).campaignGoal ?? (context as any).campaign_goal ?? (context as any).objective,
        budgetRange: (context as any).budgetRange ?? (context as any).budget_range ?? (context as any).budget,
        targetCountries: (context as any).targetCountries ?? (context as any).target_countries ?? [],
        targetCities: (context as any).targetCities ?? (context as any).target_cities,
        industry: (context as any).industry ?? (context as any).businessIndustry,
        businessType: (context as any).businessType ?? (context as any).business_type,
        currency: (context as any).currency ?? (context as any).currency_code ?? context.currency,
        platform: (context as any).platform ?? context.platform,
      } as AIBusinessContext;

      const { data, error } = await supabase.functions.invoke('campaign-ai-assistant', {
        body: normalizedContext
      });

      if (error) {
        console.error('Edge function error:', error);
        throw error;
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setSuggestions(data);
      setBusinessContext(normalizedContext);
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

  const restoreFromDraft = useCallback((context: AIBusinessContext | null, savedSuggestions: AICampaignSuggestions | null) => {
    if (context && savedSuggestions) {
      setBusinessContext(context);
      setSuggestions(savedSuggestions);
    }
  }, []);

  return {
    isLoading,
    suggestions,
    businessContext,
    generateSuggestions,
    clearSuggestions,
    restoreFromDraft
  };
}
