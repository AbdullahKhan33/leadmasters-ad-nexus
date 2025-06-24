
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
      <div className="flex-1 flex flex-col">
        <TopBar />
        {currentView === 'post-builder' ? (
          <PostBuilder />
        ) : (
          <WhatsAppAdBuilder />
        )}
      </div>
    </div>
  );
}
