
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WhatsAppAdBuilder } from "./WhatsAppAdBuilder";
import { FacebookAdBuilder } from "./FacebookAdBuilder";
import { GoogleAdBuilder } from "./GoogleAdBuilder";
import { LinkedInAdBuilder } from "./LinkedInAdBuilder";
import { InstagramAdBuilder } from "./InstagramAdBuilder";
import { 
  MessageCircle, 
  Facebook, 
  Chrome, 
  Linkedin, 
  Instagram,
  ArrowRight,
  Zap,
  CheckCircle,
  Send,
  FileText,
  List,
  BarChart3,
  Users
} from "lucide-react";

type Platform = 'overview' | 'whatsapp' | 'facebook' | 'google' | 'linkedin' | 'instagram';

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

export function AdBuilder() {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('overview');

  // Render specific platform builders
  if (selectedPlatform === 'whatsapp') {
    return <WhatsAppAdBuilder />;
  }
  if (selectedPlatform === 'facebook') {
    return <FacebookAdBuilder />;
  }
  if (selectedPlatform === 'google') {
    return <GoogleAdBuilder />;
  }
  if (selectedPlatform === 'linkedin') {
    return <LinkedInAdBuilder />;
  }
  if (selectedPlatform === 'instagram') {
    return <InstagramAdBuilder />;
  }

  const mainOptions = [
    {
      title: "WhatsApp Business Ads",
      description: "Create personalized WhatsApp campaigns and connect directly with customers through messaging.",
      icon: MessageCircle,
      accent: true,
      clickable: true,
      onClick: () => setSelectedPlatform('whatsapp')
    },
    {
      title: "Facebook Ad Campaigns",
      description: "Build targeted Facebook advertising campaigns with AI-powered optimization tools.",
      icon: Facebook,
      accent: false,
      clickable: true,
      onClick: () => setSelectedPlatform('facebook')
    },
    {
      title: "Google Ad Manager",
      description: "Create search and display campaigns on Google with advanced targeting options.",
      icon: Chrome,
      accent: false,
      clickable: true,
      onClick: () => setSelectedPlatform('google')
    },
    {
      title: "LinkedIn B2B Ads",
      description: "Reach professionals and businesses with B2B-focused LinkedIn advertising campaigns.",
      icon: Linkedin,
      accent: false,
      clickable: true,
      onClick: () => setSelectedPlatform('linkedin')
    },
    {
      title: "Instagram Visual Ads",
      description: "Create visual and engaging Instagram campaigns for maximum audience reach.",
      icon: Instagram,
      accent: false,
      clickable: true,
      onClick: () => setSelectedPlatform('instagram')
    }
  ];

  const bonusOptions = [
    {
      title: "Campaign Analytics",
      description: "View comprehensive reports on all your advertising campaigns across platforms.",
      icon: BarChart3,
      accent: false,
      clickable: true
    },
    {
      title: "Audience Manager",
      description: "Manage contact groups and targeting for better campaign organization across all platforms.",
      icon: Users,
      accent: true,
      clickable: true
    }
  ];

  // Default overview with beautiful navigation structure
  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#7C3AED] to-[#D946EF] bg-clip-text text-transparent mb-2">
            Ad Builder Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your advertising campaigns across all platforms with AI-powered tools and automation
          </p>
        </div>

        {/* Quick Start Section */}
        <Card className="border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 bg-white cursor-pointer">
          <CardContent className="p-8 text-center" onClick={() => setSelectedPlatform('whatsapp')}>
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Started with WhatsApp Ads</h3>
              <p className="text-gray-600 mb-6">
                Begin your advertising journey with WhatsApp Business and start engaging customers through direct messaging
              </p>
              <Button 
                size="default" 
                className="bg-gradient-to-r from-[#7C3AED] to-[#D946EF] hover:from-purple-700 hover:to-pink-600 text-white transition-all duration-200 shadow-lg hover:shadow-xl px-6 py-2.5"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPlatform('whatsapp');
                }}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Start with WhatsApp
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Core Advertising Platforms */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Advertising Platforms</h2>
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

        {/* Management Tools */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Management & Analytics</h2>
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
              Get started with our comprehensive guides and best practices for multi-platform advertising campaigns.
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
    </div>
  );
}
