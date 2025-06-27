
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, Star } from 'lucide-react';

export function PricingSection() {
  const plans = [
    {
      name: "Lead Generation Starter Pack",
      description: "Ads, AI-written posts, and CRM to capture leads fast.",
      price: { inr: "₹6,999", aed: "AED 349" },
      features: [
        "AI-Generated Social Media Posts",
        "Basic Ad Campaign Setup",
        "Lead Capture Forms",
        "CRM Integration",
        "Email Support",
        "Basic Analytics"
      ],
      popular: false,
      cta: "Start Generating Leads"
    },
    {
      name: "Business Launch Package",
      description: "Everything you need to get your business online & ready.",
      price: { inr: "₹9,999", aed: "AED 499" },
      features: [
        "Complete Business Setup",
        "Professional Website Creation",
        "Social Media Account Setup",
        "Brand Identity Package",
        "SEO Optimization",
        "Launch Strategy Consultation",
        "Priority Support"
      ],
      popular: true,
      cta: "Launch Your Business"
    },
    {
      name: "Growth & Automation Plan",
      description: "Advanced content, ads, automation & monthly support.",
      price: { inr: "₹12,999", aed: "AED 649" },
      features: [
        "Advanced AI Content Creation",
        "Multi-Platform Ad Management",
        "Marketing Automation Workflows",
        "Advanced CRM Features",
        "WhatsApp Business Integration",
        "Monthly Strategy Calls",
        "24/7 Priority Support",
        "Custom Integrations"
      ],
      popular: false,
      cta: "Scale Your Growth"
    }
  ];

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Simple <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Pricing</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect plan to grow your business. No hidden fees, no complex contracts.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl border-2 p-8 ${
                plan.popular
                  ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50'
                  : 'border-gray-200 bg-white'
              } hover:shadow-lg transition-shadow duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-3xl font-bold text-gray-900">{plan.price.inr}</span>
                  <span className="text-gray-500">/</span>
                  <span className="text-3xl font-bold text-gray-900">{plan.price.aed}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={scrollToContact}
                className={`w-full ${
                  plan.popular
                    ? 'bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white'
                    : 'bg-gray-900 hover:bg-gray-800 text-white'
                }`}
              >
                {plan.cta}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={scrollToContact}
            variant="outline"
            size="lg"
            className="border-purple-200 text-purple-700 hover:bg-purple-50"
          >
            View Full Packages
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
