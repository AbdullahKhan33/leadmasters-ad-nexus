
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TopBar } from "@/components/TopBar";
import { FacebookAdBuilder } from "@/components/FacebookAdBuilder";

const Index = () => {
  console.log("Index page is rendering");
  
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-white">
        <div className="w-64 flex-shrink-0">
          <AppSidebar />
        </div>
        <div className="flex-1 flex flex-col">
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
