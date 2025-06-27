
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, MessageCircle, Target, BarChart3 } from 'lucide-react';

export function HeroSection() {
  const scrollToPricing = () => {
    const element = document.getElementById('pricing');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              <span className="block">🚀 Simplifying</span>
              <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                Lead Generation
              </span>
              <span className="block">for Small Businesses</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              AI-powered tools to get more leads, run better ads, and grow your business — 
              no tech skills needed.
            </p>

            <Button
              onClick={scrollToPricing}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white text-lg px-8 py-4"
            >
              Get Started in 2 Minutes
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            {/* Trust Badges */}
            <div className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-8 text-sm text-gray-500">
              <div className="flex items-center">
                <Zap className="w-4 h-4 mr-2 text-yellow-500" />
                AI-Powered
              </div>
              <div className="flex items-center">
                <Target className="w-4 h-4 mr-2 text-green-500" />
                No Tech Skills Required
              </div>
              <div className="flex items-center">
                <BarChart3 className="w-4 h-4 mr-2 text-blue-500" />
                Proven Results
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-lg p-4 text-center">
                  <MessageCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-green-700">WhatsApp</p>
                  <p className="text-xs text-green-600">Marketing</p>
                </div>
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg p-4 text-center">
                  <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-blue-700">Smart Ads</p>
                  <p className="text-xs text-blue-600">AI-Optimized</p>
                </div>
                <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg p-4 text-center">
                  <BarChart3 className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-purple-700">CRM</p>
                  <p className="text-xs text-purple-600">Lead Tracking</p>
                </div>
              </div>
              <div className="mt-6 text-center">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-full text-sm">
                  <Zap className="w-4 h-4" />
                  <span>All-in-One Platform</span>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-yellow-400 rounded-full p-3 animate-bounce">
              <Zap className="w-6 h-6 text-yellow-800" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-pink-400 rounded-full p-3 animate-pulse">
              <Target className="w-6 h-6 text-pink-800" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
