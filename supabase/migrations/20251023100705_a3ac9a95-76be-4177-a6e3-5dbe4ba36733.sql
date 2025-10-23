-- Insert 50 test leads for AI Automation - simplified with NULLs for constrained fields
DO $$
DECLARE
  target_user_id uuid;
BEGIN
  SELECT user_id INTO target_user_id FROM leads LIMIT 1;
  IF target_user_id IS NULL THEN
    SELECT user_id INTO target_user_id FROM profiles LIMIT 1;
  END IF;

  IF target_user_id IS NOT NULL THEN
    INSERT INTO leads (
      user_id,
      name,
      phone,
      email,
      source,
      status,
      lead_source_type,
      ai_score,
      last_message,
      ai_next_action,
      notes,
      source_metadata,
      created_at,
      last_interaction_at
    )
    SELECT
      target_user_id,
      names.name,
      '+91' || (9000000000 + (random() * 999999999)::bigint)::text,
      lower(replace(names.name, ' ', '.')) || '@' || (ARRAY['gmail.com', 'yahoo.com', 'outlook.com', 'company.com'])[floor(random() * 4 + 1)::int],
      (ARRAY['WhatsApp', 'Facebook', 'Instagram', 'Website Form', 'Referral'])[floor(random() * 5 + 1)::int],
      'New',
      'ai_automation',
      floor(random() * 100)::int,
      (ARRAY['Interested in premium package', 'Asked about pricing', 'Wants demo', 'Need follow up', 'Ready to buy'])[floor(random() * 5 + 1)::int],
      (ARRAY['Send pricing', 'Schedule demo', 'Follow up call', 'Send proposal', 'Close deal'])[floor(random() * 5 + 1)::int],
      (ARRAY['Hot lead from campaign', 'High budget potential', 'Urgent requirement', 'Long-term client potential', 'Premium segment'])[floor(random() * 5 + 1)::int],
      jsonb_build_object(
        'campaign_id', gen_random_uuid(),
        'utm_source', (ARRAY['facebook', 'google', 'instagram', 'linkedin'])[floor(random() * 4 + 1)::int],
        'initial_interest', (ARRAY['product_demo', 'pricing', 'features', 'trial'])[floor(random() * 4 + 1)::int]
      ),
      now() - (random() * interval '30 days'),
      now() - (random() * interval '7 days')
    FROM (
      VALUES
        ('Rajesh Kumar'), ('Priya Sharma'), ('Amit Patel'), ('Sneha Reddy'), ('Vikram Singh'),
        ('Anjali Gupta'), ('Rahul Verma'), ('Kavita Desai'), ('Sanjay Joshi'), ('Pooja Mehta'),
        ('Arjun Nair'), ('Deepika Iyer'), ('Rohan Das'), ('Meera Shah'), ('Karan Kapoor'),
        ('Ritu Agarwal'), ('Suresh Rao'), ('Anita Kulkarni'), ('Manish Trivedi'), ('Swati Jain'),
        ('Aditya Bose'), ('Nisha Pillai'), ('Varun Malhotra'), ('Simran Kaur'), ('Harsh Sinha'),
        ('Tanvi Bhatt'), ('Nikhil Menon'), ('Aarti Saxena'), ('Gaurav Tiwari'), ('Shreya Pandey'),
        ('Vishal Chopra'), ('Neha Bansal'), ('Akash Yadav'), ('Pallavi Mishra'), ('Ravi Thakur'),
        ('Divya Chawla'), ('Mohit Oberoi'), ('Ishita Arora'), ('Sameer Bhatia'), ('Preeti Dutta'),
        ('Abhishek Goyal'), ('Shilpa Khanna'), ('Tarun Sethi'), ('Megha Sood'), ('Naveen Ahuja'),
        ('Ritika Bakshi'), ('Puneet Grover'), ('Aditi Sabharwal'), ('Kunal Dhawan'), ('Sonal Mittal')
    ) AS names(name);
  END IF;
END $$;