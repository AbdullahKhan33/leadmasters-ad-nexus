import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Campaign, CampaignType, CampaignStatus } from "@/types/campaigns";
import { useToast } from "@/hooks/use-toast";

export function useCampaigns(type?: CampaignType) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchCampaigns = async () => {
    try {
      setIsLoading(true);
      let query = supabase
        .from('campaigns')
        .select('*')
        .order('created_at', { ascending: false });

      if (type) {
        query = query.eq('type', type);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Fetch recipient counts for each campaign
      const campaignsWithCounts = await Promise.all(
        (data || []).map(async (campaign: any) => {
          const { data: recipients, error: recipientsError } = await supabase
            .from('campaign_recipients')
            .select('status')
            .eq('campaign_id', campaign.id);

          if (recipientsError) {
            console.error('Error fetching recipients:', recipientsError);
            return campaign;
          }

          const recipient_count = recipients?.length || 0;
          const delivered_count = recipients?.filter(r => r.status === 'delivered' || r.status === 'opened' || r.status === 'clicked').length || 0;
          const opened_count = recipients?.filter(r => r.status === 'opened' || r.status === 'clicked').length || 0;
          const clicked_count = recipients?.filter(r => r.status === 'clicked').length || 0;
          const failed_count = recipients?.filter(r => r.status === 'failed').length || 0;

          return {
            ...campaign,
            recipient_count,
            delivered_count,
            opened_count,
            clicked_count,
            failed_count,
          } as Campaign;
        })
      );

      setCampaigns(campaignsWithCounts);
    } catch (error: any) {
      console.error('Error fetching campaigns:', error);
      toast({
        title: "Error",
        description: "Failed to load campaigns",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, [type]);

  const createCampaign = async (campaignData: Partial<Campaign>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Validate segment id (local segments may use non-UUID ids like "segment-1")
      const isUuid = (val: any) =>
        typeof val === 'string' && /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(val);
      const validSegmentId = isUuid(campaignData.segment_id) ? (campaignData.segment_id as string) : null;

      const metadata = {
        ...(campaignData.metadata || {}),
        ...(validSegmentId ? {} : (campaignData.segment_id ? { segment_local_id: campaignData.segment_id } : {})),
      };

      const { data: newCampaign, error } = await supabase
        .from('campaigns')
        .insert([
          {
            name: campaignData.name || 'Untitled Campaign',
            type: campaignData.type || 'email',
            message_content: campaignData.message_content || '',
            status: campaignData.status || 'draft',
            segment_id: validSegmentId, // only set when valid uuid
            template_id: campaignData.template_id,
            subject: campaignData.subject,
            scheduled_at: campaignData.scheduled_at,
            metadata,
            user_id: user.id,
            created_by: user.id,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      // If a valid segment_id is provided, create campaign recipients
      if (validSegmentId && newCampaign) {
        // NOTE: Real segment filtering is not implemented yet; select all user leads for now
        const { data: leads, error: leadsError } = await supabase
          .from('leads')
          .select('id')
          .eq('user_id', user.id);

        if (leadsError) {
          console.error('Error fetching leads:', leadsError);
        } else if (leads && leads.length > 0) {
          const recipients = leads.map((lead) => ({
            campaign_id: newCampaign.id,
            lead_id: lead.id,
            status: 'pending',
          }));

          const { error: recipientsError } = await supabase
            .from('campaign_recipients')
            .insert(recipients);

          if (recipientsError) {
            console.error('Error creating recipients:', recipientsError);
          }
        }
      }

      toast({
        title: 'Success',
        description: 'Campaign created successfully',
      });

      await fetchCampaigns();
      return newCampaign;
    } catch (error: any) {
      console.error('Error creating campaign:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to create campaign',
        variant: 'destructive',
      });
      return null;
    }
  };

  const updateCampaign = async (id: string, updates: Partial<Campaign>) => {
    try {
      const { error } = await supabase
        .from('campaigns')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Campaign updated successfully",
      });

      await fetchCampaigns();
    } catch (error: any) {
      console.error('Error updating campaign:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update campaign",
        variant: "destructive",
      });
    }
  };

  const deleteCampaign = async (id: string) => {
    try {
      const { error } = await supabase
        .from('campaigns')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Campaign deleted successfully",
      });

      await fetchCampaigns();
    } catch (error: any) {
      console.error('Error deleting campaign:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete campaign",
        variant: "destructive",
      });
    }
  };

  const duplicateCampaign = async (id: string) => {
    try {
      const campaign = campaigns.find(c => c.id === id);
      if (!campaign) throw new Error('Campaign not found');

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('campaigns')
        .insert([{
          name: `${campaign.name} (Copy)`,
          type: campaign.type,
          status: 'draft',
          segment_id: campaign.segment_id,
          template_id: campaign.template_id,
          subject: campaign.subject,
          message_content: campaign.message_content,
          metadata: campaign.metadata,
          user_id: user.id,
          created_by: user.id,
        }])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Campaign duplicated successfully",
      });

      await fetchCampaigns();
      return data;
    } catch (error: any) {
      console.error('Error duplicating campaign:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to duplicate campaign",
        variant: "destructive",
      });
      return null;
    }
  };

  return {
    campaigns,
    isLoading,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    duplicateCampaign,
    refetch: fetchCampaigns,
  };
}
