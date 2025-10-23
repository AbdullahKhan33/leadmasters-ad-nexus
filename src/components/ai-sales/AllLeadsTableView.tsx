import { useState, useMemo } from "react";
import { dummyLeads, Lead } from "@/data/dummyLeads";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { Search, Download, X, ArrowUpDown, ChevronDown, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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
  const [filters, setFilters] = useState<TableFilters>({
    search: '',
    stages: initialFilters?.stages || [],
    priorities: initialFilters?.priorities || [],
    sources: initialFilters?.sources || [],
    sortBy: initialFilters?.sortBy || 'createdAt',
    sortOrder: initialFilters?.sortOrder || 'desc'
  });

  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [leadsPerPage, setLeadsPerPage] = useState(25);
  const [filtersExpanded, setFiltersExpanded] = useState(true);

  // Get unique sources from leads
  const uniqueSources = Array.from(new Set(dummyLeads.map(lead => lead.source)));

  // Filter and sort leads
  const filteredAndSortedLeads = useMemo(() => {
    let result = [...dummyLeads];

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

    // Apply sorting
    result.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (filters.sortBy) {
        case 'createdAt':
          aValue = a.createdAt.getTime();
          bValue = b.createdAt.getTime();
          break;
        case 'aiScore':
          aValue = a.aiScore || 0;
          bValue = b.aiScore || 0;
          break;
        case 'priority':
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
          aValue = priorityOrder[a.priority];
          bValue = priorityOrder[b.priority];
          break;
        case 'lastContact':
          aValue = a.lastContact.getTime();
          bValue = b.lastContact.getTime();
          break;
        default:
          return 0;
      }

      return filters.sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    });

    return result;
  }, [filters]);

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
      sortBy: 'createdAt',
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

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">All Leads</h2>
          <p className="text-sm text-muted-foreground">
            Showing {filteredAndSortedLeads.length} of {dummyLeads.length} leads
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
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
              <Select>
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
              <Select>
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
              <Button variant="outline" size="sm">Assign To</Button>
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
                <TableHead className="cursor-pointer" onClick={() => setFilters(prev => ({ ...prev, sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc' }))}>
                  Name
                  <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                </TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead className="cursor-pointer" onClick={() => setFilters(prev => ({ ...prev, sortBy: 'lastContact', sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc' }))}>
                  Last Contact
                  <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                </TableHead>
                <TableHead>Next Action</TableHead>
                <TableHead>Assigned To</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedLeads.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8">
                    <div className="text-muted-foreground">
                      <p className="font-medium">No leads found</p>
                      <p className="text-sm mt-1">Try adjusting your filters</p>
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
                    className="cursor-pointer"
                    onClick={(e) => {
                      if ((e.target as HTMLElement).closest('.checkbox-cell')) return;
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
                      <div>
                        <div className="font-medium">{lead.name}</div>
                        {lead.aiScore && lead.aiScore > 0.8 && (
                          <Badge variant="secondary" className="text-xs mt-1">
                            AI {Math.round(lead.aiScore * 100)}%
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{lead.phone}</div>
                        <div className="text-muted-foreground text-xs truncate max-w-[150px]">
                          {lead.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {lead.source}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {stageConfig[lead.stage].title}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={lead.priority === 'urgent' ? 'destructive' : 'outline'}
                        className={cn(
                          lead.priority === 'high' && 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
                          lead.priority === 'medium' && 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
                          lead.priority === 'low' && 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                        )}
                      >
                        {lead.priority}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatTimeAgo(lead.lastContact)}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {lead.nextAction ? formatTimeUntil(lead.nextAction) : '-'}
                    </TableCell>
                    <TableCell className="text-sm">
                      {lead.assignedTo || (
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
