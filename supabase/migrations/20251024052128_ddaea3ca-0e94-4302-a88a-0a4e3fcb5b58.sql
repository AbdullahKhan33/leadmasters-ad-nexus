-- Insert sample email and WhatsApp templates for workflow sequences
-- Properly handling nullable subject column for WhatsApp templates

-- Email templates (with subject)
INSERT INTO campaign_templates (user_id, name, type, content, subject, is_active)
SELECT u.id, 'Just Checking In', 'email',
'Hi {{name}},

I wanted to follow up on your recent inquiry about {{property_type}}. I know how busy life can get.

Is there anything I can help clarify?

Best regards,
{{agent_name}}',
'Just Checking In - {{name}}', true
FROM (SELECT id FROM auth.users LIMIT 1) u
WHERE NOT EXISTS (SELECT 1 FROM campaign_templates WHERE name = 'Just Checking In' AND type = 'email');

INSERT INTO campaign_templates (user_id, name, type, content, subject, is_active)
SELECT u.id, 'Market Update - Properties in Your Area', 'email',
'Hi {{name}},

Great news! I wanted to share some exciting market updates for {{property_type}}.

Current Market Highlights:
- Average price: {{avg_price}}
- New listings this week: {{new_listings}}

Best regards,
{{agent_name}}',
'Market Update - Properties in Your Area', true
FROM (SELECT id FROM auth.users LIMIT 1) u
WHERE NOT EXISTS (SELECT 1 FROM campaign_templates WHERE name = 'Market Update - Properties in Your Area' AND type = 'email');

-- WhatsApp templates (subject is NULL)
INSERT INTO campaign_templates (user_id, name, type, content, is_active)
SELECT u.id, 'Quick check-in about property', 'whatsapp',
'Hi {{name}}!

Just checking in about your interest in {{property_type}}. Did you get my previous message?

Let me know if you have questions!', true
FROM (SELECT id FROM auth.users LIMIT 1) u
WHERE NOT EXISTS (SELECT 1 FROM campaign_templates WHERE name = 'Quick check-in about property' AND type = 'whatsapp');

INSERT INTO campaign_templates (user_id, name, type, content, is_active)
SELECT u.id, 'New property listings', 'whatsapp',
'Hi {{name}}!

Exciting news! New {{property_type}} listings just dropped.

Want me to send details?', true
FROM (SELECT id FROM auth.users LIMIT 1) u
WHERE NOT EXISTS (SELECT 1 FROM campaign_templates WHERE name = 'New property listings' AND type = 'whatsapp');