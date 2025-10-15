-- Add phone and email columns to business_discovery_submissions table
ALTER TABLE business_discovery_submissions
ADD COLUMN IF NOT EXISTS phone TEXT NOT NULL DEFAULT '',
ADD COLUMN IF NOT EXISTS email TEXT NOT NULL DEFAULT '';

-- Update the default constraint after adding columns
ALTER TABLE business_discovery_submissions
ALTER COLUMN phone DROP DEFAULT,
ALTER COLUMN email DROP DEFAULT;