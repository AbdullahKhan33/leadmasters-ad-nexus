
import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { TopBar } from "@/components/TopBar";
import { PostBuilder } from "@/components/PostBuilder";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function PostBuilderPage() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'ad-builder' | 'post-builder' | 'social-logins'>('post-builder');

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

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar 
          onDashboardClick={handleDashboardClick}
          onPostBuilderClick={handlePostBuilderClick}
          onAdBuilderClick={handleAdBuilderClick}
          onSocialLoginsClick={handleSocialLoginsClick}
          currentView={currentView}
        />
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
