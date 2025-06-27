
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, MessageCircle, Target, BarChart3, Play, Users, TrendingUp, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export function HeroSection() {
  const [currentStat, setCurrentStat] = useState(0);
  const { showLogin } = useAuth();

  const stats = [
    { number: "100+", label: "Businesses Growing" },
    { number: "400%", label: "Average Lead Increase" },
    { number: "2 Min", label: "Setup Time" },
    { number: "24/7", label: "AI Support" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const scrollToPricing = () => {
    const element = document.getElementById('pricing');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToFeatures = () => {
    const element = document.getElementById('features');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-20 lg:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:50px_50px]" />
      <div className="absolute top-10 left-10 w-64 h-64 bg-purple-300/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-300/20 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-purple-200 shadow-sm">
              <Zap className="w-4 h-4 text-purple-600 mr-2" />
              <span className="text-sm font-medium text-purple-700">#1 AI Lead Generation Platform</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                <span className="block">Stop Struggling</span>
                <span className="block">With</span>
                <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent">
                  Lead Generation
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-600 max-w-2xl">
                AI creates your ads, writes your posts, and brings you qualified leads 
                <span className="font-semibold text-purple-600"> — while you focus on closing deals.</span>
              </p>

              {/* Social Proof */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <div className="flex -space-x-2 mr-3">
                    {[1,2,3,4,5].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                  </div>
                  <span>Join 100+ growing businesses</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                onClick={showLogin}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white text-lg px-8 py-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <Button
                onClick={scrollToFeatures}
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 border-2 border-purple-200 hover:border-purple-300 hover:bg-purple-50"
              >
                <Play className="mr-2 w-5 h-5" />
                See How It Works
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className={`text-center p-4 rounded-xl transition-all duration-500 ${
                    currentStat === index 
                      ? 'bg-white shadow-lg scale-105 border border-purple-200' 
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                >
                  <div className="text-2xl font-bold text-purple-600">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Interactive Demo */}
          <div className="relative">
            <div className="bg-white rounded-3xl shadow-2xl p-8 transform hover:rotate-1 transition-transform duration-300">
              {/* Demo Interface */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">AI Lead Generator</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm text-green-600">Live</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-xl p-4 text-center group hover:scale-105 transition-transform cursor-pointer">
                    <MessageCircle className="w-8 h-8 text-green-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-sm font-semibold text-green-700">WhatsApp</p>
                    <p className="text-xs text-green-600">47 leads today</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl p-4 text-center group hover:scale-105 transition-transform cursor-pointer">
                    <Target className="w-8 h-8 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-sm font-semibold text-blue-700">Facebook Ads</p>
                    <p className="text-xs text-blue-600">2.3x ROAS</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl p-4 text-center group hover:scale-105 transition-transform cursor-pointer">
                    <BarChart3 className="w-8 h-8 text-purple-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-sm font-semibold text-purple-700">Analytics</p>
                    <p className="text-xs text-purple-600">+127% growth</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">AI Assistant</p>
                      <p className="text-xs text-gray-500">Generating content...</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-white p-3 rounded-lg text-sm">
                      "🚀 Transform your business with our proven lead generation system..."
                    </div>
                    <div className="flex items-center text-xs text-green-600">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Post optimized for maximum engagement
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 bg-yellow-400 rounded-full p-4 animate-bounce shadow-lg">
              <TrendingUp className="w-6 h-6 text-yellow-800" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-green-400 rounded-full p-4 animate-pulse shadow-lg">
              <Users className="w-6 h-6 text-green-800" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
