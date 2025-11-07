import { Card, CardContent } from "@/components/ui/card";
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
      onClick: () => navigate("/", { state: { view: "crm" } }),
    },
    {
      title: "Email Campaigns",
      description: "Create and manage email campaigns",
      icon: Mail,
      stat: `${emailCampaigns.length} campaigns`,
      onClick: () => navigate("/app/campaigns/create"),
    },
    {
      title: "WhatsApp Hub",
      description: "Engage leads via WhatsApp",
      icon: MessageSquare,
      stat: `${whatsappCampaigns.length} campaigns`,
      onClick: () => navigate("/", { state: { view: "ad-builder", platform: "whatsapp" } }),
    },
    {
      title: "Post Scheduler",
      description: "Schedule social media posts",
      icon: Calendar,
      stat: "View calendar",
      onClick: () => navigate("/", { state: { view: "schedule" } }),
    },
    {
      title: "Published Posts",
      description: "View your published content",
      icon: BarChart3,
      stat: "See performance",
      onClick: () => navigate("/", { state: { view: "published-posts" } }),
    },
    {
      title: "Analytics",
      description: "Track campaign performance",
      icon: BarChart3,
      stat: `${activeCampaigns} active`,
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
            className="group relative cursor-pointer border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all duration-300"
            onClick={card.onClick}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/15 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </div>
              
              <h3 className="font-semibold text-foreground mb-1.5 text-base">
                {card.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                {card.description}
              </p>
              <p className="text-sm font-semibold text-primary">
                {card.stat}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
