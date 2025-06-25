
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
import { CRM } from "@/components/CRM";
import { Agents } from "@/components/Agents";
import { InsightsSummary } from "@/components/InsightsSummary";
import { WhatsAppInsights } from "@/components/WhatsAppInsights";
import { DomainSetup } from "@/components/DomainSetup";
import { CRMAutomations } from "@/components/crm/CRMAutomations";
import { Templates } from "@/components/Templates";
import { Services } from "@/components/Services";
import { SidebarProvider } from "@/components/ui/sidebar";
import { WorkspaceProvider, useWorkspace } from "@/contexts/WorkspaceContext";
import { useLocation } from "react-router-dom";

type AppSidebarView = 'dashboard' | 'ad-builder' | 'post-builder' | 'social-logins' | 'inspiration-hub' | 'analytics' | 'schedule' | 'workspaces' | 'crm' | 'templates' | 'agents' | 'services';
type WorkspaceSidebarView = 'dashboard' | 'ad-builder' | 'post-builder' | 'social-logins' | 'inspiration-hub' | 'analytics' | 'schedule' | 'workspaces' | 'user-settings' | 'crm' | 'templates' | 'agents' | 'services';
type AllViews = AppSidebarView | 'workspace-settings' | 'user-settings' | 'insights-summary' | 'insights-whatsapp' | 'domain-setup' | 'crm-automations' | 'templates' | 'agents' | 'services';

function IndexContent() {
  const { isInWorkspace, activeWorkspace } = useWorkspace();
  const [currentView, setCurrentView] = useState<AllViews>('workspaces');
  const [selectedWorkspaceForSettings, setSelectedWorkspaceForSettings] = useState<any>(null);
  const location = useLocation();

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
    } else if (!isInWorkspace && !location.state?.view) {
      setCurrentView('workspaces');
    }
  }, [isInWorkspace, activeWorkspace, location.state]);

  const handleDashboardClick = () => {
    console.log('Dashboard clicked');
    setCurrentView('dashboard');
  };

  const handlePostBuilderClick = () => {
    console.log('Post Builder clicked');
    setCurrentView('post-builder');
  };

  const handleAdBuilderClick = () => {
    console.log('Ad Builder clicked');
    setCurrentView('ad-builder');
  };

  const handleSocialLoginsClick = () => {
    console.log('Social Logins clicked');
    setCurrentView('social-logins');
  };

  const handleInspirationHubClick = () => {
    console.log('Inspiration Hub clicked');
    setCurrentView('inspiration-hub');
  };

  const handleAnalyticsClick = () => {
    console.log('Analytics clicked');
    setCurrentView('analytics');
  };

  const handleScheduleClick = () => {
    console.log('Schedule clicked');
    setCurrentView('schedule');
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
    console.log('User Settings clicked');
    setCurrentView('user-settings');
  };

  const handleCRMClick = () => {
    console.log('CRM clicked');
    setCurrentView('crm');
  };

  const handleDomainSetupClick = () => {
    console.log('Domain Setup clicked');
    setCurrentView('domain-setup');
  };

  const handleCRMAutomationsClick = () => {
    console.log('CRM Automations clicked');
    setCurrentView('crm-automations');
  };

  const handleTemplatesClick = () => {
    console.log('Templates clicked');
    setCurrentView('templates');
  };

  const handleAgentsClick = () => {
    console.log('Agents clicked');
    setCurrentView('agents');
  };

  const handleServicesClick = () => {
    console.log('Services clicked');
    setCurrentView('services');
  };

  const handleWorkspaceSettingsClick = (workspace: any) => {
    setSelectedWorkspaceForSettings(workspace);
    setCurrentView('workspace-settings');
  };

  const handleBackToWorkspaces = () => {
    setCurrentView('workspaces');
    setSelectedWorkspaceForSettings(null);
  };

  console.log('Current view:', currentView);

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
              <UserSettings />
            ) : currentView === 'dashboard' ? (
              <Dashboard />
            ) : currentView === 'social-logins' ? (
              <SocialLogins />
            ) : currentView === 'post-builder' ? (
              <PostBuilder />
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
      </div>
    </SidebarProvider>
  );
}

export default function Index() {
  return (
    <WorkspaceProvider>
      <IndexContent />
    </WorkspaceProvider>
  );
}
