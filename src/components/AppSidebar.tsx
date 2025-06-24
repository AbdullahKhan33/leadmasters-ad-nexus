
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
  return (
    <Sidebar className="border-r border-gray-200 bg-white">
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">L</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">LeadMasters</h1>
            <p className="text-xs text-purple-600 font-medium">AI</p>
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
                      w-full justify-start px-3 py-2.5 rounded-lg transition-all duration-200 hover:bg-gray-50
                      ${item.active ? 'bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 border-r-3 border-purple-600 shadow-sm' : 'text-gray-700 hover:text-gray-900'}
                    `}
                  >
                    <a href={item.url} className="flex items-center space-x-3">
                      <item.icon className={`w-4 h-4 ${item.active ? 'text-purple-600' : 'text-gray-500'}`} />
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
