import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight, PlayCircle, TrendingUp, Users, Zap, Globe, Sparkles, CheckCircle, Brain, Rocket, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

export function EnterpriseHero() {
  const navigate = useNavigate();
  const [whatsappLeads, setWhatsappLeads] = useState(47);
  const [roas, setRoas] = useState(2.3);
  const [growth, setGrowth] = useState(127);
  const [businessCount, setBusinessCount] = useState(100);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Animated counters
  useEffect(() => {
    const interval = setInterval(() => {
      setWhatsappLeads(prev => Math.min(prev + 1, 52));
      setRoas(prev => Math.min(prev + 0.1, 2.8));
      setGrowth(prev => Math.min(prev + 2, 135));
      setBusinessCount(prev => Math.min(prev + 1, 120));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Track carousel slide changes
  useEffect(() => {
    if (!carouselApi) return;

    carouselApi.on('select', () => {
      setCurrentSlide(carouselApi.selectedScrollSnap());
    });
  }, [carouselApi]);

  // Carousel stages data
  const carouselStages = [
    {
      icon: Brain,
      iconBg: 'bg-blue-500',
      title: 'AI analyzes your business',
      description: 'Understanding your market and audience...',
      progress: 25,
      progressColor: 'bg-gradient-to-r from-blue-500 to-blue-600'
    },
    {
      icon: Sparkles,
      iconBg: 'bg-purple-500',
      title: 'Creates targeted content',
      description: 'Generating high-converting ads and posts...',
      progress: 50,
      progressColor: 'bg-gradient-to-r from-purple-500 to-pink-500'
    },
    {
      icon: Rocket,
      iconBg: 'bg-green-500',
      title: 'Launches campaigns',
      description: 'Deploying across all platforms...',
      progress: 75,
      progressColor: 'bg-gradient-to-r from-green-500 to-emerald-500'
    },
    {
      icon: Target,
      iconBg: 'bg-blue-500',
      title: 'AI analyzes your business',
      description: 'Understanding your market and audience...',
      progress: 100,
      progressColor: 'bg-gradient-to-r from-blue-500 to-indigo-600'
    }
  ];

  return (
    <section className="relative min-h-screen bg-background overflow-hidden">
      {/* Subtle animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-accent/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
      </div>

      <div className="relative container mx-auto px-4 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 animate-fade-in">
            {/* Badge */}
            <Badge className="gradient-primary text-white border-0 px-4 py-2 text-sm font-medium">
              #1 AI Lead Generation Platform
            </Badge>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight">
                Stop Struggling With
                <span className="block gradient-text mt-2">
                  Lead Generation
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-muted-foreground">
                AI creates your ads, writes your posts, and brings you qualified leads —{' '}
                <span className="text-primary font-semibold">while you focus on closing deals.</span>
              </p>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <Avatar key={i} className="border-2 border-background w-10 h-10">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-xs">
                      {['JS', 'AM', 'KP', 'RD'][i - 1]}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <p className="text-sm text-muted-foreground font-medium">
                Join {businessCount}+ growing businesses
              </p>
            </div>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="gradient-primary text-white hover:opacity-90 transition-all shadow-lg hover:shadow-primary/20 hover:scale-105 group text-lg px-8"
                onClick={() => navigate('/login')}
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all text-lg px-8 group"
              >
                See How It Works
                <PlayCircle className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
              </Button>
            </div>

            {/* Bottom Stats Strip */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-8 border-t border-border">
              {[
                { value: `${businessCount}+`, label: 'Businesses Growing' },
                { value: '400%', label: 'Avg Lead Increase' },
                { value: '2 Min', label: 'Setup Time' },
                { value: '24/7', label: 'AI Support' }
              ].map((stat, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Interactive Dashboard Preview */}
          <div className="relative animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="relative bg-card rounded-2xl shadow-2xl border border-border p-6 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">AI Lead Generator</h3>
                </div>
                <Badge className="bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/20">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                  Live
                </Badge>
              </div>

              {/* Metric Cards */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-green-500/10 rounded-xl p-4 space-y-1 border border-green-500/20">
                  <p className="text-xs text-green-600 font-medium">WhatsApp</p>
                  <p className="text-2xl font-bold text-green-700">{whatsappLeads}</p>
                  <p className="text-xs text-green-600/80">leads today</p>
                </div>
                
                <div className="bg-blue-500/10 rounded-xl p-4 space-y-1 border border-blue-500/20">
                  <p className="text-xs text-blue-600 font-medium">Facebook Ads</p>
                  <p className="text-2xl font-bold text-blue-700">{roas.toFixed(1)}x</p>
                  <p className="text-xs text-blue-600/80">ROAS</p>
                </div>
                
                <div className="bg-primary/10 rounded-xl p-4 space-y-1 border border-primary/20">
                  <p className="text-xs text-primary font-medium">Analytics</p>
                  <p className="text-2xl font-bold text-primary">+{growth}%</p>
                  <p className="text-xs text-primary/80">growth</p>
                </div>
              </div>

              {/* AI Analysis Carousel Section */}
              <Carousel
                setApi={setCarouselApi}
                opts={{
                  align: "start",
                  loop: true,
                }}
                plugins={[
                  Autoplay({
                    delay: 3000,
                  }),
                ]}
                className="w-full"
              >
                <CarouselContent>
                  {carouselStages.map((stage, index) => {
                    const Icon = stage.icon;
                    return (
                      <CarouselItem key={index}>
                        <div className="bg-muted/50 rounded-xl p-5 space-y-3 border border-border">
                          <div className="flex items-center gap-3">
                            <div className={`${stage.iconBg} rounded-xl p-3 shadow-lg`}>
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-foreground">{stage.title}</p>
                              <p className="text-xs text-muted-foreground">{stage.description}</p>
                            </div>
                          </div>
                          
                          <div className="w-full bg-background rounded-full h-2 overflow-hidden">
                            <div 
                              className={`h-full ${stage.progressColor} transition-all duration-1000 ease-out`}
                              style={{ width: `${stage.progress}%` }}
                            />
                          </div>
                          
                          <div className="flex gap-2 pt-1 justify-center">
                            {[0, 1, 2, 3].map((dot) => (
                              <div 
                                key={dot} 
                                className={`w-2 h-2 rounded-full transition-all ${
                                  dot === currentSlide 
                                    ? 'bg-primary scale-125' 
                                    : 'bg-muted-foreground/30'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
              </Carousel>

              {/* Generated Post Preview */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <p className="text-sm font-semibold text-foreground">AI Generated Post</p>
                </div>
                
                <div className="bg-primary/5 rounded-xl p-4 border border-primary/10 space-y-3">
                  <p className="text-sm text-foreground leading-relaxed">
                    🏠 Looking for your dream property in Dubai? Our AI-powered platform connects you with the perfect listings in seconds. No more endless scrolling!
                  </p>
                  
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                    <span>Optimized for maximum engagement • Ready to publish</span>
                  </div>
                </div>
              </div>

              {/* Bottom CTA */}
              <Button 
                className="w-full gradient-primary text-white hover:opacity-90 transition-all"
                size="lg"
                onClick={() => navigate('/login')}
              >
                Start Your Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              {/* Floating Icons with Enhanced Animations */}
              <div className="absolute -left-4 -bottom-4 w-12 h-12 bg-background rounded-xl shadow-lg border border-border flex items-center justify-center animate-bounce" style={{ animationDuration: '3s' }}>
                <Globe className="w-6 h-6 text-primary" />
              </div>
              
              <div className="absolute -right-4 -top-4 w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl shadow-lg flex items-center justify-center animate-pulse" style={{ animationDuration: '2s' }}>
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              
              <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg flex items-center justify-center animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}>
                <Zap className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Integration Badges Below Dashboard */}
            <div className="mt-6 text-center space-y-3">
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                Integrates With
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {['Property Finder', 'Bayut', 'Dubizzle', 'Facebook', 'Instagram', 'WhatsApp'].map((platform) => (
                  <div 
                    key={platform} 
                    className="px-3 py-1.5 bg-muted rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
                  >
                    {platform}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
