
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Youtube,
  CheckCircle,
  ExternalLink,
  Zap,
  Users,
  Search,
  MessageSquare
} from "lucide-react";

interface ConnectedAccount {
  id: string;
  platform: string;
  email: string;
  icon: any;
  color: string;
}

interface AvailablePlatform {
  id: string;
  name: string;
  icon: any;
  color: string;
  comingSoon?: boolean;
}

export function SocialLogins() {
  const { toast } = useToast();
  
  const [connectedAccounts, setConnectedAccounts] = useState<ConnectedAccount[]>([
    {
      id: "facebook_1",
      platform: "Facebook",
      email: "business@leadmasters.ai",
      icon: Facebook,
      color: "from-blue-500 to-blue-600"
    },
    {
      id: "instagram_1", 
      platform: "Instagram",
      email: "@leadmasters_ai",
      icon: Instagram,
      color: "from-pink-500 to-purple-600"
    },
    {
      id: "linkedin_1",
      platform: "LinkedIn",
      email: "team@leadmasters.ai",
      icon: Linkedin,
      color: "from-blue-600 to-blue-700"
    },
    {
      id: "google_1",
      platform: "Google",
      email: "marketing@leadmasters.ai",
      icon: Search,
      color: "from-red-500 to-orange-500"
    },
    {
      id: "threads_1",
      platform: "Threads",
      email: "@leadmasters_official",
      icon: MessageSquare,
      color: "from-gray-800 to-black"
    }
  ]);

  const [availablePlatforms, setAvailablePlatforms] = useState<AvailablePlatform[]>([
    {
      id: "twitter",
      name: "Twitter / X",
      icon: Twitter,
      color: "from-gray-700 to-black"
    },
    {
      id: "youtube",
      name: "YouTube",
      icon: Youtube,
      color: "from-red-500 to-red-600"
    },
    {
      id: "tiktok",
      name: "TikTok",
      icon: Users,
      color: "from-pink-500 to-red-500",
      comingSoon: true
    },
    {
      id: "snapchat",
      name: "Snapchat",
      icon: Zap,
      color: "from-yellow-400 to-yellow-500",
      comingSoon: true
    }
  ]);

  const handleDisconnect = (accountId: string, platform: string) => {
    // Find the account being disconnected
    const disconnectedAccount = connectedAccounts.find(account => account.id === accountId);
    
    if (disconnectedAccount) {
      // Remove from connected accounts
      setConnectedAccounts(prev => prev.filter(account => account.id !== accountId));
      
      // Add to available platforms (if not already there)
      const platformId = platform.toLowerCase().replace(/\s+/g, '').replace('/', '');
      const isAlreadyAvailable = availablePlatforms.some(p => p.id === platformId);
      
      if (!isAlreadyAvailable) {
        const newAvailablePlatform: AvailablePlatform = {
          id: platformId,
          name: platform,
          icon: disconnectedAccount.icon,
          color: disconnectedAccount.color
        };
        
        setAvailablePlatforms(prev => [...prev, newAvailablePlatform]);
      }
      
      toast({
        title: "Account Disconnected",
        description: `${platform} account has been disconnected and moved to available integrations.`,
      });
    }
  };

  const handleConnect = (platform: string) => {
    toast({
      title: "Integration Started",
      description: `Redirecting to ${platform} for authentication...`,
    });
    // In a real app, this would redirect to OAuth flow
  };

  const handleReconnect = (platformId: string, platformName: string) => {
    // Find the platform in available list
    const platform = availablePlatforms.find(p => p.id === platformId);
    
    if (platform) {
      // Create a new connected account
      const newConnectedAccount: ConnectedAccount = {
        id: `${platformId}_${Date.now()}`,
        platform: platformName,
        email: `reconnected@leadmasters.ai`,
        icon: platform.icon,
        color: platform.color
      };
      
      // Add to connected accounts
      setConnectedAccounts(prev => [...prev, newConnectedAccount]);
      
      // Remove from available platforms (only if it was a disconnected account)
      setAvailablePlatforms(prev => prev.filter(p => p.id !== platformId));
      
      toast({
        title: "Account Reconnected",
        description: `${platformName} account has been successfully reconnected.`,
      });
    } else {
      // Handle regular connection for platforms that were always available
      handleConnect(platformName);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Social Integrations
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Connect your social media accounts to supercharge your AI-powered campaigns
          </p>
        </div>

        {/* Connected Accounts Section */}
        {connectedAccounts.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full"></div>
              <h2 className="text-2xl font-semibold text-gray-800">Connected Accounts</h2>
              <Badge className="bg-green-100 text-green-800 border-green-200">
                {connectedAccounts.length} Active
              </Badge>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {connectedAccounts.map((account) => {
                const IconComponent = account.icon;
                return (
                  <Card key={account.id} className="group relative overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className={`absolute inset-0 bg-gradient-to-br ${account.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    <CardContent className="p-6 relative">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${account.color} shadow-lg`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-green-700">Connected</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <h3 className="font-semibold text-gray-800 text-lg">{account.platform}</h3>
                        <p className="text-gray-600 text-sm">{account.email}</p>
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDisconnect(account.id, account.platform)}
                        className="w-full border-gray-200 hover:border-red-300 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                      >
                        Disconnect
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Available Integrations Section */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
            <h2 className="text-2xl font-semibold text-gray-800">Available Integrations</h2>
            <Badge className="bg-blue-100 text-blue-800 border-blue-200">
              {availablePlatforms.filter(p => !p.comingSoon).length} Ready
            </Badge>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {availablePlatforms.map((platform) => {
              const IconComponent = platform.icon;
              const isComingSoon = platform.comingSoon;
              
              return (
                <Card 
                  key={platform.id} 
                  className={`group relative overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg transition-all duration-300 ${
                    isComingSoon 
                      ? 'opacity-60 cursor-not-allowed' 
                      : 'hover:shadow-xl hover:-translate-y-1 cursor-pointer'
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-5 ${!isComingSoon && 'group-hover:opacity-10'} transition-opacity duration-300`}></div>
                  <CardContent className="p-6 relative text-center">
                    <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${platform.color} shadow-lg mb-4 ${!isComingSoon && 'group-hover:scale-110'} transition-transform duration-200`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="font-semibold text-gray-800 text-lg mb-4">{platform.name}</h3>
                    
                    {isComingSoon ? (
                      <Badge className="bg-gray-100 text-gray-600 border-gray-200">
                        Coming Soon
                      </Badge>
                    ) : (
                      <Button
                        onClick={() => handleReconnect(platform.id, platform.name)}
                        className={`w-full bg-gradient-to-r ${platform.color} hover:opacity-90 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 group-hover:scale-105`}
                      >
                        <span className="flex items-center space-x-2">
                          <span>Integrate</span>
                          <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                        </span>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center pt-8">
          <p className="text-gray-500 text-sm">
            More integrations coming soon. Need a specific platform? 
            <Button variant="link" className="p-0 ml-1 text-blue-600 hover:text-blue-800">
              Contact our team
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}
