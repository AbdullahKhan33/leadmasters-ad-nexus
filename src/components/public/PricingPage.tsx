
import React from 'react';
import { PublicHeader } from './PublicHeader';
import { PublicFooter } from './PublicFooter';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, Star, Zap } from 'lucide-react';

export function PricingPage() {
  const plans = [
    {
      name: "Business Launch Package",
      description: "Everything to get your business legally online & discoverable.",
      price: "₹9,999 or AED 499",
      features: [
        "Business Registration Assistance (via partner)",
        "Simple, mobile-friendly website (incl. 1-year hosting)",
        "Google My Business setup",
        "Social Media Pages setup (FB, Insta, WhatsApp)",
        "FREE Basic Logo (AI-generated)",
        "WhatsApp Business Profile setup"
      ],
      popular: true,
      cta: "Get My Business Online",
      badge: "Most Popular",
      ctaColor: "bg-green-500 hover:bg-green-600"
    },
    {
      name: "Lead Generation Starter Pack",
      description: "We set up your ads, content, and CRM — leads ready to capture.",
      price: "₹6,999 or AED 349",
      features: [
        "First Facebook & Instagram Ad setup",
        "5 AI-written Social Posts (customized for your business)",
        "WhatsApp Chatbot setup",
        "LeadMasters CRM basic setup & lead import",
        "WhatsApp Templates for faster replies",
        "100 Preloaded CRM Leads (optional from Apollo/HubSpot)",
        "7-Day WhatsApp Engagement Plan (ready to use)"
      ],
      popular: false,
      cta: "Launch My Leads",
      badge: "Great Start",
      ctaColor: "bg-purple-500 hover:bg-purple-600"
    },
    {
      name: "Growth & Automation Plan",
      description: "Advanced content, ads, automation — serious business growth.",
      price: "₹12,999 or AED 649",
      features: [
        "Professional Ad Creatives Pack (images & captions)",
        "AI Content Pack (WhatsApp, Social Media, Email)",
        "SEO Starter Kit for your website",
        "15 WhatsApp Message Templates (high-converting)",
        "Monthly Done-For-You Marketing option (add-on)",
        "CRM Automations Setup (Lead Scoring, Follow-Ups)",
        "Monthly Performance Insights Report"
      ],
      popular: false,
      cta: "Scale My Business",
      badge: "Enterprise-Level",
      ctaColor: "bg-blue-500 hover:bg-blue-600"
    }
  ];

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />
      <main>
        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Growth <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Packages</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Complete solutions to launch and scale your business
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8 mb-16">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className={`relative rounded-2xl border-2 p-8 ${
                    plan.popular
                      ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 transform scale-105'
                      : 'border-gray-200 bg-white'
                  } hover:shadow-xl transition-all duration-300`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        {plan.badge}
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-4">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-6">{plan.description}</p>
                    
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-gray-900">{plan.price}</div>
                      <div className="text-sm text-gray-500">
                        All-inclusive, one-time
                      </div>
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
                    onClick={scrollToContact}
                    className={`w-full ${plan.ctaColor} text-white`}
                  >
                    {plan.cta}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What's included in the setup?</h3>
                <p className="text-gray-600">Everything you need to start generating leads immediately. Our team handles the technical setup while you focus on your business.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How quickly will I see results?</h3>
                <p className="text-gray-600">Most businesses see their first leads within 7-14 days of launch. Our AI-powered system is designed for rapid deployment and quick wins.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Do you offer ongoing support?</h3>
                <p className="text-gray-600">Yes! All packages include ongoing support. Higher-tier packages include dedicated success managers and monthly strategy calls.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I upgrade my package later?</h3>
                <p className="text-gray-600">Absolutely! You can upgrade at any time, and we'll credit what you've already paid toward your new package.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
