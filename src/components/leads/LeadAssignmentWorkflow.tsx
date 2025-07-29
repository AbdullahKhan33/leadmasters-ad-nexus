import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Search, UserCheck, Filter, RotateCcw } from "lucide-react";
import { LeadAssignmentModal } from "./LeadAssignmentModal";

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

export function LeadAssignmentWorkflow() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { userRole } = useAuth();
  const { toast } = useToast();

  // Mock data for demonstration
  const mockLeads: Lead[] = [
    {
      id: "1",
      name: "John Smith",
      email: "john@example.com",
      phone: "+1-555-0123",
      status: "New",
      source: "Website",
      created_at: new Date().toISOString(),
      ai_score: 8
    },
    {
      id: "2", 
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "+1-555-0124",
      status: "New",
      source: "Facebook Ad",
      created_at: new Date().toISOString(),
      ai_score: 6
    },
    {
      id: "3",
      name: "Mike Davis",
      phone: "+1-555-0125",
      status: "Contacted",
      source: "Referral",
      assigned_agent_id: "agent-1",
      created_at: new Date().toISOString(),
      ai_score: 9
    }
  ];

  useState(() => {
    setLeads(mockLeads);
    setIsLoading(false);
  });

  const unassignedLeads = leads.filter(lead => !lead.assigned_agent_id);
  const filteredLeads = unassignedLeads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.phone.includes(searchTerm) ||
                         (lead.email && lead.email.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleSelectLead = (leadId: string) => {
    setSelectedLeads(prev => 
      prev.includes(leadId) 
        ? prev.filter(id => id !== leadId)
        : [...prev, leadId]
    );
  };

  const handleSelectAll = () => {
    if (selectedLeads.length === filteredLeads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(filteredLeads.map(lead => lead.id));
    }
  };

  const handleAssignmentComplete = () => {
    // Refresh leads data
    setSelectedLeads([]);
    toast({
      title: "Success",
      description: "Leads assigned successfully"
    });
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      "New": "bg-blue-100 text-blue-800",
      "Contacted": "bg-yellow-100 text-yellow-800", 
      "Qualified": "bg-green-100 text-green-800",
      "Unqualified": "bg-red-100 text-red-800"
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getAIScoreBadge = (score?: number) => {
    if (!score) return null;
    
    let colorClass = "bg-gray-100 text-gray-800";
    if (score >= 8) colorClass = "bg-green-100 text-green-800";
    else if (score >= 6) colorClass = "bg-yellow-100 text-yellow-800";
    else if (score >= 4) colorClass = "bg-orange-100 text-orange-800";
    else colorClass = "bg-red-100 text-red-800";

    return (
      <Badge className={`text-xs ${colorClass}`}>
        AI: {score}/10
      </Badge>
    );
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
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <UserCheck className="w-6 h-6" />
            Lead Assignment
          </h1>
          <p className="text-gray-600">Assign unassigned leads to available agents</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={() => setShowAssignmentModal(true)}
            disabled={selectedLeads.length === 0}
            className="flex items-center gap-2"
          >
            <UserCheck className="w-4 h-4" />
            Assign Selected ({selectedLeads.length})
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Unassigned</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold">{unassignedLeads.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">High Priority (AI 8+)</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold text-green-600">
              {unassignedLeads.filter(l => (l.ai_score || 0) >= 8).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Selected</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold text-blue-600">{selectedLeads.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Today's Leads</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold">
              {unassignedLeads.filter(l => 
                new Date(l.created_at).toDateString() === new Date().toDateString()
              ).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search leads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === "all" ? "default" : "outline"}
                onClick={() => setStatusFilter("all")}
                size="sm"
              >
                All
              </Button>
              <Button
                variant={statusFilter === "New" ? "default" : "outline"}
                onClick={() => setStatusFilter("New")}
                size="sm"
              >
                New
              </Button>
              <Button
                variant={statusFilter === "Contacted" ? "default" : "outline"}
                onClick={() => setStatusFilter("Contacted")}
                size="sm"
              >
                Contacted
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Unassigned Leads ({filteredLeads.length})</CardTitle>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={selectedLeads.length === filteredLeads.length && filteredLeads.length > 0}
                onCheckedChange={handleSelectAll}
              />
              <span className="text-sm text-gray-600">Select All</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="text-gray-500">Loading leads...</div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">Select</TableHead>
                  <TableHead>Lead Info</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>AI Score</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                      No unassigned leads found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLeads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedLeads.includes(lead.id)}
                          onCheckedChange={() => handleSelectLead(lead.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{lead.name}</div>
                          {lead.email && (
                            <div className="text-sm text-gray-500">{lead.email}</div>
                          )}
                          <div className="text-sm text-gray-500">{lead.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`text-xs ${getStatusBadge(lead.status)}`}>
                          {lead.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{lead.source}</TableCell>
                      <TableCell>{getAIScoreBadge(lead.ai_score)}</TableCell>
                      <TableCell>
                        {new Date(lead.created_at).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Assignment Modal */}
      <LeadAssignmentModal
        open={showAssignmentModal}
        onOpenChange={setShowAssignmentModal}
        leads={selectedLeads.map(id => leads.find(l => l.id === id)!).filter(Boolean)}
        onAssignmentComplete={handleAssignmentComplete}
      />
    </div>
  );
}