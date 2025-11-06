-- Create business_contexts table for saving AI campaign context
CREATE TABLE public.business_contexts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  name text NOT NULL,
  industry text NOT NULL,
  business_type text NOT NULL,
  target_countries text[] NOT NULL,
  target_cities text,
  campaign_goal text NOT NULL,
  currency text NOT NULL,
  budget_range text,
  is_default boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.business_contexts ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own contexts"
  ON public.business_contexts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own contexts"
  ON public.business_contexts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own contexts"
  ON public.business_contexts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own contexts"
  ON public.business_contexts FOR DELETE
  USING (auth.uid() = user_id);

-- Admins can view all contexts
CREATE POLICY "Admins can view all contexts"
  ON public.business_contexts FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Create index for performance
CREATE INDEX idx_business_contexts_user_id ON public.business_contexts(user_id);

-- Add trigger for updated_at
CREATE TRIGGER update_business_contexts_updated_at
  BEFORE UPDATE ON public.business_contexts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();