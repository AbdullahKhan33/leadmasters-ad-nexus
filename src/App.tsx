
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { MyInspirations } from "./components/MyInspirations";
import { PostBuilder } from "./components/PostBuilder";
import { WorkspaceProvider } from "./contexts/WorkspaceContext";
import { SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import { WorkspaceSidebar } from "./components/WorkspaceSidebar";
import { TopBar } from "./components/TopBar";
import { useWorkspace } from "./contexts/WorkspaceContext";

const queryClient = new QueryClient();

function PostBuilderPage() {
  const { isInWorkspace } = useWorkspace();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {isInWorkspace ? (
          <WorkspaceSidebar 
            onDashboardClick={() => {}}
            onPostBuilderClick={() => {}}
            onAdBuilderClick={() => {}}
            onSocialLoginsClick={() => {}}
            onInspirationHubClick={() => {}}
            onAnalyticsClick={() => {}}
            onScheduleClick={() => {}}
            onSmartAutomationsClick={() => {}}
            onWorkspacesClick={() => {}}
            onUserSettingsClick={() => {}}
            currentView="post-builder"
          />
        ) : (
          <AppSidebar 
            onDashboardClick={() => {}}
            onPostBuilderClick={() => {}}
            onAdBuilderClick={() => {}}
            onSocialLoginsClick={() => {}}
            onInspirationHubClick={() => {}}
            onAnalyticsClick={() => {}}
            onScheduleClick={() => {}}
            onSmartAutomationsClick={() => {}}
            onWorkspacesClick={() => {}}
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/my-inspirations" element={<MyInspirations />} />
          <Route path="/post-builder" element={
            <WorkspaceProvider>
              <PostBuilderPage />
            </WorkspaceProvider>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
