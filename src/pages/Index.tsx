
import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { TopBar } from "@/components/TopBar";
import { AdBuilder } from "@/components/AdBuilder";
import { PostBuilder } from "@/components/PostBuilder";
import { SocialLogins } from "@/components/SocialLogins";

export default function Index() {
  const [currentView, setCurrentView] = useState<'ad-builder' | 'post-builder' | 'social-logins'>('ad-builder');

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
    <div className="min-h-screen flex w-full">
      <AppSidebar 
        onPostBuilderClick={handlePostBuilderClick}
        onAdBuilderClick={handleAdBuilderClick}
        onSocialLoginsClick={handleSocialLoginsClick}
        currentView={currentView}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <div className="flex-1 overflow-hidden">
          {currentView === 'social-logins' ? (
            <SocialLogins />
          ) : currentView === 'post-builder' ? (
            <PostBuilder />
          ) : (
            <AdBuilder />
          )}
        </div>
      </div>
    </div>
  );
}
