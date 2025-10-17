import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function CampaignDashboard() {
  const [campaignType, setCampaignType] = useState<"email" | "whatsapp">("email");

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/60 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              Campaign Management
            </h2>
            <p className="text-sm text-muted-foreground">Create and manage your email and WhatsApp campaigns</p>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white shadow-lg">
            <Plus className="w-4 h-4 mr-2" />
            Create Campaign
          </Button>
        </div>
      </div>

      {/* Campaign Type Tabs */}
      <div className="bg-white/60 backdrop-blur-sm border-b border-gray-200/50 px-6">
        <Tabs value={campaignType} onValueChange={(v) => setCampaignType(v as "email" | "whatsapp")} className="w-full">
          <TabsList className="bg-gradient-to-r from-gray-50/80 via-blue-50/40 to-purple-50/40 rounded-xl p-1.5 shadow-inner border border-gray-200/30">
            <TabsTrigger 
              value="email"
              className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:via-purple-600 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200 rounded-lg font-semibold"
            >
              <Mail className="w-4 h-4" />
              <span>Email Campaigns</span>
            </TabsTrigger>
            <TabsTrigger 
              value="whatsapp"
              className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:via-purple-600 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200 rounded-lg font-semibold"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Campaigns</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/60 backdrop-blur-sm border-b border-gray-200/50 px-6 py-3">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search campaigns..." 
              className="pl-10 bg-white/80 border-gray-200/80"
            />
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto p-6">
        <Tabs value={campaignType} className="h-full">
          <TabsContent value="email" className="mt-0">
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/60 shadow-lg max-w-md">
                <Mail className="w-16 h-16 mx-auto mb-4 text-purple-600" />
                <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                  No Email Campaigns Yet
                </h3>
                <p className="text-muted-foreground mb-6">
                  Create your first email campaign to reach your segments with personalized messages and track engagement.
                </p>
                <Button className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Email Campaign
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="whatsapp" className="mt-0">
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/60 shadow-lg max-w-md">
                <MessageSquare className="w-16 h-16 mx-auto mb-4 text-purple-600" />
                <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                  No WhatsApp Campaigns Yet
                </h3>
                <p className="text-muted-foreground mb-6">
                  Create your first WhatsApp campaign to send instant messages to your segments and drive engagement.
                </p>
                <Button className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Create WhatsApp Campaign
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
