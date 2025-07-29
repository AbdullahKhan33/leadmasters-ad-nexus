import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, TrendingUp, Award } from "lucide-react";
import type { Agent } from "@/hooks/useAgents";

interface AgentStatsCardsProps {
  agents: Agent[];
}

export function AgentStatsCards({ agents }: AgentStatsCardsProps) {
  const totalAgents = agents.length;
  const activeAgents = agents.filter(agent => agent.status === 'active').length;
  const totalLeadsHandled = agents.reduce((sum, agent) => sum + agent.total_leads_handled, 0);
  const avgPerformance = agents.length > 0 
    ? agents.reduce((sum, agent) => sum + (agent.performance_score || 0), 0) / agents.length 
    : 0;

  const stats = [
    {
      title: "Total Agents",
      value: totalAgents,
      icon: Users,
      description: "Registered agents",
      color: "text-blue-600 bg-blue-100"
    },
    {
      title: "Active Agents",
      value: activeAgents,
      icon: UserCheck,
      description: "Currently active",
      color: "text-green-600 bg-green-100"
    },
    {
      title: "Total Leads Handled",
      value: totalLeadsHandled,
      icon: TrendingUp,
      description: "Across all agents",
      color: "text-purple-600 bg-purple-100"
    },
    {
      title: "Avg Performance",
      value: avgPerformance.toFixed(1),
      icon: Award,
      description: "Out of 10",
      color: "text-yellow-600 bg-yellow-100"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.color}`}>
              <stat.icon className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}