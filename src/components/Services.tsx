
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
import { useState } from "react";
import { ConfirmationModal } from "./services/ConfirmationModal";
import { CustomSolutionForm } from "./services/CustomSolutionForm";
import { ServicesBanner } from "./services/ServicesBanner";
import { PostPurchaseUpsellModal } from "./services/PostPurchaseUpsellModal";
import { ServicesFooter } from "./services/ServicesFooter";
import { PremiumUpgradeModal } from "./premium/PremiumUpgradeModal";
import { usePremium } from "@/contexts/PremiumContext";

interface GrowthPackageProps {
  title: string;
  description: string;
  includes: string[];
  price: string;
  buttonText: string;
  buttonVariant?: "default" | "success" | "primary";
  savings?: string;
  mostPopular?: boolean;
  isPremiumRequired?: boolean;
  onButtonClick: () => void;
}

function GrowthPackageCard({ 
  title, 
  description, 
  includes, 
  price, 
  buttonText, 
  buttonVariant = "default",
  savings,
  mostPopular = false,
  isPremiumRequired = false,
  onButtonClick
}: GrowthPackageProps) {
  const { isPremium } = usePremium();

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

  const formatIncludeText = (text: string) => {
    // Split text at parentheses to create line breaks
    const parts = text.split(/(\([^)]+\))/);
    return parts.map((part, index) => {
      if (part.startsWith('(') && part.endsWith(')')) {
        return (
          <span key={index} className="block text-xs text-gray-600 mt-0.5">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  // Determine button text and styling for premium-required packages
  const actualButtonText = isPremiumRequired && !isPremium 
    ? "Upgrade to Premium to Access" 
    : buttonText;

  return (
    <Card className="relative bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full">
      {mostPopular && (
        <Badge 
          variant="default"
          className="absolute -top-2 left-4 z-10 bg-purple-600 text-white font-semibold px-2 py-0.5 text-xs"
        >
          Most Popular
        </Badge>
      )}
      {savings && !mostPopular && (
        <Badge 
          variant="destructive"
          className="absolute -top-2 left-4 z-10 bg-red-500 text-white font-semibold px-2 py-0.5 text-xs"
        >
          {savings}
        </Badge>
      )}
      <CardContent className="p-6 h-full flex flex-col">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            {title}
          </h3>
          <p className="text-gray-600 mb-4 text-sm leading-relaxed">
            {description}
          </p>
          
          <div className="space-y-3 mb-6">
            {includes.map((item, index) => (
              <div key={index} className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div className="text-gray-700 font-medium text-sm leading-relaxed">
                  {formatIncludeText(item)}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mb-4">
            <p className="text-2xl font-bold text-gray-900 mb-0.5">
              {price}
            </p>
            <p className="text-xs text-gray-500">All-inclusive, one-time</p>
            {isPremiumRequired && !isPremium && (
              <p className="text-xs text-purple-600 font-medium mt-1">
                Includes AI Automations, Lead Scoring & Smart Content — Premium Only
              </p>
            )}
          </div>
        </div>
        
        <Button 
          onClick={onButtonClick}
          className={`w-full py-3 h-10 text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl ${getButtonStyles()}`}
        >
          {actualButtonText}
        </Button>
      </CardContent>
    </Card>
  );
}

interface OneOffServiceProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  price: string;
  onButtonClick: () => void;
}

function OneOffServiceCard({ icon: Icon, title, price, onButtonClick }: OneOffServiceProps) {
  return (
    <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
      <CardContent className="p-4 text-center">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center mx-auto mb-3">
          <Icon className="w-5 h-5 text-purple-600" />
        </div>
        <h4 className="font-semibold text-gray-900 mb-1 text-sm">{title}</h4>
        <p className="text-lg font-bold text-purple-600 mb-3">{price}</p>
        <Button 
          onClick={onButtonClick}
          variant="outline" 
          className="w-full border-purple-200 text-purple-600 hover:bg-purple-50 h-8 text-xs"
        >
          Order Now
        </Button>
      </CardContent>
    </Card>
  );
}

export function Services() {
  const { isPremium, setIsPremium } = usePremium();
  const [confirmationModal, setConfirmationModal] = useState<{
    isOpen: boolean;
    type: "package" | "service" | "contact";
    title: string;
    price?: string;
  }>({
    isOpen: false,
    type: "package",
    title: "",
    price: ""
  });

  const [postPurchaseModal, setPostPurchaseModal] = useState<{
    isOpen: boolean;
    purchasedItem: string;
  }>({
    isOpen: false,
    purchasedItem: ""
  });

  const [premiumUpgradeModal, setPremiumUpgradeModal] = useState<{
    isOpen: boolean;
    feature?: string;
  }>({
    isOpen: false,
    feature: undefined
  });

  const handlePackageClick = (title: string, price: string, isPremiumRequired: boolean = false) => {
    if (isPremiumRequired && !isPremium) {
      setPremiumUpgradeModal({
        isOpen: true,
        feature: "Advanced AI Automations"
      });
      return;
    }

    setConfirmationModal({
      isOpen: true,
      type: "package",
      title,
      price
    });
  };

  const handleServiceClick = (title: string, price: string) => {
    setConfirmationModal({
      isOpen: true,
      type: "service",
      title,
      price
    });
  };

  const handleContactClick = () => {
    setConfirmationModal({
      isOpen: true,
      type: "contact",
      title: "Custom Solution Request"
    });
  };

  const handleUpgradeClick = (feature?: string) => {
    setPremiumUpgradeModal({
      isOpen: true,
      feature
    });
  };

  const handlePremiumUpgrade = () => {
    setIsPremium(true);
    setPremiumUpgradeModal({ isOpen: false });
    setPostPurchaseModal({ isOpen: false, purchasedItem: "" });
  };

  const handleConfirmationClose = () => {
    const { title } = confirmationModal;
    setConfirmationModal({ isOpen: false, type: "package", title: "", price: "" });
    
    // Show post-purchase upsell if user is not premium and just purchased a package
    if (!isPremium && confirmationModal.type === "package") {
      setPostPurchaseModal({
        isOpen: true,
        purchasedItem: title
      });
    }
  };

  const growthPackages = [
    {
      title: "Business Launch Package",
      description: "Everything to get your business legally online & discoverable.",
      includes: [
        "Business Registration Assistance (via partner)",
        "Simple, mobile-friendly website (incl. 1-year hosting)",
        "Google My Business setup",
        "Social Media Pages setup (FB, Insta, WhatsApp)",
        "FREE Basic Logo (AI-generated)",
        "WhatsApp Business Profile setup"
      ],
      price: "₹9,999 or AED 499",
      buttonText: "Get My Business Online",
      buttonVariant: "success" as const,
      mostPopular: true,
      isPremiumRequired: false
    },
    {
      title: "Lead Generation Starter Pack",
      description: "We set up your ads, content, and CRM — leads ready to capture.",
      includes: [
        "First Facebook & Instagram Ad setup",
        "5 AI-written Social Posts (customized for your business)",
        "WhatsApp Chatbot setup",
        "LeadMasters CRM basic setup & lead import",
        "WhatsApp Templates for faster replies",
        "100 Preloaded CRM Leads (optional from Apollo/HubSpot)",
        "7-Day WhatsApp Engagement Plan (ready to use)"
      ],
      price: "₹6,999 or AED 349",
      buttonText: "Launch My Leads",
      buttonVariant: "primary" as const,
      isPremiumRequired: false
    },
    {
      title: "Growth & Automation Plan",
      description: "Advanced content, ads, automation — serious business growth.",
      includes: [
        "Professional Ad Creatives Pack (images & captions)",
        "AI Content Pack (WhatsApp, Social Media, Email)",
        "SEO Starter Kit for your website",
        "15 WhatsApp Message Templates (high-converting)",
        "Monthly Done-For-You Marketing option (add-on)",
        "CRM Automations Setup (Lead Scoring, Follow-Ups)",
        "Monthly Performance Insights Report"
      ],
      price: "₹12,999 or AED 649",
      buttonText: "Scale My Business",
      buttonVariant: "default" as const,
      isPremiumRequired: true
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
    <div className="flex-1 bg-gradient-to-br from-slate-50 via-white to-gray-50/30 min-h-screen">
      <div className="max-w-6xl mx-auto p-4 space-y-8">
        {/* Global Banner - Only show for non-premium users */}
        {!isPremium && (
          <ServicesBanner onUpgradeClick={() => handleUpgradeClick()} />
        )}

        {/* Header */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#7C3AED] to-[#D946EF] bg-clip-text text-transparent mb-3">
            Professional Business Services
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed">
            Enterprise-grade solutions to launch and scale your business with LeadMasters.
          </p>
        </div>

        {/* Growth Packages Section */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Growth Packages</h2>
            <p className="text-sm text-gray-600">Complete solutions to launch and scale your business</p>
          </div>
          
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {growthPackages.map((pkg, index) => (
              <GrowthPackageCard
                key={index}
                title={pkg.title}
                description={pkg.description}
                includes={pkg.includes}
                price={pkg.price}
                buttonText={pkg.buttonText}
                buttonVariant={pkg.buttonVariant}
                mostPopular={pkg.mostPopular}
                isPremiumRequired={pkg.isPremiumRequired}
                onButtonClick={() => handlePackageClick(pkg.title, pkg.price, pkg.isPremiumRequired)}
              />
            ))}
          </div>
        </div>

        {/* One-Off Services Section */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-lg font-bold text-gray-900 mb-2">Individual Services</h2>
            <p className="text-xs text-gray-600">Specialized services for specific business needs</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {oneOffServices.map((service, index) => (
              <OneOffServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                price={service.price}
                onButtonClick={() => handleServiceClick(service.title, service.price)}
              />
            ))}
          </div>
        </div>

        {/* Custom Solution Form Section */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-lg font-bold text-gray-900 mb-2">Need a Custom Solution?</h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">
              Every business is unique. Share your specific requirements and our solutions team will design a custom package tailored to your goals.
            </p>
          </div>
          
          <CustomSolutionForm onSubmit={handleContactClick} />
        </div>

        {/* Services Footer - Only show for non-premium users */}
        {!isPremium && (
          <ServicesFooter onUpgradeClick={() => handleUpgradeClick("Premium Marketing Features")} />
        )}
      </div>

      {/* Modals */}
      <ConfirmationModal
        isOpen={confirmationModal.isOpen}
        onClose={handleConfirmationClose}
        type={confirmationModal.type}
        title={confirmationModal.title}
        price={confirmationModal.price}
      />

      <PostPurchaseUpsellModal
        isOpen={postPurchaseModal.isOpen}
        onClose={() => setPostPurchaseModal({ isOpen: false, purchasedItem: "" })}
        onUpgrade={handlePremiumUpgrade}
        purchasedItem={postPurchaseModal.purchasedItem}
      />

      <PremiumUpgradeModal
        isOpen={premiumUpgradeModal.isOpen}
        onClose={() => setPremiumUpgradeModal({ isOpen: false })}
        feature={premiumUpgradeModal.feature}
        onUpgrade={handlePremiumUpgrade}
      />
    </div>
  );
}
