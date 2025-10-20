-- Create email_domains table
CREATE TABLE public.email_domains (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  domain_name TEXT NOT NULL,
  verification_status TEXT DEFAULT 'pending',
  spf_verified BOOLEAN DEFAULT false,
  dkim_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, domain_name)
);

-- Enable RLS on email_domains
ALTER TABLE public.email_domains ENABLE ROW LEVEL SECURITY;

-- RLS policies for email_domains
CREATE POLICY "Users can view their own domains"
  ON public.email_domains
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own domains"
  ON public.email_domains
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own domains"
  ON public.email_domains
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own domains"
  ON public.email_domains
  FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all domains"
  ON public.email_domains
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Create email_senders table
CREATE TABLE public.email_senders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  from_name TEXT NOT NULL,
  from_email TEXT NOT NULL,
  domain_id UUID REFERENCES public.email_domains(id) ON DELETE CASCADE,
  is_verified BOOLEAN DEFAULT false,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, from_email)
);

-- Enable RLS on email_senders
ALTER TABLE public.email_senders ENABLE ROW LEVEL SECURITY;

-- RLS policies for email_senders
CREATE POLICY "Users can view their own senders"
  ON public.email_senders
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own senders"
  ON public.email_senders
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own senders"
  ON public.email_senders
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own senders"
  ON public.email_senders
  FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all senders"
  ON public.email_senders
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at on email_domains
CREATE TRIGGER update_email_domains_updated_at
  BEFORE UPDATE ON public.email_domains
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger for updated_at on email_senders
CREATE TRIGGER update_email_senders_updated_at
  BEFORE UPDATE ON public.email_senders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();