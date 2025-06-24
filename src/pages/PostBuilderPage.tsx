
import { useState } from "react";
import { PostBuilder } from "@/components/PostBuilder";
import { AppSidebar } from "@/components/AppSidebar";
import { TopBar } from "@/components/TopBar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function PostBuilderPage() {
  const [currentView, setCurrentView] = useState<'ad-builder' | 'post-builder' | 'social-logins'>('post-builder');

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
          onPostBuilderClick={handlePostBuilderClick}
          onAdBuilderClick={handleAdBuilderClick}
          onSocialLoginsClick={handleSocialLoginsClick}
          currentView={currentView}
        />
        <div className="flex-1 flex flex-col">
          <TopBar />
          <PostBuilder />
        </div>
      </div>
    </SidebarProvider>
  );
}
