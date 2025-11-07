import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, TrendingUp, Users, DollarSign, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function EnterpriseHero() {
  const navigate = useNavigate();
  const [leadsCount, setLeadsCount] = useState(127450);
  const [revenueCount, setRevenueCount] = useState(8943000);
  const [conversionsCount, setConversionsCount] = useState(12847);

  // Animated counters for live metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setLeadsCount(prev => prev + Math.floor(Math.random() * 5 + 2));
      setRevenueCount(prev => prev + Math.floor(Math.random() * 1000 + 500));
      setConversionsCount(prev => prev + Math.floor(Math.random() * 3 + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative container mx-auto px-4 pt-32 pb-20">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Left: Minimal Content (40% - 2 cols) */}
          <div className="lg:col-span-2 space-y-6 z-10">
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Close More Deals.
              <span className="block gradient-text mt-2">
                On Autopilot.
              </span>
            </h1>

            <p className="text-lg text-muted-foreground">
              AI automates your entire sales pipeline—from lead capture to conversion.
            </p>

            {/* Single large CTA */}
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 gradient-primary hover:opacity-90 transition-all shadow-lg hover:shadow-xl w-full sm:w-auto"
              onClick={() => navigate('/login')}
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            {/* Trust indicators */}
            <div className="flex flex-col gap-3 pt-4">
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

          {/* Right: HUGE Dashboard Preview (60% - 3 cols) */}
          <div className="lg:col-span-3 relative z-10">
            {/* "Join 500+ agencies" badge in corner */}
            <div className="absolute -top-4 -right-4 z-20 bg-background/90 backdrop-blur-xl border-2 border-primary/30 rounded-full px-4 py-2 shadow-xl">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold gradient-text">500+ Agencies</span>
              </div>
            </div>

            {/* Glass-morphism dashboard with glowing borders */}
            <div className="relative bg-background/40 backdrop-blur-2xl rounded-3xl border-2 border-primary/20 shadow-2xl p-8 overflow-hidden">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 rounded-3xl" />
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-3xl blur opacity-20 animate-pulse" />
              
              <div className="relative space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-foreground">Live Command Center</h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span>Real-time data</span>
                  </div>
                </div>

                {/* Live animated metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { 
                      icon: Target, 
                      label: 'Total Leads', 
                      value: leadsCount.toLocaleString(), 
                      change: '+847 today',
                      gradient: 'from-blue-500 to-cyan-500'
                    },
                    { 
                      icon: DollarSign, 
                      label: 'Revenue', 
                      value: `$${(revenueCount / 1000).toFixed(0)}K`, 
                      change: '+$23K today',
                      gradient: 'from-green-500 to-emerald-500'
                    },
                    { 
                      icon: TrendingUp, 
                      label: 'Conversions', 
                      value: conversionsCount.toLocaleString(), 
                      change: '+156 today',
                      gradient: 'from-purple-500 to-pink-500'
                    }
                  ].map((metric, i) => (
                    <div key={i} className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl blur group-hover:blur-md transition-all" />
                      <div className="relative bg-background/60 backdrop-blur-xl p-5 rounded-xl border border-border/50 hover:border-primary/50 transition-all">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${metric.gradient} flex items-center justify-center mb-3`}>
                          <metric.icon className="w-5 h-5 text-white" />
                        </div>
                        <p className="text-xs text-muted-foreground">{metric.label}</p>
                        <p className="text-3xl font-bold text-foreground mt-1 tabular-nums">{metric.value}</p>
                        <p className="text-xs text-green-500 mt-1 font-medium">{metric.change}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Growth chart */}
                <div className="bg-background/40 backdrop-blur-xl rounded-xl border border-border/50 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-medium text-foreground">7-Day Growth Trajectory</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">This week</span>
                      <span className="text-xs font-semibold text-green-500">+67%</span>
                    </div>
                  </div>
                  <div className="h-40 flex items-end justify-between gap-2">
                    {[45, 52, 48, 68, 71, 85, 92].map((height, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2">
                        <div 
                          className="w-full gradient-primary rounded-t-lg transition-all duration-1000 hover:opacity-80 shadow-lg"
                          style={{ 
                            height: `${height}%`,
                            animationDelay: `${i * 100}ms`
                          }}
                        />
                        <span className="text-xs text-muted-foreground">
                          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick stats row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-background/40 backdrop-blur-xl rounded-xl border border-border/50 p-4">
                    <p className="text-xs text-muted-foreground">Response Rate</p>
                    <p className="text-2xl font-bold text-foreground mt-1">94.3%</p>
                    <p className="text-xs text-green-500 mt-1">+8.2% vs last week</p>
                  </div>
                  <div className="bg-background/40 backdrop-blur-xl rounded-xl border border-border/50 p-4">
                    <p className="text-xs text-muted-foreground">Avg. Close Time</p>
                    <p className="text-2xl font-bold text-foreground mt-1">4.2 days</p>
                    <p className="text-xs text-green-500 mt-1">-2.1 days faster</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Integration badges */}
            <div className="flex flex-wrap gap-3 mt-6 justify-center">
              {['Property Finder', 'Bayut', 'Dubizzle', 'Facebook', 'WhatsApp'].map((platform) => (
                <div key={platform} className="px-4 py-2 bg-background/80 backdrop-blur rounded-full border border-border/50 text-xs font-medium text-foreground">
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
