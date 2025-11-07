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
      gradient: "from-blue-500 via-blue-600 to-indigo-600",
      onClick: () => navigate("/", { state: { view: "crm" } }),
    },
    {
      title: "Email Campaigns",
      description: "Create and manage email campaigns",
      icon: Mail,
      stat: `${emailCampaigns.length} campaigns`,
      gradient: "from-purple-500 via-purple-600 to-pink-600",
      onClick: () => navigate("/app/campaigns/create"),
    },
    {
      title: "WhatsApp Hub",
      description: "Engage leads via WhatsApp",
      icon: MessageSquare,
      stat: `${whatsappCampaigns.length} campaigns`,
      gradient: "from-green-500 via-emerald-600 to-teal-600",
      onClick: () => navigate("/", { state: { view: "ad-builder", platform: "whatsapp" } }),
    },
    {
      title: "Post Scheduler",
      description: "Schedule social media posts",
      icon: Calendar,
      stat: "View calendar",
      gradient: "from-orange-500 via-amber-600 to-yellow-600",
      onClick: () => navigate("/", { state: { view: "schedule" } }),
    },
    {
      title: "Published Posts",
      description: "View your published content",
      icon: BarChart3,
      stat: "See performance",
      gradient: "from-pink-500 via-rose-600 to-red-600",
      onClick: () => navigate("/", { state: { view: "published-posts" } }),
    },
    {
      title: "Analytics",
      description: "Track campaign performance",
      icon: BarChart3,
      stat: `${activeCampaigns} active`,
      gradient: "from-cyan-500 via-sky-600 to-blue-600",
      onClick: () => navigate("/", { state: { view: "analytics" } }),
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {quickAccessCards.map((card) => {
        const Icon = card.icon;
        return (
          <Card
            key={card.title}
            className="relative overflow-hidden border-0 cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl group bg-gradient-to-br from-background via-background to-muted/10"
            onClick={card.onClick}
          >
            {/* Gradient accent bar - animated */}
            <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${card.gradient}`} />
            
            {/* Hover glow effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
            
            {/* Animated shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            <CardContent className="relative p-7">
              <div className="flex items-start justify-between mb-5">
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${card.gradient} shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </div>
              
              <h3 className="font-bold text-foreground mb-2 text-lg group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                {card.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {card.description}
              </p>
              <p className={`text-base font-bold bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}>
                {card.stat}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
