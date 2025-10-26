import { useState, useEffect } from "react";
import { Node } from "reactflow";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MessageSquare,
  Clock,
  GitBranch,
  Play,
  StopCircle,
} from "lucide-react";

interface NodeConfigPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  node: Node | null;
  onSave: (nodeId: string, data: any) => void;
}

export function NodeConfigPanel({
  open,
  onOpenChange,
  node,
  onSave,
}: NodeConfigPanelProps) {
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (node) {
      setFormData(node.data || {});
    }
  }, [node]);

  if (!node) return null;

  const handleSave = () => {
    onSave(node.id, formData);
    onOpenChange(false);
  };

  const getIcon = () => {
    switch (node.type) {
      case "start":
        return <Play className="w-5 h-5 text-green-500" />;
      case "message":
        return <MessageSquare className="w-5 h-5 text-blue-500" />;
      case "delay":
        return <Clock className="w-5 h-5 text-orange-500" />;
      case "branch":
        return <GitBranch className="w-5 h-5 text-purple-500" />;
      case "end":
        return <StopCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (node.type) {
      case "start":
        return "Campaign Start";
      case "message":
        return "Send Message";
      case "delay":
        return "Wait / Delay";
      case "branch":
        return "Conditional Branch";
      case "end":
        return "End Campaign";
      default:
        return "Configure Node";
    }
  };

  const renderConfigForm = () => {
    switch (node.type) {
      case "message":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="channel">Channel</Label>
              <Select
                value={formData.channel || "whatsapp"}
                onValueChange={(value) =>
                  setFormData({ ...formData, channel: value })
                }
              >
                <SelectTrigger id="channel">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="content">Message Content</Label>
              <Textarea
                id="content"
                value={formData.content || ""}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                placeholder="Enter your message here... You can use variables like {{name}}, {{company}}"
                rows={8}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Available variables: {"{"}
                {"{"}name{"}"}, {"{"}
                {"{"}company{"}"}, {"{"}
                {"{"}phone{"}"}
              </p>
            </div>
          </div>
        );

      case "delay":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="delayValue">Wait Duration</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  id="delayValue"
                  type="number"
                  value={formData.delayValue || 24}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      delayValue: Number(e.target.value),
                    })
                  }
                  min={1}
                  className="flex-1"
                />
                <Select
                  value={formData.delayUnit || "hours"}
                  onValueChange={(value) =>
                    setFormData({ ...formData, delayUnit: value })
                  }
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minutes">Minutes</SelectItem>
                    <SelectItem value="hours">Hours</SelectItem>
                    <SelectItem value="days">Days</SelectItem>
                    <SelectItem value="weeks">Weeks</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                The workflow will pause for this duration before continuing to the
                next step
              </p>
            </div>
          </div>
        );

      case "branch":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="conditionType">Condition Type</Label>
              <Select
                value={formData.conditionType || "lead_replied"}
                onValueChange={(value) =>
                  setFormData({ ...formData, conditionType: value })
                }
              >
                <SelectTrigger id="conditionType">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lead_replied">Lead Replied</SelectItem>
                  <SelectItem value="link_clicked">Link Clicked</SelectItem>
                  <SelectItem value="email_opened">Email Opened</SelectItem>
                  <SelectItem value="time_elapsed">Time Elapsed</SelectItem>
                  <SelectItem value="custom">Custom Condition</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-2">
                The flow will split into two paths (Yes/No) based on whether this
                condition is met
              </p>
            </div>
            <div className="bg-muted/50 p-3 rounded-lg text-xs">
              <p className="font-medium mb-1">Branch Outputs:</p>
              <p className="text-muted-foreground">
                • <span className="text-green-600 font-medium">Yes path</span>: Executes when condition is true
              </p>
              <p className="text-muted-foreground">
                • <span className="text-red-600 font-medium">No path</span>: Executes when condition is false
              </p>
            </div>
          </div>
        );

      case "start":
        return (
          <div className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-lg text-sm">
              <p className="text-muted-foreground">
                This is the entry point of your campaign. All workflows start here
                when a lead enters the automation.
              </p>
            </div>
          </div>
        );

      case "end":
        return (
          <div className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-lg text-sm">
              <p className="text-muted-foreground">
                This marks the end of the campaign workflow. Leads reaching this
                point will exit the automation.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[440px] overflow-y-auto">
        <SheetHeader>
          <div className="flex items-center gap-3">
            {getIcon()}
            <div>
              <SheetTitle>{getTitle()}</SheetTitle>
              <SheetDescription>
                Configure the settings for this node
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>
        <div className="mt-6">{renderConfigForm()}</div>
        <div className="mt-6 flex gap-2">
          <Button onClick={handleSave} className="flex-1">
            Save Changes
          </Button>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
