import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Play, CheckCircle2, TrendingUp, Zap, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function EnterpriseHero() {
  const navigate = useNavigate();
  const [liveCounter, setLiveCounter] = useState(2847);
  const [activeDemo, setActiveDemo] = useState<'dashboard' | 'ai' | 'whatsapp'>('ai');

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCounter(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const demoInterval = setInterval(() => {
      setActiveDemo(prev => {
        if (prev === 'ai') return 'dashboard';
        if (prev === 'dashboard') return 'whatsapp';
        return 'ai';
      });
    }, 4000);
    return () => clearInterval(demoInterval);
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative container mx-auto px-4 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="space-y-8 z-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <Shield className="w-4 h-4" />
              <span>Trusted by 500+ Agencies Across UAE, Qatar & India</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-foreground leading-tight">
              Close More Deals.
              <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mt-2">
                On Autopilot.
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-xl">
              AI-powered lead generation & conversion platform. Turn every WhatsApp message, ad click, and portal inquiry into revenue.
            </p>

            {/* Live metrics bar */}
            <div className="flex items-center gap-6 py-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-foreground">{liveCounter.toLocaleString()} leads captured this week</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all shadow-lg hover:shadow-xl"
                onClick={() => navigate('/auth')}
              >
                Start Free Trial - No Credit Card
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-6 border-2"
              >
                <Play className="mr-2 w-5 h-5" />
                Watch 2-Min Demo
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>SOC 2 Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>GDPR Ready</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>99.9% Uptime</span>
              </div>
            </div>
          </div>

          {/* Right: Interactive Demo */}
          <div className="relative z-10">
            <div className="relative bg-background/80 backdrop-blur-xl rounded-2xl border-2 border-primary/20 shadow-2xl p-6 transition-all duration-500">
              {/* Demo tabs */}
              <div className="flex gap-2 mb-4">
                {[
                  { id: 'ai' as const, label: 'AI Launch', icon: Zap },
                  { id: 'dashboard' as const, label: 'Live Data', icon: TrendingUp },
                  { id: 'whatsapp' as const, label: 'WhatsApp', icon: CheckCircle2 }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveDemo(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeDemo === tab.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Demo content */}
              <div className="bg-muted/30 rounded-lg p-6 min-h-[400px] relative overflow-hidden">
                {activeDemo === 'ai' && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      AI Building Campaign...
                    </div>
                    <div className="space-y-3">
                      {[
                        'Analyzing target audience: Real estate buyers 25-45',
                        'Generating ad creative: 3 variations',
                        'Setting budget: $500/day optimized',
                        'Deploying to Facebook, Instagram, Google'
                      ].map((step, i) => (
                        <div key={i} className="flex items-start gap-3 animate-fade-in" style={{ animationDelay: `${i * 300}ms` }}>
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                          <span className="text-sm text-foreground">{step}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                      <p className="text-sm font-medium text-primary">Campaign ready in 2 minutes</p>
                      <p className="text-xs text-muted-foreground mt-1">Usually takes 3+ hours manually</p>
                    </div>
                  </div>
                )}

                {activeDemo === 'dashboard' && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: 'Active Leads', value: '847', change: '+23%' },
                        { label: 'Response Rate', value: '94%', change: '+12%' },
                        { label: 'Avg. Reply Time', value: '2.3m', change: '-45%' },
                        { label: 'Conversions', value: '156', change: '+67%' }
                      ].map((metric, i) => (
                        <div key={i} className="bg-background/50 p-4 rounded-lg border border-border">
                          <p className="text-xs text-muted-foreground">{metric.label}</p>
                          <p className="text-2xl font-bold text-foreground mt-1">{metric.value}</p>
                          <p className="text-xs text-green-500 mt-1">{metric.change} vs last week</p>
                        </div>
                      ))}
                    </div>
                    <div className="h-32 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg flex items-end justify-around p-4">
                      {[40, 65, 55, 80, 70, 90, 85].map((height, i) => (
                        <div key={i} className="bg-primary/60 w-8 rounded-t" style={{ height: `${height}%` }} />
                      ))}
                    </div>
                  </div>
                )}

                {activeDemo === 'whatsapp' && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-medium text-primary">👤</span>
                        </div>
                        <div className="bg-muted p-3 rounded-lg rounded-tl-none flex-1">
                          <p className="text-sm text-foreground">Hi, interested in 3BHK villa in Dubai Marina</p>
                          <p className="text-xs text-muted-foreground mt-1">2 min ago</p>
                        </div>
                      </div>
                      <div className="flex gap-3 justify-end">
                        <div className="bg-primary p-3 rounded-lg rounded-tr-none max-w-[80%]">
                          <p className="text-sm text-primary-foreground">Great! I have 3 premium options. Budget range?</p>
                          <p className="text-xs text-primary-foreground/70 mt-1">AI Response • Just now</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground p-3 bg-green-500/10 rounded-lg">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Lead auto-qualified & assigned to top agent
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Integration badges */}
            <div className="flex flex-wrap gap-3 mt-6 justify-center">
              {['Property Finder', 'Bayut', 'Dubizzle', 'Facebook', 'WhatsApp'].map((platform) => (
                <div key={platform} className="px-4 py-2 bg-background/80 backdrop-blur rounded-full border border-border text-sm font-medium text-foreground">
                  {platform}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
