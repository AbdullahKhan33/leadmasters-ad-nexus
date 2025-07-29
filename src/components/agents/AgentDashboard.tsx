import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAgents } from "@/hooks/useAgents";
import { useAuth } from "@/contexts/AuthContext";
import { TrendingUp, Users, Award, Activity } from "lucide-react";

export function AgentDashboard() {
  const { agents, isLoading } = useAgents();
  const { user } = useAuth();
  
  const myAgent = agents.find(agent => agent.user_id === user?.id);

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  if (!myAgent) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Agent profile not found. Contact your administrator.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Agent Dashboard</h1>
        <p className="text-gray-600">Welcome back, {myAgent.display_name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <Activity className="w-4 h-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <Badge variant={myAgent.status === 'active' ? 'default' : 'secondary'}>
              {myAgent.status}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assigned Leads</CardTitle>
            <Users className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myAgent.assigned_leads_count}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Handled</CardTitle>
            <TrendingUp className="w-4 h-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myAgent.total_leads_handled}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance</CardTitle>
            <Award className="w-4 h-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {myAgent.performance_score ? `${myAgent.performance_score}/10` : 'N/A'}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Agent Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Agent Code</p>
            <code className="bg-gray-100 px-2 py-1 rounded">{myAgent.agent_code}</code>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Specialization</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {myAgent.specialization?.map(spec => (
                <Badge key={spec} variant="outline">{spec}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}