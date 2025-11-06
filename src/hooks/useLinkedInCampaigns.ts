import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface LinkedInCampaignData {
  campaignName?: string;
  objective?: string;
  budgetType?: string;
  budgetAmount?: string;
  schedule?: string;
  bidStrategy?: string;
  linkedInPage?: string;
  targetLocations?: string[];
  targetGender?: string;
  ageRange?: [number, number];
  targetInterests?: string[];
  jobTitles?: string[];
  industries?: string[];
  companySizes?: string[];
  format?: string;
  introText?: string;
  headline?: string;
  description?: string;
  callToAction?: string;
  destinationUrl?: string;
  imageUrl?: string;
}

export interface LinkedInAdCampaign {
  id: string;
  name: string;
  status: 'draft' | 'scheduled' | 'active' | 'paused' | 'completed';
  campaignData: LinkedInCampaignData;
  created_at: string;
  updated_at: string;
}

export function useLinkedInCampaigns() {
  const [campaigns, setCampaigns] = useState<LinkedInAdCampaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCampaigns = async () => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('type', 'linkedin_ad')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;

      const formatted = data.map(campaign => ({
        id: campaign.id,
        name: campaign.name,
        status: campaign.status as any,
        campaignData: campaign.metadata as LinkedInCampaignData,
        created_at: campaign.created_at,
        updated_at: campaign.updated_at,
      }));

      setCampaigns(formatted);
    } catch (error: any) {
      console.error('Error fetching campaigns:', error);
      toast.error('Failed to load campaigns');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const saveCampaign = async (campaignData: LinkedInCampaignData, campaignName?: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const name = campaignName || campaignData.campaignName || 'Untitled Campaign';

      const { data, error } = await supabase
        .from('campaigns')
        .insert({
          user_id: user.id,
          name,
          type: 'linkedin_ad',
          status: 'draft',
          message_content: '',
          metadata: campaignData as any,
        })
        .select()
        .single();

      if (error) throw error;

      toast.success('Campaign saved as draft');
      await fetchCampaigns();
      return data.id;
    } catch (error: any) {
      console.error('Error saving campaign:', error);
      toast.error('Failed to save campaign');
      return null;
    }
  };

  const updateCampaign = async (id: string, campaignData: LinkedInCampaignData) => {
    try {
      const { error } = await supabase
        .from('campaigns')
        .update({
          metadata: campaignData as any,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) throw error;

      toast.success('Campaign updated');
      await fetchCampaigns();
    } catch (error: any) {
      console.error('Error updating campaign:', error);
      toast.error('Failed to update campaign');
    }
  };

  const deleteCampaign = async (id: string) => {
    try {
      const { error } = await supabase
        .from('campaigns')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Campaign deleted');
      await fetchCampaigns();
    } catch (error: any) {
      console.error('Error deleting campaign:', error);
      toast.error('Failed to delete campaign');
    }
  };

  return {
    campaigns,
    isLoading,
    saveCampaign,
    updateCampaign,
    deleteCampaign,
    refetch: fetchCampaigns,
  };
}
