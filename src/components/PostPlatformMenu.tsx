
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, MessageCircle, Linkedin, Twitter, Globe } from "lucide-react";
import { useState } from "react";

const platforms = [
  { name: "All Platforms", icon: Globe, id: "all" },
  { name: "Facebook", icon: Facebook, id: "facebook" },
  { name: "Instagram", icon: Instagram, id: "instagram" },
  { name: "Twitter", icon: Twitter, id: "twitter" },
  { name: "LinkedIn", icon: Linkedin, id: "linkedin" },
  { name: "Threads", icon: MessageCircle, id: "threads" },
];

interface PostPlatformMenuProps {
  activePlatform?: string;
  onPlatformChange?: (platformId: string) => void;
}

export function PostPlatformMenu({ activePlatform = "all", onPlatformChange }: PostPlatformMenuProps) {
  const [selectedPlatform, setSelectedPlatform] = useState(activePlatform);

  const handlePlatformClick = (platformId: string) => {
    setSelectedPlatform(platformId);
    onPlatformChange?.(platformId);
    console.log(`Switching to ${platformId} posts`);
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-5">
      <div className="flex items-center space-x-2">
        {platforms.map((platform) => {
          const isActive = selectedPlatform === platform.id;
          
          return (
            <Button
              key={platform.name}
              variant="ghost"
              onClick={() => handlePlatformClick(platform.id)}
              className={`
                px-5 py-2 rounded-full transition-all duration-200 ease-out flex items-center space-x-2.5 relative group cursor-pointer
                ${isActive 
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#D946EF] text-white font-semibold shadow-lg hover:from-purple-700 hover:to-pink-600' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 font-medium'
                }
              `}
            >
              <platform.icon className={`w-4 h-4 transition-colors duration-200 ${isActive ? 'text-white' : ''}`} />
              <span className="text-sm transition-colors duration-200">{platform.name}</span>
              {isActive && (
                <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-white rounded-full shadow-sm" />
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
