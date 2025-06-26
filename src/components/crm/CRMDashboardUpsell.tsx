
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  TrendingUp, 
  MessageSquare, 
  Calendar,
  Zap,
  Target,
  Clock
} from "lucide-react";
import { usePremium } from "@/contexts/PremiumContext";
import { UpsellPrompt } from "@/components/premium/UpsellPrompt";

interface CRMDashboardUpsellProps {
  onUpgradeClick: (feature: string) => void;
}

export function CRMDashboardUpsell({ onUpgradeClick }: CRMDashboardUpsellProps) {
  const { isPremium } = usePremium();

  const stats = [
    { label: "Total Leads", value: "156", icon: Users, color: "blue" },
    { label: "Active Conversations", value: "42", icon: MessageSquare, color: "green" },
    { label: "This Week", value: "+23", icon: TrendingUp, color: "purple" },
    { label: "Scheduled Calls", value: "8", icon: Calendar, color: "orange" }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border border-gray-200 hover:shadow-md transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-full bg-${stat.color}-100 flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Insights Upsell */}
      {!isPremium && (
        <UpsellPrompt
          message="Unlock AI insights like Lead Scoring & Hot Lead detection"
          onUpgrade={() => onUpgradeClick("AI Insights")}
          variant="banner"
          className="mb-6"
        />
      )}

      {/* Premium AI Features (if unlocked) */}
      {isPremium && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700">
                  AI Powered
                </Badge>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Hot Leads</h3>
              <p className="text-2xl font-bold text-purple-600 mb-1">12</p>
              <p className="text-sm text-gray-600">Leads with 90%+ AI score</p>
            </CardContent>
          </Card>

          <Card className="border border-orange-200 bg-gradient-to-r from-orange-50 to-red-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <Badge className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-700">
                  AI Suggested
                </Badge>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Priority Actions</h3>
              <p className="text-2xl font-bold text-orange-600 mb-1">7</p>
              <p className="text-sm text-gray-600">Urgent follow-ups needed</p>
            </CardContent>
          </Card>

          <Card className="border border-green-200 bg-gradient-to-r from-green-50 to-teal-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <Badge className="bg-gradient-to-r from-green-100 to-teal-100 text-green-700">
                  Automated
                </Badge>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Active Drips</h3>
              <p className="text-2xl font-bold text-green-600 mb-1">5</p>
              <p className="text-sm text-gray-600">AI sequences running</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
