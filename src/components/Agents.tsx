
import { useAuth } from "@/contexts/AuthContext";
import { AgentManagement } from "./agents/AgentManagement";
import { AgentDashboard } from "./agents/AgentDashboard";

export function Agents() {
  const { userRole } = useAuth();

  if (userRole === 'admin') {
    return <AgentManagement />;
  }

  if (userRole === 'agent') {
    return <AgentDashboard />;
  }

  return (
    <div className="flex items-center justify-center h-64">
      <p className="text-gray-500">Access denied. Please contact your administrator.</p>
    </div>
  );
}
