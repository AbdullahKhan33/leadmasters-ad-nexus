import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, MessageCircle, Target, BarChart3, Play, Users, TrendingUp, CheckCircle, Sparkles, Brain, Rocket, Globe } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export function HeroSection() {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const [animatedMetrics, setAnimatedMetrics] = useState({ whatsapp: 0, facebook: 0, analytics: 0 });
  const [currentStep, setCurrentStep] = useState(0);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const stats = [
    { number: "100+", label: "Businesses Growing" },
    { number: "400%", label: "Average Lead Increase" },
    { number: "2 Min", label: "Setup Time" },
    { number: "24/7", label: "AI Support" }
  ];

  const companyLogos = [
    { name: "TechFlow", color: "from-blue-500 to-blue-600" },
    { name: "GrowthCo", color: "from-green-500 to-green-600" },
    { name: "InnovateLab", color: "from-purple-500 to-purple-600" },
    { name: "ScaleUp", color: "from-orange-500 to-orange-600" },
    { name: "NextGen", color: "from-pink-500 to-pink-600" }
  ];

  const demoSteps = [
    { 
      title: "AI analyzes your business", 
      icon: Brain,
      color: "from-blue-500 to-indigo-600",
      description: "Understanding your market and audience..."
    },
    { 
      title: "Creates targeted content", 
      icon: Sparkles,
      color: "from-purple-500 to-pink-600",
      description: "Generating high-converting ads and posts..."
    },
    { 
      title: "Launches campaigns", 
      icon: Rocket,
      color: "from-green-500 to-emerald-600",
      description: "Deploying across all platforms..."
    },
    { 
      title: "Delivers results", 
      icon: TrendingUp,
      color: "from-orange-500 to-red-600",
      description: "Real leads flowing to your business..."
    }
  ];

  // Animate metrics counter
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedMetrics(prev => ({
        whatsapp: prev.whatsapp < 47 ? prev.whatsapp + 1 : 47,
        facebook: prev.facebook < 230 ? prev.facebook + 5 : 230,
        analytics: prev.analytics < 127 ? prev.analytics + 3 : 127
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Auto-cycle demo steps
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % demoSteps.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const scrollToFeatures = () => {
    const element = document.getElementById('features');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartFreeTrial = () => {
    console.log('Start Free Trial button clicked in hero');
    if (isAuthenticated) {
      navigate('/app');
    } else {
      navigate('/login');
    }
  };

  return (
    <section id="home" className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-20 lg:py-32 overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:50px_50px]" />
      <div className="absolute top-10 left-10 w-64 h-64 bg-purple-300/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-blue-300/10 rounded-full blur-2xl animate-bounce" style={{ animationDelay: '2s' }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-purple-200 shadow-sm animate-fade-in">
              <Zap className="w-4 h-4 text-purple-600 mr-2" />
              <span className="text-sm font-medium text-purple-700">#1 AI Lead Generation Platform</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <span className="block">Stop Struggling</span>
                <span className="block">With</span>
                <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent">
                  Lead Generation
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-600 max-w-2xl animate-fade-in" style={{ animationDelay: '0.4s' }}>
                AI creates your ads, writes your posts, and brings you qualified leads 
                <span className="font-semibold text-purple-600"> — while you focus on closing deals.</span>
              </p>

              {/* Social Proof */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-600 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <div className="flex items-center">
                  <div className="flex -space-x-2 mr-3">
                    {companyLogos.map((company, i) => (
                      <div key={i} className={`w-8 h-8 rounded-full bg-gradient-to-r ${company.color} border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-md hover:scale-110 transition-transform duration-200`}>
                        {company.name.charAt(0)}
                      </div>
                    ))}
                  </div>
                  <span>Join 100+ growing businesses</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <Button
                onClick={handleStartFreeTrial}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white text-lg px-8 py-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
              >
                {isAuthenticated ? 'Go to Dashboard' : 'Start Free Trial'}
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
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 animate-fade-in" style={{ animationDelay: '1s' }}>
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className={`text-center p-4 rounded-xl transition-all duration-300 cursor-pointer ${
                    hoveredStat === index
                      ? 'bg-white shadow-lg scale-105 border border-purple-200' 
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                  onMouseEnter={() => setHoveredStat(index)}
                  onMouseLeave={() => setHoveredStat(null)}
                >
                  <div className="text-2xl font-bold text-purple-600">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Enhanced Interactive Demo */}
          <div className="relative animate-fade-in" style={{ animationDelay: '1.2s' }}>
            {/* Main Demo Container with Enhanced Styling */}
            <div className="relative bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl shadow-2xl p-8 transform hover:rotate-1 transition-all duration-500 border border-gray-100/50 backdrop-blur-sm">
              {/* Animated Border Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-3xl blur-xl opacity-75 animate-pulse"></div>
              <div className="absolute inset-[1px] bg-white rounded-3xl"></div>
              
              {/* Content */}
              <div className="relative z-10 space-y-6">
                {/* Header with Live Indicator */}
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center">
                    <Brain className="w-6 h-6 mr-2 text-purple-600" />
                    AI Lead Generator
                  </h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
                    <span className="text-sm font-medium text-green-600">Live</span>
                  </div>
                </div>
                
                {/* Enhanced Performance Cards */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-4 text-center group hover:scale-110 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl border border-green-200/50">
                    <MessageCircle className="w-8 h-8 text-green-600 mx-auto mb-2 group-hover:scale-125 transition-transform duration-300" />
                    <p className="text-sm font-bold text-green-800">WhatsApp</p>
                    <p className="text-lg font-bold text-green-700">{animatedMetrics.whatsapp}</p>
                    <p className="text-xs text-green-600">leads today</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-4 text-center group hover:scale-110 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl border border-blue-200/50">
                    <Target className="w-8 h-8 text-blue-600 mx-auto mb-2 group-hover:scale-125 transition-transform duration-300" />
                    <p className="text-sm font-bold text-blue-800">Facebook Ads</p>
                    <p className="text-lg font-bold text-blue-700">{(animatedMetrics.facebook / 100).toFixed(1)}x</p>
                    <p className="text-xs text-blue-600">ROAS</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl p-4 text-center group hover:scale-110 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl border border-purple-200/50">
                    <BarChart3 className="w-8 h-8 text-purple-600 mx-auto mb-2 group-hover:scale-125 transition-transform duration-300" />
                    <p className="text-sm font-bold text-purple-800">Analytics</p>
                    <p className="text-lg font-bold text-purple-700">+{animatedMetrics.analytics}%</p>
                    <p className="text-xs text-purple-600">growth</p>
                  </div>
                </div>

                {/* AI Process Visualization */}
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200/50 shadow-inner">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${demoSteps[currentStep].color} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <demoSteps[currentStep].icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{demoSteps[currentStep].title}</p>
                      <p className="text-sm text-gray-500">{demoSteps[currentStep].description}</p>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div 
                      className={`bg-gradient-to-r ${demoSteps[currentStep].color} h-2 rounded-full transition-all duration-1000`}
                      style={{ width: `${((currentStep + 1) / demoSteps.length) * 100}%` }}
                    ></div>
                  </div>

                  {/* Step Indicators */}
                  <div className="flex justify-center space-x-2">
                    {demoSteps.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentStep ? 'bg-purple-600 scale-125' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Generated Content Preview */}
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-4 border border-gray-200/50 shadow-sm">
                  <div className="space-y-3">
                    <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-xl text-sm border border-purple-200/50">
                      <div className="flex items-center mb-2">
                        <Sparkles className="w-4 h-4 text-purple-600 mr-2" />
                        <span className="font-medium text-purple-800">AI Generated Post</span>
                      </div>
                      "🚀 Transform your business with our proven lead generation system that delivers real results..."
                    </div>
                    <div className="flex items-center text-xs text-green-600 bg-green-50 p-2 rounded-lg border border-green-200/50">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Optimized for maximum engagement • Ready to publish
                    </div>
                  </div>
                </div>

                {/* Enhanced CTA */}
                <div className="text-center pt-4 border-t border-gray-100">
                  <Button
                    onClick={handleStartFreeTrial}
                    className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white px-8 py-3 text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  >
                    {isAuthenticated ? 'Go to Dashboard' : 'Start Your Free Trial'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Enhanced Floating Elements */}
            <div className="absolute -top-8 -right-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-4 animate-bounce shadow-xl border-2 border-white">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl p-4 animate-pulse shadow-xl border-2 border-white">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div className="absolute top-1/2 -right-6 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full p-3 animate-spin shadow-lg border-2 border-white" style={{ animation: 'spin 6s linear infinite' }}>
              <Globe className="w-6 h-6 text-white" />
            </div>
            
            {/* Subtle Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 rounded-3xl blur-2xl opacity-75 -z-10 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
