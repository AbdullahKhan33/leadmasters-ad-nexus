-- Create a default workspace for the admin user
-- We'll use a function to safely create the workspace
DO $$
DECLARE
    admin_user_id uuid;
BEGIN
    -- Get the admin user ID
    SELECT id INTO admin_user_id 
    FROM auth.users 
    WHERE email = 'admin@leadmasters.ai' 
    LIMIT 1;
    
    -- Only create if admin user exists and doesn't already have a workspace
    IF admin_user_id IS NOT NULL THEN
        -- Check if admin already has a workspace
        IF NOT EXISTS (SELECT 1 FROM public.workspaces WHERE created_by = admin_user_id) THEN
            INSERT INTO public.workspaces (
                name,
                description,
                created_by
            ) VALUES (
                'BotCampus AI',
                'AI training and education company based in Karnataka, India. Specializing in educational technology solutions.',
                admin_user_id
            );
        END IF;
    END IF;
END $$;