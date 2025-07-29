
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';

interface Workspace {
  id: string;
  name: string;
  description: string;
  country: string;
  industry: string;
  businessType: string;
  memberCount: number;
  isActive: boolean;
}

interface WorkspaceContextType {
  activeWorkspace: Workspace | null;
  workspaces: Workspace[];
  setActiveWorkspace: (workspace: Workspace | null) => void;
  selectWorkspace: (workspace: Workspace) => void;
  addWorkspace: (workspace: Workspace) => void;
  deleteWorkspace: (workspaceId: string) => void;
  isInWorkspace: boolean;
  hasWorkspaces: boolean;
  userRole: string | null;
  canManageWorkspaces: boolean;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [activeWorkspace, setActiveWorkspace] = useState<Workspace | null>(null);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [userRole, setUserRole] = useState<string | null>(null);
  const { user } = useAuth();

  // Load workspaces based on user role
  useEffect(() => {
    const loadWorkspaces = async () => {
      if (!user) return;

      try {
        // Get user role
        const { data: roleData, error: roleError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .single();

        if (roleError) {
          console.error('Error fetching user role:', roleError);
          return;
        }

        setUserRole(roleData.role);

        if (roleData.role === 'agent') {
          // For agents, fetch assigned workspaces from database
          const { data: agentData, error: agentError } = await supabase
            .from('agents')
            .select('id')
            .eq('user_id', user.id)
            .single();

          if (agentError || !agentData) {
            console.error('Error fetching agent data:', agentError);
            return;
          }

          const { data: workspaceData, error: workspaceError } = await supabase
            .from('agent_workspaces')
            .select('workspace_id')
            .eq('agent_id', agentData.id);

          if (workspaceError) {
            console.error('Error fetching agent workspaces:', workspaceError);
            return;
          }

          if (workspaceData && workspaceData.length > 0) {
            const workspaceIds = workspaceData.map(item => item.workspace_id);
            
            const { data: assignedWorkspaces, error: workspacesError } = await supabase
              .from('workspaces')
              .select('id, name, description')
              .in('id', workspaceIds);

            if (workspacesError) {
              console.error('Error fetching workspace details:', workspacesError);
              return;
            }

            // Convert database workspaces to match the local interface
            const formattedWorkspaces = assignedWorkspaces?.map(ws => ({
              id: ws.id,
              name: ws.name,
              description: ws.description || '',
              country: '',
              industry: '',
              businessType: '',
              memberCount: 0,
              isActive: true
            })) || [];

            setWorkspaces(formattedWorkspaces);

            // Auto-select first workspace if none is selected
            if (formattedWorkspaces.length > 0) {
              setActiveWorkspace(formattedWorkspaces[0]);
            }
          }
        } else {
          // For admins, load workspaces from database first, then fallback to localStorage
          const { data: adminWorkspaces, error: workspacesError } = await supabase
            .from('workspaces')
            .select('id, name, description')
            .eq('created_by', user.id);

          if (workspacesError) {
            console.error('Error fetching admin workspaces:', workspacesError);
          }

          if (adminWorkspaces && adminWorkspaces.length > 0) {
            // Convert database workspaces to match the local interface
            const formattedWorkspaces = adminWorkspaces.map(ws => ({
              id: ws.id,
              name: ws.name,
              description: ws.description || '',
              country: '',
              industry: '',
              businessType: '',
              memberCount: 0,
              isActive: true
            }));

            setWorkspaces(formattedWorkspaces);

            // Auto-select first workspace if none is selected
            if (formattedWorkspaces.length > 0) {
              setActiveWorkspace(formattedWorkspaces[0]);
            }
          } else {
            // Fallback to localStorage if no database workspaces found
            const savedWorkspaces = localStorage.getItem('workspaces');
            const savedActiveWorkspace = localStorage.getItem('activeWorkspace');
            
            if (savedWorkspaces) {
              const parsedWorkspaces = JSON.parse(savedWorkspaces);
              setWorkspaces(parsedWorkspaces);
              
              if (savedActiveWorkspace) {
                const parsedActiveWorkspace = JSON.parse(savedActiveWorkspace);
                setActiveWorkspace(parsedActiveWorkspace);
              } else if (parsedWorkspaces.length > 0) {
                setActiveWorkspace(parsedWorkspaces[0]);
              }
            }
          }
        }
      } catch (error) {
        console.error('Error loading workspaces:', error);
      }
    };

    loadWorkspaces();
  }, [user]);

  // Save to localStorage whenever workspaces change (admin only)
  useEffect(() => {
    if (userRole === 'admin') {
      if (workspaces.length > 0) {
        localStorage.setItem('workspaces', JSON.stringify(workspaces));
      } else {
        localStorage.removeItem('workspaces');
        localStorage.removeItem('activeWorkspace');
      }
    }
  }, [workspaces, userRole]);

  // Save active workspace to localStorage (admin only)
  useEffect(() => {
    if (userRole === 'admin') {
      if (activeWorkspace) {
        localStorage.setItem('activeWorkspace', JSON.stringify(activeWorkspace));
      } else {
        localStorage.removeItem('activeWorkspace');
      }
    }
  }, [activeWorkspace, userRole]);

  const selectWorkspace = (workspace: Workspace) => {
    setActiveWorkspace(workspace);
  };

  const addWorkspace = (workspace: Workspace) => {
    // Only allow admins to add workspaces
    if (userRole !== 'admin') {
      console.warn('Only admins can create workspaces');
      return;
    }
    setWorkspaces(prev => [workspace, ...prev]);
    setActiveWorkspace(workspace);
  };

  const deleteWorkspace = (workspaceId: string) => {
    // Only allow admins to delete workspaces
    if (userRole !== 'admin') {
      console.warn('Only admins can delete workspaces');
      return;
    }
    setWorkspaces(prev => {
      const updatedWorkspaces = prev.filter(workspace => workspace.id !== workspaceId);
      
      if (activeWorkspace?.id === workspaceId) {
        if (updatedWorkspaces.length > 0) {
          const newActiveWorkspace = updatedWorkspaces[0];
          setActiveWorkspace(newActiveWorkspace);
          console.log('Auto-selected new active workspace:', newActiveWorkspace.name);
        } else {
          setActiveWorkspace(null);
          console.log('No workspaces remaining, cleared active workspace');
        }
      }
      
      return updatedWorkspaces;
    });
  };

  const value = {
    activeWorkspace,
    workspaces,
    setActiveWorkspace,
    selectWorkspace,
    addWorkspace,
    deleteWorkspace,
    isInWorkspace: activeWorkspace !== null,
    hasWorkspaces: workspaces.length > 0,
    userRole,
    canManageWorkspaces: userRole === 'admin',
  };

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (context === undefined) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
}

export type { Workspace };
