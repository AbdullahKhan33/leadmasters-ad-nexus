-- Create campaign_folders table
CREATE TABLE public.campaign_folders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  color TEXT NOT NULL DEFAULT '#8B5CF6',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.campaign_folders ENABLE ROW LEVEL SECURITY;

-- Create policies for campaign_folders
CREATE POLICY "Users can view their own folders"
ON public.campaign_folders
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own folders"
ON public.campaign_folders
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own folders"
ON public.campaign_folders
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own folders"
ON public.campaign_folders
FOR DELETE
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all folders"
ON public.campaign_folders
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add folder_id column to campaigns table
ALTER TABLE public.campaigns
ADD COLUMN folder_id UUID REFERENCES public.campaign_folders(id) ON DELETE SET NULL;

-- Create trigger for automatic timestamp updates on campaign_folders
CREATE TRIGGER update_campaign_folders_updated_at
BEFORE UPDATE ON public.campaign_folders
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();