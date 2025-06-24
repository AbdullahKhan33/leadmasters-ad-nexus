
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
            variant={platform.active ? "default" : "ghost"}
            className={`
              px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2
              ${platform.active 
                ? 'bg-purple-600 text-white shadow-lg hover:bg-purple-700' 
                : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
              }
            `}
          >
            <platform.icon className="w-4 h-4" />
            <span className="text-sm font-medium">{platform.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
