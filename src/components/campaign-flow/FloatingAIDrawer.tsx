import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import { AIAssistantPanel } from "./AIAssistantPanel";
import { AICampaignSuggestions, AIBusinessContext } from "@/types/ai-campaign";

interface FloatingAIDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  suggestions: AICampaignSuggestions | null;
  currentStep: number;
  onApplySuggestion: (field: string, value: any) => void;
  businessContext: AIBusinessContext | null;
  suggestionCount: number;
}

export function FloatingAIDrawer({
  isOpen,
  onOpenChange,
  suggestions,
  currentStep,
  onApplySuggestion,
  businessContext,
  suggestionCount
}: FloatingAIDrawerProps) {
  
  const getStepName = () => {
    switch (currentStep) {
      case 1: return 'setup';
      case 2: return 'audience';
      case 3: return 'content';
      default: return 'setup';
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Campaign Setup';
      case 2: return 'Target Audience';
      case 3: return 'Ad Content';
      default: return 'Campaign Setup';
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <Button
        onClick={() => onOpenChange(true)}
        className="fixed bottom-24 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 z-[100] animate-pulse"
        size="icon"
      >
        <Sparkles className="h-5 w-5 text-white" />
        {suggestionCount > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-red-500 text-white text-xs">
            {suggestionCount}
          </Badge>
        )}
      </Button>

      {/* Drawer Sheet */}
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent 
          side="right" 
          className="w-full sm:w-[500px] overflow-y-auto"
        >
          <SheetHeader className="mb-6">
            <SheetTitle className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-lg font-semibold">AI Assistant</div>
                <div className="text-sm text-muted-foreground font-normal">
                  {getStepTitle()} Suggestions
                </div>
              </div>
            </SheetTitle>
          </SheetHeader>

          <AIAssistantPanel
            suggestions={suggestions}
            step={getStepName() as 'setup' | 'audience' | 'content'}
            onApplySuggestion={onApplySuggestion}
            businessContext={businessContext}
            isInDrawer={true}
          />
        </SheetContent>
      </Sheet>
    </>
  );
}
