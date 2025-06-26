
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, Sparkles } from "lucide-react";

interface PremiumLockCardProps {
  title: string;
  description: string;
  onUpgrade: () => void;
  className?: string;
}

export function PremiumLockCard({ title, description, onUpgrade, className = "" }: PremiumLockCardProps) {
  return (
    <Card className={`border-2 border-dashed border-gray-300 bg-gray-50/50 ${className}`}>
      <CardContent className="p-6 text-center">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center mx-auto mb-4">
          <Lock className="w-6 h-6 text-gray-500" />
        </div>
        <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <Button
          onClick={onUpgrade}
          size="sm"
          className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Upgrade Now
        </Button>
      </CardContent>
    </Card>
  );
}
