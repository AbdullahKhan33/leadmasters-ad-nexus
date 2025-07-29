-- Remove all agents and related data to clean up the loops
DELETE FROM agent_lead_assignments;
DELETE FROM agent_workspaces;
DELETE FROM agents;

-- Remove agent roles, keep only admin and user roles
DELETE FROM user_roles WHERE role = 'agent';