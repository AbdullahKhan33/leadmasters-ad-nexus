import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Edit2, Trash2, Calendar, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { GeneratedIdea } from "@/hooks/usePostIdeas";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface IdeaCardProps {
  idea: GeneratedIdea;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: GeneratedIdea["status"]) => void;
}

const platformIcons: Record<string, string> = {
  facebook: "📘",
  instagram: "📷",
  linkedin: "💼",
  twitter: "🐦",
  tiktok: "🎵",
};

const engagementColors = {
  low: "bg-yellow-500",
  medium: "bg-blue-500",
  high: "bg-green-500",
};

export const IdeaCard = ({ idea, onDelete, onStatusChange }: IdeaCardProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const copyHashtags = () => {
    const hashtagsText = idea.hashtags.map(tag => `#${tag}`).join(" ");
    navigator.clipboard.writeText(hashtagsText);
    toast({
      title: "📋 Hashtags Copied",
      description: "Hashtags have been copied to clipboard",
    });
  };

  const handleCreatePost = () => {
    navigate("/", {
      state: {
        view: "post-builder",
        prefilledContent: idea.post_caption,
        hashtags: idea.hashtags,
        platform: idea.platform,
        aiRecommendations: idea.ai_recommendations,
      },
    });
  };

  const handleSchedule = () => {
    navigate("/", {
      state: {
        view: "schedule",
        prefilledContent: idea.post_caption,
        hashtags: idea.hashtags,
        platform: idea.platform,
        suggestedTime: idea.ai_recommendations.best_posting_time,
      },
    });
  };

  return (
    <Card className="border border-gray-200 hover:border-purple-200 hover:shadow-lg transition-all bg-white">
      <CardContent className="p-4 space-y-3">
        {/* Platform Badge */}
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs font-medium">
            {platformIcons[idea.platform.toLowerCase()]} {idea.platform}
          </Badge>
          <Badge
            className="text-xs"
            variant={
              idea.status === "saved"
                ? "default"
                : idea.status === "drafted"
                ? "outline"
                : "secondary"
            }
          >
            {idea.status}
          </Badge>
        </div>

        {/* Caption */}
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-500">Caption:</p>
          <p className="text-sm text-gray-900 leading-relaxed">{idea.post_caption}</p>
        </div>

        {/* Hashtags */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground font-medium">Hashtags:</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={copyHashtags}
              className="h-6 px-2"
            >
              <Copy className="w-3 h-3 mr-1" />
              Copy
            </Button>
          </div>
          <div className="flex flex-wrap gap-1">
            {idea.hashtags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* AI Recommendations */}
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full hover:bg-gray-50 text-gray-600 font-medium relative z-10"
            >
              {isOpen ? "▲ Hide" : "▼ Show"} AI Recommendations
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 pt-2">
            <div className="text-xs space-y-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
              <div>
                <span className="font-medium">🕐 Best Time:</span>{" "}
                {idea.ai_recommendations.best_posting_time}
              </div>
              <div>
                <span className="font-medium">💡 Tips:</span>{" "}
                {idea.ai_recommendations.engagement_tips}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">📊 Expected Engagement:</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      engagementColors[idea.ai_recommendations.expected_engagement]
                    }`}
                    style={{
                      width:
                        idea.ai_recommendations.expected_engagement === "high"
                          ? "100%"
                          : idea.ai_recommendations.expected_engagement === "medium"
                          ? "66%"
                          : "33%",
                    }}
                  />
                </div>
                <span className="text-xs capitalize">
                  {idea.ai_recommendations.expected_engagement}
                </span>
              </div>
              <div>
                <span className="font-medium">🎨 Content Type:</span>{" "}
                {idea.ai_recommendations.content_type}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
          <Button
            size="sm"
            onClick={handleCreatePost}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-medium shadow-sm relative z-10"
          >
            <Edit2 className="w-3 h-3 mr-1" />
            Create Post
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSchedule}
            className="w-full border-gray-300 hover:bg-gray-50 font-medium relative z-10"
          >
            <Calendar className="w-3 h-3 mr-1" />
            Schedule
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onStatusChange(idea.id, "saved")}
            disabled={idea.status === "saved"}
            className="w-full border-gray-300 hover:bg-gray-50 font-medium relative z-10"
          >
            <FileText className="w-3 h-3 mr-1" />
            Save Draft
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(idea.id)}
            className="w-full border-gray-300 text-red-600 hover:bg-red-50 font-medium relative z-10"
          >
            <Trash2 className="w-3 h-3 mr-1" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
