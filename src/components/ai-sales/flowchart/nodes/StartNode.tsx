import { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { Play, Plus } from "lucide-react";

export const StartNode = memo(({ data, id }: NodeProps) => {
  const handlePlusClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (data.onAddNode) {
      data.onAddNode(id);
    }
  };

  return (
    <div
      className="relative px-6 py-4 shadow-lg rounded-lg border-2 border-green-500 bg-green-50 dark:bg-green-950/20 transition-all hover:shadow-xl group"
    >
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
      <div className="flex items-center gap-2">
        <div className="p-2 bg-green-500 rounded-full">
          <Play className="w-4 h-4 text-white" />
        </div>
        <div>
          <div className="font-bold text-sm text-green-700 dark:text-green-400">
            Campaign Start
          </div>
          <div className="text-xs text-green-600 dark:text-green-500">
            Entry point
          </div>
        </div>
      </div>
      {/* Connecting line */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 w-1 h-16 bg-green-500/60 z-10" />
      {/* Plus button */}
      <button
        onClick={handlePlusClick}
        className="absolute -bottom-[72px] left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center shadow-xl transition-all z-10 border-2 border-white dark:border-gray-800"
      >
        <Plus className="w-5 h-5" />
      </button>
    </div>
  );
});

StartNode.displayName = "StartNode";
