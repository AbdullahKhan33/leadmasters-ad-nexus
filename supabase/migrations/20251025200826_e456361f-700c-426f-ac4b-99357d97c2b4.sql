-- Update leads with better email addresses using firstname@gmail.com format
-- First, extract first name from the name field (before first space)
UPDATE leads 
SET email = LOWER(TRIM(SPLIT_PART(name, ' ', 1))) || '@gmail.com'
WHERE email IS NOT NULL;

-- For leads that have first_name in source_metadata, use that instead
UPDATE leads 
SET email = LOWER(TRIM(source_metadata->>'first_name')) || '@gmail.com'
WHERE source_metadata->>'first_name' IS NOT NULL 
  AND source_metadata->>'first_name' != '';