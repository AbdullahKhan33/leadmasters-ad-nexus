
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Sparkles, 
  Lock,
  Zap,
  Brain
} from "lucide-react";
import { usePremium } from "@/contexts/PremiumContext";
import { UpsellPrompt } from "@/components/premium/UpsellPrompt";

interface TemplatesUpsellProps {
  onUpgradeClick: (feature: string) => void;
}

const mockTemplates = [
  {
    id: "1",
    title: "Welcome New Lead",
    content: "Hi {name}! Thanks for your interest in our services. I'd love to learn more about your needs...",
    category: "Initial Contact",
    isAI: false
  },
  {
    id: "2", 
    title: "Follow Up After Quote",
    content: "Hi {name}, I wanted to follow up on the quote I sent yesterday. Do you have any questions?",
    category: "Follow Up",
    isAI: false
  }
];

const mockAITemplates = [
  {
    id: "ai-1",
    title: "Personalized Product Recommendation",
    content: "Hi {name}! Based on your {industry} background and {pain_point}, I think our {solution} would be perfect...",
    category: "AI Suggested",
    confidence: 95,
    reason: "High conversion for similar leads"
  },
  {
    id: "ai-2",
    title: "Urgency-Based Follow Up",
    content: "Hi {name}, I noticed you haven't responded to my last message. Many of my {industry} clients...",
    category: "AI Suggested", 
    confidence: 87,
    reason: "Lead showing buying signals"
  },
  {
    id: "ai-3",
    title: "Social Proof Approach",
    content: "Hi {name}! I just helped another {industry} company achieve {result}. Would you like to hear how?",
    category: "AI Suggested",
    confidence: 92,
    reason: "Similar lead converted with this approach"
  }
];

export function TemplatesUpsell({ onUpgradeClick }: TemplatesUpsellProps) {
  const { isPremium, premiumFeatures } = usePremium();
  const canUseAITemplates = isPremium && premiumFeatures.aiSuggestedTemplates;

  return (
    <div className="space-y-6">
      {/* Regular Templates */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Message Templates</h3>
          <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600">
            <MessageSquare className="w-4 h-4 mr-2" />
            Create Template
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockTemplates.map((template) => (
            <Card key={template.id} className="border border-gray-200 hover:shadow-md transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{template.title}</CardTitle>
                  <Badge variant="outline" className="text-xs">
                    {template.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {template.content}
                </p>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    Use Template
                  </Button>
                  <Button size="sm" variant="ghost">
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* AI Suggested Templates Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold text-gray-900">AI Recommended Templates</h3>
            {!canUseAITemplates && <Lock className="w-4 h-4 text-gray-400" />}
          </div>
          {canUseAITemplates && (
            <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700">
              <Brain className="w-3 h-3 mr-1" />
              AI Powered
            </Badge>
          )}
        </div>

        {!canUseAITemplates ? (
          <Card className="border-2 border-dashed border-gray-300 bg-gray-50/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gray-200/20"></div>
            <CardContent className="p-8 relative">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-gray-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Recommended Templates powered by AI
                </h3>
                <p className="text-gray-600 mb-6">
                  Get personalized template suggestions based on your lead data and conversation history
                </p>
                <UpsellPrompt
                  message=""
                  onUpgrade={() => onUpgradeClick("AI Suggested Templates")}
                  variant="centered"
                  size="default"
                />
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockAITemplates.map((template) => (
              <Card key={template.id} className="border border-purple-200 bg-gradient-to-r from-purple-50/50 to-pink-50/50 hover:shadow-md transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{template.title}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs">
                        <Zap className="w-3 h-3 mr-1" />
                        {template.confidence}%
                      </Badge>
                    </div>
                  </div>
                  <p className="text-xs text-purple-600">{template.reason}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {template.content}
                  </p>
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white">
                      Use AI Template
                    </Button>
                    <Button size="sm" variant="outline">
                      Customize
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
