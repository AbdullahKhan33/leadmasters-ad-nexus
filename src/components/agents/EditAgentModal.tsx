import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAgents } from "@/hooks/useAgents";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, X, Plus } from "lucide-react";
import type { Agent } from "@/hooks/useAgents";

interface EditAgentModalProps {
  agent: Agent;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

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

export function EditAgentModal({ agent, open, onOpenChange }: EditAgentModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    displayName: agent.display_name || "",
    phone: agent.phone || "",
    agentCode: agent.agent_code,
    status: agent.status,
    permissions: agent.permissions || {},
    performanceScore: agent.performance_score?.toString() || ""
  });
  const { updateAgent } = useAgents();
  const { toast } = useToast();

  useEffect(() => {
    setFormData({
      displayName: agent.display_name || "",
      phone: agent.phone || "",
      agentCode: agent.agent_code,
      status: agent.status,
      permissions: agent.permissions || {},
      performanceScore: agent.performance_score?.toString() || ""
    });
  }, [agent]);

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

      onOpenChange(false);

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Agent</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={agent.email || ""}
              disabled
              className="bg-gray-50"
            />
            <p className="text-xs text-gray-500">Email cannot be changed</p>
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

          <div className="space-y-3">
            <Label>Feature Permissions</Label>
            <p className="text-sm text-muted-foreground">Select which features this agent can access</p>
              <div className="space-y-3">
                {FEATURE_PERMISSIONS.map(permission => (
                  <div key={permission.key} className="border rounded-lg p-3">
                    <div className="flex items-start space-x-3">
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
                    
                    {permission.subPermissions && formData.permissions[permission.key] && (
                      <div className="mt-3 ml-6 pl-3 border-l-2 border-accent space-y-2">
                        <p className="text-xs font-medium text-muted-foreground">Select CRM sub-sections:</p>
                        <div className="space-y-2">
                          {permission.subPermissions.map(subPermission => (
                            <div key={subPermission.key} className="flex items-start space-x-2 p-2 border rounded hover:bg-accent/30 transition-colors">
                              <input
                                type="checkbox"
                                id={subPermission.key}
                                checked={formData.permissions[subPermission.key] || false}
                                onChange={() => togglePermission(subPermission.key)}
                                className="mt-0.5"
                              />
                              <div className="flex-1">
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
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Update Agent
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}