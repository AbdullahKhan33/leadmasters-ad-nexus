
import React from 'react';
import { PublicHeader } from './PublicHeader';
import { PublicFooter } from './PublicFooter';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, Star, Zap } from 'lucide-react';

export function PricingPage() {
  const plans = [
    {
      name: "Lead Generation Starter Pack",
      description: "Perfect for businesses just starting their lead generation journey",
      price: { inr: "₹6,999", aed: "AED 349", usd: "$99" },
      originalPrice: { inr: "₹12,999", aed: "AED 649", usd: "$199" },
      features: [
        "AI-Generated Social Media Posts (50/month)",
        "Basic Ad Campaign Setup (2 platforms)",
        "Lead Capture Forms & Landing Pages",
        "Basic CRM Integration",
        "Email Marketing Templates",
        "Basic Analytics Dashboard",
        "Email Support",
        "Getting Started Guide"
      ],
      popular: false,
      cta: "Start Generating Leads",
      badge: "Most Beginner-Friendly"
    },
    {
      name: "Business Launch Package",
      description: "Complete business setup with professional online presence",
      price: { inr: "₹9,999", aed: "AED 499", usd: "$149" },
      originalPrice: { inr: "₹19,999", aed: "AED 999", usd: "$299" },
      features: [
        "Everything in Starter Pack",
        "Professional Website Creation",
        "Complete Brand Identity Package",
        "Social Media Account Setup (All Platforms)",
        "SEO Optimization & Local Listings",
        "Google My Business Setup",
        "WhatsApp Business Integration",
        "Launch Strategy Consultation",
        "Priority Support",
        "30-Day Success Guarantee"
      ],
      popular: true,
      cta: "Launch Your Business",
      badge: "Best Value"
    },
    {
      name: "Growth & Automation Pro",
      description: "Advanced automation and scaling for established businesses",
      price: { inr: "₹12,999", aed: "AED 649", usd: "$199" },
      originalPrice: { inr: "₹24,999", aed: "AED 1,249", usd: "$399" },
      features: [
        "Everything in Launch Package",
        "Advanced AI Content Creation (Unlimited)",
        "Multi-Platform Ad Management",
        "Marketing Automation Workflows",
        "Advanced CRM with Sales Pipeline",
        "WhatsApp Automation & Chatbots",
        "Email Marketing Automation",
        "Advanced Analytics & Reporting",
        "A/B Testing Tools",
        "Monthly Strategy Calls",
        "Custom Integrations",
        "24/7 Priority Support",
        "Success Manager Assigned"
      ],
      popular: false,
      cta: "Scale Your Growth",
      badge: "Enterprise-Level Features"
    }
  ];

  const addOns = [
    {
      name: "Done-For-You Setup",
      description: "Our team sets up everything for you",
      price: "₹2,999 / $49"
    },
    {
      name: "Extra Strategy Call",
      description: "1-hour consultation with our experts",
      price: "₹1,499 / $29"
    },
    {
      name: "Custom Website Design",
      description: "Unique design tailored to your brand",
      price: "₹4,999 / $99"
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
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Simple, Transparent <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Pricing</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Choose the perfect growth package for your business. No hidden fees, no long-term contracts, 
                and a 30-day money-back guarantee on all plans.
              </p>
              <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                <Zap className="w-4 h-4" />
                <span>Limited Time: 50% Off All Packages</span>
              </div>
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
                      <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        {plan.badge}
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-6">{plan.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-4xl font-bold text-gray-900">{plan.price.inr}</span>
                        <span className="text-gray-500">/</span>
                        <span className="text-2xl font-bold text-gray-900">{plan.price.usd}</span>
                      </div>
                      <div className="text-sm text-gray-500 line-through">
                        Regular: {plan.originalPrice.inr} / {plan.originalPrice.usd}
                      </div>
                      <div className="text-sm font-semibold text-green-600">
                        Save 50% - Limited Time Only
                      </div>
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
          </div>
        </section>

        {/* Add-ons */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Add-Ons</h2>
              <p className="text-lg text-gray-600">Enhance your package with these optional extras</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {addOns.map((addon, index) => (
                <div key={index} className="bg-white rounded-lg p-6 text-center shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{addon.name}</h3>
                  <p className="text-gray-600 mb-4">{addon.description}</p>
                  <div className="text-xl font-bold text-purple-600">{addon.price}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Guarantee Section */}
        <section className="py-16 bg-gradient-to-r from-green-500 to-green-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              30-Day Money-Back Guarantee
            </h2>
            <p className="text-xl text-green-100 mb-8">
              We're so confident you'll love the results that we offer a full refund if you're not completely satisfied within 30 days.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-green-100">
              <div>
                <div className="text-2xl font-bold">✓</div>
                <div>No questions asked</div>
              </div>
              <div>
                <div className="text-2xl font-bold">✓</div>
                <div>Full refund guaranteed</div>
              </div>
              <div>
                <div className="text-2xl font-bold">✓</div>
                <div>Keep what you've built</div>
              </div>
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
