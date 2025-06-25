import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle,
  Rocket,
  Target,
  TrendingUp,
  Bot,
  FileText,
  Users
} from "lucide-react";

interface GrowthPackageProps {
  title: string;
  description: string;
  includes: string[];
  price: string;
  buttonText: string;
  buttonVariant?: "default" | "success" | "primary";
  savings?: string;
  mostPopular?: boolean;
}

function GrowthPackageCard({ 
  title, 
  description, 
  includes, 
  price, 
  buttonText, 
  buttonVariant = "default",
  savings,
  mostPopular = false
}: GrowthPackageProps) {
  const getButtonStyles = () => {
    switch (buttonVariant) {
      case "success":
        return "bg-green-600 hover:bg-green-700 text-white";
      case "primary":
        return "bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white";
      default:
        return "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white";
    }
  };

  return (
    <Card className="relative bg-white border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full">
      {mostPopular && (
        <Badge 
          variant="default"
          className="absolute -top-3 left-6 z-10 bg-purple-600 text-white font-semibold px-3 py-1"
        >
          Most Popular
        </Badge>
      )}
      {savings && !mostPopular && (
        <Badge 
          variant="destructive"
          className="absolute -top-3 left-6 z-10 bg-red-500 text-white font-semibold px-3 py-1"
        >
          {savings}
        </Badge>
      )}
      <CardContent className="p-8 h-full flex flex-col">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            {title}
          </h3>
          <p className="text-gray-600 mb-6 text-lg leading-relaxed">
            {description}
          </p>
          
          <div className="space-y-3 mb-8">
            {includes.map((item, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 font-medium">{item}</span>
              </div>
            ))}
          </div>
          
          <div className="mb-6">
            <p className="text-3xl font-bold text-gray-900 mb-1">
              {price}
            </p>
            <p className="text-sm text-gray-500">All-inclusive package</p>
          </div>
        </div>
        
        <Button 
          className={`w-full py-4 text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl ${getButtonStyles()}`}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
}

interface OneOffServiceProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  price: string;
}

function OneOffServiceCard({ icon: Icon, title, price }: OneOffServiceProps) {
  return (
    <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
      <CardContent className="p-6 text-center">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center mx-auto mb-4">
          <Icon className="w-6 h-6 text-purple-600" />
        </div>
        <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
        <p className="text-lg font-bold text-purple-600 mb-4">{price}</p>
        <Button 
          variant="outline" 
          className="w-full border-purple-200 text-purple-600 hover:bg-purple-50"
        >
          Order Now
        </Button>
      </CardContent>
    </Card>
  );
}

export function Services() {
  const growthPackages = [
    {
      title: "Business Launch Package",
      description: "Everything you need to get your business online & ready.",
      includes: [
        "Business Registration Assistance",
        "Simple, mobile-friendly website", 
        "Google My Business setup",
        "Social Media pages setup"
      ],
      price: "₹9,999 or AED 499",
      buttonText: "Get Started",
      buttonVariant: "success" as const,
      mostPopular: true
    },
    {
      title: "Lead Generation Starter Pack",
      description: "We set up your ads, your posts, your WhatsApp — ready to capture leads.",
      includes: [
        "First Facebook/Instagram ad setup",
        "5 AI-written social posts",
        "WhatsApp Chatbot setup",
        "LeadMasters CRM basic setup & lead import"
      ],
      price: "₹6,999 or AED 349",
      buttonText: "Launch My Leads",
      buttonVariant: "primary" as const,
      savings: "Save ₹1,500"
    },
    {
      title: "Growth & Automation Plan",
      description: "Advanced content, ads, and automation for scaling your business.",
      includes: [
        "Professional ad creatives package",
        "AI Content Pack (captions, WhatsApp messages, email drafts)",
        "Basic SEO Starter Kit for your website",
        "Option to add monthly Done-For-You Marketing"
      ],
      price: "₹12,999 or AED 649",
      buttonText: "Scale My Business",
      buttonVariant: "default" as const
    }
  ];

  const oneOffServices = [
    {
      icon: FileText,
      title: "AI Content Pack",
      price: "₹2,999"
    },
    {
      icon: Bot,
      title: "WhatsApp Chatbot Setup",
      price: "₹1,999"
    },
    {
      icon: Users,
      title: "Lead Import & CRM Clean-up",
      price: "₹1,499"
    }
  ];

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#7C3AED] to-[#D946EF] bg-clip-text text-transparent mb-4">
            Business Growth Services
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            No team? No tech skills? No problem. Choose a ready-made package to grow your business with LeadMasters.
          </p>
        </div>

        {/* Growth Packages Section */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">🎯 Growth Packages</h2>
            <p className="text-lg text-gray-600">Complete solutions to launch and scale your business</p>
          </div>
          
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {growthPackages.map((pkg, index) => (
              <GrowthPackageCard
                key={index}
                title={pkg.title}
                description={pkg.description}
                includes={pkg.includes}
                price={pkg.price}
                buttonText={pkg.buttonText}
                buttonVariant={pkg.buttonVariant}
                savings={pkg.savings}
                mostPopular={pkg.mostPopular}
              />
            ))}
          </div>
        </div>

        {/* One-Off Services Section */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">✅ One-Off Services</h2>
            <p className="text-gray-600">Individual services for specific needs</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {oneOffServices.map((service, index) => (
              <OneOffServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                price={service.price}
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
