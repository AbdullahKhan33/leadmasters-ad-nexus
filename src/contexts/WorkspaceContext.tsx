
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Workspace {
  id: string;
  name: string;
  clientName: string;
  industry: string;
  country: string;
  businessType: string;
  logo?: string;
  initials: string;
  metrics: {
    campaigns: number;
    scheduledPosts: number;
    engagementTrend: number;
    isPositive: boolean;
  };
  isActive: boolean;
  createdAt: string;
}

interface WorkspaceContextType {
  activeWorkspace: Workspace | null;
  setActiveWorkspace: (workspace: Workspace | null) => void;
  selectWorkspace: (workspace: any) => void;
  isInWorkspace: boolean;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [activeWorkspace, setActiveWorkspace] = useState<Workspace | null>(null);

  const selectWorkspace = (workspace: any) => {
    setActiveWorkspace(workspace);
  };

  const value = {
    activeWorkspace,
    setActiveWorkspace,
    selectWorkspace,
    isInWorkspace: activeWorkspace !== null,
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
