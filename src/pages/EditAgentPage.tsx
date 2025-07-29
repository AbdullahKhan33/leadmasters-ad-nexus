import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAgents } from "@/hooks/useAgents";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Loader2, Edit, Settings, Award } from "lucide-react";
import type { Agent } from "@/hooks/useAgents";

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

export function EditAgentPage() {
  const { agentId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [agent, setAgent] = useState<Agent | null>(null);
  const [formData, setFormData] = useState({
    displayName: "",
    phone: "",
    agentCode: "",
    status: "",
    permissions: {} as Record<string, boolean>,
    performanceScore: ""
  });
  const { agents, updateAgent } = useAgents();
  const { toast } = useToast();

  useEffect(() => {
    const foundAgent = agents.find(a => a.id === agentId);
    if (foundAgent) {
      setAgent(foundAgent);
      setFormData({
        displayName: foundAgent.display_name || "",
        phone: foundAgent.phone || "",
        agentCode: foundAgent.agent_code,
        status: foundAgent.status,
        permissions: foundAgent.permissions || {},
        performanceScore: foundAgent.performance_score?.toString() || ""
      });
    }
  }, [agentId, agents]);

  const togglePermission = (key: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [key]: !prev.permissions[key]
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agent) return;

    setIsLoading(true);

    try {
      // Update agent record
      await updateAgent(agent.id, {
        agent_code: formData.agentCode,
        status: formData.status,
        permissions: formData.permissions,
        performance_score: formData.performanceScore ? parseFloat(formData.performanceScore) : undefined
      });

      // Update profile
      await supabase
        .from('profiles')
        .update({
          display_name: formData.displayName,
          phone: formData.phone
        })
        .eq('user_id', agent.user_id);

      toast({
        title: "Success",
        description: "Agent updated successfully"
      });

      navigate('/app/agents');

    } catch (error) {
      console.error('Error updating agent:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update agent",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!agent) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading agent details...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-6 mb-8">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/app/agents')}
            className="gap-2 hover:bg-accent/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Agents
          </Button>
          <div className="border-l border-border h-8" />
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Edit Agent
            </h1>
            <p className="text-muted-foreground text-lg">Update agent details and permissions</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Basic Information */}
            <Card className="shadow-lg border-0 bg-gradient-to-b from-card to-card/95 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Edit className="w-4 h-4 text-primary" />
                  </div>
                  Basic Information
                </CardTitle>
                <CardDescription className="text-base">Essential details for the agent</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={agent.email || ""}
                    disabled
                    className="bg-muted/50"
                  />
                  <p className="text-xs text-muted-foreground">Email cannot be changed</p>
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
                    <Settings className="w-4 h-4 text-secondary-foreground" />
                  </div>
                  Account Settings
                </CardTitle>
                <CardDescription className="text-base">Agent codes and status configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="agentCode">Agent Code *</Label>
                  <Input
                    id="agentCode"
                    value={formData.agentCode}
                    onChange={(e) => setFormData(prev => ({ ...prev, agentCode: e.target.value.toUpperCase() }))}
                    placeholder="AG123456"
                    required
                  />
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
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="performanceScore">Performance Score (0-10)</Label>
                  <Input
                    id="performanceScore"
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value={formData.performanceScore}
                    onChange={(e) => setFormData(prev => ({ ...prev, performanceScore: e.target.value }))}
                    placeholder="7.5"
                  />
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
              <div className="space-y-6">
                {FEATURE_PERMISSIONS.map(permission => (
                  <div key={permission.key} className="group border border-border/50 rounded-xl p-6 hover:border-primary/30 hover:bg-accent/20 transition-all duration-200">
                    <div className="flex items-start space-x-4">
                      <input
                        type="checkbox"
                        id={permission.key}
                        checked={formData.permissions[permission.key] || false}
                        onChange={() => togglePermission(permission.key)}
                        className="mt-1.5 w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                      />
                      <div className="flex-1 space-y-1">
                        <label htmlFor={permission.key} className="text-lg font-semibold cursor-pointer group-hover:text-primary transition-colors">
                          {permission.label}
                        </label>
                        <p className="text-muted-foreground leading-relaxed">{permission.description}</p>
                      </div>
                    </div>
                    
                    {permission.subPermissions && formData.permissions[permission.key] && (
                      <div className="mt-6 ml-8 pl-6 border-l-2 border-primary/20 space-y-4">
                        <p className="text-sm font-semibold text-primary">Select CRM sub-sections:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {permission.subPermissions.map(subPermission => (
                            <div key={subPermission.key} className="flex items-start space-x-3 p-4 border border-border/30 rounded-lg hover:bg-accent/30 hover:border-primary/20 transition-all duration-200">
                              <input
                                type="checkbox"
                                id={subPermission.key}
                                checked={formData.permissions[subPermission.key] || false}
                                onChange={() => togglePermission(subPermission.key)}
                                className="mt-1 w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                              />
                              <div className="flex-1 space-y-1">
                                <label htmlFor={subPermission.key} className="text-sm font-medium cursor-pointer">
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
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end gap-4 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/app/agents')}
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
              Update Agent
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}