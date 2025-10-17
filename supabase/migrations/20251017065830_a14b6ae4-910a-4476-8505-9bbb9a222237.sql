-- Create a dummy WhatsApp campaign for testing
DO $$
DECLARE
  v_user_id uuid;
  v_campaign_id uuid;
  v_lead_ids uuid[];
BEGIN
  -- Get the first user ID
  SELECT id INTO v_user_id FROM auth.users LIMIT 1;
  
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'No users found in the system. Please create a user first.';
  END IF;

  -- Create a WhatsApp campaign
  INSERT INTO campaigns (
    user_id,
    name,
    type,
    status,
    subject,
    message_content,
    scheduled_at,
    sent_at,
    metadata
  ) VALUES (
    v_user_id,
    'Demo WhatsApp Campaign',
    'whatsapp',
    'sent',
    NULL,
    'Hello! This is a demo WhatsApp campaign to showcase the stats. Check out our latest offers! 🎉',
    NULL,
    NOW() - INTERVAL '2 hours',
    '{}'::jsonb
  )
  RETURNING id INTO v_campaign_id;

  -- Create dummy leads
  INSERT INTO leads (user_id, name, phone, email, source, status)
  VALUES 
    (v_user_id, 'John Doe', '+1234567890', 'john@example.com', 'Demo', 'New'),
    (v_user_id, 'Jane Smith', '+1234567891', 'jane@example.com', 'Demo', 'New'),
    (v_user_id, 'Bob Johnson', '+1234567892', 'bob@example.com', 'Demo', 'New'),
    (v_user_id, 'Alice Williams', '+1234567893', 'alice@example.com', 'Demo', 'New'),
    (v_user_id, 'Charlie Brown', '+1234567894', 'charlie@example.com', 'Demo', 'New'),
    (v_user_id, 'Diana Prince', '+1234567895', 'diana@example.com', 'Demo', 'New'),
    (v_user_id, 'Eve Taylor', '+1234567896', 'eve@example.com', 'Demo', 'New'),
    (v_user_id, 'Frank Miller', '+1234567897', 'frank@example.com', 'Demo', 'New'),
    (v_user_id, 'Grace Lee', '+1234567898', 'grace@example.com', 'Demo', 'New'),
    (v_user_id, 'Henry Davis', '+1234567899', 'henry@example.com', 'Demo', 'New');

  -- Get the created lead IDs
  SELECT array_agg(id ORDER BY created_at DESC) INTO v_lead_ids 
  FROM leads 
  WHERE user_id = v_user_id 
  AND source = 'Demo'
  LIMIT 10;

  -- Create campaign recipients with various statuses
  -- Recipient 1: Delivered and read and clicked
  INSERT INTO campaign_recipients (campaign_id, lead_id, status, sent_at, delivered_at, opened_at, clicked_at)
  VALUES (v_campaign_id, v_lead_ids[1], 'clicked', NOW() - INTERVAL '2 hours', NOW() - INTERVAL '1 hour 55 minutes', NOW() - INTERVAL '1 hour 30 minutes', NOW() - INTERVAL '1 hour 15 minutes');

  -- Recipient 2: Delivered and read
  INSERT INTO campaign_recipients (campaign_id, lead_id, status, sent_at, delivered_at, opened_at)
  VALUES (v_campaign_id, v_lead_ids[2], 'opened', NOW() - INTERVAL '2 hours', NOW() - INTERVAL '1 hour 55 minutes', NOW() - INTERVAL '1 hour 20 minutes');

  -- Recipient 3: Delivered and read and clicked
  INSERT INTO campaign_recipients (campaign_id, lead_id, status, sent_at, delivered_at, opened_at, clicked_at)
  VALUES (v_campaign_id, v_lead_ids[3], 'clicked', NOW() - INTERVAL '2 hours', NOW() - INTERVAL '1 hour 55 minutes', NOW() - INTERVAL '1 hour 10 minutes', NOW() - INTERVAL '1 hour');

  -- Recipient 4: Delivered only
  INSERT INTO campaign_recipients (campaign_id, lead_id, status, sent_at, delivered_at)
  VALUES (v_campaign_id, v_lead_ids[4], 'delivered', NOW() - INTERVAL '2 hours', NOW() - INTERVAL '1 hour 55 minutes');

  -- Recipient 5: Delivered and read
  INSERT INTO campaign_recipients (campaign_id, lead_id, status, sent_at, delivered_at, opened_at)
  VALUES (v_campaign_id, v_lead_ids[5], 'opened', NOW() - INTERVAL '2 hours', NOW() - INTERVAL '1 hour 55 minutes', NOW() - INTERVAL '50 minutes');

  -- Recipient 6: Delivered only
  INSERT INTO campaign_recipients (campaign_id, lead_id, status, sent_at, delivered_at)
  VALUES (v_campaign_id, v_lead_ids[6], 'delivered', NOW() - INTERVAL '2 hours', NOW() - INTERVAL '1 hour 55 minutes');

  -- Recipient 7: Failed
  INSERT INTO campaign_recipients (campaign_id, lead_id, status, sent_at, failed_reason)
  VALUES (v_campaign_id, v_lead_ids[7], 'failed', NOW() - INTERVAL '2 hours', 'Invalid phone number');

  -- Recipient 8: Delivered and read
  INSERT INTO campaign_recipients (campaign_id, lead_id, status, sent_at, delivered_at, opened_at)
  VALUES (v_campaign_id, v_lead_ids[8], 'opened', NOW() - INTERVAL '2 hours', NOW() - INTERVAL '1 hour 55 minutes', NOW() - INTERVAL '45 minutes');

  -- Recipient 9: Delivered only
  INSERT INTO campaign_recipients (campaign_id, lead_id, status, sent_at, delivered_at)
  VALUES (v_campaign_id, v_lead_ids[9], 'delivered', NOW() - INTERVAL '2 hours', NOW() - INTERVAL '1 hour 55 minutes');

  -- Recipient 10: Failed
  INSERT INTO campaign_recipients (campaign_id, lead_id, status, sent_at, failed_reason)
  VALUES (v_campaign_id, v_lead_ids[10], 'failed', NOW() - INTERVAL '2 hours', 'Network error');

  RAISE NOTICE 'Demo WhatsApp campaign created successfully with ID: %', v_campaign_id;
END $$;