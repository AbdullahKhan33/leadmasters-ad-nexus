import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Trash2, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { GeneratedIdea } from "@/hooks/usePostIdeas";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

interface IdeaCardProps {
  idea: GeneratedIdea;
  isSelected: boolean;
  onToggleSelect: () => void;
  onDelete: (id: string) => void;
}

const platformIcons: Record<string, string> = {
  facebook: "📘",
  instagram: "📷",
  linkedin: "💼",
  twitter: "🐦",
  tiktok: "🎵",
};

export const IdeaCard = ({ idea, isSelected, onToggleSelect, onDelete }: IdeaCardProps) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const copyHashtags = () => {
    const hashtagsText = idea.hashtags.map(tag => `#${tag}`).join(" ");
    navigator.clipboard.writeText(hashtagsText);
    toast({
      title: "Hashtags Copied",
      description: "Hashtags copied to clipboard",
    });
  };

  return (
    <Card className={`border-2 transition-all duration-300 ${
      isSelected 
        ? 'border-purple-500 shadow-lg bg-purple-50/30' 
        : 'border-gray-200 shadow-sm hover:border-purple-300 bg-white'
    }`}>
      <CardContent className="p-6 space-y-6">
        {/* Header with Actions */}
        <div className="flex items-center justify-end gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(idea.id)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
          <Checkbox
            checked={isSelected}
            onCheckedChange={onToggleSelect}
            className="w-5 h-5"
          />
        </div>

        {/* Post Caption */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Post Content
          </h4>
          <p className="text-lg leading-relaxed text-gray-900 font-normal">
            {idea.post_caption}
          </p>
        </div>

        {/* Hashtags */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Hashtags
            </h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={copyHashtags}
              className="h-8 text-xs"
            >
              <Copy className="w-3 h-3 mr-1" />
              Copy
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {idea.hashtags.map((tag, index) => (
              <span key={index} className="text-sm text-purple-600 font-medium">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Image Prompt */}
        {idea.ai_recommendations.image_prompt && (
          <div className="space-y-2 bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-purple-100">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              🎨 Suggested Image
            </h4>
            <p className="text-sm leading-relaxed text-gray-700 italic">
              "{idea.ai_recommendations.image_prompt}"
            </p>
          </div>
        )}

        {/* AI Recommendations (Collapsible) */}
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-between hover:bg-purple-50 text-purple-600 font-medium"
            >
              <span className="text-sm">AI Recommendations</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2">
            <div className="text-sm space-y-2 bg-purple-50/50 p-4 rounded-lg border border-purple-100">
              <div>
                <span className="font-semibold text-gray-700">Best posting time:</span>{" "}
                <span className="text-gray-600">{idea.ai_recommendations.best_posting_time}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Engagement tips:</span>{" "}
                <span className="text-gray-600">{idea.ai_recommendations.engagement_tips}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Expected engagement:</span>{" "}
                <span className="text-gray-600 capitalize">{idea.ai_recommendations.expected_engagement}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Content type:</span>{" "}
                <span className="text-gray-600">{idea.ai_recommendations.content_type}</span>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};
