
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Search, Linkedin, MessageCircle, Twitter } from "lucide-react";

const platforms = [
  { name: "Facebook Ads", icon: Facebook, active: false },
  { name: "Instagram Ads", icon: Instagram, active: true },
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
              px-5 py-2 rounded-full transition-all duration-200 ease-out flex items-center space-x-2.5 relative group cursor-pointer
              ${platform.active 
                ? 'bg-gradient-to-r from-[#7C3AED] to-[#D946EF] text-white font-semibold shadow-lg hover:from-purple-700 hover:to-pink-600' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 font-medium'
              }
            `}
          >
            <platform.icon className={`w-4 h-4 transition-colors duration-200 ${platform.active ? 'text-white' : ''}`} />
            <span className="text-sm transition-colors duration-200">{platform.name}</span>
            {platform.active && (
              <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-white rounded-full shadow-sm" />
            )}
          </Button>
        ))}
      </div>
    </div>
  );
}
