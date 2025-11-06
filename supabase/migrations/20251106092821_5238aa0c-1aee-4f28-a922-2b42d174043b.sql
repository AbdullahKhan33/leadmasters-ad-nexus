-- Expand allowed campaign types to include ad campaigns
ALTER TABLE public.campaigns
  DROP CONSTRAINT IF EXISTS campaigns_type_check;

ALTER TABLE public.campaigns
  ADD CONSTRAINT campaigns_type_check
  CHECK (type IN ('email', 'whatsapp', 'facebook_ad', 'instagram_ad', 'linkedin_ad', 'google_ad'));
