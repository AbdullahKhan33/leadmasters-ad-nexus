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
import {
  Megaphone,
  PenTool,
  Settings,
  Users,
  BarChart3,
  Calendar,
  Bot,
  Briefcase,
  LayoutDashboard,
  Lightbulb,
  ChevronDown,
  MessageSquare,
  Mail,
  Zap,
  FileText,
} from "lucide-react";

export function AppSidebar({ 
  onPostBuilderClick, 
  onAdBuilderClick, 
  onSocialLoginsClick,
  onDashboardClick,
  onInspirationHubClick,
  onAnalyticsClick,
  onScheduleClick,
  onSmartAutomationsClick,
  onWorkspacesClick,
  onCRMClick,
  onDomainSetupClick,
  onCRMAutomationsClick,
  onTemplatesClick,
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
  onCRMClick: () => void;
  onDomainSetupClick: () => void;
  onCRMAutomationsClick: () => void;
  onTemplatesClick: () => void;
  currentView: 'ad-builder' | 'post-builder' | 'social-logins' | 'dashboard' | 'inspiration-hub' | 'analytics' | 'schedule' | 'smart-automations' | 'workspaces' | 'crm' | 'domain-setup' | 'crm-automations' | 'templates';
}) {
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const [isCRMSubmenuOpen, setIsCRMSubmenuOpen] = React.useState(false);
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  // Keep CRM submenu open when on any CRM-related view
  React.useEffect(() => {
    if (['crm', 'domain-setup', 'crm-automations', 'templates'].includes(currentView)) {
      setIsCRMSubmenuOpen(true);
    }
  }, [currentView]);

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

  const getSubmenuItemStyles = (isSelected: boolean) => {
    if (isSelected) {
      return 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white shadow-lg hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 hover:text-white';
    }
    return 'text-gray-600 hover:bg-gray-100 hover:text-gray-900';
  };

  const handleCRMMainClick = () => {
    if (isCollapsed) {
      // If collapsed, just navigate to CRM dashboard
      onCRMClick();
    } else {
      // If expanded, toggle submenu and navigate to CRM dashboard
      setIsCRMSubmenuOpen(!isCRMSubmenuOpen);
      onCRMClick();
    }
  };

  // Check if any CRM-related view is active
  const isCRMViewActive = ['crm', 'domain-setup', 'crm-automations', 'templates'].includes(currentView);

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
                  <span className="text-xs font-medium">Social Logins</span>
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
                onClick={handleCRMMainClick}
                className={`w-full justify-start text-left ${isCollapsed ? 'h-16 px-2 flex-col' : 'h-12 px-4'} rounded-xl transition-all duration-200 group ${getMenuItemStyles(isCRMViewActive)}`}
              >
                {isCollapsed ? (
                  <div className="flex flex-col items-center space-y-1">
                    <BarChart3 className={`w-5 h-5 ${getIconStyles(isCRMViewActive)} group-hover:scale-110 transition-transform duration-200`} />
                    <span className="text-xs font-medium">Leads</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-3">
                      <BarChart3 className={`w-5 h-5 ${getIconStyles(isCRMViewActive)} group-hover:scale-110 transition-transform duration-200`} />
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
                    onClick={onCRMClick}
                    className={`w-full justify-start text-left h-10 px-4 rounded-lg transition-all duration-200 group ${getSubmenuItemStyles(currentView === 'crm')}`}
                  >
                    <div className="flex items-center space-x-3">
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-sm font-medium">Dashboard</span>
                    </div>
                  </SidebarMenuButton>
                  
                  <SidebarMenuButton 
                    onClick={onDomainSetupClick}
                    className={`w-full justify-start text-left h-10 px-4 rounded-lg transition-all duration-200 group ${getSubmenuItemStyles(currentView === 'domain-setup')}`}
                  >
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm font-medium">Domain Setup</span>
                    </div>
                  </SidebarMenuButton>
                  
                  <SidebarMenuButton 
                    onClick={onCRMAutomationsClick}
                    className={`w-full justify-start text-left h-10 px-4 rounded-lg transition-all duration-200 group ${getSubmenuItemStyles(currentView === 'crm-automations')}`}
                  >
                    <div className="flex items-center space-x-3">
                      <Zap className="w-4 h-4" />
                      <span className="text-sm font-medium">Automations</span>
                    </div>
                  </SidebarMenuButton>

                  <SidebarMenuButton 
                    onClick={onTemplatesClick}
                    className={`w-full justify-start text-left h-10 px-4 rounded-lg transition-all duration-200 group ${getSubmenuItemStyles(currentView === 'templates')}`}
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="w-4 h-4" />
                      <span className="text-sm font-medium">Templates</span>
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
        <SidebarMenu className="space-y-2">
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setIsSettingsOpen(true)}
              className={`w-full justify-start text-left ${isCollapsed ? 'h-16 px-2 flex-col' : 'h-12 px-4'} rounded-xl transition-all duration-200 group ${getMenuItemStyles(false)}`}
            >
              {isCollapsed ? (
                <div className="flex flex-col items-center space-y-1">
                  <Settings className={`w-5 h-5 ${getIconStyles(false)} group-hover:scale-110 transition-transform duration-200`} />
                  <span className="text-xs font-medium">Settings</span>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Settings className={`w-5 h-5 ${getIconStyles(false)} group-hover:scale-110 transition-transform duration-200`} />
                  <span className="font-semibold">Settings</span>
                </div>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
