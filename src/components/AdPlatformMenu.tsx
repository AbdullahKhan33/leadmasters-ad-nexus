
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Search, Linkedin, MessageCircle, Twitter } from "lucide-react";
import { useState } from "react";

const platforms = [
  { name: "Facebook Ads", icon: Facebook, id: "facebook" },
  { name: "Instagram Ads", icon: Instagram, id: "instagram" },
  { name: "Google Ads", icon: Search, id: "google" },
  { name: "LinkedIn Ads", icon: Linkedin, id: "linkedin" },
  { name: "WhatsApp Ads", icon: MessageCircle, id: "whatsapp" },
  { name: "Twitter Ads", icon: Twitter, id: "twitter" },
];

interface AdPlatformMenuProps {
  activePlatform?: string;
  onPlatformChange?: (platformId: string) => void;
}

export function AdPlatformMenu({ activePlatform = "instagram", onPlatformChange }: AdPlatformMenuProps) {
  const [selectedPlatform, setSelectedPlatform] = useState(activePlatform);

  const handlePlatformClick = (platformId: string) => {
    setSelectedPlatform(platformId);
    onPlatformChange?.(platformId);
    console.log(`Switching to ${platformId} ads`);
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-5">
      <div className="flex items-center space-x-2">
        {platforms.map((platform) => {
          const isActive = selectedPlatform === platform.id;
          const isImplemented = platform.id === "facebook" || platform.id === "instagram" || platform.id === "google";
          
          return (
            <Button
              key={platform.name}
              variant="ghost"
              onClick={() => isImplemented && handlePlatformClick(platform.id)}
              disabled={!isImplemented}
              className={`
                px-5 py-2 rounded-full transition-all duration-200 ease-out flex items-center space-x-2.5 relative group cursor-pointer
                ${isActive 
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#D946EF] text-white font-semibold shadow-lg hover:from-purple-700 hover:to-pink-600' 
                  : isImplemented
                    ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 font-medium'
                    : 'text-gray-400 cursor-not-allowed opacity-50'
                }
              `}
            >
              <platform.icon className={`w-4 h-4 transition-colors duration-200 ${isActive ? 'text-white' : ''}`} />
              <span className="text-sm transition-colors duration-200">{platform.name}</span>
              {isActive && (
                <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-white rounded-full shadow-sm" />
              )}
              {!isImplemented && (
                <span className="text-xs opacity-60 ml-1">(Coming Soon)</span>
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
