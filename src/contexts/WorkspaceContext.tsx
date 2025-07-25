
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [activeWorkspace, setActiveWorkspace] = useState<Workspace | null>(null);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedWorkspaces = localStorage.getItem('workspaces');
    const savedActiveWorkspace = localStorage.getItem('activeWorkspace');
    
    if (savedWorkspaces) {
      const parsedWorkspaces = JSON.parse(savedWorkspaces);
      setWorkspaces(parsedWorkspaces);
      
      if (savedActiveWorkspace) {
        const parsedActiveWorkspace = JSON.parse(savedActiveWorkspace);
        setActiveWorkspace(parsedActiveWorkspace);
      } else if (parsedWorkspaces.length > 0) {
        // Auto-select first workspace if none is selected
        setActiveWorkspace(parsedWorkspaces[0]);
      }
    }
  }, []);

  // Save to localStorage whenever workspaces change
  useEffect(() => {
    if (workspaces.length > 0) {
      localStorage.setItem('workspaces', JSON.stringify(workspaces));
    } else {
      // Clear localStorage when no workspaces exist
      localStorage.removeItem('workspaces');
      localStorage.removeItem('activeWorkspace');
    }
  }, [workspaces]);

  // Save active workspace to localStorage
  useEffect(() => {
    if (activeWorkspace) {
      localStorage.setItem('activeWorkspace', JSON.stringify(activeWorkspace));
    } else {
      localStorage.removeItem('activeWorkspace');
    }
  }, [activeWorkspace]);

  const selectWorkspace = (workspace: Workspace) => {
    setActiveWorkspace(workspace);
  };

  const addWorkspace = (workspace: Workspace) => {
    setWorkspaces(prev => [workspace, ...prev]);
    setActiveWorkspace(workspace);
  };

  const deleteWorkspace = (workspaceId: string) => {
    setWorkspaces(prev => {
      const updatedWorkspaces = prev.filter(workspace => workspace.id !== workspaceId);
      
      // If the deleted workspace was the active one, handle auto-selection
      if (activeWorkspace?.id === workspaceId) {
        if (updatedWorkspaces.length > 0) {
          // Auto-select the first available workspace
          const newActiveWorkspace = updatedWorkspaces[0];
          setActiveWorkspace(newActiveWorkspace);
          console.log('Auto-selected new active workspace:', newActiveWorkspace.name);
        } else {
          // No workspaces left, clear active workspace
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
