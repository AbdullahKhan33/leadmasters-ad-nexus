-- Add region column to workspaces table
ALTER TABLE workspaces 
ADD COLUMN region TEXT DEFAULT 'global' 
CHECK (region IN ('uae', 'qatar', 'saudi_arabia', 'india', 'global'));

-- Add comment for documentation
COMMENT ON COLUMN workspaces.region IS 'Primary operating region for the workspace. Determines which regional portals are shown in integrations.';

-- Add index for performance
CREATE INDEX idx_workspaces_region ON workspaces(region);