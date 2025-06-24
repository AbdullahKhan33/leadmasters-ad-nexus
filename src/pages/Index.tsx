
import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { TopBar } from "@/components/TopBar";
import { WhatsAppAdBuilder } from "@/components/WhatsAppAdBuilder";
import { PostBuilder } from "@/components/PostBuilder";

export default function Index() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'post-builder'>('dashboard');

  const handlePostBuilderClick = () => {
    setCurrentView('post-builder');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  return (
    <div className="min-h-screen flex w-full">
      <AppSidebar 
        onPostBuilderClick={handlePostBuilderClick}
        currentView={currentView}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <div className="flex-1 overflow-hidden">
          {currentView === 'post-builder' ? (
            <PostBuilder />
          ) : (
            <WhatsAppAdBuilder />
          )}
        </div>
      </div>
    </div>
  );
}
