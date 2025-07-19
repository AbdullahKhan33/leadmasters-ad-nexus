-- Add missing columns to leads table
ALTER TABLE public.leads 
ADD COLUMN IF NOT EXISTS email TEXT,
ADD COLUMN IF NOT EXISTS list TEXT DEFAULT 'general',
ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'customer',
ADD COLUMN IF NOT EXISTS notes TEXT,
ADD COLUMN IF NOT EXISTS reminder_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS reminder_note TEXT;

-- Create index for email lookups
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);

-- Create index for reminder_date
CREATE INDEX IF NOT EXISTS idx_leads_reminder_date ON public.leads(reminder_date);