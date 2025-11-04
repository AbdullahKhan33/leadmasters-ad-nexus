-- Add "pending_invite" as a valid status for agents table
ALTER TABLE agents DROP CONSTRAINT IF EXISTS agents_status_check;
ALTER TABLE agents ADD CONSTRAINT agents_status_check CHECK (status IN ('active', 'inactive', 'pending_invite'));