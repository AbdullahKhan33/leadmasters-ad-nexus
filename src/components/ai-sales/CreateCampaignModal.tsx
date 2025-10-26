import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Zap, Workflow, GitBranch, Bell, Target, Clock } from "lucide-react";

interface CreateCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCampaignCreated: (campaignId: string, openFlowchart?: boolean) => void;
}

export function CreateCampaignModal({ isOpen, onClose, onCampaignCreated }: CreateCampaignModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [campaignTier, setCampaignTier] = useState<"quick" | "custom_linear" | "advanced_branching">("quick");
  const [quickTemplate, setQuickTemplate] = useState("no_reply");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const campaignTiers = [
    {
      value: "quick" as const,
      label: "Quick Campaign",
      description: "Select from pre-configured templates for common scenarios",
      icon: Zap,
    },
    {
      value: "custom_linear" as const,
      label: "Custom Campaign (Linear)",
      description: "Build a simple step-by-step sequence without branching",
      icon: Workflow,
    },
    {
      value: "advanced_branching" as const,
      label: "Advanced Campaign (Branching)",
      description: "Visual flowchart builder with conditional logic and branching paths",
      icon: GitBranch,
    },
  ];

  const quickTemplates = [
    {
      value: "no_reply",
      label: "No Reply Follow-up",
      description: "Automatically follow up with leads who haven't responded",
      icon: Bell,
    },
    {
      value: "qualified_nurturing",
      label: "Qualified Lead Nurturing",
      description: "Nurture leads that show high interest",
      icon: Target,
    },
    {
      value: "long_term",
      label: "Long-Term Re-engagement",
      description: "Re-engage leads that have gone cold",
      icon: Clock,
    },
  ];

  const handleCreate = async () => {
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Please enter a campaign name",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Determine type based on campaign tier (align with DB constraint)
      let campaignType: string;
      if (campaignTier === "quick") {
        campaignType = quickTemplate;
      } else if (campaignTier === "custom_linear") {
        campaignType = "custom";
      } else if (campaignTier === "advanced_branching") {
        campaignType = "ai_automation";
      } else {
        campaignType = "custom";
      }

      const { data, error } = await supabase
        .from('automation_workflows')
        .insert({
          user_id: user.id,
          name: name.trim(),
          description: description.trim() || null,
          type: campaignType,
          workflow_status: 'draft',
          trigger_config: {},
          actions: {},
          is_active: false,
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Campaign created successfully",
      });

      // Reset form
      setName("");
      setDescription("");
      setCampaignTier("quick");
      setQuickTemplate("no_reply");
      
      // If advanced branching, open flowchart builder
      const shouldOpenFlowchart = campaignTier === "advanced_branching";
      onCampaignCreated(data.id, shouldOpenFlowchart);
      onClose();
    } catch (error: any) {
      console.error('Error creating campaign:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create campaign",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Create New Automated Campaign</DialogTitle>
          <DialogDescription>
            Set up a new automated campaign to engage your leads
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Campaign Name *</Label>
            <Input
              id="name"
              placeholder="e.g., Holiday Promo Follow-up"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Brief description of this campaign..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-3">
            <Label>Campaign Type *</Label>
            <RadioGroup value={campaignTier} onValueChange={(value) => setCampaignTier(value as any)}>
              {campaignTiers.map((tier) => {
                const Icon = tier.icon;
                return (
                  <div
                    key={tier.value}
                    className="flex items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-accent cursor-pointer transition-colors"
                    onClick={() => setCampaignTier(tier.value)}
                  >
                    <RadioGroupItem value={tier.value} id={tier.value} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-4 h-4 text-primary" />
                        <Label htmlFor={tier.value} className="font-medium cursor-pointer">
                          {tier.label}
                        </Label>
                      </div>
                      <p className="text-sm text-muted-foreground">{tier.description}</p>
                    </div>
                  </div>
                );
              })}
            </RadioGroup>
          </div>

          {campaignTier === "quick" && (
            <div className="space-y-2">
              <Label htmlFor="quick-template">Select Template</Label>
              <Select value={quickTemplate} onValueChange={setQuickTemplate}>
                <SelectTrigger id="quick-template">
                  <SelectValue placeholder="Choose a template" />
                </SelectTrigger>
                <SelectContent>
                  {quickTemplates.map((template) => {
                    const Icon = template.icon;
                    return (
                      <SelectItem key={template.value} value={template.value}>
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4" />
                          <span>{template.label}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                {quickTemplates.find(t => t.value === quickTemplate)?.description}
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleCreate} 
            disabled={isLoading}
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white"
          >
            {isLoading ? "Creating..." : "Create Campaign"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
