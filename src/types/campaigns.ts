export type CampaignType = 'email' | 'whatsapp';

export type CampaignStatus = 'draft' | 'scheduled' | 'sending' | 'sent' | 'paused' | 'failed';

export type RecipientStatus = 'pending' | 'sent' | 'delivered' | 'failed' | 'opened' | 'clicked';

export interface Campaign {
  id: string;
  user_id: string;
  name: string;
  type: CampaignType;
  status: CampaignStatus;
  segment_id: string | null;
  template_id: string | null;
  subject: string | null;
  message_content: string;
  scheduled_at: string | null;
  sent_at: string | null;
  created_at: string;
  updated_at: string;
  created_by: string | null;
  metadata: Record<string, any>;
  folder_id: string | null;
  
  // Computed fields
  recipient_count?: number;
  delivered_count?: number;
  opened_count?: number;
  clicked_count?: number;
  failed_count?: number;
}

export interface CampaignTemplate {
  id: string;
  user_id: string;
  name: string;
  type: CampaignType;
  content: string;
  subject: string | null;
  variables: Record<string, any>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CampaignRecipient {
  id: string;
  campaign_id: string;
  lead_id: string;
  status: RecipientStatus;
  sent_at: string | null;
  delivered_at: string | null;
  opened_at: string | null;
  clicked_at: string | null;
  failed_reason: string | null;
  metadata: Record<string, any>;
  created_at: string;
}

export interface Segment {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  criteria: Record<string, any>;
  color: string;
  is_active: boolean;
  lead_count: number;
  created_at: string;
  updated_at: string;
}

export interface CampaignFolder {
  id: string;
  user_id: string;
  name: string;
  color: string;
  type: string;
  created_at: string;
  updated_at: string;
}
