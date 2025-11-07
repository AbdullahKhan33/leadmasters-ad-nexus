import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, Users, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function EnterpriseHero() {
  const navigate = useNavigate();
  const [leadsCount, setLeadsCount] = useState(350000);
  const [agenciesCount, setAgenciesCount] = useState(500);
  const [responseRate, setResponseRate] = useState(94);

  // Animated counters for stats
  useEffect(() => {
    const interval = setInterval(() => {
      setLeadsCount(prev => prev + Math.floor(Math.random() * 5));
      setAgenciesCount(prev => Math.min(prev + 1, 520));
      setResponseRate(prev => Math.min(prev + 0.1, 94.5));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen bg-background overflow-hidden flex items-center justify-center">
      {/* Subtle animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-accent/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
      </div>

      <div className="relative container mx-auto px-4 py-32">
        {/* Center-aligned vertical layout */}
        <div className="max-w-5xl mx-auto text-center space-y-12">
          {/* Huge bold headline */}
          <div className="space-y-6">
            <h1 className="text-7xl lg:text-8xl xl:text-9xl font-bold text-foreground tracking-tight">
              The AI Sales
              <span className="block gradient-text mt-2">
                Platform
              </span>
            </h1>
            
            {/* Subheadline with key stats */}
            <p className="text-xl lg:text-2xl text-muted-foreground font-medium">
              {agenciesCount.toFixed(0)}+ agencies. {(leadsCount / 1000).toFixed(0)}K+ leads. One platform.
            </p>
          </div>

          {/* Single massive CTA */}
          <div className="flex flex-col items-center gap-4">
            <Button 
              size="lg" 
              className="text-xl px-12 py-8 gradient-primary hover:opacity-90 transition-all shadow-2xl hover:shadow-primary/20 hover:scale-105 group"
              onClick={() => navigate('/login')}
            >
              Start Free Trial
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Button>
            
            {/* Tiny text below CTA */}
            <p className="text-sm text-muted-foreground">
              No credit card required • Setup in 5 minutes
            </p>
          </div>

          {/* 3 key stats in horizontal strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto pt-16">
            {[
              {
                icon: TrendingUp,
                value: `${responseRate.toFixed(1)}%`,
                label: 'Response Rate',
                gradient: 'from-green-500 to-emerald-500'
              },
              {
                icon: Users,
                value: `${agenciesCount.toFixed(0)}+`,
                label: 'Active Agencies',
                gradient: 'from-blue-500 to-cyan-500'
              },
              {
                icon: Zap,
                value: '< 30s',
                label: 'Avg. Reply Time',
                gradient: 'from-purple-500 to-pink-500'
              }
            ].map((stat, i) => (
              <div key={i} className="space-y-3 animate-fade-in" style={{ animationDelay: `${i * 200}ms` }}>
                <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="space-y-1">
                  <p className="text-4xl font-bold text-foreground tabular-nums">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Integration logos at bottom */}
          <div className="pt-16 space-y-4">
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
              Integrates With
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {['Property Finder', 'Bayut', 'Dubizzle', 'Facebook', 'Instagram', 'WhatsApp', 'Google Ads'].map((platform) => (
                <div 
                  key={platform} 
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
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
