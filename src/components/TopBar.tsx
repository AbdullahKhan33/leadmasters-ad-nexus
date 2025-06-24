import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Bell, Coins, CheckCircle, AlertCircle, Info } from "lucide-react";
import { useState } from "react";
import { PricingScreen } from "./PricingScreen";

export function TopBar() {
  const [showPricing, setShowPricing] = useState(false);

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
        return 'text-green-600 bg-green-50';
      case 'warning':
        return 'text-orange-600 bg-orange-50';
      case 'info':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <>
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">My Project 123</h2>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Business Manager:</span>
                <Select defaultValue="bot-campus">
                  <SelectTrigger className="w-40 h-8 text-sm border-gray-300">
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
          
          <div className="flex items-center space-x-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:border-blue-300 transition-colors duration-200 relative"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
                </Button>
              </SheetTrigger>
              <SheetContent className="w-80">
                <SheetHeader>
                  <SheetTitle className="text-lg font-semibold">Notifications</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {sampleNotifications.map((notification) => {
                    const IconComponent = notification.icon;
                    return (
                      <div key={notification.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-full ${getNotificationStyles(notification.type)}`}>
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 mb-1">
                              {notification.title}
                            </h4>
                            <p className="text-sm text-gray-600 mb-2">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <Button variant="outline" className="w-full">
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
                  className="border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100 hover:border-orange-300 transition-colors duration-200"
                >
                  <Coins className="w-4 h-4" />
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-48">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Free Credits</span>
                    <span className="text-sm text-gray-500">5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Premium Credits</span>
                    <span className="text-sm text-gray-500">25</span>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
            
            <Button 
              variant="outline" 
              className="border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              onClick={() => setShowPricing(true)}
            >
              Explore Plans
            </Button>
            <Button 
              className="bg-purple-600 hover:bg-purple-700 text-white transition-all duration-200 shadow-lg hover:shadow-xl"
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
