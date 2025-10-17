-- Insert a dummy campaign with realistic data
DO $$
DECLARE
  v_user_id uuid;
  v_campaign_id uuid;
  v_lead_ids uuid[];
  v_lead_id uuid;
  v_i int;
BEGIN
  -- Get the current user (admin user)
  SELECT id INTO v_user_id FROM auth.users WHERE email = 'admin@leadmasters.ai' LIMIT 1;
  
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'User not found';
  END IF;

  -- Create a dummy campaign
  INSERT INTO campaigns (
    user_id,
    name,
    type,
    status,
    subject,
    message_content,
    sent_at,
    created_by,
    metadata
  ) VALUES (
    v_user_id,
    'Summer Sale 2025 - Big Discounts!',
    'email',
    'sent',
    'Get 50% OFF on All Products - Limited Time!',
    '<p>Hi <strong>{{name}}</strong>,</p><p>We''re excited to announce our <em>biggest sale of the year</em>!</p><p>Get up to 50% off on all products. This offer is only valid for the next 48 hours.</p><p><a href="https://example.com/sale">Shop Now</a></p>',
    NOW() - INTERVAL '2 days',
    v_user_id,
    '{}'::jsonb
  ) RETURNING id INTO v_campaign_id;

  -- Get existing leads for this user
  SELECT array_agg(id) INTO v_lead_ids 
  FROM leads 
  WHERE user_id = v_user_id 
  LIMIT 50;

  -- If no leads exist, create some dummy ones
  IF array_length(v_lead_ids, 1) IS NULL OR array_length(v_lead_ids, 1) < 10 THEN
    v_lead_ids := ARRAY[]::uuid[];
    
    FOR v_i IN 1..50 LOOP
      INSERT INTO leads (
        user_id,
        name,
        email,
        phone,
        source,
        status
      ) VALUES (
        v_user_id,
        'Test Customer ' || v_i,
        'customer' || v_i || '@example.com',
        '+1-555-' || LPAD(v_i::text, 4, '0'),
        'Campaign Demo',
        'New'
      ) RETURNING id INTO v_lead_id;
      
      v_lead_ids := array_append(v_lead_ids, v_lead_id);
    END LOOP;
  END IF;

  -- Create campaign recipients with varied statuses
  FOR v_i IN 1..array_length(v_lead_ids, 1) LOOP
    v_lead_id := v_lead_ids[v_i];
    
    -- Create different statuses for realistic data
    -- 100% delivered, 40% opened, 10% clicked, 5% failed
    IF v_i <= array_length(v_lead_ids, 1) * 0.05 THEN
      -- Failed
      INSERT INTO campaign_recipients (
        campaign_id,
        lead_id,
        status,
        sent_at,
        failed_reason
      ) VALUES (
        v_campaign_id,
        v_lead_id,
        'failed',
        NOW() - INTERVAL '2 days',
        'Invalid email address'
      );
    ELSIF v_i <= array_length(v_lead_ids, 1) * 0.10 THEN
      -- Clicked (also opened and delivered)
      INSERT INTO campaign_recipients (
        campaign_id,
        lead_id,
        status,
        sent_at,
        delivered_at,
        opened_at,
        clicked_at
      ) VALUES (
        v_campaign_id,
        v_lead_id,
        'clicked',
        NOW() - INTERVAL '2 days',
        NOW() - INTERVAL '2 days' + INTERVAL '5 minutes',
        NOW() - INTERVAL '2 days' + INTERVAL '1 hour',
        NOW() - INTERVAL '2 days' + INTERVAL '2 hours'
      );
    ELSIF v_i <= array_length(v_lead_ids, 1) * 0.40 THEN
      -- Opened (also delivered)
      INSERT INTO campaign_recipients (
        campaign_id,
        lead_id,
        status,
        sent_at,
        delivered_at,
        opened_at
      ) VALUES (
        v_campaign_id,
        v_lead_id,
        'opened',
        NOW() - INTERVAL '2 days',
        NOW() - INTERVAL '2 days' + INTERVAL '5 minutes',
        NOW() - INTERVAL '2 days' + INTERVAL '3 hours'
      );
    ELSE
      -- Delivered but not opened
      INSERT INTO campaign_recipients (
        campaign_id,
        lead_id,
        status,
        sent_at,
        delivered_at
      ) VALUES (
        v_campaign_id,
        v_lead_id,
        'delivered',
        NOW() - INTERVAL '2 days',
        NOW() - INTERVAL '2 days' + INTERVAL '5 minutes'
      );
    END IF;
  END LOOP;

  RAISE NOTICE 'Dummy campaign created successfully with % recipients', array_length(v_lead_ids, 1);
END $$;