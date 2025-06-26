
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Lock } from "lucide-react";
import { ReactNode } from "react";

interface LockedFeatureTooltipProps {
  children: ReactNode;
  message: string;
  className?: string;
}

export function LockedFeatureTooltip({ children, message, className = "" }: LockedFeatureTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`cursor-help ${className}`}>
            {children}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="flex items-center space-x-2">
            <Lock className="w-3 h-3" />
            <span>{message}</span>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
