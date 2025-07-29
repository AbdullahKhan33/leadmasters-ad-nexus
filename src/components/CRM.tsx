
import { useState, useMemo, useEffect } from "react";
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
import { CSVImportModal } from "./crm/CSVImportModal";
import { PremiumProvider } from "@/contexts/PremiumContext";
import { PremiumUpgradeModal } from "./premium/PremiumUpgradeModal";
import { SegmentManager } from "./segments/SegmentManager";
import { useAgentPermissions } from "@/hooks/useAgentPermissions";
import { useAuth } from "@/contexts/AuthContext";

export function CRM() {
  const { userRole } = useAuth();
  const { permissions } = useAgentPermissions();
  const [upgradeModal, setUpgradeModal] = useState({ isOpen: false, feature: "" });
  const [csvImportModal, setCsvImportModal] = useState(false);

  // Determine available tabs based on permissions
  const availableTabs = useMemo(() => {
    if (userRole === 'admin') {
      return ['inbox', 'pipeline', 'table', 'segments'];
    }
    
    if (userRole === 'agent' && permissions) {
      const tabs = [];
      if (permissions.crm_inbox) tabs.push('inbox');
      if (permissions.crm_pipeline) tabs.push('pipeline');
      if (permissions.crm_table_view) tabs.push('table');
      if (permissions.crm_segments) tabs.push('segments');
      return tabs;
    }
    
    return ['inbox']; // default fallback
  }, [userRole, permissions]);

  const [activeTab, setActiveTab] = useState("inbox");

  // Update active tab when available tabs change
  useEffect(() => {
    if (availableTabs.length > 0 && !availableTabs.includes(activeTab)) {
      setActiveTab(availableTabs[0]);
    }
  }, [availableTabs, activeTab]);

  const handleUpgrade = () => {
    // Here you would integrate with your payment system
    console.log("Upgrading to premium...");
    setUpgradeModal({ isOpen: false, feature: "" });
  };

  const handleImportComplete = () => {
    // Refresh the data when import is complete
    window.location.reload();
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
              <Button variant="outline" size="sm" className="shadow-sm hover:shadow-md transition-all duration-200 border-gray-200/80 hover:border-purple-200 hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-purple-50/50 hover:text-purple-700">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"/>
                </svg>
                Import from Apollo
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white/60 backdrop-blur-sm border-b border-gray-200/50 px-6 shadow-sm">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className={`grid w-full bg-gradient-to-r from-gray-50/80 via-blue-50/40 to-purple-50/40 rounded-xl p-1.5 shadow-inner border border-gray-200/30`} style={{ gridTemplateColumns: `repeat(${availableTabs.length}, 1fr)` }}>
              {availableTabs.includes('inbox') && (
                <TabsTrigger 
                  value="inbox" 
                  className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:via-purple-600 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gradient-to-r hover:from-blue-50/60 hover:via-purple-50/60 hover:to-pink-50/60 hover:shadow-sm hover:text-purple-700 transition-all duration-200 rounded-lg font-semibold"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Inbox</span>
                </TabsTrigger>
              )}
              {availableTabs.includes('pipeline') && (
                <TabsTrigger 
                  value="pipeline" 
                  className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:via-purple-600 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gradient-to-r hover:from-blue-50/60 hover:via-purple-50/60 hover:to-pink-50/60 hover:shadow-sm hover:text-purple-700 transition-all duration-200 rounded-lg font-semibold"
                >
                  <LayoutGrid className="w-4 h-4" />
                  <span>Pipeline</span>
                </TabsTrigger>
              )}
              {availableTabs.includes('table') && (
                <TabsTrigger 
                  value="table" 
                  className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:via-purple-600 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gradient-to-r hover:from-blue-50/60 hover:via-purple-50/60 hover:to-pink-50/60 hover:shadow-sm hover:text-purple-700 transition-all duration-200 rounded-lg font-semibold"
                >
                  <TableProperties className="w-4 h-4" />
                  <span>Table View</span>
                </TabsTrigger>
              )}
              {availableTabs.includes('segments') && (
                <TabsTrigger 
                  value="segments" 
                  className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:via-purple-600 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gradient-to-r hover:from-blue-50/60 hover:via-purple-50/60 hover:to-pink-50/60 hover:shadow-sm hover:text-purple-700 transition-all duration-200 rounded-lg font-semibold"
                >
                  <Users className="w-4 h-4" />
                  <span>Segments</span>
                </TabsTrigger>
              )}
            </TabsList>
          </Tabs>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          <Tabs value={activeTab} className="h-full">
            {availableTabs.includes('inbox') && (
              <TabsContent value="inbox" className="h-full m-0">
                <CRMInboxView onUpgradeClick={(feature) => setUpgradeModal({ isOpen: true, feature })} />
              </TabsContent>
            )}
            {availableTabs.includes('pipeline') && (
              <TabsContent value="pipeline" className="h-full m-0">
                <CRMKanbanView />
              </TabsContent>
            )}
            {availableTabs.includes('table') && (
              <TabsContent value="table" className="h-full m-0">
                <CRMTableView 
                  onUpgradeClick={(feature) => setUpgradeModal({ isOpen: true, feature })} 
                  onImportClick={() => setCsvImportModal(true)}
                />
              </TabsContent>
            )}
            {availableTabs.includes('segments') && (
              <TabsContent value="segments" className="h-full m-0">
                <div className="h-full p-6">
                  <SegmentManager />
                </div>
              </TabsContent>
            )}
          </Tabs>
        </div>

        <PremiumUpgradeModal
          isOpen={upgradeModal.isOpen}
          onClose={() => setUpgradeModal({ isOpen: false, feature: "" })}
          feature={upgradeModal.feature}
          onUpgrade={handleUpgrade}
        />

        <CSVImportModal
          isOpen={csvImportModal}
          onClose={() => setCsvImportModal(false)}
          onImportComplete={handleImportComplete}
        />
      </div>
    </PremiumProvider>
  );
}
