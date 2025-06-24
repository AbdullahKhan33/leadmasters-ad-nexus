
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
import { Button } from "@/components/ui/button";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import {
  Megaphone,
  PenTool,
  Settings,
  Users,
  BarChart3,
  Calendar,
  Bot,
  LayoutDashboard,
  Lightbulb,
  ArrowLeft,
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
  onBackToWorkspaces,
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
  onBackToWorkspaces: () => void;
  currentView: 'ad-builder' | 'post-builder' | 'social-logins' | 'dashboard' | 'inspiration-hub' | 'analytics' | 'schedule' | 'smart-automations' | 'workspace-settings';
}) {
  const { activeWorkspace } = useWorkspace();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

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

  if (!activeWorkspace) {
    return null;
  }

  return (
    <Sidebar collapsible="icon" className="border-r border-gray-200/80 bg-white/95 backdrop-blur-sm shadow-sm">
      <SidebarHeader className="border-b border-gray-200/50 bg-gradient-to-r from-blue-50/80 via-purple-50/80 to-pink-50/80">
        <div className="flex items-center justify-between px-4 py-6">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {activeWorkspace.initials}
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="font-bold text-lg bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent truncate">
                  {activeWorkspace.name}
                </h1>
                <p className="text-xs text-gray-500 font-medium truncate">
                  {activeWorkspace.country} | {activeWorkspace.industry}
                </p>
              </div>
            </div>
          )}
          {isCollapsed && (
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-lg mx-auto">
              {activeWorkspace.initials}
            </div>
          )}
          <SidebarTrigger className={isCollapsed ? "mx-auto mt-2" : "ml-auto"} />
        </div>
        
        {!isCollapsed && (
          <div className="px-4 pb-4">
            <Button
              onClick={onBackToWorkspaces}
              variant="outline"
              size="sm"
              className="w-full text-xs border-gray-300 hover:bg-gray-50"
            >
              <ArrowLeft className="w-3 h-3 mr-2" />
              Back to Workspaces
            </Button>
          </div>
        )}
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
                  <span className="text-xs font-medium">Inspiration</span>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Lightbulb className={`w-5 h-5 ${getIconStyles(currentView === 'inspiration-hub')} group-hover:scale-110 transition-transform duration-200`} />
                  <span className="font-semibold">Inspiration Hub</span>
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

          <SidebarMenuItem>
            <SidebarMenuButton className={`w-full justify-start text-left ${isCollapsed ? 'h-16 px-2 flex-col' : 'h-12 px-4'} rounded-xl transition-all duration-200 group ${getMenuItemStyles(false)}`}>
              {isCollapsed ? (
                <div className="flex flex-col items-center space-y-1">
                  <BarChart3 className={`w-5 h-5 ${getIconStyles(false)} group-hover:scale-110 transition-transform duration-200`} />
                  <span className="text-xs font-medium">CRM</span>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <BarChart3 className={`w-5 h-5 ${getIconStyles(false)} group-hover:scale-110 transition-transform duration-200`} />
                  <span className="font-semibold">CRM Dashboard</span>
                </div>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={onAnalyticsClick}
              className={`w-full justify-start text-left ${isCollapsed ? 'h-16 px-2 flex-col' : 'h-12 px-4'} rounded-xl transition-all duration-200 group ${getMenuItemStyles(currentView === 'analytics')}`}
            >
              {isCollapsed ? (
                <div className="flex flex-col items-center space-y-1">
                  <BarChart3 className={`w-5 h-5 ${getIconStyles(currentView === 'analytics')} group-hover:scale-110 transition-transform duration-200`} />
                  <span className="text-xs font-medium">Analytics</span>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <BarChart3 className={`w-5 h-5 ${getIconStyles(currentView === 'analytics')} group-hover:scale-110 transition-transform duration-200`} />
                  <span className="font-semibold">Analytics</span>
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
              onClick={onSmartAutomationsClick}
              className={`w-full justify-start text-left ${isCollapsed ? 'h-16 px-2 flex-col' : 'h-12 px-4'} rounded-xl transition-all duration-200 group ${getMenuItemStyles(currentView === 'smart-automations')}`}
            >
              {isCollapsed ? (
                <div className="flex flex-col items-center space-y-1">
                  <Bot className={`w-5 h-5 ${getIconStyles(currentView === 'smart-automations')} group-hover:scale-110 transition-transform duration-200`} />
                  <span className="text-xs font-medium">Automations</span>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Bot className={`w-5 h-5 ${getIconStyles(currentView === 'smart-automations')} group-hover:scale-110 transition-transform duration-200`} />
                  <span className="font-semibold">Automations</span>
                </div>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200/50 p-4">
        <SidebarMenu className="space-y-2">
          <SidebarMenuItem>
            <SidebarMenuButton
              className={`w-full justify-start text-left ${isCollapsed ? 'h-16 px-2 flex-col' : 'h-12 px-4'} rounded-xl transition-all duration-200 group ${getMenuItemStyles(currentView === 'workspace-settings')}`}
            >
              {isCollapsed ? (
                <div className="flex flex-col items-center space-y-1">
                  <Settings className={`w-5 h-5 ${getIconStyles(currentView === 'workspace-settings')} group-hover:scale-110 transition-transform duration-200`} />
                  <span className="text-xs font-medium">Settings</span>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Settings className={`w-5 h-5 ${getIconStyles(currentView === 'workspace-settings')} group-hover:scale-110 transition-transform duration-200`} />
                  <span className="font-semibold">Workspace Settings</span>
                </div>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
