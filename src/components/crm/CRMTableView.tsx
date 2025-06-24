
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  Search, 
  Filter,
  Eye, 
  User, 
  Archive,
  MessageSquare,
  Tag,
  Send
} from "lucide-react";

interface TableLead {
  id: string;
  name: string;
  source: string;
  tags: string[];
  score: number;
  assignedAgent: string;
  lastActivity: string;
  status: string;
}

const mockTableLeads: TableLead[] = [
  {
    id: "1",
    name: "Ahmed Hassan",
    source: "WhatsApp",
    tags: ["Hot", "Dubai"],
    score: 85,
    assignedAgent: "Sarah",
    lastActivity: "2 hours ago",
    status: "New"
  },
  {
    id: "2",
    name: "Fatima Al Zahra",
    source: "Facebook",
    tags: ["Premium", "Abu Dhabi"],
    score: 72,
    assignedAgent: "Omar",
    lastActivity: "5 hours ago",
    status: "Contacted"
  },
  {
    id: "3",
    name: "Mohammed Ali",
    source: "Instagram",
    tags: ["Priority", "Sharjah"],
    score: 90,
    assignedAgent: "Sarah",
    lastActivity: "1 hour ago",
    status: "Hot"
  },
  {
    id: "4",
    name: "Aisha Khan",
    source: "WhatsApp",
    tags: ["Follow-up"],
    score: 78,
    assignedAgent: "Omar",
    lastActivity: "3 hours ago",
    status: "Follow-Up"
  },
  {
    id: "5",
    name: "Hassan Al Maktoum",
    source: "Facebook",
    tags: ["VIP", "Closed"],
    score: 95,
    assignedAgent: "Sarah",
    lastActivity: "Yesterday",
    status: "Won"
  }
];

export function CRMTableView() {
  const [leads, setLeads] = useState(mockTableLeads);
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [agentFilter, setAgentFilter] = useState("all");

  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800 border-green-200";
    if (score >= 60) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-red-100 text-red-800 border-red-200";
  };

  const getStatusColor = (status: string) => {
    const colors = {
      "New": "bg-gray-100 text-gray-800",
      "Contacted": "bg-blue-100 text-blue-800",
      "Hot": "bg-orange-100 text-orange-800",
      "Follow-Up": "bg-yellow-100 text-yellow-800",
      "Won": "bg-green-100 text-green-800"
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedLeads(leads.map(lead => lead.id));
    } else {
      setSelectedLeads([]);
    }
  };

  const handleSelectLead = (leadId: string, checked: boolean) => {
    if (checked) {
      setSelectedLeads([...selectedLeads, leadId]);
    } else {
      setSelectedLeads(selectedLeads.filter(id => id !== leadId));
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSource = sourceFilter === "all" || lead.source === sourceFilter;
    const matchesAgent = agentFilter === "all" || lead.assignedAgent === agentFilter;
    
    return matchesSearch && matchesSource && matchesAgent;
  });

  return (
    <div className="h-full bg-gray-50 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Lead Table View</h2>
        <p className="text-gray-600">Manage all your leads in a comprehensive table format</p>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-64">
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
            
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                <SelectItem value="Facebook">Facebook</SelectItem>
                <SelectItem value="Instagram">Instagram</SelectItem>
              </SelectContent>
            </Select>

            <Select value={agentFilter} onValueChange={setAgentFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Agent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Agents</SelectItem>
                <SelectItem value="Sarah">Sarah</SelectItem>
                <SelectItem value="Omar">Omar</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedLeads.length > 0 && (
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {selectedLeads.length} lead(s) selected
              </span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  Assign Agent
                </Button>
                <Button variant="outline" size="sm">
                  <Tag className="w-4 h-4 mr-2" />
                  Add Tags
                </Button>
                <Button variant="outline" size="sm">
                  <Send className="w-4 h-4 mr-2" />
                  Send WhatsApp
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-200">
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedLeads.length === filteredLeads.length && filteredLeads.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Assigned Agent</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map((lead) => (
                <TableRow key={lead.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <TableCell>
                    <Checkbox
                      checked={selectedLeads.includes(lead.id)}
                      onCheckedChange={(checked) => handleSelectLead(lead.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">
                          {lead.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-gray-900">{lead.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {lead.source}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {lead.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`text-xs ${getScoreColor(lead.score)}`}>
                      {lead.score}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600">{lead.assignedAgent}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-500">{lead.lastActivity}</span>
                  </TableCell>
                  <TableCell>
                    <Badge className={`text-xs ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button variant="outline" size="sm">
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <User className="w-3 h-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Archive className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
