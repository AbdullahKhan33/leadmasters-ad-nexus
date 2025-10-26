import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Bot, Workflow, Plug, TrendingUp, BarChart3, Plus, MessageCircle, UserCheck, Calendar, RefreshCw, Globe, Mail, MessageSquare, Phone, Table, Info, Settings } from "lucide-react";
import { AutomationPipeline } from "./ai-sales/AutomationPipeline";
import { WorkflowTemplateCard } from "./ai-sales/WorkflowTemplateCard";
import { IntegrationCard } from "./ai-sales/IntegrationCard";
import { AutomationAnalytics } from "./ai-sales/AutomationAnalytics";
import { CampaignStatusSummary } from "./ai-sales/CampaignStatusSummary";
import { CreateCampaignModal } from "./ai-sales/CreateCampaignModal";
import { FlowchartCampaignBuilder } from "./ai-sales/flowchart/FlowchartCampaignBuilder";
import { AllLeadsTableView, TableFilters } from "./ai-sales/AllLeadsTableView";
import { Lead } from "@/data/dummyLeads";
import { supabase } from "@/integrations/supabase/client";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { useNavigate } from "react-router-dom";

interface WorkflowData {
  id: string;
  name: string;
  description: string;
  type: string;
  is_active: boolean;
  workflow_status: string;
}

export function AISalesAutomation() {
  const { activeWorkspace } = useWorkspace();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('pipeline');
  const [tableFilters, setTableFilters] = useState<Partial<TableFilters> | null>(null);
  const [workflows, setWorkflows] = useState<WorkflowData[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newlyCreatedWorkflowId, setNewlyCreatedWorkflowId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'paused' | 'draft'>('all');
  const [flowchartCampaign, setFlowchartCampaign] = useState<{ id: string; name: string } | null>(null);
  
  const workspaceRegion = activeWorkspace?.region || 'global';

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

  const handleCampaignCreated = (campaignId: string, openFlowchart?: boolean) => {
    setNewlyCreatedWorkflowId(campaignId);
    if (openFlowchart) {
      const campaign = workflows.find(w => w.id === campaignId);
      if (campaign) {
        setFlowchartCampaign({ id: campaign.id, name: campaign.name });
      } else {
        // If workflow not loaded yet, fetch it
        supabase
          .from('automation_workflows')
          .select('id, name')
          .eq('id', campaignId)
          .single()
          .then(({ data }) => {
            if (data) {
              setFlowchartCampaign({ id: data.id, name: data.name });
            }
          });
      }
    }
    fetchWorkflows();
  };

  // Listen for flowchart open events from WorkflowTemplateCard
  useEffect(() => {
    const handleOpenFlowchart = (event: any) => {
      if (event.detail) {
        setFlowchartCampaign({ id: event.detail.id, name: event.detail.name });
      }
    };
    
    window.addEventListener('openFlowchart', handleOpenFlowchart);
    return () => window.removeEventListener('openFlowchart', handleOpenFlowchart);
  }, []);

  // If flowchart is open, render only the flowchart builder
  if (flowchartCampaign) {
    return (
      <FlowchartCampaignBuilder
        campaignId={flowchartCampaign.id}
        campaignName={flowchartCampaign.name}
        onClose={() => setFlowchartCampaign(null)}
        onSave={() => {
          setFlowchartCampaign(null);
          fetchWorkflows();
        }}
      />
    );
  }

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
            {/* Region Selector / Alert */}
            {workspaceRegion === 'global' ? (
              <Alert className="border-purple-200 bg-purple-50">
                <Info className="h-4 w-4 text-purple-600" />
                <AlertTitle className="text-purple-900">Set Your Region</AlertTitle>
                <AlertDescription className="text-purple-700">
                  To see only relevant portals for your market, set your primary operating region in{' '}
                  <button 
                    onClick={() => navigate('/app/settings')} 
                    className="underline font-medium hover:text-purple-900"
                  >
                    Workspace Settings
                  </button>
                  . Currently showing all regions.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-sm font-medium border-purple-300 bg-white">
                    {workspaceRegion === 'uae' && '🇦🇪 Showing UAE Portals'}
                    {workspaceRegion === 'qatar' && '🇶🇦 Showing Qatar Portals'}
                    {workspaceRegion === 'saudi_arabia' && '🇸🇦 Showing Saudi Arabia Portals'}
                    {workspaceRegion === 'india' && '🇮🇳 Showing India Portals'}
                  </Badge>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate('/app/settings')}
                  className="text-purple-600 hover:text-purple-700 hover:bg-purple-100"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Change Region
                </Button>
              </div>
            )}

            {/* Dubai/UAE Real Estate Portals */}
            {(workspaceRegion === 'uae' || workspaceRegion === 'global') && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-xl font-semibold">Dubai/UAE Real Estate Portals</h2>
                <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">🇦🇪 UAE</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Connect to Dubai and UAE property portals for lead ingestion</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <IntegrationCard
                  name="Property Finder"
                  icon={Globe}
                  isConnected={true}
                  status="Webhook URL configured"
                  stats={[
                    { label: "Last sync", value: "1 hour ago" },
                    { label: "Leads today", value: "18" }
                  ]}
                  actionLabel="Test Connection"
                />
                <IntegrationCard
                  name="Bayut"
                  icon={Globe}
                  isConnected={true}
                  status="API key active"
                  stats={[
                    { label: "Last sync", value: "3 hours ago" },
                    { label: "Leads today", value: "14" }
                  ]}
                  actionLabel="Reconfigure"
                />
                <IntegrationCard
                  name="Dubizzle Property"
                  icon={Globe}
                  isConnected={false}
                  status="Setup required"
                  actionLabel="Connect Now"
                />
                <IntegrationCard
                  name="JustProperty"
                  icon={Globe}
                  isConnected={false}
                  status="Setup required"
                  actionLabel="Connect Now"
                />
              </div>
            </div>
            )}

            {/* Qatar Real Estate Portals */}
            {(workspaceRegion === 'qatar' || workspaceRegion === 'global') && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-xl font-semibold">Qatar Real Estate Portals</h2>
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">🇶🇦 Qatar</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Connect to Qatar property portals for lead ingestion</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <IntegrationCard
                  name="Property Finder Qatar"
                  icon={Globe}
                  isConnected={true}
                  status="Webhook configured"
                  stats={[
                    { label: "Last sync", value: "2 hours ago" },
                    { label: "Leads today", value: "9" }
                  ]}
                  actionLabel="Test Connection"
                />
                <IntegrationCard
                  name="Qatar Living"
                  icon={Globe}
                  isConnected={false}
                  status="Setup required"
                  actionLabel="Connect Now"
                />
                <IntegrationCard
                  name="Saakin Qatar"
                  icon={Globe}
                  isConnected={false}
                  status="Setup required"
                  actionLabel="Connect Now"
                />
              </div>
            </div>
            )}

            {/* Riyadh/Saudi Arabia Real Estate Portals */}
            {(workspaceRegion === 'saudi_arabia' || workspaceRegion === 'global') && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-xl font-semibold">Riyadh/Saudi Arabia Real Estate Portals</h2>
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">🇸🇦 KSA</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Connect to Saudi Arabia property portals for lead ingestion</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <IntegrationCard
                  name="Property Finder KSA"
                  icon={Globe}
                  isConnected={true}
                  status="API key active"
                  stats={[
                    { label: "Last sync", value: "4 hours ago" },
                    { label: "Leads today", value: "11" }
                  ]}
                  actionLabel="Configure"
                />
                <IntegrationCard
                  name="Bayut KSA"
                  icon={Globe}
                  isConnected={false}
                  status="Setup required"
                  actionLabel="Connect Now"
                />
                <IntegrationCard
                  name="Aqar (عقار)"
                  icon={Globe}
                  isConnected={false}
                  status="Setup required"
                  actionLabel="Connect Now"
                />
                <IntegrationCard
                  name="Haraj"
                  icon={Globe}
                  isConnected={false}
                  status="Setup required"
                  actionLabel="Connect Now"
                />
              </div>
            </div>
            )}

            {/* India Real Estate Portals */}
            {(workspaceRegion === 'india' || workspaceRegion === 'global') && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-xl font-semibold">India Real Estate Portals</h2>
                <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white">🇮🇳 India</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Connect to Indian property portals for lead ingestion</p>
              
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
              </div>
            </div>
            )}

            {/* General Lead Sources */}
            <div>
              <h2 className="text-xl font-semibold mb-1">General Lead Sources</h2>
              <p className="text-sm text-muted-foreground mb-4">Connect other platforms to automatically ingest leads</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
        onCampaignCreated={handleCampaignCreated}
      />
    </div>
  );
}
