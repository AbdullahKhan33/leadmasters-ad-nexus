import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ArrowLeft, Shuffle, X, UserPlus, Users, Award } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useWorkspace } from "@/contexts/WorkspaceContext";

const FEATURE_PERMISSIONS = [
  { key: "ad_builder", label: "Ad Builder", description: "Create and manage ad campaigns" },
  { key: "post_builder", label: "Post Builder", description: "Create social media posts" },
  { 
    key: "crm", 
    label: "CRM", 
    description: "Access customer relationship management",
    subPermissions: [
      { key: "crm_dashboard", label: "Dashboard", description: "Access CRM dashboard with leads" },
      { key: "crm_domain_setup", label: "Domain Setup", description: "Configure domain settings" },
      { key: "crm_automations", label: "Automations", description: "Manage CRM automations" },
      { key: "crm_agents", label: "Agents", description: "Manage agent assignments" },
      { key: "crm_templates", label: "Templates", description: "Access message templates" }
    ]
  },
  { key: "analytics", label: "Analytics", description: "View performance analytics" },
  { key: "templates", label: "Templates", description: "Access and use templates" },
  { key: "schedule", label: "Schedule", description: "Schedule posts and campaigns" },
  { key: "content_hub", label: "Content Hub", description: "Access content library" },
  { key: "insights", label: "Insights", description: "View detailed insights" },
  { key: "automations", label: "Smart Automations", description: "Set up automated workflows" }
];

export function CreateAgentPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { workspaces } = useWorkspace();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    displayName: "",
    phone: "",
    agentCode: "",
    status: "active",
    permissions: {} as Record<string, boolean>,
    workspaceIds: [] as string[]
  });
  const { toast } = useToast();

  const generateAgentCode = () => {
    const code = 'AG' + Math.random().toString(36).substr(2, 6).toUpperCase();
    setFormData(prev => ({ ...prev, agentCode: code }));
  };

  const togglePermission = (key: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [key]: !prev.permissions[key]
      }
    }));
  };

  const toggleWorkspace = (workspaceId: string) => {
    setFormData(prev => ({
      ...prev,
      workspaceIds: prev.workspaceIds.includes(workspaceId)
        ? prev.workspaceIds.filter(id => id !== workspaceId)
        : [...prev.workspaceIds, workspaceId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.displayName || !formData.agentCode) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // Call the edge function to create the agent
      const { data, error } = await supabase.functions.invoke("create-agent-user", {
        body: {
          email: formData.email,
          displayName: formData.displayName,
          phone: formData.phone,
          agentCode: formData.agentCode,
          workspaceIds: formData.workspaceIds,
          status: formData.status,
          permissions: formData.permissions,
        },
      });

      // Check if the response contains an error message (from 400+ status codes)
      if (data?.error) {
        throw new Error(data.error);
      }

      // Check for network/connection errors
      if (error) {
        throw new Error(`Failed to create agent: ${error.message}`);
      }

      toast({
        title: "Success",
        description: `Agent created successfully! Default password: ${data.tempPassword || "Password123!"}`
      });

      // Navigate back to agents page
      navigate("/app/agents");

    } catch (error) {
      console.error('Error creating agent:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create agent",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-6 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/app/agents")}
            className="gap-2 hover:bg-accent/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Agents
          </Button>
          <div className="border-l border-border h-8" />
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Create New Agent
            </h1>
            <p className="text-muted-foreground text-lg">Set up a new agent with specific permissions and access</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Basic Information */}
            <Card className="shadow-lg border-0 bg-gradient-to-b from-card to-card/95 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <UserPlus className="w-4 h-4 text-primary" />
                  </div>
                  Basic Information
                </CardTitle>
                <CardDescription className="text-base">Essential details for the agent</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="agent@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="displayName">Display Name *</Label>
                  <Input
                    id="displayName"
                    value={formData.displayName}
                    onChange={(e) => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Account Settings */}
            <Card className="shadow-lg border-0 bg-gradient-to-b from-card to-card/95 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center">
                    <Shuffle className="w-4 h-4 text-secondary-foreground" />
                  </div>
                  Account Settings
                </CardTitle>
                <CardDescription className="text-base">Agent codes, passwords and status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="agentCode">Agent Code *</Label>
                  <div className="flex gap-2">
                    <Input
                      id="agentCode"
                      value={formData.agentCode}
                      onChange={(e) => setFormData(prev => ({ ...prev, agentCode: e.target.value.toUpperCase() }))}
                      placeholder="AG123456"
                      required
                    />
                    <Button type="button" variant="outline" onClick={generateAgentCode}>
                      <Shuffle className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Temporary Password</Label>
                  <div className="p-4 bg-gradient-to-r from-muted/50 to-muted/30 rounded-lg border border-border/50">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      A secure temporary password will be automatically generated and sent to the agent via email. 
                      The agent will be required to change this password on their first login.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Feature Permissions */}
          <Card className="shadow-lg border-0 bg-gradient-to-b from-card to-card/95 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Award className="w-4 h-4 text-accent-foreground" />
                </div>
                Feature Permissions
              </CardTitle>
              <CardDescription className="text-base">Select which features this agent can access</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Column 1 - Other features */}
                <div className="space-y-4">
                  {FEATURE_PERMISSIONS.filter(p => p.key !== 'crm').map(permission => (
                    <div key={permission.key} className="group border border-border/50 rounded-lg p-4 hover:border-primary/30 hover:bg-accent/20 transition-all duration-200">
                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          id={permission.key}
                          checked={formData.permissions[permission.key] || false}
                          onChange={() => togglePermission(permission.key)}
                          className="mt-1 w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                        />
                        <div className="flex-1 space-y-1">
                          <label htmlFor={permission.key} className="text-sm font-semibold cursor-pointer group-hover:text-primary transition-colors">
                            {permission.label}
                          </label>
                          <p className="text-xs text-muted-foreground leading-relaxed">{permission.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Column 2 - CRM with sub-permissions */}
                <div className="space-y-4">
                  {FEATURE_PERMISSIONS.filter(p => p.key === 'crm').map(permission => (
                    <div key={permission.key} className="group border border-border/50 rounded-lg p-4 hover:border-primary/30 hover:bg-accent/20 transition-all duration-200">
                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          id={permission.key}
                          checked={formData.permissions[permission.key] || false}
                          onChange={() => togglePermission(permission.key)}
                          className="mt-1 w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                        />
                        <div className="flex-1 space-y-1">
                          <label htmlFor={permission.key} className="text-sm font-semibold cursor-pointer group-hover:text-primary transition-colors">
                            {permission.label}
                          </label>
                          <p className="text-xs text-muted-foreground leading-relaxed">{permission.description}</p>
                        </div>
                      </div>
                      
                      {permission.subPermissions && formData.permissions[permission.key] && (
                        <div className="mt-4 ml-7 pl-4 border-l-2 border-primary/20 space-y-3">
                          <p className="text-xs font-semibold text-primary">CRM Access:</p>
                          <div className="space-y-2">
                            {permission.subPermissions.map(subPermission => (
                              <div key={subPermission.key} className="flex items-start space-x-2 p-2 border border-border/30 rounded hover:bg-accent/30 hover:border-primary/20 transition-all duration-200">
                                <input
                                  type="checkbox"
                                  id={subPermission.key}
                                  checked={formData.permissions[subPermission.key] || false}
                                  onChange={() => togglePermission(subPermission.key)}
                                  className="mt-0.5 w-3 h-3 text-primary bg-background border-border rounded focus:ring-primary focus:ring-1"
                                />
                                <div className="flex-1">
                                  <label htmlFor={subPermission.key} className="text-xs font-medium cursor-pointer">
                                    {subPermission.label}
                                  </label>
                                  <p className="text-xs text-muted-foreground">{subPermission.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Workspace Assignment */}
          <Card className="shadow-lg border-0 bg-gradient-to-b from-card to-card/95 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="w-8 h-8 rounded-lg bg-muted/30 flex items-center justify-center">
                  <Users className="w-4 h-4 text-muted-foreground" />
                </div>
                Workspace Assignment
              </CardTitle>
              <CardDescription className="text-base">Select which workspaces this agent can access</CardDescription>
            </CardHeader>
            <CardContent>
              {workspaces.length === 0 ? (
                <div className="p-6 border border-dashed border-border/50 rounded-xl bg-muted/30">
                  <p className="text-muted-foreground text-center">
                    No workspaces available. Create a workspace first to assign agents.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {workspaces.map(workspace => (
                    <div key={workspace.id} className="group flex items-center space-x-4 p-5 border border-border/50 rounded-xl hover:bg-accent/20 hover:border-primary/30 transition-all duration-200">
                      <input
                        type="checkbox"
                        id={`workspace-${workspace.id}`}
                        checked={formData.workspaceIds.includes(workspace.id)}
                        onChange={() => toggleWorkspace(workspace.id)}
                        className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                      />
                      <div className="flex-1">
                        <label htmlFor={`workspace-${workspace.id}`} className="font-semibold cursor-pointer group-hover:text-primary transition-colors">
                          {workspace.name}
                        </label>
                      </div>
                      {formData.workspaceIds.includes(workspace.id) && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleWorkspace(workspace.id)}
                          className="p-2 h-auto hover:bg-destructive/10 hover:text-destructive transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end gap-4 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate("/app/agents")}
              className="px-8 py-2 h-11"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading} 
              className="min-w-36 px-8 py-2 h-11 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 shadow-lg"
            >
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Create Agent
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}