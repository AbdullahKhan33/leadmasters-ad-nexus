
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Eye, Heart, DollarSign, BarChart3, ArrowLeft } from "lucide-react";
import { CampaignCard } from "@/components/CampaignCard";
import { MetricCard } from "@/components/MetricCard";
import { InstagramAdCampaignFlow } from "./InstagramAdCampaignFlow";

export function InstagramAdBuilder() {
  const [showCampaignFlow, setShowCampaignFlow] = useState(false);

  const recentCampaigns = [
    { id: 1, name: "Story Ads Campaign", status: "Live", performance: "Excellent" },
    { id: 2, name: "Reel Promotion 2024", status: "Draft", performance: "N/A" },
    { id: 3, name: "Feed Post Boost", status: "Live", performance: "Good" },
  ];

  const metrics = [
    { title: "Impressions", value: "45.2K", icon: Eye, trend: "+15%" },
    { title: "Engagement Rate", value: "3.8%", icon: Heart, trend: "+0.5%" },
    { title: "Total Spend", value: "$892", icon: DollarSign, trend: "+8%" },
    { title: "Conversions", value: "124", icon: BarChart3, trend: "+12%" },
  ];

  if (showCampaignFlow) {
    return (
      <div className="flex flex-col">
        {/* Back Button */}
        <div className="p-3 border-b border-gray-200 bg-white">
          <Button
            variant="ghost"
            onClick={() => setShowCampaignFlow(false)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Button>
        </div>
        <InstagramAdCampaignFlow />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#7C3AED] to-[#D946EF] bg-clip-text text-transparent mb-1">Instagram Ad Builder</h1>
        <p className="text-sm text-gray-600">Create and manage your Instagram advertising campaigns with AI-powered tools</p>
      </div>

      {/* Create New Campaign */}
      <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 bg-white">
        <CardContent className="p-6 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Plus className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Create New Campaign</h3>
            <p className="text-sm text-gray-600 mb-4">Start building your next Instagram ad campaign with our AI-powered tools and optimization features</p>
            <Button 
              size="default" 
              className="bg-gradient-to-r from-[#7C3AED] to-[#D946EF] hover:from-purple-700 hover:to-pink-600 text-white transition-all duration-200 shadow-lg hover:shadow-xl px-6 py-2 text-sm"
              onClick={() => setShowCampaignFlow(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Campaign
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Campaigns */}
        <div className="lg:col-span-2">
          <Card className="border border-gray-200 shadow-sm bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-900">Recent Campaigns</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
              <div className="pt-3 border-t border-gray-100">
                <Button variant="ghost" className="w-full text-purple-600 hover:text-purple-700 hover:bg-purple-50 transition-colors duration-200 text-sm">
                  View All Campaigns
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Overview */}
        <div>
          <Card className="border border-gray-200 shadow-sm bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-900">Analytics Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {metrics.map((metric, index) => (
                <MetricCard key={index} metric={metric} />
              ))}
              <div className="pt-3 border-t border-gray-100">
                <Button variant="ghost" className="w-full text-purple-600 hover:text-purple-700 hover:bg-purple-50 transition-colors duration-200 text-sm">
                  View Detailed Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
