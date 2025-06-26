
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface CRMAIFeaturesBannerProps {
  onUpgradeClick: (feature: string) => void;
}

export function CRMAIFeaturesBanner({ onUpgradeClick }: CRMAIFeaturesBannerProps) {
  return (
    <Card className="border-2 border-dashed border-purple-300 bg-gradient-to-r from-purple-50 to-pink-50 flex-shrink-0">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <Star className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Unlock AI-Powered Lead Management</h3>
              <p className="text-sm text-gray-600">Get AI lead scoring, smart suggestions, and automated actions</p>
            </div>
          </div>
          <Button
            onClick={() => onUpgradeClick("AI Lead Management")}
            className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white"
          >
            Upgrade Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
