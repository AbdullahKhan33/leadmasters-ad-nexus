
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Globe, 
  Camera, 
  MapPin, 
  Calendar, 
  Bot, 
  Target, 
  PenTool, 
  TrendingUp, 
  Folder, 
  Briefcase 
} from "lucide-react";

interface ServiceCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  buttonText: string;
  price?: string;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
}

function ServiceCard({ 
  icon: Icon, 
  title, 
  description, 
  buttonText, 
  price, 
  badge,
  badgeVariant = "default"
}: ServiceCardProps) {
  return (
    <Card className="relative bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1">
      {badge && (
        <Badge 
          variant={badgeVariant}
          className="absolute -top-2 left-4 z-10 bg-gradient-to-r from-purple-600 to-pink-500 text-white"
        >
          {badge}
        </Badge>
      )}
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center flex-shrink-0">
              <Icon className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                {description}
              </p>
              {price && (
                <p className="text-lg font-bold text-purple-600 mb-4">
                  {price}
                </p>
              )}
            </div>
          </div>
          <Button 
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {buttonText}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function Services() {
  const foundationalServices = [
    {
      icon: Globe,
      title: "Website Creation",
      description: "Simple, mobile-friendly, WhatsApp-connected site. Maps & contact included",
      buttonText: "Request Website",
      price: "₹7,999 or AED 399",
      badge: "Most Popular",
      badgeVariant: "default" as const
    },
    {
      icon: Camera,
      title: "Social Media Setup",
      description: "Facebook, Instagram, LinkedIn pages created & branded",
      buttonText: "Get Social Setup",
      price: "₹4,999 or AED 249"
    },
    {
      icon: MapPin,
      title: "Google My Business Setup",
      description: "Google Maps & Local Search listing",
      buttonText: "Setup My Business",
      price: "₹3,999 or AED 199"
    }
  ];

  const marketingServices = [
    {
      icon: Calendar,
      title: "Basic Marketing Package",
      description: "1st Ad setup, 5 social posts, WhatsApp templates",
      buttonText: "Start Marketing",
      badge: "Recommended",
      badgeVariant: "secondary" as const
    },
    {
      icon: Bot,
      title: "WhatsApp Chatbot Setup",
      description: "Auto-responses & FAQs via WhatsApp",
      buttonText: "Setup Chatbot"
    },
    {
      icon: Target,
      title: "Professional Ad Creatives Package",
      description: "Banners, reels, story ads for your business",
      buttonText: "Order Creatives"
    },
    {
      icon: PenTool,
      title: "AI Content Pack",
      description: "Ready-made captions, messages, emails",
      buttonText: "Get AI Content"
    }
  ];

  const advancedServices = [
    {
      icon: TrendingUp,
      title: "Basic SEO Starter Kit",
      description: "Website copy optimization, meta setup",
      buttonText: "Optimize My Site"
    },
    {
      icon: Folder,
      title: "Lead Import & CRM Setup",
      description: "Import & clean existing leads",
      buttonText: "Import Leads"
    },
    {
      icon: Briefcase,
      title: "Done-For-You Monthly Marketing",
      description: "Full content, ads, reporting handled",
      buttonText: "Book Marketing Support"
    }
  ];

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#7C3AED] to-[#D946EF] bg-clip-text text-transparent mb-3">
            Services
          </h1>
          <p className="text-lg text-gray-600">
            Need help with your website, ads, or marketing? We'll do it for you — so you can focus on business.
          </p>
        </div>

        {/* Foundational Setup Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Foundational Setup</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {foundationalServices.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                buttonText={service.buttonText}
                price={service.price}
                badge={service.badge}
                badgeVariant={service.badgeVariant}
              />
            ))}
          </div>
        </div>

        {/* Marketing & Automation Add-Ons Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Marketing & Automation Add-Ons</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {marketingServices.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                buttonText={service.buttonText}
                badge={service.badge}
                badgeVariant={service.badgeVariant}
              />
            ))}
          </div>
        </div>

        {/* Advanced & Support Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Advanced & Support</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advancedServices.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                buttonText={service.buttonText}
              />
            ))}
          </div>
        </div>

        {/* Help Section */}
        <Card className="border border-gray-200 shadow-sm bg-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Need a Custom Solution?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Don't see exactly what you need? Contact our team to discuss custom packages tailored to your business requirements.
            </p>
            <Button 
              variant="outline" 
              className="border-purple-200 text-purple-600 hover:bg-purple-50 transition-colors duration-200"
            >
              Contact Us
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
