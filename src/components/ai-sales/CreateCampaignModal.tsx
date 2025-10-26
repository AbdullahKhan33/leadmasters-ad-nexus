import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Bell, Target, Clock, Sparkles } from "lucide-react";

interface CreateCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCampaignCreated: (campaignId: string) => void;
}

export function CreateCampaignModal({ isOpen, onClose, onCampaignCreated }: CreateCampaignModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("no_reply");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const campaignTypes = [
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
    {
      value: "custom",
      label: "Custom Campaign",
      description: "Build your own custom automation flow",
      icon: Sparkles,
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

      const { data, error } = await supabase
        .from('automation_workflows')
        .insert({
          user_id: user.id,
          name: name.trim(),
          description: description.trim() || null,
          type: type,
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
      setType("no_reply");
      
      onCampaignCreated(data.id);
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

          <div className="space-y-2">
            <Label>Campaign Type *</Label>
            <RadioGroup value={type} onValueChange={setType}>
              {campaignTypes.map((campaignType) => {
                const Icon = campaignType.icon;
                return (
                  <div
                    key={campaignType.value}
                    className="flex items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-accent cursor-pointer"
                    onClick={() => setType(campaignType.value)}
                  >
                    <RadioGroupItem value={campaignType.value} id={campaignType.value} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-4 h-4 text-primary" />
                        <Label htmlFor={campaignType.value} className="font-medium cursor-pointer">
                          {campaignType.label}
                        </Label>
                      </div>
                      <p className="text-sm text-muted-foreground">{campaignType.description}</p>
                    </div>
                  </div>
                );
              })}
            </RadioGroup>
          </div>
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
