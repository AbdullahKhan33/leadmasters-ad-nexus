import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { MessageSquare, Clock, GitBranch, StopCircle } from "lucide-react";

interface NodeTypeSelectorProps {
  open: boolean;
  onSelect: (type: string) => void;
  onClose: () => void;
}

export function NodeTypeSelector({ open, onSelect, onClose }: NodeTypeSelectorProps) {
  const nodeTypes = [
    {
      type: "message",
      label: "Message",
      icon: MessageSquare,
      iconColor: "text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-950",
      description: "Send a message to the lead via WhatsApp, Email, or SMS",
    },
    {
      type: "delay",
      label: "Wait/Delay",
      icon: Clock,
      iconColor: "text-orange-500",
      bgColor: "bg-orange-100 dark:bg-orange-950",
      description: "Wait for a specified time before continuing the workflow",
    },
    {
      type: "branch",
      label: "Conditional Branch",
      icon: GitBranch,
      iconColor: "text-purple-500",
      bgColor: "bg-purple-100 dark:bg-purple-950",
      description: "Split flow into two paths based on conditions (Yes/No)",
    },
    {
      type: "end",
      label: "End Campaign",
      icon: StopCircle,
      iconColor: "text-red-500",
      bgColor: "bg-red-100 dark:bg-red-950",
      description: "End this campaign path - leads will exit the workflow",
    },
  ];

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[440px]">
        <SheetHeader>
          <SheetTitle>Add Node</SheetTitle>
          <SheetDescription>
            Choose the type of node you want to add to your workflow
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-3 py-6">
          {nodeTypes.map((type) => (
            <button
              key={type.type}
              onClick={() => onSelect(type.type)}
              className="flex items-start gap-4 p-4 rounded-lg border-2 border-border hover:border-primary hover:bg-accent transition-all text-left group"
            >
              <div
                className={`p-3 rounded-lg ${type.bgColor} flex-shrink-0 group-hover:scale-110 transition-transform`}
              >
                <type.icon className={`w-5 h-5 ${type.iconColor}`} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm mb-1">{type.label}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {type.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
