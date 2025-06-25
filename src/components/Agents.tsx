
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  UserPlus, 
  Edit, 
  Mail,
  Phone,
  Eye,
  EyeOff,
  Copy,
  Check
} from "lucide-react";

interface Agent {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role: 'Admin' | 'Agent';
  assignedLeads: number;
  status: 'Active' | 'Pending' | 'Inactive';
  loginType: 'email' | 'manual';
  tempUsername?: string;
  tempPassword?: string;
}

const mockAgents: Agent[] = [
  {
    id: "1",
    name: "Sarah Ahmed",
    email: "sarah@company.com",
    role: "Admin",
    assignedLeads: 25,
    status: "Active",
    loginType: "email"
  },
  {
    id: "2",
    name: "Omar Khan",
    email: "omar@company.com",
    role: "Agent",
    assignedLeads: 10,
    status: "Active",
    loginType: "email"
  }
];

export function Agents() {
  const [agents, setAgents] = useState<Agent[]>(mockAgents);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addMethod, setAddMethod] = useState<'email' | 'quick'>('email');
  const [showLoginDetails, setShowLoginDetails] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Agent' as 'Admin' | 'Agent'
  });

  const getStatusColor = (status: string) => {
    const colors = {
      "Active": "bg-green-100 text-green-800 hover:bg-green-200",
      "Pending": "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
      "Inactive": "bg-gray-100 text-gray-800 hover:bg-gray-200"
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800 hover:bg-gray-200";
  };

  const getRoleColor = (role: string) => {
    const colors = {
      "Admin": "bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200",
      "Agent": "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200"
    };
    return colors[role as keyof typeof colors] || "bg-gray-100 text-gray-800 hover:bg-gray-200";
  };

  const handleAddAgent = () => {
    if (addMethod === 'email') {
      // Email invite flow
      const newAgent: Agent = {
        id: (agents.length + 1).toString(),
        name: formData.name || "Pending",
        email: formData.email,
        role: formData.role,
        assignedLeads: 0,
        status: "Pending",
        loginType: "email"
      };
      setAgents([...agents, newAgent]);
      console.log(`Sending invite email to ${formData.email}`);
    } else {
      // Quick add flow
      const tempUsername = formData.name.toLowerCase().replace(/\s+/g, '') + Math.floor(Math.random() * 100);
      const tempPassword = Math.random().toString(36).slice(-8);
      
      const newAgent: Agent = {
        id: (agents.length + 1).toString(),
        name: formData.name,
        phone: formData.phone,
        role: formData.role,
        assignedLeads: 0,
        status: "Active",
        loginType: "manual",
        tempUsername,
        tempPassword
      };
      setAgents([...agents, newAgent]);
      setShowLoginDetails(newAgent.id);
    }

    // Reset form
    setFormData({ name: '', email: '', phone: '', role: 'Agent' });
    setIsAddModalOpen(false);
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const generateLoginDetails = (agentId: string) => {
    const agent = agents.find(a => a.id === agentId);
    if (!agent) return;

    const tempUsername = agent.name.toLowerCase().replace(/\s+/g, '') + Math.floor(Math.random() * 100);
    const tempPassword = Math.random().toString(36).slice(-8);

    const updatedAgents = agents.map(a => 
      a.id === agentId 
        ? { ...a, tempUsername, tempPassword }
        : a
    );
    setAgents(updatedAgents);
    setShowLoginDetails(agentId);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 flex flex-col">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/60 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              Manage Your Agents
            </h1>
            <p className="text-gray-600 text-sm font-medium">Add, assign, and manage your sales agents. Invite them via email or set them up manually.</p>
          </div>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-200">
                <UserPlus className="w-4 h-4 mr-2" />
                Add Agent
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Agent</DialogTitle>
                <DialogDescription>
                  Choose how you'd like to add the agent to your team.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                {/* Method Selection */}
                <div className="flex gap-2">
                  <Button
                    variant={addMethod === 'email' ? 'default' : 'outline'}
                    onClick={() => setAddMethod('email')}
                    className="flex-1"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Invite via Email
                  </Button>
                  <Button
                    variant={addMethod === 'quick' ? 'default' : 'outline'}
                    onClick={() => setAddMethod('quick')}
                    className="flex-1"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Quick Add
                  </Button>
                </div>

                {/* Form Fields */}
                {addMethod === 'email' ? (
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="email">Email (required)</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="agent@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="role">Role</Label>
                      <Select value={formData.role} onValueChange={(value: 'Admin' | 'Agent') => setFormData({...formData, role: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Admin">Admin</SelectItem>
                          <SelectItem value="Agent">Agent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="name">Name (required)</Label>
                      <Input
                        id="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number (optional)</Label>
                      <Input
                        id="phone"
                        placeholder="+971 50 123 4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="role">Role</Label>
                      <Select value={formData.role} onValueChange={(value: 'Admin' | 'Agent') => setFormData({...formData, role: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Admin">Admin</SelectItem>
                          <SelectItem value="Agent">Agent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                <Button 
                  onClick={handleAddAgent}
                  disabled={addMethod === 'email' ? !formData.email : !formData.name}
                  className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600"
                >
                  {addMethod === 'email' ? 'Send Invite' : 'Add Agent'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Agents Table */}
      <div className="flex-1 p-6">
        <Card className="hover:shadow-md transition-shadow duration-200">
          <CardHeader>
            <CardTitle>Team Agents</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-200">
                  <TableHead>Agent Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Assigned Leads</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agents.map((agent) => (
                  <TableRow key={agent.id} className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-gray-50 hover:via-blue-50/30 hover:to-purple-50/30 transition-all duration-200">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 text-purple-700 text-xs">
                            {agent.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <span className="font-medium text-gray-900">{agent.name}</span>
                          {agent.email && (
                            <div className="text-xs text-gray-500">{agent.email}</div>
                          )}
                          {agent.phone && (
                            <div className="text-xs text-gray-500">{agent.phone}</div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`text-xs transition-all duration-200 cursor-pointer ${getRoleColor(agent.role)}`}>
                        {agent.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600">{agent.assignedLeads}</span>
                    </TableCell>
                    <TableCell>
                      <Badge className={`text-xs transition-all duration-200 cursor-pointer ${getStatusColor(agent.status)}`}>
                        {agent.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="hover:bg-gradient-to-r hover:from-blue-50 hover:via-purple-50 hover:to-pink-50 hover:border-purple-200 hover:text-purple-700 transition-all duration-200">
                          <Edit className="w-3 h-3" />
                        </Button>
                        {agent.loginType === 'manual' && !agent.tempUsername && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => generateLoginDetails(agent.id)}
                            className="hover:bg-gradient-to-r hover:from-blue-50 hover:via-purple-50 hover:to-pink-50 hover:border-purple-200 hover:text-purple-700 transition-all duration-200"
                          >
                            Generate Login
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Login Details Modal */}
        {showLoginDetails && (
          <Dialog open={!!showLoginDetails} onOpenChange={() => setShowLoginDetails(null)}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Login Details Generated</DialogTitle>
                <DialogDescription>
                  Share these credentials with the agent. They'll be prompted to reset their password on first login.
                </DialogDescription>
              </DialogHeader>
              
              {(() => {
                const agent = agents.find(a => a.id === showLoginDetails);
                return agent ? (
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Username</Label>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(agent.tempUsername || '', 'username')}
                          className="h-8 px-2"
                        >
                          {copiedField === 'username' ? (
                            <Check className="w-3 h-3 text-green-600" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </Button>
                      </div>
                      <div className="font-mono text-sm bg-white p-2 rounded border">
                        {agent.tempUsername}
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Temporary Password</Label>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(agent.tempPassword || '', 'password')}
                          className="h-8 px-2"
                        >
                          {copiedField === 'password' ? (
                            <Check className="w-3 h-3 text-green-600" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </Button>
                      </div>
                      <div className="font-mono text-sm bg-white p-2 rounded border">
                        {agent.tempPassword}
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-500 bg-blue-50 p-3 rounded-lg">
                      <strong>Note:</strong> The agent will use these credentials to log in to LeadMasters. On first login, they'll be required to set a new password.
                    </div>
                  </div>
                ) : null;
              })()}
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
