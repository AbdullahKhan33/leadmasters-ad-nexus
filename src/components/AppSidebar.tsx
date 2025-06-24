
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { 
  FolderOpen, 
  Megaphone, 
  FileText, 
  Lightbulb, 
  LogIn, 
  BarChart3, 
  Calendar, 
  Workflow,
  Users
} from "lucide-react";

interface AppSidebarProps {
  onPostBuilderClick?: () => void;
  currentView?: string;
}

const menuItems = [
  { title: "Portfolio", icon: FolderOpen, url: "#" },
  { title: "Ad Builder", icon: Megaphone, url: "#", active: true },
  { title: "Post Builder", icon: FileText, url: "#", clickable: true },
  { title: "Brainstorm Idea", icon: Lightbulb, url: "#" },
  { title: "Social Logins", icon: LogIn, url: "#" },
  { title: "CRM Dashboard", icon: Users, url: "#" },
  { title: "Analytics", icon: BarChart3, url: "#" },
  { title: "Schedule", icon: Calendar, url: "#" },
  { title: "Automations", icon: Workflow, url: "#" },
  { title: "Workspace", icon: FolderOpen, url: "#" },
];

export function AppSidebar({ onPostBuilderClick, currentView }: AppSidebarProps) {
  console.log("AppSidebar is rendering");
  
  const handleItemClick = (item: typeof menuItems[0]) => {
    if (item.title === "Post Builder" && onPostBuilderClick) {
      onPostBuilderClick();
    }
  };
  
  return (
    <div className="w-64 h-full bg-white border-r border-gray-200 shadow-sm">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#7C3AED] to-[#D946EF] rounded-xl flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-lg">L</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">LeadMasters</h1>
            <p className="text-sm text-gray-500 font-medium">AI</p>
          </div>
        </div>
      </div>
      
      {/* Navigation Menu */}
      <div className="px-3 py-6">
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = item.active || (item.title === "Post Builder" && currentView === "post-builder");
            return (
              <button
                key={item.title}
                onClick={() => handleItemClick(item)}
                className={`
                  flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group w-full text-left
                  ${isActive 
                    ? 'bg-gradient-to-r from-[#7C3AED] to-[#D946EF] text-white shadow-lg' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }
                `}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'}`} />
                <span className="text-sm font-medium">{item.title}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
