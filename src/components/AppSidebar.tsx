import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  Megaphone,
  PenTool,
  Settings,
  CreditCard,
  Code,
  Users,
  Zap,
} from "lucide-react";

export function AppSidebar({ 
  onPostBuilderClick, 
  onAdBuilderClick, 
  onSocialLoginsClick,
  currentView 
}: { 
  onPostBuilderClick: () => void;
  onAdBuilderClick: () => void;
  onSocialLoginsClick: () => void;
  currentView: 'ad-builder' | 'post-builder' | 'social-logins';
}) {
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);

  return (
    <Sidebar className="border-r border-gray-200/80 bg-white/95 backdrop-blur-sm shadow-sm">
      <SidebarHeader className="border-b border-gray-200/50 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center space-x-3 px-4 py-6">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-xl bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              LeadMasters
            </h1>
            <p className="text-xs text-gray-500 font-medium">AI POWERED</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-6">
        <SidebarMenu className="space-y-2">
          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={onAdBuilderClick}
              className={`w-full justify-start text-left h-12 px-4 rounded-xl transition-all duration-200 hover:bg-blue-50 hover:shadow-md group ${
                currentView === 'ad-builder' 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:from-blue-600 hover:to-purple-700' 
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Megaphone className={`w-5 h-5 ${currentView === 'ad-builder' ? 'text-white' : 'text-blue-600'} group-hover:scale-110 transition-transform duration-200`} />
                <span className="font-semibold">Ad Builder</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={onPostBuilderClick}
              className={`w-full justify-start text-left h-12 px-4 rounded-xl transition-all duration-200 hover:bg-green-50 hover:shadow-md group ${
                currentView === 'post-builder' 
                  ? 'bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg hover:from-green-600 hover:to-teal-700' 
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center space-x-3">
                <PenTool className={`w-5 h-5 ${currentView === 'post-builder' ? 'text-white' : 'text-green-600'} group-hover:scale-110 transition-transform duration-200`} />
                <span className="font-semibold">Post Builder</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={onSocialLoginsClick}
              className={`w-full justify-start text-left h-12 px-4 rounded-xl transition-all duration-200 hover:bg-purple-50 hover:shadow-md group ${
                currentView === 'social-logins' 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg hover:from-purple-600 hover:to-pink-700' 
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Users className={`w-5 h-5 ${currentView === 'social-logins' ? 'text-white' : 'text-purple-600'} group-hover:scale-110 transition-transform duration-200`} />
                <span className="font-semibold">Social Logins</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200/50 p-4">
        <SidebarMenu className="space-y-2">
          <SidebarMenuItem>
            <SidebarMenuButton className="w-full justify-start text-left h-12 px-4 rounded-xl transition-all duration-200 hover:bg-gray-50 text-gray-700 hover:text-gray-900 group">
              <div className="flex items-center space-x-3">
                <CreditCard className="w-5 h-5 text-gray-600 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-semibold">Billing</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setIsSettingsOpen(true)}
              className="w-full justify-start text-left h-12 px-4 rounded-xl transition-all duration-200 hover:bg-gray-50 text-gray-700 hover:text-gray-900 group"
            >
              <div className="flex items-center space-x-3">
                <Settings className="w-5 h-5 text-gray-600 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-semibold">Settings</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
