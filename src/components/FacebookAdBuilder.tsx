
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Copy, BarChart3, DollarSign, MousePointer } from "lucide-react";
import { CampaignCard } from "@/components/CampaignCard";
import { MetricCard } from "@/components/MetricCard";
import { AdPlatformMenu } from "@/components/AdPlatformMenu";

export function FacebookAdBuilder() {
  const recentCampaigns = [
    { id: 1, name: "Summer Sale Campaign", status: "Live", performance: "Good" },
    { id: 2, name: "Product Launch 2024", status: "Draft", performance: "N/A" },
    { id: 3, name: "Holiday Special", status: "Live", performance: "Excellent" },
  ];

  const metrics = [
    { title: "Click-Through Rate", value: "2.4%", icon: MousePointer, trend: "+0.3%" },
    { title: "Total Spend", value: "$1,247", icon: DollarSign, trend: "+12%" },
    { title: "Conversions", value: "156", icon: BarChart3, trend: "+8%" },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Ad Platform Sub-Menu */}
      <AdPlatformMenu />
      
      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-50">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Facebook Ad Builder</h1>
            <p className="text-gray-600">Create and manage your Facebook advertising campaigns with AI-powered tools</p>
          </div>

          {/* Create New Campaign */}
          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 bg-white">
            <CardContent className="p-8 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Create New Campaign</h3>
                <p className="text-gray-600 mb-6">Start building your next Facebook ad campaign with our AI-powered tools and optimization features</p>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white transition-all duration-200 shadow-lg hover:shadow-xl px-8 py-3"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create Campaign
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-8">
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
    </div>
  );
}
