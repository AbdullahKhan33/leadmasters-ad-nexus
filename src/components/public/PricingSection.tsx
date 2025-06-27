
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, Zap, Star, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export function PricingSection() {
  const { showLogin } = useAuth();

  const plans = [
    {
      name: "Business Launch Package",
      price: "₹9,999 or AED 499",
      description: "Everything to get your business legally online & discoverable.",
      features: [
        "Business Registration Assistance (via partner)",
        "Simple, mobile-friendly website (incl. 1-year hosting)",
        "Google My Business setup",
        "Social Media Pages setup (FB, Insta, WhatsApp)",
        "FREE Basic Logo (AI-generated)",
        "WhatsApp Business Profile setup"
      ],
      cta: "Get My Business Online",
      popular: true,
      color: "from-green-500 to-green-600",
      ctaColor: "bg-green-500 hover:bg-green-600"
    },
    {
      name: "Lead Generation Starter Pack",
      price: "₹6,999 or AED 349",
      description: "We set up your ads, content, and CRM — leads ready to capture.",
      features: [
        "First Facebook & Instagram Ad setup",
        "5 AI-written Social Posts (customized for your business)",
        "WhatsApp Chatbot setup",
        "LeadMasters CRM basic setup & lead import",
        "WhatsApp Templates for faster replies",
        "100 Preloaded CRM Leads (optional from Apollo/HubSpot)",
        "7-Day WhatsApp Engagement Plan (ready to use)"
      ],
      cta: "Launch My Leads",
      popular: false,
      color: "from-purple-500 to-pink-500",
      ctaColor: "bg-purple-500 hover:bg-purple-600"
    },
    {
      name: "Growth & Automation Plan",
      price: "₹12,999 or AED 649",
      description: "Advanced content, ads, automation — serious business growth.",
      features: [
        "Professional Ad Creatives Pack (images & captions)",
        "AI Content Pack (WhatsApp, Social Media, Email)",
        "SEO Starter Kit for your website",
        "15 WhatsApp Message Templates (high-converting)",
        "Monthly Done-For-You Marketing option (add-on)",
        "CRM Automations Setup (Lead Scoring, Follow-Ups)",
        "Monthly Performance Insights Report"
      ],
      cta: "Scale My Business",
      popular: false,
      color: "from-blue-500 to-blue-600",
      ctaColor: "bg-blue-500 hover:bg-blue-600"
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            Growth 
            <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent"> Packages</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Complete solutions to launch and scale your business
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative bg-white rounded-3xl border-2 p-8 transition-all duration-300 hover:shadow-2xl ${
                plan.popular 
                  ? 'border-purple-200 shadow-xl scale-105' 
                  : 'border-gray-200 hover:border-purple-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl mb-4`}>
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-2xl font-bold text-gray-900">{plan.price}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">All-inclusive, one-time</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={showLogin}
                className={`w-full py-4 text-lg font-medium transition-all duration-200 ${plan.ctaColor} text-white shadow-lg hover:shadow-xl`}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-16">
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center">
              <Check className="w-4 h-4 text-green-500 mr-2" />
              No long-term contracts
            </div>
            <div className="flex items-center">
              <Check className="w-4 h-4 text-green-500 mr-2" />
              24/7 support
            </div>
            <div className="flex items-center">
              <Check className="w-4 h-4 text-green-500 mr-2" />
              Results guarantee
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
