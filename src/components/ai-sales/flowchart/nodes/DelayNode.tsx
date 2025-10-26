import { memo, useState } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { Clock, Edit } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const DelayNode = memo(({ data }: NodeProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [delayValue, setDelayValue] = useState(data.delayValue || 24);
  const [delayUnit, setDelayUnit] = useState(data.delayUnit || "hours");

  const handleSave = () => {
    data.delayValue = delayValue;
    data.delayUnit = delayUnit;
    setIsEditing(false);
  };

  return (
    <>
      <div
        className="px-4 py-3 shadow-lg rounded-lg border-2 border-orange-500 bg-card min-w-[180px] cursor-pointer hover:shadow-xl transition-shadow"
        onClick={() => setIsEditing(true)}
      >
        <Handle type="target" position={Position.Top} className="w-3 h-3" />
        <div className="flex items-center gap-2">
          <div className="p-2 bg-orange-500 rounded-lg">
            <Clock className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-sm flex items-center justify-between">
              <span>Wait</span>
              <Edit className="w-3 h-3 text-muted-foreground" />
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {delayValue} {delayUnit}
            </div>
          </div>
        </div>
        <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
      </div>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Delay Node</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Wait Duration</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={delayValue}
                  onChange={(e) => setDelayValue(Number(e.target.value))}
                  min={1}
                  className="flex-1"
                />
                <Select value={delayUnit} onValueChange={setDelayUnit}>
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
            </div>
            <Button onClick={handleSave} className="w-full">
              Save Delay
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
});

DelayNode.displayName = "DelayNode";
