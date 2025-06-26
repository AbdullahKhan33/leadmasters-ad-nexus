
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Sparkles } from "lucide-react";

interface ServicesBannerProps {
  onUpgradeClick: () => void;
}

export function ServicesBanner({ onUpgradeClick }: ServicesBannerProps) {
  const [isDismissed, setIsDismissed] = useState(() => {
    return localStorage.getItem('servicesBannerDismissed') === 'true';
  });

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('servicesBannerDismissed', 'true');
  };

  if (isDismissed) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-3 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span className="text-sm text-purple-700 font-medium">
            🚀 Unlock AI Lead Scoring, WhatsApp Automations & More — Available in Premium Plans.
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            onClick={onUpgradeClick}
            size="sm"
            className="bg-purple-600 hover:bg-purple-700 text-white text-xs px-3 py-1 h-7"
          >
            🔒 Upgrade to Premium
          </Button>
          <Button
            onClick={handleDismiss}
            variant="ghost"
            size="sm"
            className="text-purple-600 hover:bg-purple-100 p-1 h-7 w-7"
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
