-- Clean up incorrectly created data
DELETE FROM workflow_sequence_steps WHERE sequence_id IN (
  SELECT id FROM workflow_sequences WHERE user_id = 'f5d34180-fa7c-4e2c-8a0f-47062a6b25b4'
);

DELETE FROM workflow_sequences WHERE user_id = 'f5d34180-fa7c-4e2c-8a0f-47062a6b25b4';

DELETE FROM campaign_templates WHERE user_id = 'f5d34180-fa7c-4e2c-8a0f-47062a6b25b4';

-- Create Email Templates (18 total)
-- No Reply Follow-up Sequence Templates (4 email)
INSERT INTO campaign_templates (user_id, name, type, content, subject, is_active) VALUES
('f5d34180-fa7c-4e2c-8a0f-47062a6b25b4', 'Initial Outreach Email', 'email', 'Hi {{name}},

Thank you for your interest! I wanted to reach out personally to see if you had any questions about our services.

Is there anything specific you''d like to know more about?

Best regards,
{{sender_name}}', 'Following up on your inquiry', true),

('f5d34180-fa7c-4e2c-8a0f-47062a6b25b4', 'Second Follow-up Email', 'email', 'Hi {{name}},

I wanted to check in again to see if you''re still interested in learning more about how we can help your business grow.

Would you have 15 minutes this week for a quick call?

Best,
{{sender_name}}', 'Quick question for you', true),

('f5d34180-fa7c-4e2c-8a0f-47062a6b25b4', 'Value Proposition Email', 'email', 'Hi {{name}},

I thought you might be interested in seeing some results our clients have achieved:

✓ 40% increase in qualified leads
✓ 3x faster response times
✓ 60% reduction in manual work

Would love to show you how we can help achieve similar results.

Best regards,
{{sender_name}}', 'See what our clients achieved', true),

('f5d34180-fa7c-4e2c-8a0f-47062a6b25b4', 'Final Follow-up Email', 'email', 'Hi {{name}},

I don''t want to keep bothering you, so this will be my last message. If you''re interested in learning more, feel free to reach out anytime.

I''m here to help whenever you''re ready!

Best wishes,
{{sender_name}}', 'Last note from me', true),

-- New Lead Nurture Sequence Templates (5 email)
('f5d34180-fa7c-4e2c-8a0f-47062a6b25b4', 'Welcome New Lead', 'email', 'Hi {{name}},

Welcome! I''m excited to have you here.

I wanted to personally introduce myself and let you know I''m here to help with any questions you might have.

What brought you to us today?

Warm regards,
{{sender_name}}', 'Welcome! Let me introduce myself', true),

('f5d34180-fa7c-4e2c-8a0f-47062a6b25b4', 'Educational Content Email', 'email', 'Hi {{name}},

I wanted to share a helpful resource with you: our complete guide to getting started.

This guide covers:
• Key strategies for success
• Common mistakes to avoid
• Best practices from top performers

Download it here: [link]

Best,
{{sender_name}}', 'Free resource for you', true),

('f5d34180-fa7c-4e2c-8a0f-47062a6b25b4', 'Case Study Email', 'email', 'Hi {{name}},

I thought you''d appreciate this success story from a client similar to you.

They were facing [common challenge] and were able to:
- Achieve [specific result 1]
- Improve [specific metric] by X%
- Save [time/money]

Would you like to discuss how we could help you achieve similar results?

Best regards,
{{sender_name}}', 'Client success story you''ll love', true),

('f5d34180-fa7c-4e2c-8a0f-47062a6b25b4', 'Solution Overview Email', 'email', 'Hi {{name}},

I wanted to share how our solution works and why clients love it:

🎯 Easy to implement
⚡ Fast results (typically within 30 days)
💪 Ongoing support from our team

Interested in a personalized demo?

Best,
{{sender_name}}', 'Here''s how it works', true),

('f5d34180-fa7c-4e2c-8a0f-47062a6b25b4', 'Testimonial Email', 'email', 'Hi {{name}},

Don''t just take my word for it. Here''s what some of our clients are saying:

"Working with this team transformed our business. We saw results within the first month!" - Sarah K.

"The best investment we''ve made this year." - Mike T.

Ready to experience similar results?

Best regards,
{{sender_name}}', 'What our clients are saying', true),

-- Engagement Re-activation Sequence Templates (5 email)
('f5d34180-fa7c-4e2c-8a0f-47062a6b25b4', 'We Miss You Email', 'email', 'Hi {{name}},

I noticed we haven''t heard from you in a while and wanted to reach out.

Is everything okay? Is there anything we could do better?

I''d love to hear your feedback.

Best,
{{sender_name}}', 'We miss you!', true),

('f5d34180-fa7c-4e2c-8a0f-47062a6b25b4', 'Special Offer Email', 'email', 'Hi {{name}},

As a valued contact, I wanted to extend a special offer just for you.

For the next 7 days, you can [special offer details].

Don''t miss out on this exclusive opportunity!

Best regards,
{{sender_name}}', 'Exclusive offer just for you', true),

('f5d34180-fa7c-4e2c-8a0f-47062a6b25b4', 'What Changed Email', 'email', 'Hi {{name}},

I''m reaching out because I genuinely want to understand what changed.

Was it:
• Timing wasn''t right?
• Budget concerns?
• Found another solution?

Your feedback helps us improve. Would you mind sharing?

Best,
{{sender_name}}', 'Can I ask you something?', true),

('f5d34180-fa7c-4e2c-8a0f-47062a6b25b4', 'New Features Email', 'email', 'Hi {{name}},

We''ve added some exciting new features that I think you''ll love:

✨ [Feature 1]
✨ [Feature 2]
✨ [Feature 3]

Would you like to see them in action?

Best regards,
{{sender_name}}', 'New features you asked for', true),

('f5d34180-fa7c-4e2c-8a0f-47062a6b25b4', 'Last Chance Email', 'email', 'Hi {{name}},

This is my final attempt to reconnect with you.

If you''re no longer interested, that''s completely fine - I''ll stop reaching out.

But if you''d like to explore working together, I''m here whenever you''re ready.

Best wishes,
{{sender_name}}', 'One last message', true),

-- Appointment Reminder Sequence Templates (4 email)
('f5d34180-fa7c-4e2c-8a0f-47062a6b25b4', 'Appointment Confirmation', 'email', 'Hi {{name}},

This confirms your appointment scheduled for {{appointment_date}} at {{appointment_time}}.

Location: {{location}}
Duration: {{duration}}

Looking forward to meeting with you!

If you need to reschedule, please let me know ASAP.

Best regards,
{{sender_name}}', 'Your appointment is confirmed', true),

('f5d34180-fa7c-4e2c-8a0f-47062a6b25b4', '24hr Reminder Email', 'email', 'Hi {{name}},

Just a friendly reminder about our meeting tomorrow:

📅 {{appointment_date}}
⏰ {{appointment_time}}
📍 {{location}}

I''ve prepared some materials that I think you''ll find valuable.

See you tomorrow!

Best,
{{sender_name}}', 'Meeting tomorrow at {{appointment_time}}', true),

('f5d34180-fa7c-4e2c-8a0f-47062a6b25b4', '2hr Before Email', 'email', 'Hi {{name}},

Quick reminder - we''re meeting in about 2 hours!

Time: {{appointment_time}}
Location: {{location}}

Here''s the meeting link if it''s virtual: {{meeting_link}}

See you soon!

Best,
{{sender_name}}', 'Meeting in 2 hours', true),

('f5d34180-fa7c-4e2c-8a0f-47062a6b25b4', 'Post-Meeting Follow-up', 'email', 'Hi {{name}},

Thank you for taking the time to meet with me today!

As discussed, here are the next steps:
• [Action item 1]
• [Action item 2]
• [Action item 3]

I''ll follow up with you on {{follow_up_date}}.

Best regards,
{{sender_name}}', 'Great meeting you today!', true);

-- Create WhatsApp Templates (5 total)
-- No Reply Follow-up WhatsApp (1)
INSERT INTO campaign_templates (user_id, name, type, content, is_active) VALUES
('f5d34180-fa7c-4e2c-8a0f-47062a6b25b4', 'Quick WhatsApp Check-in', 'whatsapp', 'Hi {{name}}! 👋

Just wanted to quickly check if you saw my email about {{topic}}?

Would love to hear your thoughts!', true),

-- New Lead Nurture WhatsApp (2)
('f5d34180-fa7c-4e2c-8a0f-47062a6b25b4', 'Welcome WhatsApp Message', 'whatsapp', 'Hi {{name}}! 🎉

Welcome to our community! I''m here to help you get started.

Got any questions? Just reply here anytime!', true),

('f5d34180-fa7c-4e2c-8a0f-47062a6b25b4', 'Quick Question WhatsApp', 'whatsapp', 'Hi {{name}}! 

Quick question - what''s the #1 challenge you''re facing right now?

Would love to see if we can help! 💪', true),

-- Engagement Re-activation WhatsApp (1)
('f5d34180-fa7c-4e2c-8a0f-47062a6b25b4', 'Re-engagement WhatsApp', 'whatsapp', 'Hey {{name}}! 👋

Haven''t heard from you in a while. Everything okay?

We''ve got some exciting updates to share! Interested? 🚀', true),

-- Appointment Reminder WhatsApp (1)
('f5d34180-fa7c-4e2c-8a0f-47062a6b25b4', '1hr Before WhatsApp', 'whatsapp', 'Hi {{name}}! ⏰

Quick reminder - our meeting is in 1 hour!

📍 {{location}}
⏰ {{appointment_time}}

See you soon! 👍', true);

-- Create Workflow Sequences
INSERT INTO workflow_sequences (id, user_id, name, description, icon, color, is_active) VALUES
('11111111-1111-1111-1111-111111111111', 'f5d34180-fa7c-4e2c-8a0f-47062a6b25b4', 'No Reply Follow-up Sequence', 'Automated follow-up for leads who haven''t responded', 'Mail', '#3B82F6', true),
('22222222-2222-2222-2222-222222222222', 'f5d34180-fa7c-4e2c-8a0f-47062a6b25b4', 'New Lead Nurture Sequence', 'Welcome and educate new leads about your services', 'Users', '#10B981', true),
('33333333-3333-3333-3333-333333333333', 'f5d34180-fa7c-4e2c-8a0f-47062a6b25b4', 'Engagement Re-activation', 'Re-engage cold or inactive leads', 'Zap', '#F59E0B', true),
('44444444-4444-4444-4444-444444444444', 'f5d34180-fa7c-4e2c-8a0f-47062a6b25b4', 'Appointment Reminder Sequence', 'Automated reminders for scheduled appointments', 'Calendar', '#8B5CF6', true);

-- Create Workflow Sequence Steps
-- No Reply Follow-up Sequence Steps (5 steps: 4 email, 1 WhatsApp)
INSERT INTO workflow_sequence_steps (sequence_id, template_id, step_order, delay_hours, channel) VALUES
('11111111-1111-1111-1111-111111111111', (SELECT id FROM campaign_templates WHERE name = 'Initial Outreach Email' LIMIT 1), 1, 0, 'email'),
('11111111-1111-1111-1111-111111111111', (SELECT id FROM campaign_templates WHERE name = 'Second Follow-up Email' LIMIT 1), 2, 48, 'email'),
('11111111-1111-1111-1111-111111111111', (SELECT id FROM campaign_templates WHERE name = 'Quick WhatsApp Check-in' LIMIT 1), 3, 72, 'whatsapp'),
('11111111-1111-1111-1111-111111111111', (SELECT id FROM campaign_templates WHERE name = 'Value Proposition Email' LIMIT 1), 4, 120, 'email'),
('11111111-1111-1111-1111-111111111111', (SELECT id FROM campaign_templates WHERE name = 'Final Follow-up Email' LIMIT 1), 5, 168, 'email');

-- New Lead Nurture Sequence Steps (7 steps: 5 email, 2 WhatsApp)
INSERT INTO workflow_sequence_steps (sequence_id, template_id, step_order, delay_hours, channel) VALUES
('22222222-2222-2222-2222-222222222222', (SELECT id FROM campaign_templates WHERE name = 'Welcome New Lead' LIMIT 1), 1, 0, 'email'),
('22222222-2222-2222-2222-222222222222', (SELECT id FROM campaign_templates WHERE name = 'Welcome WhatsApp Message' LIMIT 1), 2, 24, 'whatsapp'),
('22222222-2222-2222-2222-222222222222', (SELECT id FROM campaign_templates WHERE name = 'Educational Content Email' LIMIT 1), 3, 72, 'email'),
('22222222-2222-2222-2222-222222222222', (SELECT id FROM campaign_templates WHERE name = 'Case Study Email' LIMIT 1), 4, 120, 'email'),
('22222222-2222-2222-2222-222222222222', (SELECT id FROM campaign_templates WHERE name = 'Quick Question WhatsApp' LIMIT 1), 5, 168, 'whatsapp'),
('22222222-2222-2222-2222-222222222222', (SELECT id FROM campaign_templates WHERE name = 'Solution Overview Email' LIMIT 1), 6, 240, 'email'),
('22222222-2222-2222-2222-222222222222', (SELECT id FROM campaign_templates WHERE name = 'Testimonial Email' LIMIT 1), 7, 336, 'email');

-- Engagement Re-activation Sequence Steps (6 steps: 5 email, 1 WhatsApp)
INSERT INTO workflow_sequence_steps (sequence_id, template_id, step_order, delay_hours, channel) VALUES
('33333333-3333-3333-3333-333333333333', (SELECT id FROM campaign_templates WHERE name = 'We Miss You Email' LIMIT 1), 1, 0, 'email'),
('33333333-3333-3333-3333-333333333333', (SELECT id FROM campaign_templates WHERE name = 'Special Offer Email' LIMIT 1), 2, 72, 'email'),
('33333333-3333-3333-3333-333333333333', (SELECT id FROM campaign_templates WHERE name = 'Re-engagement WhatsApp' LIMIT 1), 3, 120, 'whatsapp'),
('33333333-3333-3333-3333-333333333333', (SELECT id FROM campaign_templates WHERE name = 'What Changed Email' LIMIT 1), 4, 168, 'email'),
('33333333-3333-3333-3333-333333333333', (SELECT id FROM campaign_templates WHERE name = 'New Features Email' LIMIT 1), 5, 240, 'email'),
('33333333-3333-3333-3333-333333333333', (SELECT id FROM campaign_templates WHERE name = 'Last Chance Email' LIMIT 1), 6, 336, 'email');

-- Appointment Reminder Sequence Steps (5 steps: 4 email, 1 WhatsApp)
INSERT INTO workflow_sequence_steps (sequence_id, template_id, step_order, delay_hours, channel) VALUES
('44444444-4444-4444-4444-444444444444', (SELECT id FROM campaign_templates WHERE name = 'Appointment Confirmation' LIMIT 1), 1, 0, 'email'),
('44444444-4444-4444-4444-444444444444', (SELECT id FROM campaign_templates WHERE name = '24hr Reminder Email' LIMIT 1), 2, 24, 'email'),
('44444444-4444-4444-4444-444444444444', (SELECT id FROM campaign_templates WHERE name = '1hr Before WhatsApp' LIMIT 1), 3, 47, 'whatsapp'),
('44444444-4444-4444-4444-444444444444', (SELECT id FROM campaign_templates WHERE name = '2hr Before Email' LIMIT 1), 4, 46, 'email'),
('44444444-4444-4444-4444-444444444444', (SELECT id FROM campaign_templates WHERE name = 'Post-Meeting Follow-up' LIMIT 1), 5, 72, 'email');