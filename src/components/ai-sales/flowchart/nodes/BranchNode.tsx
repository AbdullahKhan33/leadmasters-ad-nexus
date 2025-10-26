import { memo, useState } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { GitBranch, Edit } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const BranchNode = memo(({ data }: NodeProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [conditionType, setConditionType] = useState(data.conditionType || "lead_replied");

  const handleSave = () => {
    data.conditionType = conditionType;
    setIsEditing(false);
  };

  const conditionLabels: Record<string, string> = {
    lead_replied: "Lead Replied?",
    link_clicked: "Link Clicked?",
    email_opened: "Email Opened?",
    time_elapsed: "Time Elapsed?",
    custom: "Custom Condition",
  };

  return (
    <>
      <div
        className="px-4 py-3 shadow-lg rounded-lg border-2 border-purple-500 bg-card min-w-[200px] cursor-pointer hover:shadow-xl transition-shadow"
        onClick={() => setIsEditing(true)}
      >
        <Handle type="target" position={Position.Top} className="w-3 h-3" />
        <div className="flex items-start gap-2">
          <div className="p-2 bg-purple-500 rounded-lg flex-shrink-0">
            <GitBranch className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-sm flex items-center justify-between">
              <span>Branch</span>
              <Edit className="w-3 h-3 text-muted-foreground" />
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {conditionLabels[conditionType] || "Condition"}
            </div>
          </div>
        </div>
        {/* Two output handles for Yes/No paths */}
        <Handle
          type="source"
          position={Position.Bottom}
          id="yes"
          style={{ left: "30%" }}
          className="w-3 h-3 bg-green-500"
        />
        <Handle
          type="source"
          position={Position.Bottom}
          id="no"
          style={{ left: "70%" }}
          className="w-3 h-3 bg-red-500"
        />
        <div className="flex justify-between mt-2 text-[10px] text-muted-foreground px-1">
          <span className="text-green-600">Yes</span>
          <span className="text-red-600">No</span>
        </div>
      </div>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Branch Node</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Condition Type</Label>
              <Select value={conditionType} onValueChange={setConditionType}>
                <SelectTrigger>
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
                The flow will split into two paths based on whether this condition is met
              </p>
            </div>
            <Button onClick={handleSave} className="w-full">
              Save Branch
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
});

BranchNode.displayName = "BranchNode";
