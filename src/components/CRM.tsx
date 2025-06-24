
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
import { CRMAutomations } from "./crm/CRMAutomations";

export function CRM() {
  const [activeTab, setActiveTab] = useState("inbox");

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">LeadMasters CRM</h1>
            <p className="text-gray-600 text-sm">WhatsApp Lead Management</p>
          </div>
          <div className="flex items-center space-x-3">
            <Badge className="bg-green-100 text-green-800 border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              WhatsApp Connected
            </Badge>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 px-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-50 rounded-lg p-1">
            <TabsTrigger 
              value="inbox" 
              className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Inbox</span>
            </TabsTrigger>
            <TabsTrigger 
              value="pipeline" 
              className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Pipeline</span>
            </TabsTrigger>
            <TabsTrigger 
              value="table" 
              className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <TableProperties className="w-4 h-4" />
              <span>Table View</span>
            </TabsTrigger>
            <TabsTrigger 
              value="automations" 
              className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <Settings className="w-4 h-4" />
              <span>Automations</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        <Tabs value={activeTab} className="h-full">
          <TabsContent value="inbox" className="h-full m-0">
            <CRMInboxView />
          </TabsContent>
          <TabsContent value="pipeline" className="h-full m-0">
            <CRMKanbanView />
          </TabsContent>
          <TabsContent value="table" className="h-full m-0">
            <CRMTableView />
          </TabsContent>
          <TabsContent value="automations" className="h-full m-0">
            <CRMAutomations />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
