
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Zap, 
  MessageSquare, 
  Star, 
  Lock,
  Clock,
  Target,
  TrendingUp
} from "lucide-react";
import { usePremium } from "@/contexts/PremiumContext";
import { LockedFeatureTooltip } from "@/components/premium/LockedFeatureTooltip";
import { UpsellPrompt } from "@/components/premium/UpsellPrompt";

interface AutomationsUpsellProps {
  onUpgradeClick: (feature: string) => void;
}

const automationFlows = [
  {
    id: "welcome-series",
    title: "Welcome Series",
    description: "Automated welcome sequence for new leads",
    isAI: false,
    enabled: true,
    icon: MessageSquare
  },
  {
    id: "follow-up-basic",
    title: "Basic Follow-up",
    description: "Simple reminder sequence for unresponsive leads",
    isAI: false,
    enabled: true,
    icon: Clock
  },
  {
    id: "smart-drips",
    title: "Smart WhatsApp Drips",
    description: "AI-powered personalized follow-up sequences",
    isAI: true,
    isPremium: true,
    enabled: false,
    icon: Zap,
    features: ["Personalized timing", "Smart content adaptation", "Behavioral triggers"]
  },
  {
    id: "review-flows",
    title: "Post-Sale Review Flows",
    description: "Automated review collection and customer feedback",
    isAI: true,
    isPremium: true,
    enabled: false,
    icon: Star,
    features: ["Intelligent timing", "Review platform optimization", "Follow-up automation"]
  },
  {
    id: "lead-scoring",
    title: "AI Lead Scoring Automation",
    description: "Automatically prioritize and route high-value leads",
    isAI: true,
    isPremium: true,
    enabled: false,
    icon: Target,
    features: ["Real-time scoring", "Behavior analysis", "Auto-assignment"]
  }
];

export function AutomationsUpsell({ onUpgradeClick }: AutomationsUpsellProps) {
  const { isPremium, premiumFeatures } = usePremium();
  
  const canUseSmartDrips = isPremium && premiumFeatures.smartWhatsAppDrips;
  const canUseReviewFlows = isPremium && premiumFeatures.postSaleReviewFlows;
  const canUseLeadScoring = isPremium && premiumFeatures.aiLeadScoring;

  const getFlowStatus = (flow: any) => {
    if (!flow.isPremium) return { enabled: flow.enabled, canToggle: true };
    
    switch (flow.id) {
      case 'smart-drips':
        return { enabled: canUseSmartDrips && flow.enabled, canToggle: canUseSmartDrips };
      case 'review-flows':
        return { enabled: canUseReviewFlows && flow.enabled, canToggle: canUseReviewFlows };
      case 'lead-scoring':
        return { enabled: canUseLeadScoring && flow.enabled, canToggle: canUseLeadScoring };
      default:
        return { enabled: false, canToggle: false };
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">CRM Automations</h2>
          <p className="text-gray-600">Set up automated workflows to nurture your leads</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white">
          <Zap className="w-4 h-4 mr-2" />
          Create Automation
        </Button>
      </div>

      {/* Premium Features Banner */}
      {!isPremium && (
        <UpsellPrompt
          message="Unlock AI-powered automations to 10x your lead conversion"
          onUpgrade={() => onUpgradeClick("Premium Automations")}
          variant="banner"
        />
      )}

      {/* Automation Flows */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {automationFlows.map((flow) => {
          const status = getFlowStatus(flow);
          const IconComponent = flow.icon;
          
          return (
            <Card key={flow.id} className={`border transition-all duration-300 ${
              flow.isPremium && !status.canToggle 
                ? 'border-gray-300 bg-gray-50/50' 
                : status.enabled 
                  ? 'border-green-200 bg-green-50/50 hover:shadow-md'
                  : 'border-gray-200 hover:shadow-md'
            }`}>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      flow.isPremium && !status.canToggle
                        ? 'bg-gray-200'
                        : status.enabled
                          ? 'bg-gradient-to-r from-green-100 to-emerald-100'
                          : flow.isAI
                            ? 'bg-gradient-to-r from-purple-100 to-pink-100'
                            : 'bg-gray-100'
                    }`}>
                      <IconComponent className={`w-5 h-5 ${
                        flow.isPremium && !status.canToggle
                          ? 'text-gray-500'
                          : status.enabled
                            ? 'text-green-600'
                            : flow.isAI
                              ? 'text-purple-600'
                              : 'text-gray-600'
                      }`} />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <CardTitle className={`text-lg ${
                          flow.isPremium && !status.canToggle ? 'text-gray-500' : 'text-gray-900'
                        }`}>
                          {flow.title}
                        </CardTitle>
                        {flow.isAI && (
                          <Badge className={`${
                            flow.isPremium && !status.canToggle
                              ? 'bg-gray-100 text-gray-500'
                              : 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700'
                          }`}>
                            AI
                          </Badge>
                        )}
                        {flow.isPremium && !status.canToggle && (
                          <Lock className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {flow.isPremium && !status.canToggle ? (
                    <LockedFeatureTooltip message="This AI automation is a Premium feature">
                      <Switch disabled checked={false} />
                    </LockedFeatureTooltip>
                  ) : (
                    <Switch checked={status.enabled} disabled={!status.canToggle} />
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className={`text-sm mb-4 ${
                  flow.isPremium && !status.canToggle ? 'text-gray-500' : 'text-gray-600'
                }`}>
                  {flow.description}
                </p>
                
                {flow.features && (
                  <div className="space-y-2 mb-4">
                    {flow.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <TrendingUp className={`w-3 h-3 ${
                          flow.isPremium && !status.canToggle ? 'text-gray-400' : 'text-purple-500'
                        }`} />
                        <span className={`text-xs ${
                          flow.isPremium && !status.canToggle ? 'text-gray-500' : 'text-gray-600'
                        }`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                
                {flow.isPremium && !status.canToggle ? (
                  <UpsellPrompt
                    message=""
                    onUpgrade={() => onUpgradeClick(`${flow.title} Automation`)}
                    variant="inline"
                    className="justify-center"
                  />
                ) : (
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      Configure
                    </Button>
                    <Button size="sm" variant="ghost">
                      View Stats
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Performance Stats (if Premium) */}
      {isPremium && (
        <Card className="border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <span>Automation Performance</span>
              <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700">
                AI Insights
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">87%</p>
                <p className="text-sm text-gray-600">Response Rate</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">+340%</p>
                <p className="text-sm text-gray-600">Conversion Improvement</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">24h</p>
                <p className="text-sm text-gray-600">Avg. Response Time</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
