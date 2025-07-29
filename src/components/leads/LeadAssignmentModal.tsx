import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAgents } from "@/hooks/useAgents";
import { supabase } from "@/integrations/supabase/client";
import { UserCheck, Clock, User, AlertCircle, CheckCircle } from "lucide-react";

interface Lead {
  id: string;
  name: string;
  email?: string;
  phone: string;
  status: string;
  source: string;
  assigned_agent_id?: string;
  created_at: string;
  ai_score?: number;
}

interface LeadAssignmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  leads: Lead[];
  onAssignmentComplete: () => void;
}

export function LeadAssignmentModal({ 
  open, 
  onOpenChange, 
  leads, 
  onAssignmentComplete 
}: LeadAssignmentModalProps) {
  const [selectedAgent, setSelectedAgent] = useState<string>("");
  const [assignmentNotes, setAssignmentNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { agents, assignLeadToAgent } = useAgents();
  const { toast } = useToast();

  const activeAgents = agents.filter(agent => agent.status === 'active');
  const selectedLeadsCount = leads.length;

  const handleAssign = async () => {
    if (!selectedAgent) {
      toast({
        title: "Error",
        description: "Please select an agent to assign leads to",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // Assign all selected leads to the chosen agent
      const assignmentPromises = leads.map(lead => 
        assignLeadToAgent(lead.id, selectedAgent, assignmentNotes)
      );

      await Promise.all(assignmentPromises);

      toast({
        title: "Success",
        description: `${selectedLeadsCount} lead(s) assigned successfully`
      });

      onAssignmentComplete();
      onOpenChange(false);
      setSelectedAgent("");
      setAssignmentNotes("");

    } catch (error) {
      console.error('Error assigning leads:', error);
      toast({
        title: "Error",
        description: "Failed to assign leads. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getAgentWorkload = (agentId: string) => {
    const agent = agents.find(a => a.id === agentId);
    return agent?.assigned_leads_count || 0;
  };

  const getWorkloadBadge = (workload: number) => {
    if (workload === 0) return <Badge variant="outline" className="text-green-600">Available</Badge>;
    if (workload < 5) return <Badge variant="outline" className="text-blue-600">Light</Badge>;
    if (workload < 10) return <Badge variant="outline" className="text-yellow-600">Moderate</Badge>;
    return <Badge variant="outline" className="text-red-600">Heavy</Badge>;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserCheck className="w-5 h-5" />
            Assign {selectedLeadsCount} Lead(s) to Agent
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Selected Leads Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium mb-2">Selected Leads ({selectedLeadsCount})</h4>
            <div className="max-h-32 overflow-y-auto space-y-1">
              {leads.map(lead => (
                <div key={lead.id} className="text-sm text-gray-600 flex items-center gap-2">
                  <User className="w-3 h-3" />
                  {lead.name} - {lead.phone}
                  {lead.ai_score && (
                    <Badge variant="outline" className="text-xs">
                      Score: {lead.ai_score}/10
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Agent Selection */}
          <div className="space-y-3">
            <Label htmlFor="agent-select">Select Agent</Label>
            <Select value={selectedAgent} onValueChange={setSelectedAgent}>
              <SelectTrigger>
                <SelectValue placeholder="Choose an agent..." />
              </SelectTrigger>
              <SelectContent>
                {activeAgents.map(agent => (
                  <SelectItem key={agent.id} value={agent.id}>
                    <div className="flex items-center justify-between w-full">
                      <span>{agent.display_name}</span>
                      <div className="flex items-center gap-2 ml-4">
                        {getWorkloadBadge(getAgentWorkload(agent.id))}
                        <span className="text-xs text-gray-500">
                          ({getAgentWorkload(agent.id)} leads)
                        </span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Agent Workload Overview */}
          {activeAgents.length > 0 && (
            <div className="space-y-3">
              <Label>Agent Workload Overview</Label>
              <div className="bg-gray-50 rounded-lg p-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Agent</TableHead>
                      <TableHead>Current Leads</TableHead>
                      <TableHead>Workload</TableHead>
                      <TableHead>Specialization</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeAgents.map(agent => (
                      <TableRow key={agent.id}>
                        <TableCell className="font-medium">{agent.display_name}</TableCell>
                        <TableCell>{getAgentWorkload(agent.id)}</TableCell>
                        <TableCell>{getWorkloadBadge(getAgentWorkload(agent.id))}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {agent.specialization?.slice(0, 2).map(spec => (
                              <Badge key={spec} variant="outline" className="text-xs">
                                {spec}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          {/* Assignment Notes */}
          <div className="space-y-3">
            <Label htmlFor="notes">Assignment Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any notes about this assignment..."
              value={assignmentNotes}
              onChange={(e) => setAssignmentNotes(e.target.value)}
              rows={3}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleAssign} 
              disabled={!selectedAgent || isLoading}
              className="flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Clock className="w-4 h-4 animate-spin" />
                  Assigning...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Assign Leads
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}