
import React from 'react';
import { PublicHeader } from './PublicHeader';
import { PublicFooter } from './PublicFooter';
import { Zap, MessageCircle, Target, BarChart3, Bot, Calendar, Users, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

export function FeaturesPage() {
  const navigateToLogin = () => {
    window.location.href = '/login';
  };

  const mainFeatures = [
    {
      icon: Zap,
      title: "AI Ad Builder",
      description: "Create high-converting Facebook, Google & Instagram ads in under 2 minutes",
      benefits: ["Write compelling ad copy", "Generate eye-catching visuals", "Optimize for your audience"],
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Marketing",
      description: "Automate customer conversations and turn chats into customers",
      benefits: ["Automated responses", "Lead qualification", "24/7 customer support"],
      color: "from-green-400 to-green-600"
    },
    {
      icon: BarChart3,
      title: "Smart CRM",
      description: "Track leads, manage customers, and never lose a potential sale",
      benefits: ["Lead scoring", "Pipeline management", "Automated follow-ups"],
      color: "from-blue-400 to-purple-500"
    }
  ];

  const additionalFeatures = [
    { icon: Target, title: "Smart Targeting", description: "AI finds your perfect customers" },
    { icon: Bot, title: "AI Assistant", description: "24/7 marketing guidance" },
    { icon: Calendar, title: "Auto Scheduling", description: "Post at optimal times" },
    { icon: Users, title: "Team Collaboration", description: "Work together seamlessly" },
    { icon: TrendingUp, title: "Growth Analytics", description: "Track what really matters" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />
      <main>
        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full mb-6">
                <Zap className="w-4 h-4 text-purple-600 mr-2" />
                <span className="text-sm font-medium text-purple-700">Powered by Advanced AI</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Everything You Need to 
                <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent"> Dominate Your Market</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Stop juggling multiple tools. Our AI-powered platform handles your entire lead generation funnel.
              </p>
            </div>
          </div>
        </section>

        {/* Main Features */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8 mb-20">
              {mainFeatures.map((feature, index) => (
                <div key={index} className="group relative bg-white rounded-3xl border border-gray-200 p-8 hover:shadow-2xl hover:border-purple-200 transition-all duration-300">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 mb-6 text-lg">{feature.description}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center text-gray-700">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>

              <Button 
                onClick={navigateToLogin}
                variant="outline" 
                className="w-full group-hover:bg-purple-50 group-hover:border-purple-300 group-hover:text-purple-700 transition-colors"
              >
                Try {feature.title}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
                </div>
              ))}
            </div>

            {/* Additional Features Grid */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 lg:p-12 border border-gray-200">
              <div className="text-center mb-12">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  Plus Everything Else You Need
                </h3>
                <p className="text-lg text-gray-600">
                  We've thought of everything so you don't have to
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {additionalFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4 p-6 bg-white rounded-xl border border-gray-100 hover:border-purple-200 hover:shadow-md transition-all duration-200 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <feature.icon className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center mt-16">
              <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-3xl p-8 lg:p-12 text-white">
                <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                  Ready to 10x Your Leads?
                </h3>
                <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                  Join thousands of businesses already growing with LeadMasters.ai. 
                  Setup takes less than 2 minutes.
                </p>
                <Button 
                  onClick={navigateToLogin}
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-4 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
                >
                  Start Your Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
