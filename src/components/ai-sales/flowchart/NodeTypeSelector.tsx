import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Clock, GitBranch, StopCircle } from "lucide-react";

interface NodeTypeSelectorProps {
  onSelect: (type: string) => void;
  onClose: () => void;
}

export function NodeTypeSelector({ onSelect, onClose }: NodeTypeSelectorProps) {
  const nodeTypes = [
    {
      type: "message",
      label: "Message",
      icon: MessageSquare,
      description: "Send a message to the lead",
    },
    {
      type: "delay",
      label: "Wait/Delay",
      icon: Clock,
      description: "Wait for a specified time",
    },
    {
      type: "branch",
      label: "Conditional Branch",
      icon: GitBranch,
      description: "Split flow based on conditions",
    },
    {
      type: "end",
      label: "End Campaign",
      icon: StopCircle,
      description: "End this campaign path",
    },
  ];

  return (
    <Card className="p-2 shadow-lg border-2">
      <div className="text-xs font-semibold px-2 py-1 text-muted-foreground">
        Add Node
      </div>
      <div className="space-y-1">
        {nodeTypes.map((node) => {
          const Icon = node.icon;
          return (
            <Button
              key={node.type}
              variant="ghost"
              size="sm"
              className="w-full justify-start text-left h-auto py-2"
              onClick={() => onSelect(node.type)}
            >
              <Icon className="w-4 h-4 mr-2 flex-shrink-0" />
              <div className="flex-1">
                <div className="font-medium text-xs">{node.label}</div>
                <div className="text-[10px] text-muted-foreground">
                  {node.description}
                </div>
              </div>
            </Button>
          );
        })}
      </div>
      <div className="border-t mt-1 pt-1">
        <Button
          variant="ghost"
          size="sm"
          className="w-full text-xs"
          onClick={onClose}
        >
          Cancel
        </Button>
      </div>
    </Card>
  );
}
