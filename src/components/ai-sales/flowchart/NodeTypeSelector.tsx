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
    <Card className="p-3 shadow-2xl border-2 bg-card backdrop-blur-sm animate-in fade-in zoom-in duration-200">
      <div className="text-xs font-bold px-2 py-1.5 text-foreground border-b mb-2">
        Add Node
      </div>
      <div className="space-y-1.5 min-w-[220px]">
        {nodeTypes.map((node) => {
          const Icon = node.icon;
          return (
            <Button
              key={node.type}
              variant="ghost"
              size="sm"
              className="w-full justify-start text-left h-auto py-2.5 hover:bg-muted/80 transition-colors"
              onClick={() => onSelect(node.type)}
            >
              <Icon className="w-5 h-5 mr-3 flex-shrink-0 text-primary" />
              <div className="flex-1">
                <div className="font-semibold text-sm">{node.label}</div>
                <div className="text-[11px] text-muted-foreground">
                  {node.description}
                </div>
              </div>
            </Button>
          );
        })}
      </div>
      <div className="border-t mt-2 pt-2">
        <Button
          variant="ghost"
          size="sm"
          className="w-full text-xs hover:bg-muted/80"
          onClick={onClose}
        >
          Cancel
        </Button>
      </div>
    </Card>
  );
}
