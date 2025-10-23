-- Add lead_source_type to track which system "owns" the lead
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS lead_source_type text DEFAULT 'manual' 
CHECK (lead_source_type IN ('ai_automation', 'crm_contact', 'manual', 'csv_import'));

-- Add metadata column for tracking move history
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS source_metadata jsonb DEFAULT '{}'::jsonb;

-- Update existing leads based on current data
UPDATE leads 
SET lead_source_type = CASE 
  WHEN current_workflow_id IS NOT NULL THEN 'ai_automation'
  WHEN source = 'CSV Import' THEN 'csv_import'
  ELSE 'manual'
END
WHERE lead_source_type = 'manual';

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_leads_source_type ON leads(lead_source_type);
CREATE INDEX IF NOT EXISTS idx_leads_workflow_stage ON leads(workflow_stage);