import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Search, UserCheck, Filter, RotateCcw, Calendar as CalendarIcon, Info } from "lucide-react";
import { LeadAssignmentModal } from "./LeadAssignmentModal";
import { format } from "date-fns";
import { Link } from "react-router-dom";

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
  const [dateFilter, setDateFilter] = useState<"all" | "today" | "last_7_days" | "last_30_days" | "custom">("all");
  const [customDateRange, setCustomDateRange] = useState<{from: Date | undefined, to: Date | undefined}>({from: undefined, to: undefined});
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { userRole } = useAuth();
  const { toast } = useToast();

  // Fetch unassigned leads from database
  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .is('assigned_agent_id', null)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setLeads(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filterByDate = (lead: Lead) => {
    if (dateFilter === 'all') return true;
    
    const leadDate = new Date(lead.created_at);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    
    if (dateFilter === 'custom') {
      if (!customDateRange.from) return true;
      const from = new Date(customDateRange.from);
      from.setHours(0, 0, 0, 0);
      
      if (!customDateRange.to) {
        return leadDate >= from;
      }
      
      const to = new Date(customDateRange.to);
      to.setHours(23, 59, 59, 999);
      return leadDate >= from && leadDate <= to;
    }
    
    switch (dateFilter) {
      case 'today':
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return leadDate >= today;
      case 'last_7_days':
        const sevenDaysAgo = new Date(now);
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        return leadDate >= sevenDaysAgo;
      case 'last_30_days':
        const thirtyDaysAgo = new Date(now);
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return leadDate >= thirtyDaysAgo;
      default:
        return true;
    }
  };

  const unassignedLeads = leads.filter(lead => !lead.assigned_agent_id);
  const filteredLeads = unassignedLeads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.phone.includes(searchTerm) ||
                         (lead.email && lead.email.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    const matchesDate = filterByDate(lead);
    
    return matchesSearch && matchesStatus && matchesDate;
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
    // Refresh leads data from database
    fetchLeads();
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

      {/* Navigation Alert */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>View Assigned Leads</AlertTitle>
        <AlertDescription>
          After assigning leads, view them in{" "}
          <Link to="/crm" className="font-medium underline underline-offset-4 hover:text-primary">
            CRM Contacts
          </Link>
          {" "}using the Assignment Status filter to see which agent is handling each lead.
        </AlertDescription>
      </Alert>

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
          <div className="space-y-4">
            {/* Search */}
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <div className="relative flex-1">
                <Input
                  placeholder="Search by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Date Filter */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Date Range</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant={dateFilter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDateFilter("all")}
                >
                  All Time
                </Button>
                <Button 
                  variant={dateFilter === "today" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDateFilter("today")}
                >
                  Today
                </Button>
                <Button 
                  variant={dateFilter === "last_7_days" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDateFilter("last_7_days")}
                >
                  Last 7 Days
                </Button>
                <Button 
                  variant={dateFilter === "last_30_days" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDateFilter("last_30_days")}
                >
                  Last 30 Days
                </Button>
                <Popover modal={true}>
                  <PopoverTrigger asChild>
                    <Button 
                      variant={dateFilter === "custom" ? "default" : "outline"}
                      size="sm"
                      className="gap-2"
                    >
                      <CalendarIcon className="w-4 h-4" />
                      {dateFilter === "custom" && customDateRange.from ? (
                        customDateRange.to ? (
                          <>
                            {format(customDateRange.from, "MMM d")} - {format(customDateRange.to, "MMM d")}
                          </>
                        ) : (
                          format(customDateRange.from, "MMM d, yyyy")
                        )
                      ) : (
                        "Custom Range"
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 z-[100] bg-background" align="end" side="top" sideOffset={8}>
                    <Calendar
                      mode="range"
                      selected={customDateRange.from ? { from: customDateRange.from, to: customDateRange.to } : undefined}
                      onSelect={(range) => {
                        setCustomDateRange({ from: range?.from, to: range?.to });
                        if (range?.from) {
                          setDateFilter("custom");
                        }
                      }}
                      initialFocus
                      numberOfMonths={2}
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Status Filter */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Status</span>
              </div>
              <div className="flex flex-wrap gap-2">
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
                <Button
                  variant={statusFilter === "Qualified" ? "default" : "outline"}
                  onClick={() => setStatusFilter("Qualified")}
                  size="sm"
                >
                  Qualified
                </Button>
              </div>
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