
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Search, Linkedin, MessageCircle, Twitter } from "lucide-react";

const platforms = [
  { name: "Facebook Ads", icon: Facebook, active: true },
  { name: "Instagram Ads", icon: Instagram, active: false },
  { name: "Google Ads", icon: Search, active: false },
  { name: "LinkedIn Ads", icon: Linkedin, active: false },
  { name: "WhatsApp Ads", icon: MessageCircle, active: false },
  { name: "Twitter Ads", icon: Twitter, active: false },
];

export function AdPlatformMenu() {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center space-x-1">
        {platforms.map((platform) => (
          <Button
            key={platform.name}
            variant="ghost"
            className={`
              px-4 py-2 rounded-full transition-all duration-200 flex items-center space-x-2 relative
              ${platform.active 
                ? 'bg-purple-100 text-purple-700 hover:bg-purple-150' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }
            `}
          >
            <platform.icon className="w-4 h-4" />
            <span className="text-sm font-medium">{platform.name}</span>
            {platform.active && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-purple-600 rounded-full" />
            )}
          </Button>
        ))}
      </div>
    </div>
  );
}
