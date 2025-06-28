
import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { WorkspaceSidebar } from "@/components/WorkspaceSidebar";
import { TopBar } from "@/components/TopBar";
import { AdBuilder } from "@/components/AdBuilder";
import { PostBuilder } from "@/components/PostBuilder";
import { SocialLogins } from "@/components/SocialLogins";
import { Dashboard } from "@/components/Dashboard";
import { InspirationHub } from "@/components/InspirationHub";
import { Analytics } from "@/components/Analytics";
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
import { ContentHub } from "@/components/ContentHub";
import { SidebarProvider } from "@/components/ui/sidebar";
import { WorkspaceProvider, useWorkspace } from "@/contexts/WorkspaceContext";
import { PremiumProvider, usePremium } from "@/contexts/PremiumContext";
import { useLocation } from "react-router-dom";
import { FloatingChatbot } from "@/components/chatbot/FloatingChatbot";
import { useChatbotVisibility } from "@/hooks/useChatbotVisibility";
import { PremiumUpgradeModal } from "@/components/premium/PremiumUpgradeModal";

type AppSidebarView = 'dashboard' | 'ad-builder' | 'post-builder' | 'social-logins' | 'inspiration-hub' | 'analytics' | 'schedule' | 'workspaces' | 'crm' | 'templates' | 'agents' | 'services' | 'content-hub';
type WorkspaceSidebarView = 'dashboard' | 'ad-builder' | 'post-builder' | 'social-logins' | 'inspiration-hub' | 'analytics' | 'schedule' | 'workspaces' | 'user-settings' | 'crm' | 'templates' | 'agents' | 'services' | 'content-hub';
type AllViews = AppSidebarView | 'workspace-settings' | 'user-settings' | 'insights-summary' | 'insights-whatsapp' | 'domain-setup' | 'crm-automations' | 'templates' | 'agents' | 'services' | 'support' | 'content-hub';

function IndexContent() {
  const { isInWorkspace, activeWorkspace, hasWorkspaces } = useWorkspace();
  const { setIsPremium } = usePremium();
  const [currentView, setCurrentView] = useState<AllViews>('workspaces');
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
    if (isInWorkspace && activeWorkspace && !location.state?.view) {
      setCurrentView('dashboard');
    } else if (!hasWorkspaces) {
      // Force workspace view for new users
      setCurrentView('workspaces');
    } else if (!isInWorkspace && !location.state?.view) {
      setCurrentView('workspaces');
    }
  }, [isInWorkspace, activeWorkspace, hasWorkspaces, location.state]);

  // Prevent navigation if no workspaces exist
  const handleNavigationClick = (view: AllViews, callback: () => void) => {
    if (!hasWorkspaces && view !== 'workspaces') {
      // Don't allow navigation away from workspaces if none exist
      return;
    }
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
    handleNavigationClick('inspiration-hub', () => {
      console.log('Inspiration Hub clicked');
      setCurrentView('inspiration-hub');
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

  const handleContentHubClick = () => {
    handleNavigationClick('content-hub', () => {
      console.log('Content Hub clicked');
      setCurrentView('content-hub');
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

  // If no workspaces exist, only show workspaces view without sidebar
  if (!hasWorkspaces) {
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
            onContentHubClick={handleContentHubClick}
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
            onContentHubClick={handleContentHubClick}
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
            ) : currentView === 'content-hub' ? (
              <ContentHub />
            ) : currentView === 'inspiration-hub' ? (
              <InspirationHub />
            ) : currentView === 'analytics' ? (
              <Analytics />
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
