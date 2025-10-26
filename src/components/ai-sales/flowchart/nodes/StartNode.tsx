import { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { Play } from "lucide-react";

export const StartNode = memo(({ data }: NodeProps) => {
  return (
    <div className="px-6 py-4 shadow-lg rounded-lg border-2 border-green-500 bg-green-50 dark:bg-green-950/20">
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
    </div>
  );
});

StartNode.displayName = "StartNode";
