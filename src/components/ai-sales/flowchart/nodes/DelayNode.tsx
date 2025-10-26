import { memo, useState } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { Clock, Plus } from "lucide-react";

export const DelayNode = memo(({ data, id }: NodeProps) => {
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
      className="relative px-4 py-3 shadow-lg rounded-lg border-2 border-orange-500 bg-card min-w-[180px] cursor-pointer hover:shadow-xl transition-all group"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      <div className="flex items-center gap-2">
        <div className="p-2 bg-orange-500 rounded-lg">
          <Clock className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <div className="font-semibold text-sm">Wait</div>
          <div className="text-xs text-muted-foreground mt-1">
            {data.delayValue || 24} {data.delayUnit || "hours"}
          </div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
      {isHovered && (
        <button
          onClick={handlePlusClick}
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center shadow-lg transition-all z-10 animate-in fade-in zoom-in duration-200"
        >
          <Plus className="w-4 h-4" />
        </button>
      )}
    </div>
  );
});

DelayNode.displayName = "DelayNode";
