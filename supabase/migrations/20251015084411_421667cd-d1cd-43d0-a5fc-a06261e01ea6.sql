-- Create business_discovery_submissions table
CREATE TABLE public.business_discovery_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  full_name TEXT NOT NULL,
  company_name TEXT NOT NULL,
  website_url TEXT,
  industry TEXT NOT NULL,
  location TEXT NOT NULL,
  has_website BOOLEAN NOT NULL,
  social_platforms TEXT[] NOT NULL DEFAULT '{}',
  posting_frequency TEXT NOT NULL,
  main_product_service TEXT NOT NULL,
  ideal_customer TEXT NOT NULL,
  avg_revenue_per_customer TEXT NOT NULL,
  primary_goals TEXT[] NOT NULL DEFAULT '{}',
  current_reach_methods TEXT[] NOT NULL DEFAULT '{}',
  monthly_ad_spend TEXT NOT NULL,
  advertising_platforms TEXT[] NOT NULL DEFAULT '{}',
  has_crm BOOLEAN NOT NULL,
  conversion_rate TEXT,
  is_gst_registered BOOLEAN NOT NULL,
  issues_invoices BOOLEAN NOT NULL,
  has_seasonal_peaks TEXT,
  top_priorities TEXT NOT NULL,
  desired_results TEXT NOT NULL,
  current_challenges TEXT NOT NULL,
  lead_score INTEGER,
  lead_tier TEXT,
  status TEXT NOT NULL DEFAULT 'pending'
);

-- Enable Row Level Security
ALTER TABLE public.business_discovery_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public submissions)
CREATE POLICY "Anyone can submit business discovery form"
ON public.business_discovery_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only admins can view submissions
CREATE POLICY "Admins can view all submissions"
ON public.business_discovery_submissions
FOR SELECT
USING (has_role(auth.uid(), 'admin'));

-- Only admins can update submissions
CREATE POLICY "Admins can update submissions"
ON public.business_discovery_submissions
FOR UPDATE
USING (has_role(auth.uid(), 'admin'));

-- Create index for common queries
CREATE INDEX idx_business_discovery_status ON public.business_discovery_submissions(status);
CREATE INDEX idx_business_discovery_created_at ON public.business_discovery_submissions(created_at DESC);
CREATE INDEX idx_business_discovery_lead_tier ON public.business_discovery_submissions(lead_tier);