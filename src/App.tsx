
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
import { PremiumProvider } from "./contexts/PremiumContext";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import { WorkspaceSidebar } from "./components/WorkspaceSidebar";
import { TopBar } from "./components/TopBar";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { AdBuilder } from "./components/AdBuilder";
import { FloatingChatbot } from "@/components/chatbot/FloatingChatbot";
import { useChatbotVisibility } from "@/hooks/useChatbotVisibility";
import { useAuth } from "./contexts/AuthContext";
import { PublicWebsite } from "./components/PublicWebsite";
import { LoginScreen } from "./components/LoginScreen";
import { AboutUsPage } from "./components/public/AboutUsPage";
import { BlogPage } from "./components/public/BlogPage";
import { PricingPage } from "./components/public/PricingPage";
import { ContactPage } from "./components/public/ContactPage";
import { LegalPage } from "./components/public/LegalPage";

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
      
      {shouldShowChatbot && <FloatingChatbot />}
    </div>
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
      
      {shouldShowChatbot && <FloatingChatbot />}
    </div>
  );
}

function DashboardRoutes() {
  return (
    <SidebarProvider>
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </SidebarProvider>
  );
}

function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PublicWebsite />} />
      <Route path="/about-us" element={<AboutUsPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/terms" element={<LegalPage type="terms" />} />
      <Route path="/privacy-policy" element={<LegalPage type="privacy" />} />
      <Route path="/refund-policy" element={<LegalPage type="refund" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => {
  const { isAuthenticated, isLoginVisible } = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
      <PremiumProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {isAuthenticated ? (
            <WorkspaceProvider>
              <DashboardRoutes />
            </WorkspaceProvider>
          ) : isLoginVisible ? (
            <LoginScreen />
          ) : (
            <PublicRoutes />
          )}
        </TooltipProvider>
      </PremiumProvider>
    </QueryClientProvider>
  );
};

export default App;
