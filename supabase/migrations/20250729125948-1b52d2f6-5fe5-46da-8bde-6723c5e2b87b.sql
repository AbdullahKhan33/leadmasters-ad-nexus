-- Create a test agent with specific permissions
-- First, let's create an agent record for the user ahmed76@leadmasters.ai
INSERT INTO agents (
  user_id, 
  agent_code, 
  permissions,
  status
) VALUES (
  (SELECT id FROM auth.users WHERE email = 'ahmed76@leadmasters.ai'),
  'AGENT001',
  '{
    "crm": true,
    "post_builder": true,
    "ad_builder": false,
    "analytics": false,
    "schedule": false,
    "content_hub": false,
    "social_logins": false,
    "inspiration_hub": false
  }',
  'active'
);

-- Update the user role to agent
UPDATE user_roles 
SET role = 'agent' 
WHERE user_id = (SELECT id FROM auth.users WHERE email = 'ahmed76@leadmasters.ai');