
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Sparkles, Zap, Bot, Target } from "lucide-react";

interface PremiumUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature?: string;
  onUpgrade: () => void;
}

export function PremiumUpgradeModal({ isOpen, onClose, feature, onUpgrade }: PremiumUpgradeModalProps) {
  const premiumFeatures = [
    {
      icon: Target,
      title: "AI Lead Scoring",
      description: "Automatically score and prioritize your leads"
    },
    {
      icon: Bot,
      title: "AI Suggested Templates",
      description: "Smart template recommendations for better responses"
    },
    {
      icon: Zap,
      title: "Smart WhatsApp Drips",
      description: "Automated follow-up sequences powered by AI"
    },
    {
      icon: Sparkles,
      title: "Post-Sale Review Flows",
      description: "Automated review collection and customer feedback"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-2">
            Upgrade to Premium
          </DialogTitle>
          {feature && (
            <p className="text-gray-600">
              Unlock <span className="font-semibold text-purple-600">{feature}</span> and access all premium AI features
            </p>
          )}
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {premiumFeatures.map((item, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{item.title}</h3>
                  <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center p-6 bg-gradient-to-r from-gray-50 to-purple-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Badge className="bg-gradient-to-r from-purple-600 to-pink-500 text-white">
                Premium Plan
              </Badge>
              <span className="text-2xl font-bold text-gray-900">$29/month</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-4">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>All AI features included</span>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Maybe Later
            </Button>
            <Button
              onClick={onUpgrade}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Upgrade Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
