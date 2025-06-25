import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Bell, Coins, CheckCircle, AlertCircle, Info, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { PricingScreen } from "./PricingScreen";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { useTheme } from "@/contexts/ThemeContext";

export function TopBar() {
  const [showPricing, setShowPricing] = useState(false);
  const { activeWorkspace, isInWorkspace } = useWorkspace();
  const { theme, toggleTheme } = useTheme();

  const sampleNotifications = [
    {
      id: 1,
      title: "Campaign Performance Update",
      message: "Your Facebook ad campaign has achieved 25% higher CTR than expected.",
      time: "2 minutes ago",
      type: "success",
      icon: CheckCircle
    },
    {
      id: 2,
      title: "Budget Alert",
      message: "You have used 80% of your monthly ad spend budget.",
      time: "1 hour ago",
      type: "warning",
      icon: AlertCircle
    },
    {
      id: 3,
      title: "New Feature Available",
      message: "WhatsApp Business integration is now live in your account.",
      time: "3 hours ago",
      type: "info",
      icon: Info
    },
    {
      id: 4,
      title: "Post Scheduled",
      message: "Your Instagram post has been scheduled for tomorrow at 9 AM.",
      time: "5 hours ago",
      type: "success",
      icon: CheckCircle
    },
    {
      id: 5,
      title: "Account Verification",
      message: "Please verify your LinkedIn business account to continue posting.",
      time: "1 day ago",
      type: "warning",
      icon: AlertCircle
    }
  ];

  const getNotificationStyles = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-green-600 bg-green-50 border-green-100';
      case 'warning':
        return 'text-orange-600 bg-orange-50 border-orange-100';
      case 'info':
        return 'text-blue-600 bg-blue-50 border-blue-100';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-100';
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6 flex-1">
            <div className="min-w-0">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                {isInWorkspace && activeWorkspace ? activeWorkspace.name : "My Project 123"}
              </h2>
            </div>
            
            <div className="flex items-center space-x-4 flex-1 max-w-md">
              <div className="flex items-center space-x-2 min-w-0 flex-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">Business Manager:</span>
                <Select defaultValue="bot-campus">
                  <SelectTrigger className="flex-1 min-w-0 h-8 text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bot-campus">Bot Campus AI</SelectItem>
                    <SelectItem value="other">Other Account</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 ml-4">
            {/* Dark Mode Switch */}
            <div className="flex items-center space-x-2 flex-shrink-0">
              <Sun className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <Switch
                checked={theme === 'dark'}
                onCheckedChange={toggleTheme}
                className="data-[state=checked]:bg-purple-600"
              />
              <Moon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:border-blue-300 dark:border-blue-700 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800 transition-colors duration-200 relative flex-shrink-0"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[50vw] max-w-none dark:bg-gray-900 dark:border-gray-700">
                <SheetHeader className="pb-4 border-b border-gray-100 dark:border-gray-700">
                  <SheetTitle className="text-xl font-bold text-gray-900 dark:text-white">Notifications</SheetTitle>
                </SheetHeader>
                <div className="space-y-3 max-h-[calc(100vh-160px)] overflow-y-auto pr-2 mt-4">
                  {sampleNotifications.map((notification) => {
                    const IconComponent = notification.icon;
                    return (
                      <div key={notification.id} className="group relative overflow-hidden rounded-lg border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:border-gray-200 dark:hover:border-gray-600">
                        <div className="flex items-start space-x-3">
                          <div className={`flex-shrink-0 p-2 rounded-lg border ${getNotificationStyles(notification.type)}`}>
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1 leading-tight">
                              {notification.title}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 break-words leading-relaxed">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                        <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-gray-100 dark:via-gray-700 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <Button variant="outline" className="w-full h-10 text-sm font-medium border-gray-200 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800 dark:text-white transition-colors duration-200">
                    Mark All as Read
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
            
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100 hover:border-orange-300 dark:border-orange-700 dark:bg-orange-900 dark:text-orange-300 dark:hover:bg-orange-800 transition-colors duration-200 flex-shrink-0"
                >
                  <Coins className="w-4 h-4" />
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-48 dark:bg-gray-800 dark:border-gray-700">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Free Credits</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Premium Credits</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">25</span>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
            
            <Button 
              variant="outline" 
              className="border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors duration-200 whitespace-nowrap flex-shrink-0"
              onClick={() => setShowPricing(true)}
            >
              Explore Plans
            </Button>
            <Button 
              className="bg-purple-600 hover:bg-purple-700 text-white transition-all duration-200 shadow-lg hover:shadow-xl whitespace-nowrap flex-shrink-0"
            >
              Make Live
            </Button>
          </div>
        </div>
      </div>

      {showPricing && <PricingScreen onClose={() => setShowPricing(false)} />}
    </>
  );
}
