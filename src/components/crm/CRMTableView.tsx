
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Search, 
  Filter,
  Eye, 
  User, 
  Archive,
  MessageSquare,
  Tag,
  Send,
  Plus,
  Upload,
  Database
} from "lucide-react";

interface TableLead {
  id: string;
  name: string;
  phone?: string;
  email?: string;
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
    phone: "+971501234567",
    email: "ahmed@example.com",
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
    phone: "+971507654321",
    email: "fatima@example.com",
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
    phone: "+971509876543",
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
    phone: "+971501111222",
    email: "aisha@example.com",
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
    phone: "+971502223333",
    email: "hassan@example.com",
    source: "Facebook",
    tags: ["VIP", "Closed"],
    score: 95,
    assignedAgent: "Sarah",
    lastActivity: "Yesterday",
    status: "Won"
  }
];

const mockAgents = ["Sarah", "Omar", "Ahmed"];

export function CRMTableView() {
  const [leads, setLeads] = useState(mockTableLeads);
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [agentFilter, setAgentFilter] = useState("all");
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importSource, setImportSource] = useState<'apollo' | 'hubspot'>('apollo');

  // Add Lead Form
  const [newLead, setNewLead] = useState({
    name: '',
    phone: '',
    email: '',
    tags: '',
    source: 'WhatsApp',
    assignedAgent: ''
  });

  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800 border-green-200 hover:bg-green-200 hover:border-green-300";
    if (score >= 60) return "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200 hover:border-yellow-300";
    return "bg-red-100 text-red-800 border-red-200 hover:bg-red-200 hover:border-red-300";
  };

  const getStatusColor = (status: string) => {
    const colors = {
      "New": "bg-gray-100 text-gray-800 hover:bg-gray-200",
      "Contacted": "bg-blue-100 text-blue-800 hover:bg-blue-200",
      "Hot": "bg-orange-100 text-orange-800 hover:bg-orange-200",
      "Follow-Up": "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
      "Won": "bg-green-100 text-green-800 hover:bg-green-200"
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800 hover:bg-gray-200";
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

  const handleAddLead = () => {
    const lead: TableLead = {
      id: (leads.length + 1).toString(),
      name: newLead.name,
      phone: newLead.phone,
      email: newLead.email || undefined,
      source: newLead.source,
      tags: newLead.tags ? newLead.tags.split(',').map(t => t.trim()) : [],
      score: Math.floor(Math.random() * 40) + 60, // Random score between 60-100
      assignedAgent: newLead.assignedAgent,
      lastActivity: "Just added",
      status: "New"
    };

    setLeads([lead, ...leads]);
    setNewLead({ name: '', phone: '', email: '', tags: '', source: 'WhatsApp', assignedAgent: '' });
    setIsAddLeadOpen(false);
  };

  const handleImport = () => {
    console.log(`Importing from ${importSource}`);
    // This would typically open the OAuth flow or import interface
    setIsImportModalOpen(false);
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSource = sourceFilter === "all" || lead.source === sourceFilter;
    const matchesAgent = agentFilter === "all" || lead.assignedAgent === agentFilter;
    
    return matchesSearch && matchesSource && matchesAgent;
  });

  return (
    <div className="h-full bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Lead Table View</h2>
        <p className="text-gray-600">Manage all your leads in a comprehensive table format</p>
      </div>

      {/* Action Buttons */}
      <div className="mb-4 flex gap-3">
        <Dialog open={isAddLeadOpen} onOpenChange={setIsAddLeadOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-200">
              <Plus className="w-4 h-4 mr-2" />
              Add Lead
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Lead</DialogTitle>
              <DialogDescription>
                Enter the lead details to add them to your CRM.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="leadName">Full Name (required)</Label>
                <Input
                  id="leadName"
                  placeholder="John Doe"
                  value={newLead.name}
                  onChange={(e) => setNewLead({...newLead, name: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="leadPhone">Phone/WhatsApp Number (required)</Label>
                <Input
                  id="leadPhone"
                  placeholder="+971 50 123 4567"
                  value={newLead.phone}
                  onChange={(e) => setNewLead({...newLead, phone: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="leadEmail">Email (optional)</Label>
                <Input
                  id="leadEmail"
                  type="email"
                  placeholder="john@example.com"
                  value={newLead.email}
                  onChange={(e) => setNewLead({...newLead, email: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="leadTags">Tags (comma-separated)</Label>
                <Input
                  id="leadTags"
                  placeholder="Hot, Dubai, Premium"
                  value={newLead.tags}
                  onChange={(e) => setNewLead({...newLead, tags: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="leadSource">Source</Label>
                <Select value={newLead.source} onValueChange={(value) => setNewLead({...newLead, source: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                    <SelectItem value="Facebook">Facebook</SelectItem>
                    <SelectItem value="Instagram">Instagram</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="leadAgent">Assign to Agent</Label>
                <Select value={newLead.assignedAgent} onValueChange={(value) => setNewLead({...newLead, assignedAgent: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an agent" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockAgents.map(agent => (
                      <SelectItem key={agent} value={agent}>{agent}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={handleAddLead}
                disabled={!newLead.name || !newLead.phone}
                className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600"
              >
                Add Lead
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={isImportModalOpen} onOpenChange={setIsImportModalOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="hover:bg-gradient-to-r hover:from-blue-50 hover:via-purple-50 hover:to-pink-50 hover:border-purple-200 hover:text-purple-700 transition-all duration-200">
              <Database className="w-4 h-4 mr-2" />
              Import from Apollo
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Import Leads</DialogTitle>
              <DialogDescription>
                Connect your account to import leads from external sources.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="flex gap-2">
                <Button
                  variant={importSource === 'apollo' ? 'default' : 'outline'}
                  onClick={() => setImportSource('apollo')}
                  className="flex-1"
                >
                  <Database className="w-4 h-4 mr-2" />
                  Apollo
                </Button>
                <Button
                  variant={importSource === 'hubspot' ? 'default' : 'outline'}
                  onClick={() => setImportSource('hubspot')}
                  className="flex-1"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  HubSpot
                </Button>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Import Process:</h4>
                <ol className="text-sm text-gray-600 space-y-1">
                  <li>1. Connect your {importSource} account</li>
                  <li>2. Preview available leads</li>
                  <li>3. Select leads to import</li>
                  <li>4. Bulk assign tags and agents</li>
                </ol>
              </div>

              <Button 
                onClick={handleImport}
                className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600"
              >
                Connect {importSource === 'apollo' ? 'Apollo' : 'HubSpot'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Button variant="outline" className="hover:bg-gradient-to-r hover:from-blue-50 hover:via-purple-50 hover:to-pink-50 hover:border-purple-200 hover:text-purple-700 transition-all duration-200">
          <Upload className="w-4 h-4 mr-2" />
          Import from HubSpot
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6 hover:shadow-md transition-shadow duration-200">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search leads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 focus:border-purple-300 focus:ring-purple-200"
                />
              </div>
            </div>
            
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger className="w-40 hover:border-purple-200 focus:border-purple-300">
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
              <SelectTrigger className="w-40 hover:border-purple-200 focus:border-purple-300">
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
        <Card className="mb-4 hover:shadow-md transition-shadow duration-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {selectedLeads.length} lead(s) selected
              </span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="hover:bg-gradient-to-r hover:from-blue-50 hover:via-purple-50 hover:to-pink-50 hover:border-purple-200 hover:text-purple-700 transition-all duration-200">
                  <User className="w-4 h-4 mr-2" />
                  Assign Agent
                </Button>
                <Button variant="outline" size="sm" className="hover:bg-gradient-to-r hover:from-blue-50 hover:via-purple-50 hover:to-pink-50 hover:border-purple-200 hover:text-purple-700 transition-all duration-200">
                  <Tag className="w-4 h-4 mr-2" />
                  Add Tags
                </Button>
                <Button variant="outline" size="sm" className="hover:bg-gradient-to-r hover:from-blue-50 hover:via-purple-50 hover:to-pink-50 hover:border-purple-200 hover:text-purple-700 transition-all duration-200">
                  <Send className="w-4 h-4 mr-2" />
                  Send WhatsApp
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Table */}
      <Card className="hover:shadow-md transition-shadow duration-200">
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
                <TableRow key={lead.id} className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-gray-50 hover:via-blue-50/30 hover:to-purple-50/30 transition-all duration-200">
                  <TableCell>
                    <Checkbox
                      checked={selectedLeads.includes(lead.id)}
                      onCheckedChange={(checked) => handleSelectLead(lead.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 text-purple-700 text-xs">
                          {lead.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <span className="font-medium text-gray-900">{lead.name}</span>
                        {lead.phone && (
                          <div className="text-xs text-gray-500">{lead.phone}</div>
                        )}
                        {lead.email && (
                          <div className="text-xs text-gray-500">{lead.email}</div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs hover:bg-gradient-to-r hover:from-blue-50 hover:via-purple-50 hover:to-pink-50 hover:border-purple-200 hover:text-purple-700 transition-all duration-200 cursor-pointer">
                      {lead.source}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {lead.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs hover:bg-gradient-to-r hover:from-blue-100 hover:via-purple-100 hover:to-pink-100 hover:text-purple-700 transition-all duration-200 cursor-pointer">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`text-xs transition-all duration-200 cursor-pointer ${getScoreColor(lead.score)}`}>
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
                    <Badge className={`text-xs transition-all duration-200 cursor-pointer ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button variant="outline" size="sm" className="hover:bg-gradient-to-r hover:from-blue-50 hover:via-purple-50 hover:to-pink-50 hover:border-purple-200 hover:text-purple-700 transition-all duration-200">
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button variant="outline" size="sm" className="hover:bg-gradient-to-r hover:from-blue-50 hover:via-purple-50 hover:to-pink-50 hover:border-purple-200 hover:text-purple-700 transition-all duration-200">
                        <User className="w-3 h-3" />
                      </Button>
                      <Button variant="outline" size="sm" className="hover:bg-gradient-to-r hover:from-blue-50 hover:via-purple-50 hover:to-pink-50 hover:border-purple-200 hover:text-purple-700 transition-all duration-200">
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
