
import { Button } from "@/components/ui/button";
import { Lock, Sparkles } from "lucide-react";

interface UpsellPromptProps {
  message: string;
  onUpgrade: () => void;
  variant?: 'inline' | 'centered' | 'banner';
  size?: 'sm' | 'md';
  className?: string;
}

export function UpsellPrompt({ 
  message, 
  onUpgrade, 
  variant = 'inline', 
  size = 'sm',
  className = "" 
}: UpsellPromptProps) {
  const baseClasses = "flex items-center space-x-2 text-gray-600";
  
  if (variant === 'banner') {
    return (
      <div className={`p-3 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Lock className="w-4 h-4 text-purple-600" />
            <span className="text-sm text-purple-700">{message}</span>
          </div>
          <Button
            onClick={onUpgrade}
            size="sm"
            className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white"
          >
            <Sparkles className="w-3 h-3 mr-1" />
            Upgrade to Premium
          </Button>
        </div>
      </div>
    );
  }

  if (variant === 'centered') {
    return (
      <div className={`text-center ${className}`}>
        <p className="text-sm text-gray-600 mb-3">{message}</p>
        <Button
          onClick={onUpgrade}
          size={size}
          className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white"
        >
          <Sparkles className="w-3 h-3 mr-1" />
          Upgrade to Premium
        </Button>
      </div>
    );
  }

  return (
    <div className={`${baseClasses} ${className}`}>
      <span className="text-sm">{message}</span>
      <Button
        onClick={onUpgrade}
        variant="link"
        size="sm"
        className="text-purple-600 hover:text-purple-700 p-0 h-auto text-sm"
      >
        Upgrade to Premium
      </Button>
    </div>
  );
}
