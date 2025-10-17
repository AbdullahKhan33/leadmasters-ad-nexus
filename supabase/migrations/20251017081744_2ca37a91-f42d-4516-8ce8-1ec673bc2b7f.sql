-- Add type column to campaign_folders table
ALTER TABLE public.campaign_folders
ADD COLUMN type TEXT NOT NULL DEFAULT 'email';

-- Add check constraint for valid types
ALTER TABLE public.campaign_folders
ADD CONSTRAINT valid_folder_type CHECK (type IN ('email', 'whatsapp'));