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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSidebar } from "@/components/ui/sidebar";
import { Logo } from "@/components/ui/logo";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { useAuth } from "@/contexts/AuthContext";
import { useAgentPermissions } from "@/hooks/useAgentPermissions";
import {
  Megaphone,
  PenTool,
  Users,
  BarChart3,
  Calendar,
  LayoutDashboard,
  Lightbulb,
  User,
  ChevronDown,
  MessageSquare,
  Mail,
  Zap,
  FileText,
  UserCheck,
  LogOut,
  Settings,
  ShoppingBag,
  Archive,
  Briefcase,
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
  onTemplatesClick,
  onAgentsClick,
  onServicesClick,
  onPublishedPostsClick,
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
  onTemplatesClick: () => void;
  onAgentsClick: () => void;
  onServicesClick: () => void;
  onPublishedPostsClick: () => void;
  currentView: 'ad-builder' | 'post-builder' | 'social-logins' | 'dashboard' | 'inspiration-hub' | 'analytics' | 'schedule' | 'smart-automations' | 'workspaces' | 'user-settings' | 'crm' | 'domain-setup' | 'crm-automations' | 'templates' | 'agents' | 'services' | 'published-posts';
}) {
  const [isCRMSubmenuOpen, setIsCRMSubmenuOpen] = React.useState(false);
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const { permissions } = useAgentPermissions();
  const { logout, userRole } = useAuth();

  React.useEffect(() => {
    console.log('WorkspaceSidebar - Current permissions:', permissions);
    console.log('WorkspaceSidebar - User role:', userRole);
  }, [permissions, userRole]);

  React.useEffect(() => {
    if (['crm', 'domain-setup', 'crm-automations', 'templates', 'agents'].includes(currentView)) {
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
      onCRMClick();
    } else {
      setIsCRMSubmenuOpen(!isCRMSubmenuOpen);
      onCRMClick();
    }
  };

  const isCRMViewActive = ['crm', 'domain-setup', 'crm-automations', 'templates', 'agents'].includes(currentView);

  const handleLogout = async () => {
    console.log('Logout clicked from WorkspaceSidebar');
    try {
      // Force immediate logout
      await logout();
      // Force page refresh to ensure clean state
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
      // Force redirect even if logout fails
      window.location.href = '/';
    }
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

          {/* Ad Builder - Show based on agent permissions */}
          {userRole === 'admin' || (userRole === 'agent' && permissions?.ad_builder === true) ? (
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
          ) : null}

          {/* Post Builder - Show based on agent permissions */}
          {userRole === 'admin' || (userRole === 'agent' && permissions?.post_builder === true) ? (
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
          ) : null}

          {/* Published Posts - Show based on agent permissions */}
          {userRole === 'admin' || (userRole === 'agent' && permissions?.content_hub === true) ? (
            <SidebarMenuItem>
              <SidebarMenuButton 
                onClick={onPublishedPostsClick}
                className={`w-full justify-start text-left ${isCollapsed ? 'h-16 px-2 flex-col' : 'h-12 px-4'} rounded-xl transition-all duration-200 group ${getMenuItemStyles(currentView === 'published-posts')}`}
              >
                {isCollapsed ? (
                  <div className="flex flex-col items-center space-y-1">
                    <Archive className={`w-5 h-5 ${getIconStyles(currentView === 'published-posts')} group-hover:scale-110 transition-transform duration-200`} />
                    <span className="text-xs font-medium">Published Posts</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Archive className={`w-5 h-5 ${getIconStyles(currentView === 'published-posts')} group-hover:scale-110 transition-transform duration-200`} />
                    <span className="font-semibold">Published Posts</span>
                  </div>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ) : null}

          {/* Post Ideas - Show based on agent permissions */}
          {userRole === 'admin' || (userRole === 'agent' && permissions?.inspiration_hub === true) ? (
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
          ) : null}

          {/* Social Logins - Show based on agent permissions */}
          {userRole === 'admin' || (userRole === 'agent' && permissions?.social_logins === true) ? (
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
          ) : null}

          {/* CRM Menu with Submenu - Show based on agent permissions */}
          {userRole === 'admin' || (userRole === 'agent' && permissions?.crm === true) ? (
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
                  {/* Dashboard - Always available when CRM is enabled */}
                  {(userRole === 'admin' || (userRole === 'agent' && permissions?.crm_dashboard)) && (
                    <SidebarMenuButton 
                      onClick={onCRMClick}
                      className={`w-full justify-start text-left h-10 px-4 rounded-lg transition-all duration-200 group ${getSubmenuItemStyles(currentView === 'crm')}`}
                    >
                      <div className="flex items-center space-x-3">
                        <MessageSquare className="w-4 h-4" />
                        <span className="text-sm font-medium">Dashboard</span>
                      </div>
                    </SidebarMenuButton>
                  )}
                  
                  {/* Domain Setup - Admin or agents with permission */}
                  {(userRole === 'admin' || (userRole === 'agent' && permissions?.crm_domain_setup)) && (
                    <SidebarMenuButton 
                      onClick={onDomainSetupClick}
                      className={`w-full justify-start text-left h-10 px-4 rounded-lg transition-all duration-200 group ${getSubmenuItemStyles(currentView === 'domain-setup')}`}
                    >
                      <div className="flex items-center space-x-3">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm font-medium">Domain Setup</span>
                      </div>
                    </SidebarMenuButton>
                  )}
                  
                  {/* CRM Automations - Admin or agents with permission */}
                  {(userRole === 'admin' || (userRole === 'agent' && permissions?.crm_automations)) && (
                    <SidebarMenuButton 
                      onClick={onCRMAutomationsClick}
                      className={`w-full justify-start text-left h-10 px-4 rounded-lg transition-all duration-200 group ${getSubmenuItemStyles(currentView === 'crm-automations')}`}
                    >
                      <div className="flex items-center space-x-3">
                        <Zap className="w-4 h-4" />
                        <span className="text-sm font-medium">Automations</span>
                      </div>
                    </SidebarMenuButton>
                  )}

                  {/* Agents - Admin or agents with permission */}
                  {(userRole === 'admin' || (userRole === 'agent' && permissions?.crm_agents)) && (
                    <SidebarMenuButton 
                      onClick={onAgentsClick}
                      className={`w-full justify-start text-left h-10 px-4 rounded-lg transition-all duration-200 group ${getSubmenuItemStyles(currentView === 'agents')}`}
                    >
                      <div className="flex items-center space-x-3">
                        <UserCheck className="w-4 h-4" />
                        <span className="text-sm font-medium">Agents</span>
                      </div>
                    </SidebarMenuButton>
                  )}

                  {/* Templates - Admin or agents with permission */}
                  {(userRole === 'admin' || (userRole === 'agent' && permissions?.crm_templates)) && (
                    <SidebarMenuButton 
                      onClick={onTemplatesClick}
                      className={`w-full justify-start text-left h-10 px-4 rounded-lg transition-all duration-200 group ${getSubmenuItemStyles(currentView === 'templates')}`}
                    >
                      <div className="flex items-center space-x-3">
                        <FileText className="w-4 h-4" />
                        <span className="text-sm font-medium">Templates</span>
                      </div>
                    </SidebarMenuButton>
                  )}
                </div>
              )}
            </div>
            </SidebarMenuItem>
          ) : null}

          {/* Insights - Show based on agent permissions */}
          {userRole === 'admin' || (userRole === 'agent' && permissions?.analytics === true) ? (
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
          ) : null}

          {/* Schedule - Show based on agent permissions */}
          {userRole === 'admin' || (userRole === 'agent' && permissions?.schedule === true) ? (
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
          ) : null}

          {/* Workspaces - Show for all users but restrict create functionality */}
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

          {/* Services - Admin only */}
          {userRole === 'admin' && (
            <SidebarMenuItem>
              <SidebarMenuButton 
                onClick={onServicesClick}
                className={`w-full justify-start text-left ${isCollapsed ? 'h-16 px-2 flex-col' : 'h-12 px-4'} rounded-xl transition-all duration-200 group ${getMenuItemStyles(currentView === 'services')}`}
              >
                {isCollapsed ? (
                  <div className="flex flex-col items-center space-y-1">
                    <ShoppingBag className={`w-5 h-5 ${getIconStyles(currentView === 'services')} group-hover:scale-110 transition-transform duration-200`} />
                    <span className="text-xs font-medium">Services</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <ShoppingBag className={`w-5 h-5 ${getIconStyles(currentView === 'services')} group-hover:scale-110 transition-transform duration-200`} />
                    <span className="font-semibold">Services</span>
                  </div>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200/50 p-4">
        <SidebarMenu className="space-y-2">
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
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
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="w-56 mr-4 mb-2" 
                side="top" 
                align="end"
              >
                <DropdownMenuItem onClick={onUserSettingsClick} className="cursor-pointer">
                  <User className="w-4 h-4 mr-2" />
                  Account Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={handleLogout} 
                  className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}