import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface CampaignData {
  // Campaign Setup
  adAccount?: string;
  campaignName?: string;
  specialCategory?: string;
  objective?: string;
  budgetType?: string;
  budgetAmount?: number | string;
  bidStrategy?: string;
  
  // Target Audience
  facebookPage?: string;
  targetLocations?: string[];
  targetGender?: string;
  ageRange?: [number, number];
  targetInterests?: string[];
  
  // Ad Content
  primaryText?: string;
  adLinkUrl?: string;
  heading?: string;
  description?: string;
  adFormat?: string;
  uploadedImage?: File | null;
  carouselCards?: any[];
  callToAction?: string;
}

export interface FacebookAdCampaign {
  id: string;
  name: string;
  status: 'draft' | 'scheduled' | 'active' | 'paused' | 'completed';
  campaignData: CampaignData;
  created_at: string;
  updated_at: string;
}

export function useFacebookCampaigns() {
  const [campaigns, setCampaigns] = useState<FacebookAdCampaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCampaigns = async () => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('type', 'facebook_ad')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;

      const formatted = data.map(campaign => ({
        id: campaign.id,
        name: campaign.name,
        status: campaign.status as any,
        campaignData: campaign.metadata as CampaignData,
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

  const saveCampaign = async (campaignData: CampaignData, campaignName?: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Please log in to save campaigns');
        return null;
      }

      const name = campaignName || campaignData.campaignName || 'Untitled Campaign';

      const { data, error } = await supabase
        .from('campaigns')
        .insert({
          user_id: user.id,
          created_by: user.id,
          name,
          type: 'facebook_ad',
          status: 'draft',
          message_content: '', // Required field, empty for ad campaigns
          metadata: campaignData as any,
        })
        .select()
        .single();

      if (error) {
        console.error('Save error:', error);
        throw error;
      }

      toast.success('Draft saved');
      await fetchCampaigns();
      return data.id;
    } catch (error: any) {
      console.error('Error saving campaign:', error);
      toast.error(error.message || 'Failed to save draft');
      return null;
    }
  };

  const updateCampaign = async (id: string, campaignData: CampaignData) => {
    try {
      const { error } = await supabase
        .from('campaigns')
        .update({
          metadata: campaignData as any,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) {
        console.error('Update error:', error);
        throw error;
      }

      toast.success('Draft saved');
      await fetchCampaigns();
    } catch (error: any) {
      console.error('Error updating campaign:', error);
      toast.error(error.message || 'Failed to save draft');
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
