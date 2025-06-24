
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
import { SidebarProvider } from "@/components/ui/sidebar";
import { WorkspaceProvider, useWorkspace } from "@/contexts/WorkspaceContext";

type AppSidebarView = 'dashboard' | 'ad-builder' | 'post-builder' | 'social-logins' | 'inspiration-hub' | 'analytics' | 'schedule' | 'smart-automations' | 'workspaces';
type WorkspaceSidebarView = 'dashboard' | 'ad-builder' | 'post-builder' | 'social-logins' | 'inspiration-hub' | 'analytics' | 'schedule' | 'smart-automations' | 'workspace-settings' | 'workspaces';
type AllViews = AppSidebarView | 'workspace-settings';

function IndexContent() {
  const { isInWorkspace, activeWorkspace } = useWorkspace();
  const [currentView, setCurrentView] = useState<AllViews>('workspaces');

  // When a workspace is selected, automatically navigate to dashboard
  useEffect(() => {
    if (isInWorkspace && activeWorkspace) {
      setCurrentView('dashboard');
    } else if (!isInWorkspace) {
      setCurrentView('workspaces');
    }
  }, [isInWorkspace, activeWorkspace]);

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

  const handleWorkspaceSettingsClick = () => {
    setCurrentView('workspace-settings');
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
            onWorkspaceSettingsClick={handleWorkspaceSettingsClick}
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
            currentView={currentView as AppSidebarView}
          />
        )}
        <div className="flex-1 flex flex-col min-w-0">
          <TopBar />
          <div className="flex-1 overflow-hidden">
            {currentView === 'workspaces' ? (
              <Workspaces />
            ) : currentView === 'workspace-settings' ? (
              <WorkspaceSettings />
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
