-- Add website_url column to business_contexts table
ALTER TABLE business_contexts 
ADD COLUMN IF NOT EXISTS website_url TEXT;

-- Add index for better performance
CREATE INDEX IF NOT EXISTS idx_business_contexts_user_id ON business_contexts(user_id);

-- Add comment
COMMENT ON COLUMN business_contexts.website_url IS 'Landing page or website URL for the campaign';