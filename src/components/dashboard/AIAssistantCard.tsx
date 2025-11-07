import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, TrendingUp, AlertCircle, Lightbulb } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AIInsight {
  type: "opportunity" | "alert" | "suggestion";
  title: string;
  description: string;
  action?: string;
}

interface AIAssistantCardProps {
  insights: AIInsight[];
  onActionClick?: (insight: AIInsight) => void;
}

export function AIAssistantCard({ insights, onActionClick }: AIAssistantCardProps) {
  const getIcon = (type: AIInsight["type"]) => {
    switch (type) {
      case "opportunity":
        return <TrendingUp className="h-4 w-4" />;
      case "alert":
        return <AlertCircle className="h-4 w-4" />;
      case "suggestion":
        return <Lightbulb className="h-4 w-4" />;
    }
  };

  const getColor = (type: AIInsight["type"]) => {
    switch (type) {
      case "opportunity":
        return "text-green-600 bg-green-50 border-green-200";
      case "alert":
        return "text-orange-600 bg-orange-50 border-orange-200";
      case "suggestion":
        return "text-blue-600 bg-blue-50 border-blue-200";
    }
  };

  return (
    <Card className="relative overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 pointer-events-none" />
      
      <CardHeader className="relative">
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-purple-600">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span>AI Assistant</span>
              <Badge variant="secondary" className="bg-gradient-to-r from-primary to-purple-600 text-white border-0">
                Live
              </Badge>
            </div>
            <p className="text-sm font-normal text-muted-foreground mt-1">
              Smart insights to help you close more deals
            </p>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="relative space-y-3">
        {insights.map((insight, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border-2 ${getColor(insight.type)} transition-all hover:shadow-md`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">{getIcon(insight.type)}</div>
              <div className="flex-1 space-y-2">
                <h4 className="font-semibold text-sm">{insight.title}</h4>
                <p className="text-xs opacity-80">{insight.description}</p>
                {insight.action && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 text-xs"
                    onClick={() => onActionClick?.(insight)}
                  >
                    {insight.action} →
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
