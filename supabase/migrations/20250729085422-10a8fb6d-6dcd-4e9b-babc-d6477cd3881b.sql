-- Update admin user to have admin role
UPDATE user_roles 
SET role = 'admin'::app_role 
WHERE user_id = (SELECT user_id FROM profiles WHERE email = 'admin@leadmasters.ai');