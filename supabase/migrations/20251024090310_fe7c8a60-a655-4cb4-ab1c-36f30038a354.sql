-- Update workflow sequences to have user_id so they become visible via RLS
UPDATE workflow_sequences 
SET user_id = 'f5d34180-fa7c-4e2c-8a0f-47062a6b25b4'
WHERE user_id IS NULL;

-- Update campaign templates to have user_id so they become visible via RLS
UPDATE campaign_templates 
SET user_id = 'f5d34180-fa7c-4e2c-8a0f-47062a6b25b4'
WHERE user_id IS NULL;