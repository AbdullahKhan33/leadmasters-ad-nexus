
import { useNavigate } from "react-router-dom";
import { PostBuilder } from "@/components/PostBuilder";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { WorkspaceSidebar } from "@/components/WorkspaceSidebar";
import { TopBar } from "@/components/TopBar";
import { useWorkspace } from "@/contexts/WorkspaceContext";

export default function PostBuilderPage() {
  const { isInWorkspace } = useWorkspace();
  const navigate = useNavigate();

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
            currentView="post-builder"
          />
        )}
        <div className="flex-1 flex flex-col min-w-0">
          <TopBar />
          <div className="flex-1 overflow-hidden">
            <PostBuilder />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
