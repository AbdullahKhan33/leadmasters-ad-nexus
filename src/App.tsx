import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useNavigate, useSearchParams } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { MyInspirations } from "./components/MyInspirations";
import { PostBuilder } from "./components/PostBuilder";
import { CRM } from "./components/CRM";
import { InsightsSummary } from "./components/InsightsSummary";
import { WhatsAppInsights } from "./components/WhatsAppInsights";
import { WorkspaceProvider } from "./contexts/WorkspaceContext";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import { WorkspaceSidebar } from "./components/WorkspaceSidebar";
import { TopBar } from "./components/TopBar";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { AdBuilder } from "./components/AdBuilder";
import { FloatingChatbot } from "@/components/chatbot/FloatingChatbot";
import { useChatbotVisibility } from "@/hooks/useChatbotVisibility";

const queryClient = new QueryClient();

function PostBuilderPage() {
  const { isInWorkspace } = useWorkspace();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const shouldShowChatbot = useChatbotVisibility();

  const handleDashboardClick = () => {
    navigate('/', { state: { view: 'dashboard' } });
  };

  const handlePostBuilderClick = () => {
    // Already on post builder, no need to navigate
  };

  const handleAdBuilderClick = () => {
    navigate('/', { state: { view: 'ad-builder' } });
  };

  const handleSocialLoginsClick = () => {
    navigate('/', { state: { view: 'social-logins' } });
  };

  const handleInspirationHubClick = () => {
    navigate('/', { state: { view: 'inspiration-hub' } });
  };

  const handleAnalyticsClick = () => {
    navigate('/', { state: { view: 'analytics' } });
  };

  const handleScheduleClick = () => {
    navigate('/', { state: { view: 'schedule' } });
  };

  const handleSmartAutomationsClick = () => {
    navigate('/', { state: { view: 'smart-automations' } });
  };

  const handleWorkspacesClick = () => {
    navigate('/', { state: { view: 'workspaces' } });
  };

  const handleUserSettingsClick = () => {
    navigate('/', { state: { view: 'user-settings' } });
  };

  const handleCRMClick = () => {
    navigate('/crm');
  };

  const handleDomainSetupClick = () => {
    navigate('/', { state: { view: 'domain-setup' } });
  };

  const handleCRMAutomationsClick = () => {
    navigate('/', { state: { view: 'crm-automations' } });
  };

  const handleTemplatesClick = () => {
    navigate('/', { state: { view: 'templates' } });
  };

  const handleAgentsClick = () => {
    navigate('/', { state: { view: 'agents' } });
  };

  const handleServicesClick = () => {
    navigate('/', { state: { view: 'services' } });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {isInWorkspace ? (
          <WorkspaceSidebar 
            onDashboardClick={handleDashboardClick}
            onPostBuilderClick={handlePostBuilderClick}
            onAdBuilderClick={handleAdBuilderClick}
            onSocialLoginsClick={handleSocialLoginsClick}
            onInspirationHubClick={handleInspirationHubClick}
            onAnalyticsClick={handleAnalyticsClick}
            onScheduleClick={handleScheduleClick}
            onWorkspacesClick={handleWorkspacesClick}
            onUserSettingsClick={handleUserSettingsClick}
            onCRMClick={handleCRMClick}
            onDomainSetupClick={handleDomainSetupClick}
            onCRMAutomationsClick={handleCRMAutomationsClick}
            onTemplatesClick={handleTemplatesClick}
            onAgentsClick={handleAgentsClick}
            onSmartAutomationsClick={handleSmartAutomationsClick}
            onServicesClick={handleServicesClick}
            currentView="post-builder"
          />
        ) : (
          <AppSidebar 
            onDashboardClick={handleDashboardClick}
            onPostBuilderClick={handlePostBuilderClick}
            onAdBuilderClick={handleAdBuilderClick}
            onSocialLoginsClick={handleSocialLoginsClick}
            onInspirationHubClick={handleInspirationHubClick}
            onAnalyticsClick={handleAnalyticsClick}
            onScheduleClick={handleScheduleClick}
            onSmartAutomationsClick={handleSmartAutomationsClick}
            onWorkspacesClick={handleWorkspacesClick}
            onCRMClick={handleCRMClick}
            onDomainSetupClick={handleDomainSetupClick}
            onCRMAutomationsClick={handleCRMAutomationsClick}
            onTemplatesClick={handleTemplatesClick}
            onAgentsClick={handleAgentsClick}
            onServicesClick={handleServicesClick}
            currentView="post-builder"
          />
        )}
        <div className="flex-1 flex flex-col min-w-0">
          <TopBar />
          <div className="flex-1 overflow-hidden">
            <PostBuilder />
          </div>
        </div>
        
        {/* Floating Chatbot */}
        {shouldShowChatbot && <FloatingChatbot />}
      </div>
    </SidebarProvider>
  );
}

function AdBuilderPage() {
  const { isInWorkspace } = useWorkspace();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const shouldShowChatbot = useChatbotVisibility();

  const handleDashboardClick = () => {
    navigate('/', { state: { view: 'dashboard' } });
  };

  const handlePostBuilderClick = () => {
    navigate('/post-builder');
  };

  const handleAdBuilderClick = () => {
    // Already on ad builder, no need to navigate
  };

  const handleSocialLoginsClick = () => {
    navigate('/', { state: { view: 'social-logins' } });
  };

  const handleInspirationHubClick = () => {
    navigate('/', { state: { view: 'inspiration-hub' } });
  };

  const handleAnalyticsClick = () => {
    navigate('/', { state: { view: 'analytics' } });
  };

  const handleScheduleClick = () => {
    navigate('/', { state: { view: 'schedule' } });
  };

  const handleSmartAutomationsClick = () => {
    navigate('/', { state: { view: 'smart-automations' } });
  };

  const handleWorkspacesClick = () => {
    navigate('/', { state: { view: 'workspaces' } });
  };

  const handleUserSettingsClick = () => {
    navigate('/', { state: { view: 'user-settings' } });
  };

  const handleCRMClick = () => {
    navigate('/crm');
  };

  const handleDomainSetupClick = () => {
    navigate('/', { state: { view: 'domain-setup' } });
  };

  const handleCRMAutomationsClick = () => {
    navigate('/', { state: { view: 'crm-automations' } });
  };

  const handleTemplatesClick = () => {
    navigate('/', { state: { view: 'templates' } });
  };

  const handleAgentsClick = () => {
    navigate('/', { state: { view: 'agents' } });
  };

  const handleServicesClick = () => {
    navigate('/', { state: { view: 'services' } });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {isInWorkspace ? (
          <WorkspaceSidebar 
            onDashboardClick={handleDashboardClick}
            onPostBuilderClick={handlePostBuilderClick}
            onAdBuilderClick={handleAdBuilderClick}
            onSocialLoginsClick={handleSocialLoginsClick}
            onInspirationHubClick={handleInspirationHubClick}
            onAnalyticsClick={handleAnalyticsClick}
            onScheduleClick={handleScheduleClick}
            onWorkspacesClick={handleWorkspacesClick}
            onUserSettingsClick={handleUserSettingsClick}
            onCRMClick={handleCRMClick}
            onDomainSetupClick={handleDomainSetupClick}
            onCRMAutomationsClick={handleCRMAutomationsClick}
            onTemplatesClick={handleTemplatesClick}
            onAgentsClick={handleAgentsClick}
            onSmartAutomationsClick={handleSmartAutomationsClick}
            onServicesClick={handleServicesClick}
            currentView="ad-builder"
          />
        ) : (
          <AppSidebar 
            onDashboardClick={handleDashboardClick}
            onPostBuilderClick={handlePostBuilderClick}
            onAdBuilderClick={handleAdBuilderClick}
            onSocialLoginsClick={handleSocialLoginsClick}
            onInspirationHubClick={handleInspirationHubClick}
            onAnalyticsClick={handleAnalyticsClick}
            onScheduleClick={handleScheduleClick}
            onSmartAutomationsClick={handleSmartAutomationsClick}
            onWorkspacesClick={handleWorkspacesClick}
            onCRMClick={handleCRMClick}
            onDomainSetupClick={handleDomainSetupClick}
            onCRMAutomationsClick={handleCRMAutomationsClick}
            onTemplatesClick={handleTemplatesClick}
            onAgentsClick={handleAgentsClick}
            onServicesClick={handleServicesClick}
            currentView="ad-builder"
          />
        )}
        <div className="flex-1 flex flex-col min-w-0">
          <TopBar />
          <div className="flex-1 overflow-hidden">
            <AdBuilder />
          </div>
        </div>
        
        {/* Floating Chatbot */}
        {shouldShowChatbot && <FloatingChatbot />}
      </div>
    </SidebarProvider>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/my-inspirations" element={<MyInspirations />} />
        <Route path="/post-builder" element={
          <WorkspaceProvider>
            <PostBuilderPage />
          </WorkspaceProvider>
        } />
        <Route path="/ad-builder" element={
          <WorkspaceProvider>
            <AdBuilderPage />
          </WorkspaceProvider>
        } />
        <Route path="/crm/*" element={<CRM />} />
        <Route path="/insights/summary" element={<InsightsSummary />} />
        <Route path="/insights/whatsapp" element={<WhatsAppInsights />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
