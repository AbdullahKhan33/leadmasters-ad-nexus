
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sparkles, Bot, Target, Zap } from "lucide-react";

interface PostPurchaseUpsellModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
  purchasedItem: string;
}

export function PostPurchaseUpsellModal({ 
  isOpen, 
  onClose, 
  onUpgrade, 
  purchasedItem 
}: PostPurchaseUpsellModalProps) {
  const aiFeatures = [
    {
      icon: Target,
      title: "AI Lead Scoring",
      description: "Automatically prioritize your best prospects"
    },
    {
      icon: Bot,
      title: "Smart WhatsApp Automations",
      description: "Automated follow-ups that convert leads"
    },
    {
      icon: Zap,
      title: "AI Content Generation",
      description: "Create engaging content that drives results"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl font-bold text-gray-900 mb-2">
            Boost Your New {purchasedItem} with AI-Powered Features
          </DialogTitle>
          <p className="text-sm text-gray-600">
            Take your investment to the next level with AI-driven lead scoring & smart automations
          </p>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid gap-3">
            {aiFeatures.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-3 h-3 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">{feature.title}</h4>
                  <p className="text-xs text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex space-x-3 pt-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 text-sm"
            >
              Maybe later
            </Button>
            <Button
              onClick={onUpgrade}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white text-sm"
            >
              <Sparkles className="w-3 h-3 mr-1" />
              Upgrade to Premium Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
