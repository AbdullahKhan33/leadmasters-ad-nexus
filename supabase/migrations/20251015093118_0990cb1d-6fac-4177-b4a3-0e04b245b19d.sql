-- Add crm_system_name column to business_discovery_submissions table
ALTER TABLE business_discovery_submissions
ADD COLUMN crm_system_name TEXT;