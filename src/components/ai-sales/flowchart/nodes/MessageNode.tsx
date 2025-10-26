import { memo, useState } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { MessageSquare, Edit } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const MessageNode = memo(({ data, id }: NodeProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(data.content || "");
  const [channel, setChannel] = useState(data.channel || "whatsapp");

  const handleSave = () => {
    data.content = content;
    data.channel = channel;
    setIsEditing(false);
  };

  return (
    <>
      <div
        className="px-4 py-3 shadow-lg rounded-lg border-2 border-blue-500 bg-card min-w-[200px] cursor-pointer hover:shadow-xl transition-shadow"
        onClick={() => setIsEditing(true)}
      >
        <Handle type="target" position={Position.Top} className="w-3 h-3" />
        <div className="flex items-start gap-2">
          <div className="p-2 bg-blue-500 rounded-lg flex-shrink-0">
            <MessageSquare className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm flex items-center justify-between">
              <span>Send Message</span>
              <Edit className="w-3 h-3 text-muted-foreground" />
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              via {channel}
            </div>
            {content && (
              <div className="text-xs mt-2 text-foreground line-clamp-2 bg-muted/50 rounded p-2">
                {content}
              </div>
            )}
          </div>
        </div>
        <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
      </div>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Message Node</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Channel</Label>
              <Select value={channel} onValueChange={setChannel}>
                <SelectTrigger>
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
              <Label>Message Content</Label>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter your message here... You can use variables like {{name}}, {{company}}"
                rows={6}
              />
            </div>
            <Button onClick={handleSave} className="w-full">
              Save Message
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
});

MessageNode.displayName = "MessageNode";
