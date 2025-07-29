import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { useAgents } from "@/hooks/useAgents";
import { useAuth } from "@/contexts/AuthContext";
import { 
  UserPlus, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Users, 
  TrendingUp, 
  Award,
  Activity
} from "lucide-react";
import { DeleteAgentDialog } from "./DeleteAgentDialog";
import { AgentStatsCards } from "./AgentStatsCards";

export function AgentManagement() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteAgent, setDeleteAgent] = useState<{ id: string; name: string } | null>(null);
  const { agents, isLoading, deleteAgent: performDeleteAgent } = useAgents();
  const { userRole } = useAuth();
  const { toast } = useToast();

  const filteredAgents = agents.filter(agent =>
    agent.display_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.agent_code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteAgent = async () => {
    if (!deleteAgent) return;
    
    try {
      await performDeleteAgent(deleteAgent.id);
      toast({
        title: "Success",
        description: "Agent deleted successfully"
      });
      setDeleteAgent(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete agent",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>;
      case 'inactive':
        return <Badge variant="secondary">Inactive</Badge>;
      case 'suspended':
        return <Badge variant="destructive">Suspended</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (userRole !== 'admin') {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Access denied. Admin privileges required.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Agent Management</h1>
          <p className="text-gray-600">Manage your sales agents and their performance</p>
        </div>
        <Button onClick={() => navigate("/app/agents/create")} className="flex items-center gap-2">
          <UserPlus className="w-4 h-4" />
          Add Agent
        </Button>
      </div>

      {/* Stats Cards */}
      <AgentStatsCards agents={agents} />

      {/* Agents Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              All Agents
            </CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search agents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="text-gray-500">Loading agents...</div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Agent</TableHead>
                  <TableHead>Agent Code</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned Leads</TableHead>
                  <TableHead>Total Handled</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Permissions</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAgents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-gray-500 py-8">
                      {searchTerm ? "No agents found matching your search." : "No agents found. Add your first agent to get started."}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAgents.map((agent) => (
                    <TableRow key={agent.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{agent.display_name || 'Unknown'}</div>
                          <div className="text-sm text-gray-500">{agent.email}</div>
                          {agent.phone && (
                            <div className="text-sm text-gray-500">{agent.phone}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                          {agent.agent_code}
                        </code>
                      </TableCell>
                      <TableCell>{getStatusBadge(agent.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Activity className="w-4 h-4 text-blue-500" />
                          {agent.assigned_leads_count}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4 text-green-500" />
                          {agent.total_leads_handled}
                        </div>
                      </TableCell>
                      <TableCell>
                        {agent.performance_score ? (
                          <div className="flex items-center gap-1">
                            <Award className="w-4 h-4 text-yellow-500" />
                            {agent.performance_score}/10
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {agent.permissions && Object.keys(agent.permissions).length > 0 ? (
                            Object.entries(agent.permissions)
                              .filter(([_, enabled]) => enabled)
                              .slice(0, 2)
                              .map(([permission, _], index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {permission.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                </Badge>
                              ))
                          ) : (
                            <span className="text-gray-400">No permissions</span>
                          )}
                          {agent.permissions && Object.entries(agent.permissions).filter(([_, enabled]) => enabled).length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{Object.entries(agent.permissions).filter(([_, enabled]) => enabled).length - 2} more
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => navigate(`/app/agents/edit/${agent.id}`)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Agent
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => setDeleteAgent({ id: agent.id, name: agent.display_name || agent.email || 'Unknown' })}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete Agent
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <DeleteAgentDialog
        open={!!deleteAgent}
        onOpenChange={(open) => !open && setDeleteAgent(null)}
        onConfirm={handleDeleteAgent}
        agentName={deleteAgent?.name || ""}
      />
    </div>
  );
}