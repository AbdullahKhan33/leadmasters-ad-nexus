-- Create storage bucket for AI-generated creatives
INSERT INTO storage.buckets (id, name, public)
VALUES ('ai-creatives', 'ai-creatives', true);

-- Create ai_creatives table
CREATE TABLE public.ai_creatives (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  workspace_id UUID,
  original_prompt TEXT NOT NULL,
  refined_prompt TEXT NOT NULL,
  other_refined_prompts JSONB DEFAULT '[]'::jsonb,
  image_url TEXT NOT NULL,
  thumbnail_url TEXT,
  generation_metadata JSONB DEFAULT '{}'::jsonb,
  used_in_campaigns JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.ai_creatives ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own creatives"
ON public.ai_creatives
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own creatives"
ON public.ai_creatives
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own creatives"
ON public.ai_creatives
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own creatives"
ON public.ai_creatives
FOR DELETE
USING (auth.uid() = user_id);

-- Admins can view all creatives
CREATE POLICY "Admins can view all creatives"
ON public.ai_creatives
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Storage policies for ai-creatives bucket
CREATE POLICY "Users can upload their own creatives"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'ai-creatives' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view their own creatives"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'ai-creatives' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own creatives"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'ai-creatives' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Public access to ai-creatives"
ON storage.objects
FOR SELECT
USING (bucket_id = 'ai-creatives');

-- Trigger for updated_at
CREATE TRIGGER update_ai_creatives_updated_at
BEFORE UPDATE ON public.ai_creatives
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();