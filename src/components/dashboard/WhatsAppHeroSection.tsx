import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle, MessageSquare } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface WhatsAppHeroSectionProps {
  totalWhatsAppLeads: number;
  agingLeads: number;
  isLoading: boolean;
  onNavigate: (view: string, filter?: any) => void;
}

export function WhatsAppHeroSection({
  totalWhatsAppLeads,
  agingLeads,
  isLoading,
  onNavigate,
}: WhatsAppHeroSectionProps) {
  const handleViewAllLeads = () => {
    onNavigate("crm", { source: "whatsapp" });
  };

  const handleReplyUrgent = () => {
    onNavigate("crm", { aging: true, source: "whatsapp" });
  };

  if (isLoading) {
    return (
      <Card className="p-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 animate-pulse">
        <div className="h-8 bg-muted rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-muted rounded w-3/4"></div>
      </Card>
    );
  }

  if (totalWhatsAppLeads === 0) {
    return (
      <Card className="p-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
            <MessageSquare className="w-8 h-8 text-green-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Connect WhatsApp to Capture Your First Lead
            </h2>
            <p className="text-muted-foreground">
              Start engaging with customers through WhatsApp - the most effective channel for conversions
            </p>
          </div>
          <div className="flex gap-3 justify-center">
            <Button
              onClick={() => onNavigate("crm")}
              className="bg-green-600 hover:bg-green-700"
            >
              Import Leads
            </Button>
            <Button
              variant="outline"
              onClick={() => onNavigate("insights-whatsapp")}
            >
              Learn More
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  const agingPercentage =
    totalWhatsAppLeads > 0 ? Math.round((agingLeads / totalWhatsAppLeads) * 100) : 0;

  if (agingLeads === 0) {
    return (
      <Card className="p-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <div className="text-center space-y-4">
          <div className="text-6xl mb-2">🎉</div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Great Work! All {totalWhatsAppLeads} WhatsApp Leads Contacted
            </h2>
            <p className="text-muted-foreground">
              You're staying on top of your leads. Keep up the excellent response rate!
            </p>
          </div>
          <Button
            onClick={handleViewAllLeads}
            className="bg-green-600 hover:bg-green-700"
          >
            View All Leads
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="relative overflow-hidden bg-gradient-to-r from-red-50 via-orange-50 to-amber-50 border-red-200">
      <div className="absolute top-0 right-0 w-32 h-32 bg-red-200 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-200 rounded-full blur-3xl opacity-30"></div>
      
      <div className="relative p-8 space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
            <AlertCircle className="w-7 h-7 text-red-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {totalWhatsAppLeads} WhatsApp Lead{totalWhatsAppLeads !== 1 ? "s" : ""} Need Your Attention
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              <span className="font-semibold text-red-700">{agingLeads} leads</span> haven't been contacted in 3+ days
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Response coverage</span>
                <span className="font-semibold">{100 - agingPercentage}%</span>
              </div>
              <Progress value={100 - agingPercentage} className="h-3 bg-red-100" />
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleReplyUrgent}
            className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
          >
            Reply to Urgent Leads
          </Button>
          <Button variant="outline" onClick={handleViewAllLeads}>
            View All Leads
          </Button>
        </div>
      </div>
    </Card>
  );
}
