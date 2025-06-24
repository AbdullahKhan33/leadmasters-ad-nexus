
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
    <Sidebar className="border-r border-gray-200 bg-gradient-to-b from-purple-600 via-purple-500 to-pink-500 z-50" style={{ width: '256px', position: 'relative' }}>
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">L</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white">LeadMasters</h1>
            <p className="text-xs text-white/80 font-medium">AI</p>
          </div>
        </div>
      </div>
      
      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className={`
                      w-full justify-start px-3 py-2.5 rounded-lg transition-all duration-200 hover:bg-white/10
                      ${item.active ? 'bg-white/20 text-white border-r-3 border-white shadow-sm backdrop-blur' : 'text-white/80 hover:text-white'}
                    `}
                  >
                    <a href={item.url} className="flex items-center space-x-3">
                      <item.icon className={`w-4 h-4 ${item.active ? 'text-white' : 'text-white/70'}`} />
                      <span className="text-sm font-medium">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
