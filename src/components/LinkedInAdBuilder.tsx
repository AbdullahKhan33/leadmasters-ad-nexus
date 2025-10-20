
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Copy, BarChart3, DollarSign, MousePointer, Users, ArrowLeft } from "lucide-react";
import { CampaignCard } from "@/components/CampaignCard";
import { MetricCard } from "@/components/MetricCard";
import { LinkedInAdCampaignFlow } from "./LinkedInAdCampaignFlow";

export function LinkedInAdBuilder() {
  const [showCampaignFlow, setShowCampaignFlow] = useState(false);

  const recentCampaigns = [
    { id: 1, name: "B2B Lead Generation", status: "Live", performance: "Excellent" },
    { id: 2, name: "Professional Services 2024", status: "Draft", performance: "N/A" },
    { id: 3, name: "Industry Thought Leadership", status: "Live", performance: "Good" },
  ];

  const metrics = [
    { title: "Click-Through Rate", value: "4.1%", icon: MousePointer, trend: "+1.2%" },
    { title: "Impressions", value: "89.3K", icon: BarChart3, trend: "+18%" },
    { title: "Total Spend", value: "$3,247", icon: DollarSign, trend: "+25%" },
    { title: "Lead Generation Count", value: "287", icon: Users, trend: "+32%" },
  ];

  if (showCampaignFlow) {
    return (
      <div className="flex flex-col">
        {/* Back Button */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <Button
            variant="ghost"
            onClick={() => setShowCampaignFlow(false)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Button>
        </div>
        <LinkedInAdCampaignFlow />
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#7C3AED] to-[#D946EF] bg-clip-text text-transparent mb-2">LinkedIn Campaign Hub</h1>
          <p className="text-gray-600">Create and manage your LinkedIn advertising campaigns with AI-powered tools for B2B growth</p>
        </div>

        {/* Create New Campaign */}
        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 bg-white">
          <CardContent className="p-8 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Create New Campaign</h3>
              <p className="text-gray-600 mb-6">Start building your next LinkedIn ad campaign with our AI-powered tools for B2B growth and lead generation</p>
              <Button 
                size="default" 
                className="bg-gradient-to-r from-[#7C3AED] to-[#D946EF] hover:from-purple-700 hover:to-pink-600 text-white transition-all duration-200 shadow-lg hover:shadow-xl px-6 py-2.5"
                onClick={() => setShowCampaignFlow(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Campaign
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Recent Campaigns */}
          <div className="lg:col-span-2">
            <Card className="border border-gray-200 shadow-sm bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold text-gray-900">Recent Campaigns</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentCampaigns.map((campaign) => (
                  <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
                <div className="pt-4 border-t border-gray-100">
                  <Button variant="ghost" className="w-full text-purple-600 hover:text-purple-700 hover:bg-purple-50 transition-colors duration-200">
                    View All Campaigns
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analytics Overview */}
          <div>
            <Card className="border border-gray-200 shadow-sm bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold text-gray-900">Analytics Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {metrics.map((metric, index) => (
                  <MetricCard key={index} metric={metric} />
                ))}
                <div className="pt-4 border-t border-gray-100">
                  <Button variant="ghost" className="w-full text-purple-600 hover:text-purple-700 hover:bg-purple-50 transition-colors duration-200">
                    View Detailed Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
