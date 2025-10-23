import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Bot, Workflow, Plug, TrendingUp, BarChart3, Plus, MessageCircle, UserCheck, Calendar, RefreshCw, Globe, Mail, MessageSquare, Phone, Table } from "lucide-react";
import { AutomationPipeline } from "./ai-sales/AutomationPipeline";
import { WorkflowTemplateCard } from "./ai-sales/WorkflowTemplateCard";
import { IntegrationCard } from "./ai-sales/IntegrationCard";
import { AutomationAnalytics } from "./ai-sales/AutomationAnalytics";
import { AllLeadsTableView, TableFilters } from "./ai-sales/AllLeadsTableView";
import { Lead } from "@/data/dummyLeads";

export function AISalesAutomation() {
  const [activeTab, setActiveTab] = useState<string>('pipeline');
  const [tableFilters, setTableFilters] = useState<Partial<TableFilters> | null>(null);

  const handleNavigateToTable = (filters: Partial<TableFilters>) => {
    setTableFilters(filters);
    setActiveTab('table');
  };

  const handleLeadClick = (leadId: string) => {
    // Lead detail modal is handled in AutomationPipeline
  };
  return (
    <div className="h-full w-full overflow-auto bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/20">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-500 bg-clip-text text-transparent flex items-center gap-3">
              <Bot className="w-8 h-8 text-purple-600" />
              AI Sales Automation
            </h1>
            <p className="text-muted-foreground mt-1">
              Automate lead qualification, nurturing, and conversion with AI
            </p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-gradient-to-r from-purple-50/80 via-pink-50/40 to-blue-50/40 rounded-xl p-1.5 shadow-inner border border-purple-200/30">
            <TabsTrigger 
              value="pipeline" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:via-pink-600 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-purple-50/60 transition-all duration-200 rounded-lg font-semibold flex items-center gap-2"
            >
              <TrendingUp className="w-4 h-4" />
              Pipeline
            </TabsTrigger>
            <TabsTrigger 
              value="table" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:via-pink-600 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-purple-50/60 transition-all duration-200 rounded-lg font-semibold flex items-center gap-2"
            >
              <Table className="w-4 h-4" />
              Table View
            </TabsTrigger>
            <TabsTrigger 
              value="workflows" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:via-pink-600 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-purple-50/60 transition-all duration-200 rounded-lg font-semibold flex items-center gap-2"
            >
              <Workflow className="w-4 h-4" />
              Workflows
            </TabsTrigger>
            <TabsTrigger 
              value="integrations" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:via-pink-600 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-purple-50/60 transition-all duration-200 rounded-lg font-semibold flex items-center gap-2"
            >
              <Plug className="w-4 h-4" />
              Integrations
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:via-pink-600 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-purple-50/60 transition-all duration-200 rounded-lg font-semibold flex items-center gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Pipeline Tab */}
          <TabsContent value="pipeline" className="space-y-4 mt-6">
            <AutomationPipeline 
              onNavigateToTable={handleNavigateToTable}
              onLeadClick={handleLeadClick}
            />
          </TabsContent>

          {/* Table View Tab */}
          <TabsContent value="table" className="space-y-4 mt-6">
            <AllLeadsTableView 
              initialFilters={tableFilters || undefined}
              onLeadClick={handleLeadClick}
            />
          </TabsContent>

          {/* Workflows Tab */}
          <TabsContent value="workflows" className="space-y-4 mt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold">Workflow Templates</h2>
                <p className="text-sm text-muted-foreground">Pre-built automation sequences for lead nurturing</p>
              </div>
              <Button className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-500 hover:opacity-90">
                <Plus className="w-4 h-4 mr-2" />
                Create Custom Workflow
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <WorkflowTemplateCard
                name="No Reply Follow-up Sequence"
                description="Automated reminder system"
                icon={MessageCircle}
                activeLeads={3}
                successRate="42%"
                avgTime="36 hours"
                steps="D1 (24h) → D2 (48h) → D3 (72h) → Long-term"
                isActive={true}
                type="Automated reminder"
              />
              <WorkflowTemplateCard
                name="Qualified Lead → Sales Routing"
                description="Intelligent auto-assignment"
                icon={UserCheck}
                activeLeads={2}
                successRate="87%"
                avgTime="45 minutes"
                steps="AI Qualify → Assign Round-robin → Notify Agent → Check follow-up"
                isActive={true}
                type="Auto-assignment"
              />
              <WorkflowTemplateCard
                name="7-Day Nurturing Sequence"
                description="Progressive engagement campaign"
                icon={Calendar}
                activeLeads={3}
                successRate="68%"
                avgTime="6.5 days"
                steps="D1 intro → D3 properties → D5 tour → D7 interest check"
                isActive={true}
                type="Engagement campaign"
              />
              <WorkflowTemplateCard
                name="Long-Term Nurturing Pool"
                description="Re-engagement automation"
                icon={RefreshCw}
                activeLeads={1}
                successRate="15%"
                avgTime="15 days/loop"
                steps="Every 15 days → Check interest → Branch logic"
                isActive={true}
                type="Low-touch re-engagement"
              />
            </div>
          </TabsContent>

          {/* Integrations Tab */}
          <TabsContent value="integrations" className="space-y-6 mt-6">
            {/* Lead Sources Section */}
            <div>
              <h2 className="text-xl font-semibold mb-1">Lead Source Integrations</h2>
              <p className="text-sm text-muted-foreground mb-4">Connect platforms to automatically ingest leads</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <IntegrationCard
                  name="99acres"
                  icon={Globe}
                  isConnected={true}
                  status="Webhook URL configured"
                  stats={[
                    { label: "Last sync", value: "2 hours ago" },
                    { label: "Leads today", value: "12" }
                  ]}
                  actionLabel="Test Connection"
                />
                <IntegrationCard
                  name="Meta Lead Ads"
                  icon={Globe}
                  isConnected={true}
                  status="OAuth authorized (45 days left)"
                  stats={[
                    { label: "Ad accounts", value: "2 linked" },
                    { label: "Leads today", value: "8" }
                  ]}
                  actionLabel="Reconnect"
                />
                <IntegrationCard
                  name="MagicBricks"
                  icon={Globe}
                  isConnected={false}
                  status="Setup required"
                  actionLabel="Connect Now"
                />
                <IntegrationCard
                  name="Housing.com"
                  icon={Globe}
                  isConnected={false}
                  actionLabel="Coming Soon"
                  isFuture={true}
                />
                <IntegrationCard
                  name="JustDial"
                  icon={Globe}
                  isConnected={false}
                  actionLabel="Request Integration"
                />
                <IntegrationCard
                  name="Custom API"
                  icon={Plug}
                  isConnected={true}
                  status="API Key configured"
                  stats={[
                    { label: "Endpoint", value: "/api/v1/leads" },
                    { label: "Leads today", value: "3" }
                  ]}
                  actionLabel="View Docs"
                />
                <IntegrationCard
                  name="Instagram Lead Forms"
                  icon={Globe}
                  isConnected={false}
                  actionLabel="Coming Soon"
                  isFuture={true}
                />
                <IntegrationCard
                  name="Google Ads"
                  icon={Globe}
                  isConnected={false}
                  actionLabel="Coming Soon"
                  isFuture={true}
                />
              </div>
            </div>

            {/* Message Channels Section */}
            <div>
              <h2 className="text-xl font-semibold mb-1">Message Channels</h2>
              <p className="text-sm text-muted-foreground mb-4">Configure outbound messaging platforms</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <IntegrationCard
                  name="WhatsApp Business API"
                  icon={MessageSquare}
                  isConnected={true}
                  status="Phone: +91 ••••• 67890"
                  stats={[
                    { label: "Sent today", value: "24" },
                    { label: "Delivery rate", value: "98.5%" }
                  ]}
                  actionLabel="Configure"
                />
                <IntegrationCard
                  name="Email (SMTP)"
                  icon={Mail}
                  isConnected={false}
                  status="Coming Q2 2025"
                  actionLabel="Coming Soon"
                  isFuture={true}
                />
                <IntegrationCard
                  name="SMS (Twilio)"
                  icon={MessageSquare}
                  isConnected={false}
                  status="Coming Q3 2025"
                  actionLabel="Coming Soon"
                  isFuture={true}
                />
                <IntegrationCard
                  name="Voice Calls (Beta)"
                  icon={Phone}
                  isConnected={false}
                  status="Beta access required"
                  actionLabel="Request Access"
                />
              </div>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4 mt-6">
            <AutomationAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
