
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TopBar } from "@/components/TopBar";
import { FacebookAdBuilder } from "@/components/FacebookAdBuilder";

const Index = () => {
  console.log("Index page is rendering");
  
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen w-full flex bg-gray-50">
        {/* Fixed width sidebar container */}
        <div className="w-64 h-screen fixed left-0 top-0 z-40">
          <AppSidebar />
        </div>
        
        {/* Main content area with left margin to account for fixed sidebar */}
        <div className="flex-1 ml-64 flex flex-col min-h-screen">
          <TopBar />
          <main className="flex-1 bg-gray-50">
            <FacebookAdBuilder />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
