import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, FileUp, Target, ExternalLink } from "lucide-react";

interface WhatsAppEmptyStateProps {
  hasOtherLeads: boolean;
  otherLeadsCount: number;
  onNavigate: (view: string, filter?: any) => void;
}

export function WhatsAppEmptyState({
  hasOtherLeads,
  otherLeadsCount,
  onNavigate,
}: WhatsAppEmptyStateProps) {

  if (hasOtherLeads) {
    return (
      <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-emerald-50">
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <MessageSquare className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Switch to WhatsApp for Better Engagement
              </h3>
              <p className="text-muted-foreground mb-4">
                You have {otherLeadsCount} leads from other sources. Move them to WhatsApp for 3x
                higher response rates!
              </p>
            </div>
            <div className="flex gap-3 justify-center">
              <Button
                onClick={() => onNavigate("crm")}
                className="bg-green-600 hover:bg-green-700"
              >
                Update Lead Sources
              </Button>
              <Button
                variant="outline"
                onClick={() => onNavigate("insights-whatsapp")}
              >
                Learn More
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-emerald-50">
      <CardContent className="p-8">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
            <MessageSquare className="w-10 h-10 text-green-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Get Started with WhatsApp</h3>
            <p className="text-muted-foreground">
              You don't have any WhatsApp leads yet. Let's capture your first one!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="p-4 bg-white rounded-lg border border-green-200">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                <FileUp className="w-5 h-5 text-green-600" />
              </div>
              <h4 className="font-semibold mb-1 text-sm">Import from CSV</h4>
              <p className="text-xs text-muted-foreground">
                Upload your existing contacts
              </p>
            </div>

            <div className="p-4 bg-white rounded-lg border border-green-200">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                <Target className="w-5 h-5 text-green-600" />
              </div>
              <h4 className="font-semibold mb-1 text-sm">Run Facebook Ads</h4>
              <p className="text-xs text-muted-foreground">
                Capture leads automatically
              </p>
            </div>

            <div className="p-4 bg-white rounded-lg border border-green-200">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                <ExternalLink className="w-5 h-5 text-green-600" />
              </div>
              <h4 className="font-semibold mb-1 text-sm">Share Your Number</h4>
              <p className="text-xs text-muted-foreground">
                Post on social media
              </p>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <Button
              onClick={() => onNavigate("crm")}
              className="bg-green-600 hover:bg-green-700"
            >
              Import CSV
            </Button>
            <Button variant="outline" onClick={() => onNavigate("ad-builder")}>
              Connect Facebook
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
