
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageSquare, 
  Users, 
  TableProperties, 
  Settings,
  LayoutGrid
} from "lucide-react";
import { CRMInboxView } from "./crm/CRMInboxView";
import { CRMKanbanView } from "./crm/CRMKanbanView";
import { CRMTableView } from "./crm/CRMTableView";
import { PremiumProvider } from "@/contexts/PremiumContext";
import { PremiumUpgradeModal } from "./premium/PremiumUpgradeModal";

export function CRM() {
  const [activeTab, setActiveTab] = useState("inbox");
  const [upgradeModal, setUpgradeModal] = useState({ isOpen: false, feature: "" });

  const handleUpgrade = () => {
    // Here you would integrate with your payment system
    console.log("Upgrading to premium...");
    setUpgradeModal({ isOpen: false, feature: "" });
  };

  return (
    <PremiumProvider>
      <div className="h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 flex flex-col">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/60 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                LeadMasters CRM
              </h1>
              <p className="text-gray-600 text-sm font-medium">WhatsApp Lead Management</p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200/50 shadow-sm hover:shadow-md hover:from-green-200 hover:to-emerald-200 hover:border-green-300 transition-all duration-200 cursor-pointer">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                WhatsApp Connected
              </Badge>
              <Button variant="outline" size="sm" className="shadow-sm hover:shadow-md transition-all duration-200 border-gray-200/80 hover:border-purple-200 hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-blue-50/50 hover:text-purple-700">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white/60 backdrop-blur-sm border-b border-gray-200/50 px-6 shadow-sm">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-gray-50/80 via-blue-50/40 to-purple-50/40 rounded-xl p-1.5 shadow-inner border border-gray-200/30">
              <TabsTrigger 
                value="inbox" 
                className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:via-purple-600 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gradient-to-r hover:from-blue-50/60 hover:via-purple-50/60 hover:to-pink-50/60 hover:shadow-sm hover:text-purple-700 transition-all duration-200 rounded-lg font-semibold"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Inbox</span>
              </TabsTrigger>
              <TabsTrigger 
                value="pipeline" 
                className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:via-purple-600 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gradient-to-r hover:from-blue-50/60 hover:via-purple-50/60 hover:to-pink-50/60 hover:shadow-sm hover:text-purple-700 transition-all duration-200 rounded-lg font-semibold"
              >
                <LayoutGrid className="w-4 h-4" />
                <span>Pipeline</span>
              </TabsTrigger>
              <TabsTrigger 
                value="table" 
                className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:via-purple-600 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gradient-to-r hover:from-blue-50/60 hover:via-purple-50/60 hover:to-pink-50/60 hover:shadow-sm hover:text-purple-700 transition-all duration-200 rounded-lg font-semibold"
              >
                <TableProperties className="w-4 h-4" />
                <span>Table View</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          <Tabs value={activeTab} className="h-full">
            <TabsContent value="inbox" className="h-full m-0">
              <CRMInboxView onUpgradeClick={(feature) => setUpgradeModal({ isOpen: true, feature })} />
            </TabsContent>
            <TabsContent value="pipeline" className="h-full m-0">
              <CRMKanbanView />
            </TabsContent>
            <TabsContent value="table" className="h-full m-0">
              <CRMTableView onUpgradeClick={(feature) => setUpgradeModal({ isOpen: true, feature })} />
            </TabsContent>
          </Tabs>
        </div>

        <PremiumUpgradeModal
          isOpen={upgradeModal.isOpen}
          onClose={() => setUpgradeModal({ isOpen: false, feature: "" })}
          feature={upgradeModal.feature}
          onUpgrade={handleUpgrade}
        />
      </div>
    </PremiumProvider>
  );
}
