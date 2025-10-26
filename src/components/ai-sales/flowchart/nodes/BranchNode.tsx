import { memo, useState } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { GitBranch, Plus } from "lucide-react";

export const BranchNode = memo(({ data, id }: NodeProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (data.onNodeClick) {
      data.onNodeClick(id);
    }
  };

  const handlePlusClickYes = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (data.onAddNode) {
      data.onAddNode(id, "yes");
    }
  };

  const handlePlusClickNo = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (data.onAddNode) {
      data.onAddNode(id, "no");
    }
  };

  const conditionLabels: Record<string, string> = {
    lead_replied: "Lead Replied?",
    link_clicked: "Link Clicked?",
    email_opened: "Email Opened?",
    time_elapsed: "Time Elapsed?",
    custom: "Custom Condition",
  };

  return (
    <div
      className="relative px-4 py-3 shadow-lg rounded-lg border-2 border-purple-500 bg-card min-w-[200px] cursor-pointer hover:shadow-xl transition-all group"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      <div className="flex items-start gap-2">
        <div className="p-2 bg-purple-500 rounded-lg flex-shrink-0">
          <GitBranch className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <div className="font-semibold text-sm">Branch</div>
          <div className="text-xs text-muted-foreground mt-1">
            {conditionLabels[data.conditionType] || "Condition"}
          </div>
        </div>
      </div>
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
      {isHovered && (
        <>
          {/* Connecting lines */}
          <div className="absolute top-full left-[30%] -translate-x-1/2 w-0.5 h-8 bg-green-500/50 z-10" />
          <div className="absolute top-full left-[70%] -translate-x-1/2 w-0.5 h-8 bg-red-500/50 z-10" />
          {/* Plus buttons */}
          <button
            onClick={handlePlusClickYes}
            className="absolute -bottom-10 left-[30%] -translate-x-1/2 w-8 h-8 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center shadow-lg transition-all z-10 animate-in fade-in zoom-in duration-200"
          >
            <Plus className="w-5 h-5" />
          </button>
          <button
            onClick={handlePlusClickNo}
            className="absolute -bottom-10 left-[70%] -translate-x-1/2 w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-lg transition-all z-10 animate-in fade-in zoom-in duration-200"
          >
            <Plus className="w-5 h-5" />
          </button>
        </>
      )}
    </div>
  );
});

BranchNode.displayName = "BranchNode";
