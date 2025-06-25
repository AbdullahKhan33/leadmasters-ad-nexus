import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar";
import { Logo } from "@/components/ui/logo";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Megaphone,
  PenTool,
  Users,
  BarChart3,
  Calendar,
  Bot,
  LayoutDashboard,
  Lightbulb,
  Briefcase,
  User,
  ChevronDown,
  MessageSquare,
  Mail,
  Zap,
} from "lucide-react";

export function WorkspaceSidebar({ 
  onPostBuilderClick, 
  onAdBuilderClick, 
  onSocialLoginsClick,
  onDashboardClick,
  onInspirationHubClick,
  onAnalyticsClick,
  onScheduleClick,
  onSmartAutomationsClick,
  onWorkspacesClick,
  onUserSettingsClick,
  onCRMClick,
  onDomainSetupClick,
  onCRMAutomationsClick,
  currentView 
}: { 
  onPostBuilderClick: () => void;
  onAdBuilderClick: () => void;
  onSocialLoginsClick: () => void;
  onDashboardClick: () => void;
  onInspirationHubClick: () => void;
  onAnalyticsClick: () => void;
  onScheduleClick: () => void;
  onSmartAutomationsClick: () => void;
  onWorkspacesClick: () => void;
  onUserSettingsClick: () => void;
  onCRMClick: () => void;
  onDomainSetupClick: () => void;
  onCRMAutomationsClick: () => void;
  currentView: 'ad-builder' | 'post-builder' | 'social-logins' | 'dashboard' | 'inspiration-hub' | 'analytics' | 'schedule' | 'smart-automations' | 'workspaces' | 'user-settings' | 'crm';
}) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const [isCRMSubmenuOpen, setIsCRMSubmenuOpen] = React.useState(false);

  const getMenuItemStyles = (isSelected: boolean) => {
    if (isSelected) {
      return 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white shadow-lg hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 hover:text-white';
    }
    return 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50/80 hover:via-purple-50/80 hover:to-pink-50/80 hover:text-gray-900 hover:shadow-sm';
  };

  const getIconStyles = (isSelected: boolean) => {
    if (isSelected) {
      return 'text-white';
    }
    return 'text-gray-600 group-hover:text-purple-600';
  };

  const getUserSelectionStyles = (isSelected: boolean) => {
    if (isSelected) {
      return 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg border-transparent hover:from-blue-600 hover:via-purple-600 hover:to-pink-600';
    }
    return 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:via-purple-50 hover:to-pink-50 hover:text-gray-900 border-gray-200/50 hover:border-purple-200 hover:shadow-sm';
  };

  const handleCRMDashboardClick = () => {
    onCRMClick();
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-gray-200/80 bg-white/95 backdrop-blur-sm shadow-sm">
      <SidebarHeader className="border-b border-gray-200/50 bg-gradient-to-r from-blue-50/80 via-purple-50/80 to-pink-50/80">
        <div className="flex items-center justify-between px-4 py-6">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <Logo className="w-10 h-10 shadow-lg rounded-xl" />
              <div>
                <h1 className="font-bold text-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                  LeadMasters
                </h1>
                <p className="text-xs text-gray-500 font-medium">AI POWERED</p>
              </div>
            </div>
          )}
          {isCollapsed && (
            <Logo className="w-10 h-10 shadow-lg rounded-xl mx-auto" />
          )}
          <SidebarTrigger className={isCollapsed ? "mx-auto mt-2" : "ml-auto"} />
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-6">
        <SidebarMenu className="space-y-2">
          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={onDashboardClick}
              className={`w-full justify-start text-left ${isCollapsed ? 'h-16 px-2 flex-col' : 'h-12 px-4'} rounded-xl transition-all duration-200 group ${getMenuItemStyles(currentView === 'dashboard')}`}
            >
              {isCollapsed ? (
                <div className="flex flex-col items-center space-y-1">
                  <LayoutDashboard className={`w-5 h-5 ${getIconStyles(currentView === 'dashboard')} group-hover:scale-110 transition-transform duration-200`} />
                  <span className="text-xs font-medium">Dashboard</span>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <LayoutDashboard className={`w-5 h-5 ${getIconStyles(currentView === 'dashboard')} group-hover:scale-110 transition-transform duration-200`} />
                  <span className="font-semibold">Dashboard</span>
                </div>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={onAdBuilderClick}
              className={`w-full justify-start text-left ${isCollapsed ? 'h-16 px-2 flex-col' : 'h-12 px-4'} rounded-xl transition-all duration-200 group ${getMenuItemStyles(currentView === 'ad-builder')}`}
            >
              {isCollapsed ? (
                <div className="flex flex-col items-center space-y-1">
                  <Megaphone className={`w-5 h-5 ${getIconStyles(currentView === 'ad-builder')} group-hover:scale-110 transition-transform duration-200`} />
                  <span className="text-xs font-medium">Ad Builder</span>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Megaphone className={`w-5 h-5 ${getIconStyles(currentView === 'ad-builder')} group-hover:scale-110 transition-transform duration-200`} />
                  <span className="font-semibold">Ad Builder</span>
                </div>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={onPostBuilderClick}
              className={`w-full justify-start text-left ${isCollapsed ? 'h-16 px-2 flex-col' : 'h-12 px-4'} rounded-xl transition-all duration-200 group ${getMenuItemStyles(currentView === 'post-builder')}`}
            >
              {isCollapsed ? (
                <div className="flex flex-col items-center space-y-1">
                  <PenTool className={`w-5 h-5 ${getIconStyles(currentView === 'post-builder')} group-hover:scale-110 transition-transform duration-200`} />
                  <span className="text-xs font-medium">Post Builder</span>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <PenTool className={`w-5 h-5 ${getIconStyles(currentView === 'post-builder')} group-hover:scale-110 transition-transform duration-200`} />
                  <span className="font-semibold">Post Builder</span>
                </div>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={onInspirationHubClick}
              className={`w-full justify-start text-left ${isCollapsed ? 'h-16 px-2 flex-col' : 'h-12 px-4'} rounded-xl transition-all duration-200 group ${getMenuItemStyles(currentView === 'inspiration-hub')}`}
            >
              {isCollapsed ? (
                <div className="flex flex-col items-center space-y-1">
                  <Lightbulb className={`w-5 h-5 ${getIconStyles(currentView === 'inspiration-hub')} group-hover:scale-110 transition-transform duration-200`} />
                  <span className="text-xs font-medium">Post Ideas</span>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Lightbulb className={`w-5 h-5 ${getIconStyles(currentView === 'inspiration-hub')} group-hover:scale-110 transition-transform duration-200`} />
                  <span className="font-semibold">Post Ideas</span>
                </div>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={onSocialLoginsClick}
              className={`w-full justify-start text-left ${isCollapsed ? 'h-16 px-2 flex-col' : 'h-12 px-4'} rounded-xl transition-all duration-200 group ${getMenuItemStyles(currentView === 'social-logins')}`}
            >
              {isCollapsed ? (
                <div className="flex flex-col items-center space-y-1">
                  <Users className={`w-5 h-5 ${getIconStyles(currentView === 'social-logins')} group-hover:scale-110 transition-transform duration-200`} />
                  <span className="text-xs font-medium">Social</span>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Users className={`w-5 h-5 ${getIconStyles(currentView === 'social-logins')} group-hover:scale-110 transition-transform duration-200`} />
                  <span className="font-semibold">Social Logins</span>
                </div>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* CRM Menu with Submenu */}
          <SidebarMenuItem>
            <div className="space-y-1">
              <SidebarMenuButton 
                onClick={() => setIsCRMSubmenuOpen(!isCRMSubmenuOpen)}
                className={`w-full justify-start text-left ${isCollapsed ? 'h-16 px-2 flex-col' : 'h-12 px-4'} rounded-xl transition-all duration-200 group ${getMenuItemStyles(currentView === 'crm')}`}
              >
                {isCollapsed ? (
                  <div className="flex flex-col items-center space-y-1">
                    <BarChart3 className={`w-5 h-5 ${getIconStyles(currentView === 'crm')} group-hover:scale-110 transition-transform duration-200`} />
                    <span className="text-xs font-medium">Leads</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-3">
                      <BarChart3 className={`w-5 h-5 ${getIconStyles(currentView === 'crm')} group-hover:scale-110 transition-transform duration-200`} />
                      <span className="font-semibold">Leads & CRM</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isCRMSubmenuOpen ? 'rotate-180' : ''}`} />
                  </div>
                )}
              </SidebarMenuButton>
              
              {/* Submenu */}
              {isCRMSubmenuOpen && !isCollapsed && (
                <div className="ml-6 space-y-1">
                  <SidebarMenuButton 
                    onClick={handleCRMDashboardClick}
                    className="w-full justify-start text-left h-10 px-4 rounded-lg transition-all duration-200 group text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  >
                    <div className="flex items-center space-x-3">
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-sm font-medium">Dashboard</span>
                    </div>
                  </SidebarMenuButton>
                  
                  <SidebarMenuButton 
                    onClick={onDomainSetupClick}
                    className="w-full justify-start text-left h-10 px-4 rounded-lg transition-all duration-200 group text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  >
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm font-medium">Domain Setup</span>
                    </div>
                  </SidebarMenuButton>
                  
                  <SidebarMenuButton 
                    onClick={onCRMAutomationsClick}
                    className="w-full justify-start text-left h-10 px-4 rounded-lg transition-all duration-200 group text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  >
                    <div className="flex items-center space-x-3">
                      <Zap className="w-4 h-4" />
                      <span className="text-sm font-medium">Automations</span>
                    </div>
                  </SidebarMenuButton>
                </div>
              )}
            </div>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={onAnalyticsClick}
              className={`w-full justify-start text-left ${isCollapsed ? 'h-16 px-2 flex-col' : 'h-12 px-4'} rounded-xl transition-all duration-200 group ${getMenuItemStyles(currentView === 'analytics')}`}
            >
              {isCollapsed ? (
                <div className="flex flex-col items-center space-y-1">
                  <BarChart3 className={`w-5 h-5 ${getIconStyles(currentView === 'analytics')} group-hover:scale-110 transition-transform duration-200`} />
                  <span className="text-xs font-medium">Insights</span>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <BarChart3 className={`w-5 h-5 ${getIconStyles(currentView === 'analytics')} group-hover:scale-110 transition-transform duration-200`} />
                  <span className="font-semibold">Insights</span>
                </div>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={onScheduleClick}
              className={`w-full justify-start text-left ${isCollapsed ? 'h-16 px-2 flex-col' : 'h-12 px-4'} rounded-xl transition-all duration-200 group ${getMenuItemStyles(currentView === 'schedule')}`}
            >
              {isCollapsed ? (
                <div className="flex flex-col items-center space-y-1">
                  <Calendar className={`w-5 h-5 ${getIconStyles(currentView === 'schedule')} group-hover:scale-110 transition-transform duration-200`} />
                  <span className="text-xs font-medium">Schedule</span>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Calendar className={`w-5 h-5 ${getIconStyles(currentView === 'schedule')} group-hover:scale-110 transition-transform duration-200`} />
                  <span className="font-semibold">Schedule</span>
                </div>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={onWorkspacesClick}
              className={`w-full justify-start text-left ${isCollapsed ? 'h-16 px-2 flex-col' : 'h-12 px-4'} rounded-xl transition-all duration-200 group ${getMenuItemStyles(currentView === 'workspaces')}`}
            >
              {isCollapsed ? (
                <div className="flex flex-col items-center space-y-1">
                  <Briefcase className={`w-5 h-5 ${getIconStyles(currentView === 'workspaces')} group-hover:scale-110 transition-transform duration-200`} />
                  <span className="text-xs font-medium">Workspaces</span>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Briefcase className={`w-5 h-5 ${getIconStyles(currentView === 'workspaces')} group-hover:scale-110 transition-transform duration-200`} />
                  <span className="font-semibold">Workspaces</span>
                </div>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200/50 p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={onUserSettingsClick}
              className={`w-full justify-start text-left ${isCollapsed ? 'h-20 px-2 flex-col' : 'h-16 px-4'} rounded-xl transition-all duration-300 group border ${getUserSelectionStyles(currentView === 'user-settings')}`}
            >
              {isCollapsed ? (
                <div className="flex flex-col items-center space-y-2">
                  <Avatar className="w-10 h-10 ring-2 ring-white/20">
                    <AvatarFallback className="bg-gradient-to-br from-blue-100 to-purple-100 text-purple-600 text-sm font-bold">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs font-semibold leading-tight text-center">Account</span>
                </div>
              ) : (
                <div className="flex items-center space-x-4 w-full">
                  <Avatar className="w-12 h-12 ring-2 ring-white/20 shadow-sm">
                    <AvatarFallback className="bg-gradient-to-br from-blue-100 to-purple-100 text-purple-600 text-lg font-bold">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="font-bold text-base truncate">John Doe</span>
                    <span className="text-sm opacity-75 truncate">john@company.com</span>
                  </div>
                </div>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
