
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, Star, Zap, Crown, Rocket } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export function PricingSection() {
  const { showLogin } = useAuth();

  const plans = [
    {
      name: "Lead Generation Starter",
      tagline: "Perfect for new businesses getting started",
      description: "Get your first 100 leads with AI-powered ads and posts",
      price: { inr: "₹6,999", aed: "AED 349" },
      originalPrice: { inr: "₹12,999", aed: "AED 649" },
      features: [
        "AI-Generated Social Media Posts (50/month)",
        "Basic Ad Campaign Setup (Facebook & Instagram)",
        "Lead Capture Forms & Landing Pages",
        "Basic CRM with Lead Tracking",
        "Email Support (24hr response)",
        "Basic Analytics Dashboard",
        "1 Business Profile Setup"
      ],
      popular: false,
      cta: "Start Generating Leads",
      icon: Rocket,
      savings: "46% OFF"
    },
    {
      name: "Business Growth Package",
      tagline: "Most popular for scaling businesses",
      description: "Everything you need to dominate your local market",
      price: { inr: "₹12,999", aed: "AED 649" },
      originalPrice: { inr: "₹24,999", aed: "AED 1,249" },
      features: [
        "Everything in Starter Plan",
        "AI Content Creation (Unlimited)",
        "Multi-Platform Ads (FB, Google, Instagram)",
        "WhatsApp Business Integration",
        "Advanced CRM with Automation",
        "Priority Support (4hr response)",
        "Advanced Analytics & Reporting",
        "3 Business Profiles",
        "Social Media Scheduling",
        "Custom Landing Pages"
      ],
      popular: true,
      cta: "Scale Your Business",
      icon: Crown,
      savings: "48% OFF"
    },
    {
      name: "Enterprise Domination",
      tagline: "For serious businesses ready to dominate",
      description: "Maximum growth with full AI automation and premium support",
      price: { inr: "₹24,999", aed: "AED 1,249" },
      originalPrice: { inr: "₹49,999", aed: "AED 2,499" },
      features: [
        "Everything in Growth Package",
        "AI Sales Assistant & Chatbot",
        "Advanced Marketing Automation",
        "Custom Integrations & API Access",
        "Dedicated Account Manager",
        "24/7 Priority Support (1hr response)",
        "Custom Analytics & Reports",
        "Unlimited Business Profiles",
        "A/B Testing & Optimization",
        "White-label Solutions",
        "Advanced Lead Scoring",
        "Custom Training & Onboarding"
      ],
      popular: false,
      cta: "Dominate Your Market",
      icon: Zap,
      savings: "50% OFF"
    }
  ];

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full mb-6">
            <Star className="w-4 h-4 text-green-600 mr-2" />
            <span className="text-sm font-medium text-green-700">Limited Time: 50% OFF Launch Pricing</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            Choose Your 
            <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent"> Growth Plan</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pick the perfect plan to accelerate your business growth. No contracts, cancel anytime.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-3xl border-2 p-8 ${
                plan.popular
                  ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-2xl scale-105'
                  : 'border-gray-200 bg-white hover:border-purple-200'
              } hover:shadow-xl transition-all duration-300 group`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center shadow-lg">
                    <Crown className="w-4 h-4 mr-2" />
                    MOST POPULAR
                  </div>
                </div>
              )}

              {plan.savings && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  {plan.savings}
                </div>
              )}

              <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-500' 
                    : 'bg-gradient-to-r from-gray-100 to-gray-200'
                }`}>
                  <plan.icon className={`w-8 h-8 ${plan.popular ? 'text-white' : 'text-gray-600'}`} />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-purple-600 font-semibold text-sm mb-3">{plan.tagline}</p>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-4xl font-bold text-gray-900">{plan.price.inr}</span>
                    <span className="text-gray-500">/</span>
                    <span className="text-4xl font-bold text-gray-900">{plan.price.aed}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-sm">
                    <span className="line-through text-gray-400">{plan.originalPrice.inr}</span>
                    <span className="text-gray-400">/</span>
                    <span className="line-through text-gray-400">{plan.originalPrice.aed}</span>
                  </div>
                  <p className="text-sm text-gray-500">One-time setup fee</p>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={showLogin}
                className={`w-full ${
                  plan.popular
                    ? 'bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white shadow-lg hover:shadow-xl'
                    : 'bg-gray-900 hover:bg-gray-800 text-white'
                } group-hover:scale-105 transition-all duration-200`}
              >
                {plan.cta}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Money Back Guarantee */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl p-8 text-center border border-green-200 mb-12">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">30-Day Money-Back Guarantee</h3>
            <p className="text-lg text-gray-600 mb-6">
              Not seeing results in 30 days? Get your money back, no questions asked. 
              We're that confident in our AI-powered lead generation system.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center">
                <Check className="w-4 h-4 text-green-500 mr-2" />
                No Setup Fees
              </div>
              <div className="flex items-center">
                <Check className="w-4 h-4 text-green-500 mr-2" />
                Cancel Anytime
              </div>
              <div className="flex items-center">
                <Check className="w-4 h-4 text-green-500 mr-2" />
                No Hidden Costs
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-6">
            Need a custom solution? We've got enterprise packages too.
          </p>
          <Button
            onClick={scrollToContact}
            variant="outline"
            size="lg"
            className="border-2 border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300"
          >
            Contact Sales for Enterprise
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
