-- Update existing leads without emails to add dummy email addresses
-- This will generate emails based on their phone numbers to ensure uniqueness

UPDATE leads 
SET email = CONCAT('contact_', SUBSTRING(phone FROM 1 FOR 10), '@example.com')
WHERE email IS NULL OR email = '';

-- Update a few specific leads with more realistic looking emails based on their names
UPDATE leads 
SET email = LOWER(REPLACE(name, ' ', '.')) || '@company.com'
WHERE id IN (
  SELECT id FROM leads 
  WHERE email LIKE '%@example.com%' 
  LIMIT 5
);