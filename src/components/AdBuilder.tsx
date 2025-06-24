
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
  Zap
} from "lucide-react";

type Platform = 'overview' | 'whatsapp' | 'facebook' | 'google' | 'linkedin' | 'instagram';

interface PlatformOption {
  id: Platform;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  accent?: boolean;
}

const platformOptions: PlatformOption[] = [
  {
    id: 'whatsapp',
    name: 'WhatsApp Business',
    description: 'Create personalized WhatsApp campaigns and connect directly with customers through messaging.',
    icon: MessageCircle,
    color: 'from-green-100 to-emerald-100',
    accent: true
  },
  {
    id: 'facebook',
    name: 'Facebook Ads',
    description: 'Build targeted Facebook advertising campaigns with AI-powered optimization tools.',
    icon: Facebook,
    color: 'from-blue-100 to-indigo-100'
  },
  {
    id: 'google',
    name: 'Google Ads',
    description: 'Create search and display campaigns on Google with advanced targeting options.',
    icon: Chrome,
    color: 'from-red-100 to-orange-100'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn Ads',
    description: 'Reach professionals and businesses with B2B-focused LinkedIn advertising campaigns.',
    icon: Linkedin,
    color: 'from-blue-100 to-cyan-100'
  },
  {
    id: 'instagram',
    name: 'Instagram Ads',
    description: 'Create visual and engaging Instagram campaigns for maximum audience reach.',
    icon: Instagram,
    color: 'from-purple-100 to-pink-100'
  }
];

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

  // Default overview with all platform options
  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#7C3AED] to-[#D946EF] bg-clip-text text-transparent mb-2">
            Ad Builder Dashboard
          </h1>
          <p className="text-gray-600">
            Choose your advertising platform and create powerful campaigns with AI assistance
          </p>
        </div>

        {/* Quick Start Section */}
        <Card className="border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 bg-white">
          <CardContent className="p-8 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered Ad Creation</h3>
              <p className="text-gray-600 mb-6">
                Create high-converting ads across multiple platforms with our intelligent automation tools
              </p>
              <Button 
                size="default" 
                className="bg-gradient-to-r from-[#7C3AED] to-[#D946EF] hover:from-purple-700 hover:to-pink-600 text-white transition-all duration-200 shadow-lg hover:shadow-xl px-6 py-2.5"
                onClick={() => setSelectedPlatform('whatsapp')}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Start with WhatsApp
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Platform Options Grid */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Choose Your Platform</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platformOptions.map((platform) => (
              <Card 
                key={platform.id}
                className="border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-200 bg-white group cursor-pointer hover:bg-gray-50 hover:-translate-y-1"
                onClick={() => setSelectedPlatform(platform.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0
                      bg-gradient-to-br ${platform.color}
                    `}>
                      <platform.icon className={`w-6 h-6 ${
                        platform.accent ? 'text-green-600' : 'text-purple-600'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                        {platform.name}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {platform.description}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Help Section */}
        <Card className="border border-gray-200 shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Need Help Getting Started?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-gray-600 text-sm">
              Our AI-powered tools make it easy to create professional advertising campaigns across all major platforms.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="ghost" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 transition-colors duration-200">
                View Getting Started Guide
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
