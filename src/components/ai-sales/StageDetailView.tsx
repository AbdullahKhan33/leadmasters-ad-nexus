import { useState } from "react";
import { Lead } from "@/data/dummyLeads";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
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
import { Search, ArrowUpDown, Download } from "lucide-react";
import { cn } from "@/lib/utils";

const stageConfig = {
  new: { title: "New Leads", color: "blue" },
  "no-reply": { title: "No Reply", color: "orange" },
  qualified: { title: "Qualified", color: "purple" },
  nurturing: { title: "Nurturing", color: "green" },
  "long-term": { title: "Long-Term", color: "gray" },
  won: { title: "Won", color: "emerald" }
};

interface StageDetailViewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stage: Lead['stage'] | null;
  leads: Lead[];
  onLeadClick: (leadId: string) => void;
}

export function StageDetailView({ 
  open, 
  onOpenChange, 
  stage, 
  leads,
  onLeadClick 
}: StageDetailViewProps) {
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("date");
  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 25;

  if (!stage) return null;

  const config = stageConfig[stage];

  // Filter leads
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(search.toLowerCase()) ||
                         lead.email.toLowerCase().includes(search.toLowerCase()) ||
                         lead.phone.includes(search);
    const matchesPriority = priorityFilter === "all" || lead.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  // Sort leads
  const sortedLeads = [...filteredLeads].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return b.createdAt.getTime() - a.createdAt.getTime();
      case 'score':
        return (b.aiScore || 0) - (a.aiScore || 0);
      case 'priority':
        const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      default:
        return 0;
    }
  });

  // Paginate
  const totalPages = Math.ceil(sortedLeads.length / leadsPerPage);
  const paginatedLeads = sortedLeads.slice(
    (currentPage - 1) * leadsPerPage,
    currentPage * leadsPerPage
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-4xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <div className={cn("h-3 w-3 rounded-full", `bg-${config.color}-500`)} />
            {config.title}
          </SheetTitle>
          <SheetDescription>
            Viewing {filteredLeads.length} of {leads.length} leads
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date Added</SelectItem>
                <SelectItem value="score">AI Score</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>

          {/* Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Last Contact</TableHead>
                  <TableHead>Assigned</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedLeads.map(lead => (
                  <TableRow
                    key={lead.id}
                    className="cursor-pointer"
                    onClick={() => onLeadClick(lead.id)}
                  >
                    <TableCell>
                      <div>
                        <div className="font-medium">{lead.name}</div>
                        <div className="flex items-center gap-1 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {lead.source}
                          </Badge>
                          {lead.aiScore && lead.aiScore > 0.8 && (
                            <Badge variant="secondary" className="text-xs">
                              AI {Math.round(lead.aiScore * 100)}%
                            </Badge>
                          )}
                        </div>
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
                      <div className="text-sm">{lead.status}</div>
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
                    <TableCell className="text-sm">
                      {lead.assignedTo || (
                        <span className="text-muted-foreground italic">Unassigned</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => p - 1)}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => p + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}
