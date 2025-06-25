
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  MessageCircle, 
  CheckCircle, 
  Send, 
  List, 
  BarChart3,
  Users,
  Zap,
  ArrowRight
} from "lucide-react";
import { WhatsAppOnboarding } from "./WhatsAppOnboarding";
import { WhatsAppCampaignBuilder } from "./WhatsAppCampaignBuilder";
import { CampaignManager } from "./campaign/CampaignManager";
import { WhatsAppAnalytics } from "./WhatsAppAnalytics";
import { useState } from "react";

interface OptionCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accent?: boolean;
  onClick?: () => void;
  clickable?: boolean;
}

function OptionCard({ title, description, icon: Icon, accent = false, onClick, clickable = false }: OptionCardProps) {
  return (
    <Card 
      className={`border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-200 bg-white group ${
        clickable ? 'cursor-pointer hover:bg-gray-50 hover:-translate-y-1' : ''
      }`}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className={`
            w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0
            ${accent 
              ? 'bg-gradient-to-br from-green-100 to-emerald-100' 
              : 'bg-gradient-to-br from-purple-100 to-pink-100'
            }
          `}>
            <Icon className={`w-6 h-6 ${accent ? 'text-green-600' : 'text-purple-600'}`} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
              {title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {description}
            </p>
          </div>
          {clickable && (
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0" />
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function WhatsAppAdBuilder() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'onboarding' | 'campaign' | 'campaign-manager' | 'analytics'>('dashboard');

  const mainOptions = [
    {
      title: "WhatsApp Business Setup",
      description: "Onboard your WhatsApp Business Account and get verified to start reaching customers.",
      icon: CheckCircle,
      accent: true,
      clickable: true,
      onClick: () => setCurrentView('onboarding')
    },
    {
      title: "Create Campaign",
      description: "Design and send personalized WhatsApp messages in just 2 steps with AI assistance.",
      icon: Send,
      accent: false,
      clickable: true,
      onClick: () => setCurrentView('campaign')
    },
    {
      title: "Campaigns Manager",
      description: "Track, edit, or duplicate your active and past campaigns with comprehensive controls.",
      icon: List,
      accent: false,
      clickable: true,
      onClick: () => setCurrentView('campaign-manager')
    },
    {
      title: "Performance & Analytics",
      description: "View real-time reports on delivery, read rates, and responses with detailed insights.",
      icon: BarChart3,
      accent: false,
      clickable: true,
      onClick: () => setCurrentView('analytics')
    }
  ];

  const bonusOptions = [
    {
      title: "Audience Lists",
      description: "Manage contact groups for targeted messaging and better campaign organization.",
      icon: Users,
      accent: false,
      clickable: true
    },
    {
      title: "Quick Broadcast",
      description: "Instantly send bulk messages without a full campaign setup for urgent communications.",
      icon: Zap,
      accent: true,
      clickable: true
    }
  ];

  // Render different views based on current state
  if (currentView === 'campaign') {
    return <WhatsAppCampaignBuilder onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'campaign-manager') {
    return <CampaignManager onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'analytics') {
    return <WhatsAppAnalytics onBack={() => setCurrentView('dashboard')} />;
  }

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#7C3AED] to-[#D946EF] bg-clip-text text-transparent mb-2">
            WhatsApp Business Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your WhatsApp Business campaigns and connect with customers through personalized messaging
          </p>
        </div>

        {/* Quick Start Section */}
        <Card className="border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 bg-white cursor-pointer">
          <CardContent className="p-8 text-center" onClick={() => setCurrentView('onboarding')}>
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Started with WhatsApp</h3>
              <p className="text-gray-600 mb-6">
                Begin your WhatsApp Business journey and start engaging with customers through direct messaging
              </p>
              <Button 
                size="default" 
                className="bg-gradient-to-r from-[#7C3AED] to-[#D946EF] hover:from-purple-700 hover:to-pink-600 text-white transition-all duration-200 shadow-lg hover:shadow-xl px-6 py-2.5"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentView('onboarding');
                }}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Start Setup
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Features Grid */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Core Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mainOptions.map((option, index) => (
              <OptionCard
                key={index}
                title={option.title}
                description={option.description}
                icon={option.icon}
                accent={option.accent}
                clickable={option.clickable}
                onClick={option.onClick}
              />
            ))}
          </div>
        </div>

        {/* Additional Tools */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Additional Tools</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {bonusOptions.map((option, index) => (
              <OptionCard
                key={index}
                title={option.title}
                description={option.description}
                icon={option.icon}
                accent={option.accent}
                clickable={option.clickable}
              />
            ))}
          </div>
        </div>

        {/* Help Section */}
        <Card className="border border-gray-200 shadow-sm bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Need Help?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-gray-600 text-sm">
              Get started with our comprehensive guides and best practices for WhatsApp Business messaging.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="ghost" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 transition-colors duration-200">
                View Documentation
              </Button>
              <Button variant="ghost" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 transition-colors duration-200">
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* WhatsApp Onboarding Dialog */}
      <WhatsAppOnboarding 
        open={currentView === 'onboarding'} 
        onOpenChange={(open) => setCurrentView(open ? 'onboarding' : 'dashboard')} 
      />
    </div>
  );
}
