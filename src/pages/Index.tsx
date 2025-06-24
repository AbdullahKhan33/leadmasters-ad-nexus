
import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { TopBar } from "@/components/TopBar";
import { AdBuilder } from "@/components/AdBuilder";
import { PostBuilder } from "@/components/PostBuilder";

export default function Index() {
  const [currentView, setCurrentView] = useState<'ad-builder' | 'post-builder'>('ad-builder');

  const handlePostBuilderClick = () => {
    setCurrentView('post-builder');
  };

  const handleAdBuilderClick = () => {
    setCurrentView('ad-builder');
  };

  return (
    <div className="min-h-screen flex w-full">
      <AppSidebar 
        onPostBuilderClick={handlePostBuilderClick}
        onAdBuilderClick={handleAdBuilderClick}
        currentView={currentView}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <div className="flex-1 overflow-hidden">
          {currentView === 'post-builder' ? (
            <PostBuilder />
          ) : (
            <AdBuilder />
          )}
        </div>
      </div>
    </div>
  );
}
