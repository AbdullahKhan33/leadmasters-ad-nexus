import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Mail, 
  MessageSquare, 
  Calendar,
  BarChart3,
  ArrowRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLeadStats } from "@/hooks/useLeadStats";
import { useCampaigns } from "@/hooks/useCampaigns";

export function QuickAccessGrid() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: leadStats } = useLeadStats(user?.id);
  const { campaigns: emailCampaigns } = useCampaigns('email');
  const { campaigns: whatsappCampaigns } = useCampaigns('whatsapp');
  
  const totalLeads = leadStats?.totalLeads || 0;

  const activeCampaigns = [...emailCampaigns, ...whatsappCampaigns].filter(
    c => c.status === 'sent' || c.status === 'scheduled'
  ).length;

  const quickAccessCards = [
    {
      title: "CRM & Leads",
      description: "Manage your customer relationships",
      icon: Users,
      stat: `${totalLeads} leads`,
      color: "from-blue-500/10 to-blue-500/5",
      iconColor: "text-blue-600",
      borderColor: "border-blue-200 hover:border-blue-300",
      onClick: () => navigate("/", { state: { view: "crm" } }),
    },
    {
      title: "Email Campaigns",
      description: "Create and manage email campaigns",
      icon: Mail,
      stat: `${emailCampaigns.length} campaigns`,
      color: "from-purple-500/10 to-purple-500/5",
      iconColor: "text-purple-600",
      borderColor: "border-purple-200 hover:border-purple-300",
      onClick: () => navigate("/app/campaigns/create"),
    },
    {
      title: "WhatsApp Hub",
      description: "Engage leads via WhatsApp",
      icon: MessageSquare,
      stat: `${whatsappCampaigns.length} campaigns`,
      color: "from-green-500/10 to-green-500/5",
      iconColor: "text-green-600",
      borderColor: "border-green-200 hover:border-green-300",
      onClick: () => navigate("/", { state: { view: "ad-builder", platform: "whatsapp" } }),
    },
    {
      title: "Post Scheduler",
      description: "Schedule social media posts",
      icon: Calendar,
      stat: "View calendar",
      color: "from-orange-500/10 to-orange-500/5",
      iconColor: "text-orange-600",
      borderColor: "border-orange-200 hover:border-orange-300",
      onClick: () => navigate("/", { state: { view: "schedule" } }),
    },
    {
      title: "Published Posts",
      description: "View your published content",
      icon: BarChart3,
      stat: "See performance",
      color: "from-pink-500/10 to-pink-500/5",
      iconColor: "text-pink-600",
      borderColor: "border-pink-200 hover:border-pink-300",
      onClick: () => navigate("/", { state: { view: "published-posts" } }),
    },
    {
      title: "Analytics",
      description: "Track campaign performance",
      icon: BarChart3,
      stat: `${activeCampaigns} active`,
      color: "from-cyan-500/10 to-cyan-500/5",
      iconColor: "text-cyan-600",
      borderColor: "border-cyan-200 hover:border-cyan-300",
      onClick: () => navigate("/", { state: { view: "analytics" } }),
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {quickAccessCards.map((card) => {
        const Icon = card.icon;
        return (
          <Card
            key={card.title}
            className={`border-2 ${card.borderColor} bg-gradient-to-br ${card.color} cursor-pointer transition-all duration-200 hover:shadow-md group`}
            onClick={card.onClick}
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2.5 rounded-lg bg-background/60 ${card.iconColor}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <h3 className="font-semibold text-foreground mb-1">{card.title}</h3>
              <p className="text-xs text-muted-foreground mb-2">{card.description}</p>
              <p className="text-sm font-medium text-foreground/70">{card.stat}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
