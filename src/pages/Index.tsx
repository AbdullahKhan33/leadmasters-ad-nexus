
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TopBar } from "@/components/TopBar";
import { FacebookAdBuilder } from "@/components/FacebookAdBuilder";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
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
