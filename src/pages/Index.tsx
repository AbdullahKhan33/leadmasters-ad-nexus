
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
import { SmartAutomations } from "@/components/SmartAutomations";
import { Workspaces } from "@/components/Workspaces";
import { WorkspaceSettings } from "@/components/WorkspaceSettings";
import { UserSettings } from "@/components/UserSettings";
import { CRM } from "@/components/CRM";
import { InsightsSummary } from "@/components/InsightsSummary";
import { WhatsAppInsights } from "@/components/WhatsAppInsights";
import { SidebarProvider } from "@/components/ui/sidebar";
import { WorkspaceProvider, useWorkspace } from "@/contexts/WorkspaceContext";
import { useLocation } from "react-router-dom";

type AppSidebarView = 'dashboard' | 'ad-builder' | 'post-builder' | 'social-logins' | 'inspiration-hub' | 'analytics' | 'schedule' | 'smart-automations' | 'workspaces' | 'crm';
type WorkspaceSidebarView = 'dashboard' | 'ad-builder' | 'post-builder' | 'social-logins' | 'inspiration-hub' | 'analytics' | 'schedule' | 'smart-automations' | 'workspaces' | 'user-settings' | 'crm';
type AllViews = AppSidebarView | 'workspace-settings' | 'user-settings' | 'insights-summary' | 'insights-whatsapp';

function IndexContent() {
  const { isInWorkspace, activeWorkspace } = useWorkspace();
  const [currentView, setCurrentView] = useState<AllViews>('workspaces');
  const [selectedWorkspaceForSettings, setSelectedWorkspaceForSettings] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.view) {
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
    setCurrentView('dashboard');
  };

  const handlePostBuilderClick = () => {
    setCurrentView('post-builder');
  };

  const handleAdBuilderClick = () => {
    setCurrentView('ad-builder');
  };

  const handleSocialLoginsClick = () => {
    setCurrentView('social-logins');
  };

  const handleInspirationHubClick = () => {
    setCurrentView('inspiration-hub');
  };

  const handleAnalyticsClick = () => {
    setCurrentView('analytics');
  };

  const handleScheduleClick = () => {
    setCurrentView('schedule');
  };

  const handleSmartAutomationsClick = () => {
    setCurrentView('smart-automations');
  };

  const handleWorkspacesClick = () => {
    setCurrentView('workspaces');
  };

  const handleUserSettingsClick = () => {
    setCurrentView('user-settings');
  };

  const handleCRMClick = () => {
    setCurrentView('crm');
  };

  const handleWorkspaceSettingsClick = (workspace: any) => {
    setSelectedWorkspaceForSettings(workspace);
    setCurrentView('workspace-settings');
  };

  const handleBackToWorkspaces = () => {
    setCurrentView('workspaces');
    setSelectedWorkspaceForSettings(null);
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
            onSmartAutomationsClick={handleSmartAutomationsClick}
            onWorkspacesClick={handleWorkspacesClick}
            onUserSettingsClick={handleUserSettingsClick}
            onCRMClick={handleCRMClick}
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
            ) : currentView === 'smart-automations' ? (
              <SmartAutomations />
            ) : currentView === 'crm' ? (
              <CRM />
            ) : currentView === 'insights-summary' ? (
              <InsightsSummary />
            ) : currentView === 'insights-whatsapp' ? (
              <WhatsAppInsights />
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
