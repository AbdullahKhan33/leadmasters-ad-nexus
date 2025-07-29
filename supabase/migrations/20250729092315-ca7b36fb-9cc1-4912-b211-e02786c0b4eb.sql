-- Remove specialization column and add permissions column to agents table
ALTER TABLE public.agents DROP COLUMN IF EXISTS specialization;

-- Add permissions column as JSONB to store feature permissions
ALTER TABLE public.agents ADD COLUMN permissions JSONB DEFAULT '{}' NOT NULL;