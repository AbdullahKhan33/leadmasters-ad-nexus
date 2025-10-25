import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, ChevronRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AIAutomationStatusCardProps {
  totalWorkflows: number;
  draftWorkflows: number;
  activeWorkflows: number;
  isLoading: boolean;
  onNavigate: (view: string, filter?: any) => void;
}

export function AIAutomationStatusCard({
  totalWorkflows,
  draftWorkflows,
  activeWorkflows,
  isLoading,
  onNavigate,
}: AIAutomationStatusCardProps) {

  if (isLoading) {
    return (
      <Card className="animate-pulse">
        <CardHeader>
          <div className="h-6 bg-muted rounded w-1/3"></div>
        </CardHeader>
        <CardContent>
          <div className="h-4 bg-muted rounded w-2/3 mb-2"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
        </CardContent>
      </Card>
    );
  }

  if (totalWorkflows === 0) {
    return (
      <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-pink-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Bot className="w-7 h-7 text-purple-600" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-base font-bold mb-2 flex items-center gap-2">
                AI Sales Automation
                <Sparkles className="w-4 h-4 text-purple-600" />
              </CardTitle>
              <p className="text-sm text-muted-foreground mb-4">
                Create your first AI workflow to automate WhatsApp lead nurturing and follow-ups
              </p>
              <div className="flex gap-3">
                <Button
                  onClick={() => onNavigate("ai-sales-automation")}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  Create Workflow
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onNavigate("ai-sales-automation")}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (draftWorkflows > 0 && activeWorkflows === 0) {
    return (
      <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-pink-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Bot className="w-7 h-7 text-purple-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <CardTitle className="text-base font-bold">AI Sales Automation</CardTitle>
                <Badge variant="outline" className="text-xs">
                  {draftWorkflows} Draft{draftWorkflows !== 1 ? "s" : ""}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                You have {draftWorkflows} workflow{draftWorkflows !== 1 ? "s" : ""} ready to launch. Start
                automating your WhatsApp lead nurturing today!
              </p>
              <div className="flex gap-3">
                <Button
                  onClick={() => onNavigate("ai-sales-automation")}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  Launch Workflows
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onNavigate("ai-sales-automation")}
                >
                  View All
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-pink-50">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Bot className="w-7 h-7 text-purple-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="text-base font-bold">AI Sales Automation</CardTitle>
              <Badge className="bg-green-500 text-white text-xs">
                {activeWorkflows} Active
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {activeWorkflows} workflow{activeWorkflows !== 1 ? "s" : ""} actively nurturing your
              WhatsApp leads. {draftWorkflows > 0 && `${draftWorkflows} more in draft.`}
            </p>
            <div className="flex gap-3">
              <Button
                onClick={() => onNavigate("ai-sales-automation")}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                Manage Workflows
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                onClick={() => onNavigate("ai-sales-automation")}
              >
                View Analytics
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
