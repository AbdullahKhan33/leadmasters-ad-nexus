-- Create table for WhatsApp Business accounts
CREATE TABLE IF NOT EXISTS public.whatsapp_business_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  business_name TEXT NOT NULL,
  account_id TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  phone_display_name TEXT NOT NULL,
  is_verified BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT false,
  connected_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.whatsapp_business_accounts ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own WhatsApp accounts"
  ON public.whatsapp_business_accounts
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own WhatsApp accounts"
  ON public.whatsapp_business_accounts
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own WhatsApp accounts"
  ON public.whatsapp_business_accounts
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own WhatsApp accounts"
  ON public.whatsapp_business_accounts
  FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all WhatsApp accounts"
  ON public.whatsapp_business_accounts
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Create index for faster queries
CREATE INDEX idx_whatsapp_accounts_user_id ON public.whatsapp_business_accounts(user_id);
CREATE INDEX idx_whatsapp_accounts_is_active ON public.whatsapp_business_accounts(user_id, is_active);

-- Trigger for updated_at
CREATE TRIGGER update_whatsapp_accounts_updated_at
  BEFORE UPDATE ON public.whatsapp_business_accounts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();