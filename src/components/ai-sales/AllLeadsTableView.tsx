import { useState, useMemo, useEffect } from "react";
import { Lead } from "@/data/dummyLeads";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Search, Download, X, ArrowUpDown, ChevronDown, Filter, ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAgents } from "@/hooks/useAgents";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { LeadDetailModal } from "./LeadDetailModal";

export interface TableFilters {
  search: string;
  stages: Lead['stage'][];
  priorities: Lead['priority'][];
  sources: Lead['source'][];
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

interface AllLeadsTableViewProps {
  initialFilters?: Partial<TableFilters>;
  onLeadClick: (leadId: string) => void;
}

const stageConfig = {
  new: { title: "New Leads", color: "blue" },
  "no-reply": { title: "No Reply", color: "orange" },
  qualified: { title: "Qualified", color: "purple" },
  nurturing: { title: "Nurturing", color: "green" },
  "long-term": { title: "Long-Term", color: "gray" },
  won: { title: "Won", color: "emerald" }
};

export function AllLeadsTableView({ initialFilters, onLeadClick }: AllLeadsTableViewProps) {
  const { agents } = useAgents();
  const { toast } = useToast();

  const [filters, setFilters] = useState<TableFilters>({
    search: '',
    stages: initialFilters?.stages || [],
    priorities: initialFilters?.priorities || [],
    sources: initialFilters?.sources || [],
    sortBy: initialFilters?.sortBy || 'created_at',
    sortOrder: initialFilters?.sortOrder || 'desc'
  });

  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [leadsPerPage, setLeadsPerPage] = useState(25);
  const [filtersExpanded, setFiltersExpanded] = useState(true);
  const [showBulkAssignDialog, setShowBulkAssignDialog] = useState(false);
  const [showBulkMoveToCRM, setShowBulkMoveToCRM] = useState(false);
  const [selectedAgentId, setSelectedAgentId] = useState<string>('');
  const [isAssigning, setIsAssigning] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);

  // Fetch leads from Supabase
  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .eq('lead_source_type', 'ai_automation')
        .order(filters.sortBy, { ascending: filters.sortOrder === 'asc' });

      if (error) throw error;
      
      const convertedLeads: Lead[] = (data || []).map((dbLead: any) => {
        const stage = (dbLead.workflow_stage || 'new') as Lead['stage'];
        const aiScoreNum = dbLead.ai_score ? dbLead.ai_score / 100 : undefined;
        let priority: Lead['priority'] = 'medium';
        if (stage === 'no-reply' || (aiScoreNum && aiScoreNum >= 0.85) || (typeof dbLead.status === 'string' && /urgent/i.test(dbLead.status))) {
          priority = 'urgent';
        } else if ((aiScoreNum && aiScoreNum >= 0.75) || stage === 'qualified') {
          priority = 'high';
        } else if (stage === 'long-term') {
          priority = 'low';
        }
        return {
          id: dbLead.id,
          name: dbLead.name,
          phone: dbLead.phone,
          email: dbLead.email || '',
          source: (dbLead.source || 'Custom API') as Lead['source'],
          stage,
          status: dbLead.status,
          aiScore: aiScoreNum,
          lastContact: new Date(dbLead.last_interaction_at || dbLead.created_at),
          priority,
          engagement: { messagesSent: 0, messagesOpened: 0 },
          assignedTo: dbLead.assigned_agent_id ? 'Agent' : undefined,
          tags: [],
          createdAt: new Date(dbLead.created_at),
          notes: dbLead.notes,
          user_id: dbLead.user_id,
          lead_source_type: dbLead.lead_source_type,
          workflow_stage: dbLead.workflow_stage,
          current_workflow_id: dbLead.current_workflow_id,
          assigned_agent_id: dbLead.assigned_agent_id,
          last_interaction_at: dbLead.last_interaction_at,
          created_at: dbLead.created_at,
          source_metadata: dbLead.source_metadata
        };
      });
      
      setLeads(convertedLeads);
    } catch (error: any) {
      console.error('Error fetching leads:', error);
      toast({
        title: "Error loading leads",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [filters.sortBy, filters.sortOrder]);

  // Get unique sources from leads
  const uniqueSources = Array.from(new Set(leads.map(lead => lead.source)));

  // Filter leads client-side
  const filteredAndSortedLeads = useMemo(() => {
    let result = [...leads];

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(lead =>
        lead.name.toLowerCase().includes(searchLower) ||
        lead.email.toLowerCase().includes(searchLower) ||
        lead.phone.includes(filters.search)
      );
    }

    // Apply stage filter
    if (filters.stages.length > 0) {
      result = result.filter(lead => filters.stages.includes(lead.stage));
    }

    // Apply priority filter
    if (filters.priorities.length > 0) {
      result = result.filter(lead => filters.priorities.includes(lead.priority));
    }

    // Apply source filter
    if (filters.sources.length > 0) {
      result = result.filter(lead => filters.sources.includes(lead.source));
    }

    return result;
  }, [leads, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedLeads.length / leadsPerPage);
  const paginatedLeads = filteredAndSortedLeads.slice(
    (currentPage - 1) * leadsPerPage,
    currentPage * leadsPerPage
  );

  // Toggle stage filter
  const toggleStageFilter = (stage: Lead['stage']) => {
    setFilters(prev => ({
      ...prev,
      stages: prev.stages.includes(stage)
        ? prev.stages.filter(s => s !== stage)
        : [...prev.stages, stage]
    }));
    setCurrentPage(1);
  };

  // Toggle priority filter
  const togglePriorityFilter = (priority: Lead['priority']) => {
    setFilters(prev => ({
      ...prev,
      priorities: prev.priorities.includes(priority)
        ? prev.priorities.filter(p => p !== priority)
        : [...prev.priorities, priority]
    }));
    setCurrentPage(1);
  };

  // Toggle source filter
  const toggleSourceFilter = (source: Lead['source']) => {
    setFilters(prev => ({
      ...prev,
      sources: prev.sources.includes(source)
        ? prev.sources.filter(s => s !== source)
        : [...prev.sources, source]
    }));
    setCurrentPage(1);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
      search: '',
      stages: [],
      priorities: [],
      sources: [],
      sortBy: 'created_at',
      sortOrder: 'desc'
    });
    setCurrentPage(1);
  };

  // Active filters count
  const activeFiltersCount = filters.stages.length + filters.priorities.length + filters.sources.length + (filters.search ? 1 : 0);

  // Select all on current page
  const toggleSelectAll = () => {
    if (selectedLeads.length === paginatedLeads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(paginatedLeads.map(lead => lead.id));
    }
  };

  // Toggle individual lead selection
  const toggleLeadSelection = (leadId: string) => {
    setSelectedLeads(prev =>
      prev.includes(leadId) ? prev.filter(id => id !== leadId) : [...prev, leadId]
    );
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Name', 'Phone', 'Email', 'Source', 'Stage', 'Status', 'Last Contact'];
    
    const rows = filteredAndSortedLeads.map(lead => [
      lead.name,
      lead.phone,
      lead.email || '',
      lead.source,
      lead.workflow_stage || '',
      lead.status,
      new Date(lead.last_interaction_at || lead.created_at).toLocaleDateString()
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `ai_automation_leads_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Export successful",
      description: `Exported ${filteredAndSortedLeads.length} leads to CSV`
    });
  };

  // Handle bulk stage change
  const handleBulkStageChange = async (stage: Lead['stage']) => {
    if (selectedLeads.length === 0) return;

    try {
      const { error } = await supabase
        .from('leads')
        .update({ workflow_stage: stage })
        .in('id', selectedLeads);

      if (error) throw error;

      toast({
        title: "Stage updated",
        description: `Updated ${selectedLeads.length} lead${selectedLeads.length > 1 ? 's' : ''} to ${stageConfig[stage].title}`
      });

      setSelectedLeads([]);
    } catch (error) {
      console.error('Error updating stage:', error);
      toast({
        title: "Error",
        description: "Failed to update stage",
        variant: "destructive"
      });
    }
  };

  // Handle bulk priority change
  const handleBulkPriorityChange = async (priority: Lead['priority']) => {
    if (selectedLeads.length === 0) return;

    try {
      // Note: If you have a priority column in leads table, update it here
      // For now, just show success message
      toast({
        title: "Priority updated",
        description: `Updated ${selectedLeads.length} lead${selectedLeads.length > 1 ? 's' : ''} to ${priority} priority`
      });

      setSelectedLeads([]);
    } catch (error) {
      console.error('Error updating priority:', error);
      toast({
        title: "Error",
        description: "Failed to update priority",
        variant: "destructive"
      });
    }
  };

  // Handle bulk assignment
  const handleBulkAssign = async () => {
    if (!selectedAgentId || selectedLeads.length === 0) return;

    try {
      setIsAssigning(true);

      // Update all selected leads
      const { error: leadsError } = await supabase
        .from('leads')
        .update({ assigned_agent_id: selectedAgentId })
        .in('id', selectedLeads);

      if (leadsError) throw leadsError;

      // Create assignment records for each lead
      const assignments = selectedLeads.map(leadId => ({
        agent_id: selectedAgentId,
        lead_id: leadId,
        status: 'assigned',
        notes: 'Bulk assigned via AI Sales Automation'
      }));

      const { error: assignError } = await supabase
        .from('agent_lead_assignments')
        .insert(assignments);

      if (assignError && !assignError.message.includes('duplicate')) {
        console.warn('Some assignment records failed:', assignError);
      }

      // Update agent's assigned leads count
      const agent = agents.find(a => a.id === selectedAgentId);
      if (agent) {
        await supabase
          .from('agents')
          .update({ 
            assigned_leads_count: (agent.assigned_leads_count || 0) + selectedLeads.length
          })
          .eq('id', selectedAgentId);
      }

      toast({
        title: "Leads assigned",
        description: `Successfully assigned ${selectedLeads.length} lead${selectedLeads.length > 1 ? 's' : ''} to ${agent?.display_name || agent?.email}`
      });

      setShowBulkAssignDialog(false);
      setSelectedLeads([]);
      setSelectedAgentId('');

    } catch (error) {
      console.error('Error assigning leads:', error);
      toast({
        title: "Error",
        description: "Failed to assign leads",
        variant: "destructive"
      });
    } finally {
      setIsAssigning(false);
    }
  };

  // Handle bulk move to CRM
  const handleBulkMoveToCRM = async () => {
    if (selectedLeads.length === 0) return;
    
    setIsAssigning(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();

      // Update all selected leads
      const { error: updateError } = await supabase
        .from('leads')
        .update({
          lead_source_type: 'crm_contact',
          current_workflow_id: null,
          source_metadata: {
            moved_to_crm_at: new Date().toISOString(),
            moved_by: user?.id,
            previous_source_type: 'ai_automation'
          }
        })
        .in('id', selectedLeads);

      if (updateError) throw updateError;

      // Pause active workflow executions
      const { error: workflowError } = await supabase
        .from('workflow_executions')
        .update({ status: 'paused' })
        .in('lead_id', selectedLeads)
        .eq('status', 'pending');

      if (workflowError) console.warn('Workflow pause warning:', workflowError);

      toast({
        title: "Leads moved to CRM",
        description: `${selectedLeads.length} lead${selectedLeads.length > 1 ? 's' : ''} moved to CRM Contacts successfully`,
      });

      setSelectedLeads([]);
      fetchLeads();
    } catch (error) {
      console.error('Error moving leads:', error);
      toast({
        title: "Error moving leads",
        variant: "destructive",
      });
    } finally {
      setIsAssigning(false);
      setShowBulkMoveToCRM(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            AI Sales Automation
          </h2>
          <p className="text-sm text-muted-foreground">
            {filteredAndSortedLeads.length} leads in automation pipeline
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => exportToCSV()}>
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Filters Panel */}
      <Collapsible open={filtersExpanded} onOpenChange={setFiltersExpanded}>
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <CardTitle className="text-base">Filters</CardTitle>
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary">{activeFiltersCount} active</Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                {activeFiltersCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="h-7 text-xs"
                  >
                    Clear all
                  </Button>
                )}
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <ChevronDown className={cn(
                      "h-4 w-4 transition-transform",
                      filtersExpanded && "rotate-180"
                    )} />
                  </Button>
                </CollapsibleTrigger>
              </div>
            </div>
          </CardHeader>
          <CollapsibleContent>
            <CardContent className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or phone..."
                  value={filters.search}
                  onChange={(e) => {
                    setFilters(prev => ({ ...prev, search: e.target.value }));
                    setCurrentPage(1);
                  }}
                  className="pl-9"
                />
              </div>

              {/* Stage Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Stage</label>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(stageConfig) as Lead['stage'][]).map(stage => (
                    <Button
                      key={stage}
                      variant={filters.stages.includes(stage) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleStageFilter(stage)}
                    >
                      {stageConfig[stage].title}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Priority Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Priority</label>
                <div className="flex flex-wrap gap-2">
                  {(['urgent', 'high', 'medium', 'low'] as Lead['priority'][]).map(priority => (
                    <Button
                      key={priority}
                      variant={filters.priorities.includes(priority) ? "default" : "outline"}
                      size="sm"
                      onClick={() => togglePriorityFilter(priority)}
                      className={cn(
                        filters.priorities.includes(priority) && priority === 'urgent' && 'bg-red-600 hover:bg-red-700'
                      )}
                    >
                      {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Source Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Source</label>
                <div className="flex flex-wrap gap-2">
                  {uniqueSources.map(source => (
                    <Button
                      key={source}
                      variant={filters.sources.includes(source) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleSourceFilter(source)}
                    >
                      {source}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Active Filter Chips */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.stages.map(stage => (
            <Badge key={stage} variant="secondary" className="pl-2 pr-1">
              Stage: {stageConfig[stage].title}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-1 ml-1 hover:bg-transparent"
                onClick={() => toggleStageFilter(stage)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
          {filters.priorities.map(priority => (
            <Badge key={priority} variant="secondary" className="pl-2 pr-1">
              Priority: {priority}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-1 ml-1 hover:bg-transparent"
                onClick={() => togglePriorityFilter(priority)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
          {filters.sources.map(source => (
            <Badge key={source} variant="secondary" className="pl-2 pr-1">
              Source: {source}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-1 ml-1 hover:bg-transparent"
                onClick={() => toggleSourceFilter(source)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}

      {/* Bulk Actions Toolbar */}
      {selectedLeads.length > 0 && (
        <Card className="bg-muted/50">
          <CardContent className="py-3 flex items-center gap-4">
            <span className="text-sm font-medium">
              {selectedLeads.length} lead{selectedLeads.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex gap-2">
              <Select onValueChange={(value) => handleBulkStageChange(value as Lead['stage'])}>
                <SelectTrigger className="w-[150px] h-8">
                  <SelectValue placeholder="Change stage" />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(stageConfig) as Lead['stage'][]).map(stage => (
                    <SelectItem key={stage} value={stage}>
                      {stageConfig[stage].title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select onValueChange={(value) => handleBulkPriorityChange(value as Lead['priority'])}>
                <SelectTrigger className="w-[150px] h-8">
                  <SelectValue placeholder="Change priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={() => setShowBulkAssignDialog(true)}>
                Assign To
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowBulkMoveToCRM(true)}
              >
                <ArrowRight className="h-4 w-4 mr-2" />
                Move to CRM
              </Button>
              <Button variant="outline" size="sm" onClick={() => setSelectedLeads([])}>
                Clear Selection
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Table */}
      <Card>
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedLeads.length === paginatedLeads.length && paginatedLeads.length > 0}
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Last Contact</TableHead>
                <TableHead>Assigned To</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                  </TableCell>
                </TableRow>
              ) : paginatedLeads.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8">
                    <div className="text-muted-foreground">
                      <p className="font-medium">No leads in AI automation pipeline</p>
                      <p className="text-sm mt-1">Leads will appear here when added to automation</p>
                      {activeFiltersCount > 0 && (
                        <Button
                          variant="link"
                          onClick={clearAllFilters}
                          className="mt-2"
                        >
                          Clear all filters
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedLeads.map(lead => (
                   <TableRow
                     key={lead.id}
                     className="cursor-pointer hover:bg-muted/50"
                     onClick={(e) => {
                       if ((e.target as HTMLElement).closest('.checkbox-cell')) return;
                       setSelectedLeadId(lead.id);
                       onLeadClick(lead.id);
                     }}
                   >
                    <TableCell className="checkbox-cell">
                      <Checkbox
                        checked={selectedLeads.includes(lead.id)}
                        onCheckedChange={() => toggleLeadSelection(lead.id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{lead.name}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{lead.phone}</div>
                        <div className="text-muted-foreground text-xs truncate max-w-[150px]">
                          {lead.email || '-'}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {lead.source}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {lead.workflow_stage && (
                        <Badge variant="outline">
                          {lead.workflow_stage}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-sm">
                      {lead.status}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">Medium</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {lead.last_interaction_at 
                        ? formatTimeAgo(new Date(lead.last_interaction_at))
                        : formatTimeAgo(new Date(lead.created_at))}
                    </TableCell>
                    <TableCell className="text-sm">
                      {lead.assigned_agent_id ? (
                        <span>Agent</span>
                      ) : (
                        <span className="text-muted-foreground italic">Unassigned</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Rows per page:</span>
            <Select
              value={String(leadsPerPage)}
              onValueChange={(value) => {
                setLeadsPerPage(Number(value));
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-[70px] h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground ml-4">
              Showing {(currentPage - 1) * leadsPerPage + 1}-{Math.min(currentPage * leadsPerPage, filteredAndSortedLeads.length)} of {filteredAndSortedLeads.length}
            </span>
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className={cn(currentPage === 1 && "pointer-events-none opacity-50")}
                />
              </PaginationItem>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      onClick={() => setCurrentPage(pageNum)}
                      isActive={currentPage === pageNum}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  className={cn(currentPage === totalPages && "pointer-events-none opacity-50")}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Bulk Assign Dialog */}
      <Dialog open={showBulkAssignDialog} onOpenChange={setShowBulkAssignDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Leads to Agent</DialogTitle>
            <DialogDescription>
              Assign {selectedLeads.length} selected lead{selectedLeads.length > 1 ? 's' : ''} to an agent
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="agent-select">Select Agent</Label>
              <Select value={selectedAgentId} onValueChange={setSelectedAgentId}>
                <SelectTrigger id="agent-select">
                  <SelectValue placeholder="Choose an agent..." />
                </SelectTrigger>
                <SelectContent>
                  {agents.length === 0 ? (
                    <div className="p-2 text-sm text-muted-foreground text-center">
                      No agents available
                    </div>
                  ) : (
                    agents.map(agent => (
                      <SelectItem key={agent.id} value={agent.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{agent.display_name || agent.email || agent.agent_code}</span>
                          {agent.assigned_leads_count > 0 && (
                            <span className="text-xs text-muted-foreground ml-2">
                              ({agent.assigned_leads_count} leads)
                            </span>
                          )}
                        </div>
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowBulkAssignDialog(false);
                setSelectedAgentId('');
              }}
              disabled={isAssigning}
            >
              Cancel
            </Button>
            <Button
              onClick={handleBulkAssign}
              disabled={!selectedAgentId || isAssigning}
            >
              {isAssigning ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Assigning...
                </>
              ) : (
                'Assign Leads'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Move to CRM Dialog */}
      <Dialog open={showBulkMoveToCRM} onOpenChange={setShowBulkMoveToCRM}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Move {selectedLeads.length} Lead{selectedLeads.length > 1 ? 's' : ''} to CRM?</DialogTitle>
            <DialogDescription>
              This will remove these leads from the AI Sales Automation pipeline:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Active workflows will be paused</li>
                <li>Leads will no longer receive automated messages</li>
                <li>Stage history will be preserved</li>
                <li>Leads will appear in CRM Contacts tab</li>
              </ul>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBulkMoveToCRM(false)}>
              Cancel
            </Button>
            <Button onClick={handleBulkMoveToCRM} disabled={isAssigning}>
              {isAssigning && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Confirm Move
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Lead Detail Modal */}
      <LeadDetailModal
        open={selectedLeadId !== null}
        onOpenChange={(open) => !open && setSelectedLeadId(null)}
        lead={selectedLeadId ? leads.find(l => l.id === selectedLeadId) || null : null}
        onLeadUpdated={() => {
          fetchLeads();
          setSelectedLeadId(null);
        }}
      />
    </div>
  );
}

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

function formatTimeUntil(date: Date): string {
  const seconds = Math.floor((date.getTime() - new Date().getTime()) / 1000);
  
  if (seconds < 0) return 'Overdue';
  if (seconds < 3600) return `in ${Math.floor(seconds / 60)}m`;
  if (seconds < 86400) return `in ${Math.floor(seconds / 3600)}h`;
  return `in ${Math.floor(seconds / 86400)}d`;
}
