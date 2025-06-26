
import { Badge } from "@/components/ui/badge";
import { Lock, Sparkles } from "lucide-react";

interface PremiumBadgeProps {
  isLocked?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function PremiumBadge({ isLocked = false, children, className = "" }: PremiumBadgeProps) {
  if (isLocked) {
    return (
      <Badge className={`bg-gray-100 text-gray-500 border-gray-300 ${className}`}>
        <Lock className="w-3 h-3 mr-1" />
        {children}
      </Badge>
    );
  }

  return (
    <Badge className={`bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200 ${className}`}>
      <Sparkles className="w-3 h-3 mr-1" />
      {children}
    </Badge>
  );
}
