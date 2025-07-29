import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ArrowLeft, Shuffle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const FEATURE_PERMISSIONS = [
  { key: "ad_builder", label: "Ad Builder", description: "Create and manage ad campaigns" },
  { key: "post_builder", label: "Post Builder", description: "Create social media posts" },
  { key: "crm", label: "CRM", description: "Access customer relationship management" },
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
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    displayName: "",
    phone: "",
    agentCode: "",
    defaultPassword: "",
    workspaceId: user?.id || "",
    status: "active",
    permissions: {} as Record<string, boolean>
  });
  const { toast } = useToast();

  const generateAgentCode = () => {
    const code = 'AG' + Math.random().toString(36).substr(2, 6).toUpperCase();
    setFormData(prev => ({ ...prev, agentCode: code }));
  };

  const generatePassword = () => {
    const password = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-4).toUpperCase() + "1!";
    setFormData(prev => ({ ...prev, defaultPassword: password }));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.displayName || !formData.agentCode || !formData.defaultPassword) {
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
          defaultPassword: formData.defaultPassword,
          workspaceId: formData.workspaceId,
          status: formData.status,
          permissions: formData.permissions,
        },
      });

      if (error) {
        throw new Error(`Failed to create agent: ${error.message}`);
      }

      if (data.error) {
        throw new Error(data.error);
      }

      toast({
        title: "Success",
        description: data.emailSent 
          ? "Agent created successfully. Welcome email sent with login instructions."
          : "Agent created successfully. Note: Welcome email could not be sent."
      });

      // Navigate back to agents page
      navigate("/agents");

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
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/agents")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Agents
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Create New Agent</h1>
            <p className="text-muted-foreground">Set up a new agent with specific permissions and access</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Essential details for the agent</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
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
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Agent codes, passwords and status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
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
                  <Label htmlFor="defaultPassword">Default Password *</Label>
                  <div className="flex gap-2">
                    <Input
                      id="defaultPassword"
                      type="text"
                      value={formData.defaultPassword}
                      onChange={(e) => setFormData(prev => ({ ...prev, defaultPassword: e.target.value }))}
                      placeholder="Enter default password"
                      required
                    />
                    <Button type="button" variant="outline" onClick={generatePassword}>
                      <Shuffle className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Agent will be prompted to change this on first login</p>
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
          <Card>
            <CardHeader>
              <CardTitle>Feature Permissions</CardTitle>
              <CardDescription>Select which features this agent can access</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {FEATURE_PERMISSIONS.map(permission => (
                  <div key={permission.key} className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                    <input
                      type="checkbox"
                      id={permission.key}
                      checked={formData.permissions[permission.key] || false}
                      onChange={() => togglePermission(permission.key)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <label htmlFor={permission.key} className="font-medium cursor-pointer">
                        {permission.label}
                      </label>
                      <p className="text-sm text-muted-foreground">{permission.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => navigate("/agents")}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="min-w-32">
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Create Agent
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}