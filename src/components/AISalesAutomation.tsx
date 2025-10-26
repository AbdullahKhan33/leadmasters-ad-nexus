import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Bot, Workflow, Plug, TrendingUp, BarChart3, Plus, MessageCircle, UserCheck, Calendar, RefreshCw, Globe, Mail, MessageSquare, Phone, Table } from "lucide-react";
import { AutomationPipeline } from "./ai-sales/AutomationPipeline";
import { WorkflowTemplateCard } from "./ai-sales/WorkflowTemplateCard";
import { IntegrationCard } from "./ai-sales/IntegrationCard";
import { AutomationAnalytics } from "./ai-sales/AutomationAnalytics";
import { CampaignStatusSummary } from "./ai-sales/CampaignStatusSummary";
import { CreateCampaignModal } from "./ai-sales/CreateCampaignModal";
import { AllLeadsTableView, TableFilters } from "./ai-sales/AllLeadsTableView";
import { Lead } from "@/data/dummyLeads";
import { supabase } from "@/integrations/supabase/client";

interface WorkflowData {
  id: string;
  name: string;
  description: string;
  type: string;
  is_active: boolean;
  workflow_status: string;
}

export function AISalesAutomation() {
  const [activeTab, setActiveTab] = useState<string>('pipeline');
  const [tableFilters, setTableFilters] = useState<Partial<TableFilters> | null>(null);
  const [workflows, setWorkflows] = useState<WorkflowData[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newlyCreatedWorkflowId, setNewlyCreatedWorkflowId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'paused' | 'draft'>('all');

  useEffect(() => {
    if (activeTab === 'workflows') {
      fetchWorkflows();
    }
  }, [activeTab]);

  const fetchWorkflows = async () => {
    try {
      const { data, error } = await supabase
        .from('automation_workflows')
        .select('id, name, description, type, is_active, workflow_status')
        .order('name');
      
      if (error) throw error;
      if (data) setWorkflows(data);
    } catch (error) {
      console.error('Error fetching workflows:', error);
    }
  };

  const getFilteredWorkflows = () => {
    if (statusFilter === 'all') return workflows;
    if (statusFilter === 'active') return workflows.filter(w => w.workflow_status === 'active');
    if (statusFilter === 'paused') return workflows.filter(w => w.workflow_status === 'paused');
    if (statusFilter === 'draft') return workflows.filter(w => w.workflow_status === 'draft');
    return workflows;
  };

  const filteredWorkflows = getFilteredWorkflows();

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
              Automated Campaigns
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

          {/* Automated Campaigns Tab */}
          <TabsContent value="workflows" className="space-y-4 mt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold">Automated Campaigns</h2>
                <p className="text-sm text-muted-foreground">Launch multi-step message sequences to targeted lead segments</p>
              </div>
              <Button 
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Campaign
              </Button>
            </div>

            <CampaignStatusSummary
              total={workflows.length}
              active={workflows.filter(w => w.workflow_status === 'active').length}
              paused={workflows.filter(w => w.workflow_status === 'paused').length}
              draft={workflows.filter(w => w.workflow_status === 'draft').length}
              onFilterChange={setStatusFilter}
              selectedFilter={statusFilter}
            />

            {workflows.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed rounded-lg">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                  <MessageSquare className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No campaigns yet</h3>
                <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
                  Create your first automated campaign to start engaging leads with personalized message sequences
                </p>
                <Button 
                  onClick={() => setIsCreateModalOpen(true)}
                  className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Campaign
                </Button>
              </div>
            ) : (
              <>
                {filteredWorkflows.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed rounded-lg">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                      <MessageSquare className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No campaigns match this filter</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Try selecting a different status or create a new campaign
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredWorkflows.map((workflow) => (
                      <WorkflowTemplateCard
                        key={workflow.id}
                        workflowId={workflow.id}
                        onRefresh={fetchWorkflows}
                        autoOpenConfig={workflow.id === newlyCreatedWorkflowId}
                        onConfigOpened={() => setNewlyCreatedWorkflowId(null)}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
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

      <CreateCampaignModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCampaignCreated={(campaignId) => {
          setNewlyCreatedWorkflowId(campaignId);
          fetchWorkflows();
        }}
      />
    </div>
  );
}
