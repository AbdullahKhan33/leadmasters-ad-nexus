import { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { StopCircle } from "lucide-react";

export const EndNode = memo(({ data }: NodeProps) => {
  return (
    <div className="px-6 py-4 shadow-lg rounded-lg border-2 border-red-500 bg-red-50 dark:bg-red-950/20">
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      <div className="flex items-center gap-2">
        <div className="p-2 bg-red-500 rounded-full">
          <StopCircle className="w-4 h-4 text-white" />
        </div>
        <div>
          <div className="font-bold text-sm text-red-700 dark:text-red-400">
            End Campaign
          </div>
          <div className="text-xs text-red-600 dark:text-red-500">
            Stop workflow
          </div>
        </div>
      </div>
    </div>
  );
});

EndNode.displayName = "EndNode";
