
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface ServicesFooterProps {
  onUpgradeClick: () => void;
}

export function ServicesFooter({ onUpgradeClick }: ServicesFooterProps) {
  return (
    <div className="mt-12 p-6 bg-gradient-to-r from-gray-50 to-purple-50 rounded-lg border border-gray-200 text-center">
      <p className="text-gray-700 mb-4 font-medium">
        Want smarter, AI-driven marketing? Premium plans unlock advanced automations.
      </p>
      <Button
        onClick={onUpgradeClick}
        className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white"
      >
        <Sparkles className="w-4 h-4 mr-2" />
        Explore Premium Plans
      </Button>
    </div>
  );
}
