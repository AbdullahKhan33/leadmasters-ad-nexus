
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

const menuItems = [
  { title: "Portfolio", icon: FolderOpen, url: "#" },
  { title: "Ad Builder", icon: Megaphone, url: "#", active: true },
  { title: "Post Builder", icon: FileText, url: "#" },
  { title: "Brainstorm Idea", icon: Lightbulb, url: "#" },
  { title: "Social Logins", icon: LogIn, url: "#" },
  { title: "CRM Dashboard", icon: Users, url: "#" },
  { title: "Analytics", icon: BarChart3, url: "#" },
  { title: "Schedule", icon: Calendar, url: "#" },
  { title: "Automations", icon: Workflow, url: "#" },
  { title: "Workspace", icon: FolderOpen, url: "#" },
];

export function AppSidebar() {
  console.log("AppSidebar is rendering");
  
  return (
    <div className="w-64 h-full bg-gradient-to-b from-purple-600 via-purple-500 to-pink-500 border-r border-purple-400">
      {/* Logo Section */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">L</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">LeadMasters</h1>
            <p className="text-sm text-white/80 font-medium">AI</p>
          </div>
        </div>
      </div>
      
      {/* Navigation Menu */}
      <div className="px-4 py-6">
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <a
              key={item.title}
              href={item.url}
              className={`
                flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group
                ${item.active 
                  ? 'bg-white/20 text-white shadow-lg backdrop-blur border border-white/20' 
                  : 'text-white/80 hover:text-white hover:bg-white/10'
                }
              `}
            >
              <item.icon className={`w-5 h-5 ${item.active ? 'text-white' : 'text-white/70 group-hover:text-white'}`} />
              <span className="text-sm font-medium">{item.title}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
