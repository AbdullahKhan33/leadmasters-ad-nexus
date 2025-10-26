import { memo, useState } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { MessageSquare, Plus } from "lucide-react";

export const MessageNode = memo(({ data, id }: NodeProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (data.onNodeClick) {
      data.onNodeClick(id);
    }
  };

  const handlePlusClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (data.onAddNode) {
      data.onAddNode(id);
    }
  };

  return (
    <div
      className="relative px-4 py-3 shadow-lg rounded-lg border-2 border-blue-500 bg-card min-w-[200px] cursor-pointer hover:shadow-xl transition-all group"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      <div className="flex items-start gap-2">
        <div className="p-2 bg-blue-500 rounded-lg flex-shrink-0">
          <MessageSquare className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm">Send Message</div>
          <div className="text-xs text-muted-foreground mt-1">
            via {data.channel || "whatsapp"}
          </div>
          {data.content && (
            <div className="text-xs mt-2 text-foreground line-clamp-2 bg-muted/50 rounded p-2">
              {data.content}
            </div>
          )}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
      {isHovered && (
        <>
          {/* Connecting line */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-8 bg-blue-500/50 z-10" />
          {/* Plus button */}
          <button
            onClick={handlePlusClick}
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center shadow-lg transition-all z-10 animate-in fade-in zoom-in duration-200"
          >
            <Plus className="w-5 h-5" />
          </button>
        </>
      )}
    </div>
  );
});

MessageNode.displayName = "MessageNode";
