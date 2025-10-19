import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { WorkspaceSidebar } from "@/components/WorkspaceSidebar";
import { TopBar } from "@/components/TopBar";
import { AdBuilder } from "@/components/AdBuilder";
import { PostBuilder } from "@/components/PostBuilder";
import { SocialLogins } from "@/components/SocialLogins";
import { Dashboard } from "@/components/Dashboard";
import { InspirationHub } from "@/components/InspirationHub";
import { InsightsOverview } from "@/components/InsightsOverview";
import { Schedule } from "@/components/Schedule";
import { Workspaces } from "@/components/Workspaces";
import { WorkspaceSettings } from "@/components/WorkspaceSettings";
import { UserSettings } from "@/components/UserSettings";
import { Support } from "@/components/Support";
import { CRM } from "@/components/CRM";
import { Agents } from "@/components/Agents";
import { InsightsSummary } from "@/components/InsightsSummary";
import { WhatsAppInsights } from "@/components/WhatsAppInsights";
import { DomainSetup } from "@/components/DomainSetup";
import { CRMAutomations } from "@/components/crm/CRMAutomations";
import { Templates } from "@/components/Templates";
import { Services } from "@/components/Services";
import { PublishedPosts } from "@/components/PublishedPosts";
import { PostIdeaGenerator } from "@/components/PostIdeaGenerator";
import { SidebarProvider } from "@/components/ui/sidebar";
import { WorkspaceProvider, useWorkspace } from "@/contexts/WorkspaceContext";
import { PremiumProvider, usePremium } from "@/contexts/PremiumContext";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "react-router-dom";
import { FloatingChatbot } from "@/components/chatbot/FloatingChatbot";
import { useChatbotVisibility } from "@/hooks/useChatbotVisibility";
import { PremiumUpgradeModal } from "@/components/premium/PremiumUpgradeModal";
import { CreateCampaignInline } from "@/pages/CreateCampaignPage";

type AppSidebarView = 'dashboard' | 'ad-builder' | 'post-builder' | 'social-logins' | 'inspiration-hub' | 'post-ideas' | 'analytics' | 'schedule' | 'workspaces' | 'crm' | 'templates' | 'agents' | 'services' | 'published-posts';
type WorkspaceSidebarView = 'dashboard' | 'ad-builder' | 'post-builder' | 'social-logins' | 'inspiration-hub' | 'post-ideas' | 'analytics' | 'schedule' | 'workspaces' | 'user-settings' | 'crm' | 'templates' | 'agents' | 'services' | 'published-posts';
type AllViews = AppSidebarView | 'workspace-settings' | 'user-settings' | 'insights-summary' | 'insights-whatsapp' | 'domain-setup' | 'crm-automations' | 'templates' | 'agents' | 'services' | 'support' | 'published-posts' | 'campaign-create' | 'post-ideas';

function IndexContent() {
  const { user } = useAuth();
  const { isInWorkspace, activeWorkspace, hasWorkspaces, canManageWorkspaces } = useWorkspace();
  const { setIsPremium } = usePremium();
  const [currentView, setCurrentView] = useState<AllViews>('dashboard');
  const [selectedWorkspaceForSettings, setSelectedWorkspaceForSettings] = useState<any>(null);
  const [upgradeModal, setUpgradeModal] = useState({ isOpen: false, feature: "" });
  const location = useLocation();
  const shouldShowChatbot = useChatbotVisibility();

  useEffect(() => {
    console.log('Location state changed:', location.state);
    if (location.state?.view) {
      console.log('Setting view to:', location.state.view);
      setCurrentView(location.state.view);
    }
  }, [location.state]);

  useEffect(() => {
    // Only apply workspace logic if user is authenticated
    if (!user) return;
    
    // Check if we're on the agent creation route
    if (location.pathname === '/app/agents/create') {
      setCurrentView('agents');
      return;
    }
    
    // Check if we're on the agent edit route
    if (location.pathname.startsWith('/app/agents/edit/')) {
      setCurrentView('agents');
      return;
    }
    
    // Campaign create route
    if (location.pathname === '/app/campaigns/create') {
      setCurrentView('campaign-create');
      return;
    }
    
    // Check if we're on the /app/agents route
    if (location.pathname === '/app/agents') {
      setCurrentView('agents');
      return;
    }
    
    // If location state specifies a view, use it (important for agent redirects)
    if (location.state?.view) {
      setCurrentView(location.state.view);
      return;
    }
    
    // Only auto-redirect to dashboard if not currently managing workspaces
    // Don't auto-redirect if user just created a workspace and is still on workspace view
    if (isInWorkspace && activeWorkspace && currentView !== 'workspaces' && currentView !== 'workspace-settings') {
      setCurrentView('dashboard');
    } else if (!hasWorkspaces && canManageWorkspaces) {
      // Force workspace view only for authenticated admins with no workspaces
      setCurrentView('workspaces');
    } else if (!isInWorkspace && hasWorkspaces && canManageWorkspaces) {
      // Only redirect admins to workspace selection if they have workspaces but none selected
      setCurrentView('workspaces');
    } else if (hasWorkspaces && !isInWorkspace) {
      // If user has workspaces but isn't in one, go to workspaces view
      setCurrentView('workspaces');
    }
  }, [user, isInWorkspace, activeWorkspace, hasWorkspaces, canManageWorkspaces, location.state, location.pathname]);

  // Monitor workspace changes to redirect when all workspaces are deleted (authenticated admin only)
  useEffect(() => {
    if (user && !hasWorkspaces && canManageWorkspaces && currentView !== 'workspaces') {
      setCurrentView('workspaces');
    }
  }, [user, hasWorkspaces, canManageWorkspaces]);

  // Prevent navigation if no workspaces exist (admin only)
  const handleNavigationClick = (view: AllViews, callback: () => void) => {
    console.log('Navigation clicked:', view, 'hasWorkspaces:', hasWorkspaces, 'canManageWorkspaces:', canManageWorkspaces);
    if (!hasWorkspaces && view !== 'workspaces' && canManageWorkspaces) {
      // Don't allow navigation away from workspaces if none exist for admins
      console.log('Navigation blocked - no workspaces');
      return;
    }
    console.log('Navigation allowed, executing callback');
    callback();
  };

  const handleDashboardClick = () => {
    handleNavigationClick('dashboard', () => {
      console.log('Dashboard clicked');
      setCurrentView('dashboard');
    });
  };

  const handlePostBuilderClick = () => {
    handleNavigationClick('post-builder', () => {
      console.log('Post Builder clicked');
      setCurrentView('post-builder');
    });
  };

  const handleAdBuilderClick = () => {
    handleNavigationClick('ad-builder', () => {
      console.log('Ad Builder clicked');
      setCurrentView('ad-builder');
    });
  };

  const handleSocialLoginsClick = () => {
    handleNavigationClick('social-logins', () => {
      console.log('Social Logins clicked');
      setCurrentView('social-logins');
    });
  };

  const handleInspirationHubClick = () => {
    handleNavigationClick('post-ideas', () => {
      console.log('Post Ideas clicked');
      setCurrentView('post-ideas');
    });
  };

  const handleAnalyticsClick = () => {
    handleNavigationClick('analytics', () => {
      console.log('Analytics clicked');
      setCurrentView('analytics');
    });
  };

  const handleScheduleClick = () => {
    handleNavigationClick('schedule', () => {
      console.log('Schedule clicked');
      setCurrentView('schedule');
    });
  };

  const handleSmartAutomationsClick = () => {
    console.log('Smart Automations clicked');
    // Remove this functionality - no longer navigate to smart-automations
  };

  const handleWorkspacesClick = () => {
    console.log('Workspaces clicked');
    setCurrentView('workspaces');
  };

  const handleUserSettingsClick = () => {
    handleNavigationClick('user-settings', () => {
      console.log('User Settings clicked');
      setCurrentView('user-settings');
    });
  };

  const handleCRMClick = () => {
    handleNavigationClick('crm', () => {
      console.log('CRM clicked');
      setCurrentView('crm');
    });
  };

  const handleDomainSetupClick = () => {
    handleNavigationClick('domain-setup', () => {
      console.log('Domain Setup clicked');
      setCurrentView('domain-setup');
    });
  };

  const handleCRMAutomationsClick = () => {
    handleNavigationClick('crm-automations', () => {
      console.log('CRM Automations clicked');
      setCurrentView('crm-automations');
    });
  };

  const handleTemplatesClick = () => {
    handleNavigationClick('templates', () => {
      console.log('Templates clicked');
      setCurrentView('templates');
    });
  };

  const handleAgentsClick = () => {
    handleNavigationClick('agents', () => {
      console.log('Agents clicked');
      setCurrentView('agents');
    });
  };

  const handleServicesClick = () => {
    handleNavigationClick('services', () => {
      console.log('Services clicked');
      setCurrentView('services');
    });
  };

  const handlePublishedPostsClick = () => {
    handleNavigationClick('published-posts', () => {
      console.log('Published Posts clicked');
      setCurrentView('published-posts');
    });
  };

  const handleWorkspaceSettingsClick = (workspace: any) => {
    setSelectedWorkspaceForSettings(workspace);
    setCurrentView('workspace-settings');
  };

  const handleBackToWorkspaces = () => {
    setCurrentView('workspaces');
    setSelectedWorkspaceForSettings(null);
  };

  const handleUpgradeClick = (feature: string) => {
    setUpgradeModal({ isOpen: true, feature });
  };

  const handleUpgrade = () => {
    setIsPremium(true);
    setUpgradeModal({ isOpen: false, feature: "" });
    console.log("Premium upgrade successful");
  };

  const handleSupportClick = () => {
    handleNavigationClick('support', () => {
      console.log('Support clicked');
      setCurrentView('support');
    });
  };

  console.log('Current view:', currentView);

  // If no workspaces exist and user can manage workspaces (admin), show workspaces view without sidebar
  if (!hasWorkspaces && canManageWorkspaces) {
    return (
      <div className="min-h-screen flex w-full">
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 overflow-hidden">
            <Workspaces onWorkspaceSettingsClick={handleWorkspaceSettingsClick} />
          </div>
        </div>
      </div>
    );
  }

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
            onPublishedPostsClick={handlePublishedPostsClick}
            currentView={currentView as WorkspaceSidebarView}
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
            onPublishedPostsClick={handlePublishedPostsClick}
            currentView={currentView as AppSidebarView}
          />
        )}
        <div className="flex-1 flex flex-col min-w-0">
          <TopBar />
          <div className="flex-1 overflow-hidden">
            {currentView === 'workspaces' ? (
              <Workspaces onWorkspaceSettingsClick={handleWorkspaceSettingsClick} />
            ) : currentView === 'workspace-settings' ? (
              <WorkspaceSettings onBackClick={handleBackToWorkspaces} />
            ) : currentView === 'user-settings' ? (
              <UserSettings onSupportClick={handleSupportClick} />
            ) : currentView === 'support' ? (
              <Support />
            ) : currentView === 'dashboard' ? (
              <Dashboard />
            ) : currentView === 'social-logins' ? (
              <SocialLogins />
            ) : currentView === 'post-builder' ? (
              <PostBuilder />
            ) : currentView === 'published-posts' ? (
              <PublishedPosts />
            ) : currentView === 'inspiration-hub' ? (
              <InspirationHub />
            ) : currentView === 'post-ideas' ? (
              <PostIdeaGenerator />
            ) : currentView === 'analytics' ? (
              <InsightsOverview />
            ) : currentView === 'schedule' ? (
              <Schedule />
            ) : currentView === 'crm' ? (
              <CRM />
            ) : currentView === 'agents' ? (
              <Agents />
            ) : currentView === 'insights-summary' ? (
              <InsightsSummary />
            ) : currentView === 'insights-whatsapp' ? (
              <WhatsAppInsights />
            ) : currentView === 'domain-setup' ? (
              <DomainSetup />
            ) : currentView === 'crm-automations' ? (
              <CRMAutomations />
            ) : currentView === 'templates' ? (
              <Templates />
            ) : currentView === 'services' ? (
              <Services />
            ) : currentView === 'campaign-create' ? (
              <CreateCampaignInline />
            ) : (
              <AdBuilder />
            )}
          </div>
        </div>
        
        {/* Floating Chatbot */}
        {shouldShowChatbot && <FloatingChatbot />}
        
        {/* Premium Upgrade Modal */}
        <PremiumUpgradeModal
          isOpen={upgradeModal.isOpen}
          onClose={() => setUpgradeModal({ isOpen: false, feature: "" })}
          feature={upgradeModal.feature}
          onUpgrade={handleUpgrade}
        />
      </div>
    </SidebarProvider>
  );
}

export default function Index() {
  return (
    <WorkspaceProvider>
      <PremiumProvider>
        <IndexContent />
      </PremiumProvider>
    </WorkspaceProvider>
  );
}
