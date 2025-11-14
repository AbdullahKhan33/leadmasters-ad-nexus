import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface PromptRefinementCardsProps {
  prompts: string[];
  onSelect: (prompt: string) => void;
}

export function PromptRefinementCards({ prompts, onSelect }: PromptRefinementCardsProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSelect = (prompt: string, index: number) => {
    setSelectedIndex(index);
    setTimeout(() => {
      onSelect(prompt);
    }, 300);
  };

  return (
    <Card className="p-6 space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Choose Your Refined Prompt</h2>
        <p className="text-muted-foreground">
          Our AI created 3 optimized prompts. Select the one that best matches your vision.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {prompts.map((prompt, index) => (
          <Card
            key={index}
            className={`p-4 space-y-3 cursor-pointer transition-all hover:shadow-lg hover:border-primary ${
              selectedIndex === index ? "border-primary bg-primary/5" : ""
            }`}
            onClick={() => handleSelect(prompt, index)}
          >
            <div className="flex items-start justify-between">
              <span className="text-sm font-semibold text-primary">
                Option {index + 1}
              </span>
              {selectedIndex === index && (
                <CheckCircle2 className="h-5 w-5 text-primary" />
              )}
            </div>
            
            <p className="text-sm leading-relaxed">{prompt}</p>
            
            <Button
              variant={selectedIndex === index ? "default" : "outline"}
              size="sm"
              className="w-full"
              disabled={selectedIndex !== null}
            >
              {selectedIndex === index ? "Selected" : "Select This"}
            </Button>
          </Card>
        ))}
      </div>
    </Card>
  );
}