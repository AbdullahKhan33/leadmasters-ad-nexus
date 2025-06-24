
import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { TopBar } from "@/components/TopBar";
import { AdBuilder } from "@/components/AdBuilder";
import { PostBuilder } from "@/components/PostBuilder";
import { SocialLogins } from "@/components/SocialLogins";
import { Dashboard } from "@/components/Dashboard";
import { InspirationHub } from "@/components/InspirationHub";
import { Analytics } from "@/components/Analytics";
import { Schedule } from "@/components/Schedule";
import { SmartAutomations } from "@/components/SmartAutomations";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function PostBuilderPage() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'ad-builder' | 'post-builder' | 'social-logins' | 'inspiration-hub' | 'analytics' | 'schedule' | 'smart-automations'>('post-builder');

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

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar 
          onDashboardClick={handleDashboardClick}
          onPostBuilderClick={handlePostBuilderClick}
          onAdBuilderClick={handleAdBuilderClick}
          onSocialLoginsClick={handleSocialLoginsClick}
          onInspirationHubClick={handleInspirationHubClick}
          onAnalyticsClick={handleAnalyticsClick}
          onScheduleClick={handleScheduleClick}
          onSmartAutomationsClick={handleSmartAutomationsClick}
          currentView={currentView}
        />
        <div className="flex-1 flex flex-col min-w-0">
          <TopBar />
          <div className="flex-1 overflow-hidden">
            {currentView === 'dashboard' ? (
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
