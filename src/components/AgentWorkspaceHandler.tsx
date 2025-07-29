import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useAgentPasswordCheck } from "@/hooks/useAgentPasswordCheck";
import { PasswordChangeModal } from "./auth/PasswordChangeModal";
import { Loader2 } from "lucide-react";

interface Workspace {
  id: string;
  name: string;
  description?: string;
}

interface AgentWorkspaceHandlerProps {
  children: React.ReactNode;
}

export function AgentWorkspaceHandler({ children }: AgentWorkspaceHandlerProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { needsPasswordChange, markPasswordChanged } = useAgentPasswordCheck();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [assignedWorkspaces, setAssignedWorkspaces] = useState<Workspace[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserRoleAndWorkspaces = async () => {
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

        // If user is an agent, fetch their assigned workspaces
        if (roleData.role === 'agent') {
          // First get the agent ID
          const { data: agentData, error: agentError } = await supabase
            .from('agents')
            .select('id')
            .eq('user_id', user.id)
            .single();

          if (agentError || !agentData) {
            console.error('Error fetching agent data:', agentError);
            return;
          }

          // Then get workspace assignments with workspace details
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
            
            const { data: workspaces, error: workspacesError } = await supabase
              .from('workspaces')
              .select('id, name, description')
              .in('id', workspaceIds);

            if (workspacesError) {
              console.error('Error fetching workspace details:', workspacesError);
              return;
            }

            const fetchedWorkspaces = workspaces || [];
            setAssignedWorkspaces(fetchedWorkspaces);

            // If agent has only one workspace, auto-select it
            if (fetchedWorkspaces.length === 1) {
              // Set current workspace context or navigate to it
              navigate('/dashboard');
              return;
            }
          } else {
            // If agent has no assigned workspaces, show a message
            toast({
              title: "No Workspaces Assigned",
              description: "You haven't been assigned to any workspaces yet. Please contact your administrator.",
              variant: "destructive"
            });
            navigate('/dashboard'); // Redirect to a default page
            return;
          }
        }
      } catch (error) {
        console.error('Error in workspace handler:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserRoleAndWorkspaces();
  }, [user, navigate, toast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  // If user is admin, show normal workspace management
  if (userRole === 'admin') {
    return (
      <>
        {children}
        <PasswordChangeModal 
          open={needsPasswordChange} 
          onSuccess={markPasswordChanged}
        />
      </>
    );
  }

  // If user is agent with assigned workspaces, show workspace selector
  if (userRole === 'agent' && assignedWorkspaces.length > 1) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Select Workspace</h1>
              <p className="text-muted-foreground">Choose a workspace to access</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {assignedWorkspaces.map((workspace) => (
                <div
                  key={workspace.id}
                  className="p-6 border rounded-lg hover:shadow-lg transition-shadow cursor-pointer bg-card"
                  onClick={() => {
                    // Set workspace context and navigate to dashboard
                    navigate('/dashboard');
                  }}
                >
                  <h3 className="text-xl font-semibold mb-2">{workspace.name}</h3>
                  {workspace.description && (
                    <p className="text-muted-foreground">{workspace.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <PasswordChangeModal 
          open={needsPasswordChange} 
          onSuccess={markPasswordChanged}
        />
      </>
    );
  }

  // Default case (agent with single workspace or already handled)
  return (
    <>
      {children}
      <PasswordChangeModal 
        open={needsPasswordChange} 
        onSuccess={markPasswordChanged}
      />
    </>
  );
}