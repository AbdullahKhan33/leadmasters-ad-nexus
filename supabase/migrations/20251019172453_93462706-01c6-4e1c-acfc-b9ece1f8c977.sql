-- Create generated_post_ideas table
CREATE TABLE public.generated_post_ideas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  business_type TEXT NOT NULL,
  target_audience TEXT NOT NULL,
  goals TEXT[] NOT NULL DEFAULT '{}',
  platform TEXT NOT NULL,
  post_caption TEXT NOT NULL,
  hashtags TEXT[] NOT NULL DEFAULT '{}',
  ai_recommendations JSONB NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'generated' CHECK (status IN ('generated', 'saved', 'drafted', 'scheduled')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create post_idea_profiles table
CREATE TABLE public.post_idea_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  business_type TEXT NOT NULL,
  target_audience TEXT NOT NULL,
  primary_goals TEXT[] NOT NULL DEFAULT '{}',
  brand_voice TEXT NOT NULL DEFAULT 'professional' CHECK (brand_voice IN ('casual', 'professional', 'friendly', 'authoritative', 'inspirational')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on generated_post_ideas
ALTER TABLE public.generated_post_ideas ENABLE ROW LEVEL SECURITY;

-- RLS Policies for generated_post_ideas
CREATE POLICY "Users can insert their own ideas"
  ON public.generated_post_ideas
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can select their own ideas"
  ON public.generated_post_ideas
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own ideas"
  ON public.generated_post_ideas
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own ideas"
  ON public.generated_post_ideas
  FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all ideas"
  ON public.generated_post_ideas
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Enable RLS on post_idea_profiles
ALTER TABLE public.post_idea_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for post_idea_profiles
CREATE POLICY "Users can insert their own profile"
  ON public.post_idea_profiles
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can select their own profile"
  ON public.post_idea_profiles
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON public.post_idea_profiles
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles"
  ON public.post_idea_profiles
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Create indexes for performance
CREATE INDEX idx_ideas_user_id ON public.generated_post_ideas(user_id);
CREATE INDEX idx_ideas_status ON public.generated_post_ideas(status);
CREATE INDEX idx_ideas_created_at ON public.generated_post_ideas(created_at DESC);
CREATE INDEX idx_profile_user_id ON public.post_idea_profiles(user_id);

-- Add trigger for updated_at on generated_post_ideas
CREATE TRIGGER update_ideas_updated_at
  BEFORE UPDATE ON public.generated_post_ideas
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add trigger for updated_at on post_idea_profiles
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.post_idea_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();