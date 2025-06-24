
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
    <div className="bg-white border-b border-gray-200 px-6 py-5">
      <div className="flex items-center space-x-2">
        {platforms.map((platform) => (
          <Button
            key={platform.name}
            variant="ghost"
            className={`
              px-5 py-2.5 rounded-full transition-all duration-300 ease-out flex items-center space-x-2.5 relative group cursor-pointer
              ${platform.active 
                ? 'bg-gradient-to-r from-purple-600/15 to-pink-500/15 text-purple-700 font-semibold hover:from-purple-600/20 hover:to-pink-500/20' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/60 font-medium'
              }
            `}
          >
            <platform.icon className={`w-4 h-4 transition-colors duration-300 ${platform.active ? 'text-purple-600' : ''}`} />
            <span className="text-sm transition-colors duration-300">{platform.name}</span>
            {platform.active && (
              <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full shadow-sm" />
            )}
          </Button>
        ))}
      </div>
    </div>
  );
}
