import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageSquare, Zap, BarChart3, Bot, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type Feature = 'whatsapp' | 'portal' | 'ads' | 'crm';

export function EnterpriseHero() {
  const navigate = useNavigate();
  const [selectedFeature, setSelectedFeature] = useState<Feature>('whatsapp');
  const [rotatingText, setRotatingText] = useState(0);

  // Rotating value propositions
  const valuProps = ['Generate Leads', 'Close Deals', 'Automate Follow-ups', 'Scale Revenue'];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setRotatingText((prev) => (prev + 1) % valuProps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      id: 'whatsapp' as Feature,
      icon: MessageSquare,
      label: 'WhatsApp AI',
      color: 'from-green-500 to-emerald-500',
      preview: {
        title: 'WhatsApp AI Assistant',
        description: 'Respond to leads instantly with AI-powered conversations',
        screenshot: (
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm">👤</span>
              </div>
              <div className="bg-muted/80 p-3 rounded-lg rounded-tl-none flex-1">
                <p className="text-sm text-foreground">Interested in 3BHK villa</p>
                <p className="text-xs text-muted-foreground mt-1">2 min ago</p>
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <div className="gradient-primary p-3 rounded-lg rounded-tr-none max-w-[80%]">
                <p className="text-sm text-primary-foreground">I have 3 premium options. Budget?</p>
                <p className="text-xs text-primary-foreground/70 mt-1">AI • Just now</p>
              </div>
            </div>
            <div className="bg-green-500/10 p-3 rounded-lg text-xs text-green-600 dark:text-green-400">
              ✓ Lead qualified & assigned
            </div>
          </div>
        ),
        stats: [
          { label: 'Response time', value: '< 30 sec' },
          { label: 'Qualification rate', value: '94%' }
        ]
      }
    },
    {
      id: 'portal' as Feature,
      icon: Zap,
      label: 'Portal Sync',
      color: 'from-blue-500 to-cyan-500',
      preview: {
        title: 'Property Portal Integration',
        description: 'Auto-sync leads from Bayut, Property Finder, Dubizzle',
        screenshot: (
          <div className="space-y-3">
            {['Property Finder', 'Bayut', 'Dubizzle'].map((portal, i) => (
              <div key={i} className="flex items-center justify-between bg-muted/80 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${i === 0 ? 'from-blue-500 to-cyan-500' : i === 1 ? 'from-green-500 to-emerald-500' : 'from-orange-500 to-red-500'} flex items-center justify-center`}>
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{portal}</p>
                    <p className="text-xs text-muted-foreground">+{23 + i * 7} leads today</p>
                  </div>
                </div>
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </div>
            ))}
          </div>
        ),
        stats: [
          { label: 'Portals connected', value: '3/3' },
          { label: 'Sync time', value: 'Real-time' }
        ]
      }
    },
    {
      id: 'ads' as Feature,
      icon: BarChart3,
      label: 'Ad Builder',
      color: 'from-purple-500 to-pink-500',
      preview: {
        title: 'AI Ad Campaign Builder',
        description: 'Create & launch campaigns across all platforms in minutes',
        screenshot: (
          <div className="space-y-3">
            <div className="bg-muted/80 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                <span className="text-xs text-muted-foreground">AI Building Campaign...</span>
              </div>
              {['Target audience identified', 'Creative variants generated', 'Budget optimized', 'Ready to launch'].map((step, i) => (
                <div key={i} className="flex items-center gap-2 py-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-foreground">{step}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              {['Meta', 'Google', 'LinkedIn'].map((platform) => (
                <div key={platform} className="flex-1 bg-primary/10 p-2 rounded text-center text-xs font-medium text-primary">
                  {platform}
                </div>
              ))}
            </div>
          </div>
        ),
        stats: [
          { label: 'Build time', value: '2 min' },
          { label: 'Platforms', value: '5+' }
        ]
      }
    },
    {
      id: 'crm' as Feature,
      icon: Bot,
      label: 'CRM',
      color: 'from-orange-500 to-red-500',
      preview: {
        title: 'Intelligent CRM Pipeline',
        description: 'AI-powered lead scoring, routing & follow-up automation',
        screenshot: (
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              {[
                { stage: 'New', count: 34, color: 'bg-blue-500' },
                { stage: 'Qualified', count: 18, color: 'bg-yellow-500' },
                { stage: 'Closed', count: 12, color: 'bg-green-500' }
              ].map((stage) => (
                <div key={stage.stage} className="bg-muted/80 p-3 rounded-lg">
                  <div className={`w-8 h-8 ${stage.color} rounded-lg mb-2`} />
                  <p className="text-xs text-muted-foreground">{stage.stage}</p>
                  <p className="text-xl font-bold text-foreground">{stage.count}</p>
                </div>
              ))}
            </div>
            <div className="bg-muted/80 p-3 rounded-lg">
              <p className="text-xs text-muted-foreground mb-2">AI Actions Today</p>
              <div className="space-y-1">
                <div className="text-xs text-foreground">• 23 leads auto-qualified</div>
                <div className="text-xs text-foreground">• 15 follow-ups sent</div>
                <div className="text-xs text-foreground">• 8 reminders scheduled</div>
              </div>
            </div>
          </div>
        ),
        stats: [
          { label: 'Automation rate', value: '89%' },
          { label: 'Close rate', value: '+45%' }
        ]
      }
    }
  ];

  const currentFeature = features.find(f => f.id === selectedFeature) || features[0];

  return (
    <section className="relative min-h-screen bg-background overflow-hidden">
      {/* Subtle animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 pt-24 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[600px]">
          {/* Left: Content & Feature Pills */}
          <div className="space-y-8 z-10">
            {/* Rotating headline */}
            <div className="space-y-4">
              <h1 className="text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                <span className="gradient-text transition-all duration-500">
                  {valuProps[rotatingText]}
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl">
                The complete AI sales platform for real estate agencies
              </p>
            </div>

            {/* Feature Pills */}
            <div className="grid grid-cols-2 gap-3">
              {features.map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => setSelectedFeature(feature.id)}
                  onMouseEnter={() => setSelectedFeature(feature.id)}
                  className={`group relative p-5 rounded-2xl border-2 transition-all duration-300 text-left ${
                    selectedFeature === feature.id
                      ? 'border-primary bg-primary/5 shadow-lg scale-105'
                      : 'border-border bg-background/50 hover:border-primary/50 hover:bg-primary/5'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-3 transition-transform group-hover:scale-110`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-base font-semibold text-foreground">{feature.label}</p>
                  <div className={`absolute -bottom-1 left-4 right-4 h-1 rounded-full bg-gradient-to-r ${feature.color} transition-opacity ${
                    selectedFeature === feature.id ? 'opacity-100' : 'opacity-0'
                  }`} />
                </button>
              ))}
            </div>

            {/* CTA */}
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 gradient-primary hover:opacity-90 transition-all shadow-lg hover:shadow-xl w-full sm:w-auto group"
              onClick={() => navigate('/login')}
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            {/* Quick stats */}
            <div className="flex items-center gap-6 text-sm text-muted-foreground pt-4">
              <span>✓ No credit card required</span>
              <span>✓ Setup in 5 minutes</span>
            </div>
          </div>

          {/* Right: Interactive Preview */}
          <div className="relative z-10">
            <div className="relative bg-background border-2 border-border rounded-3xl shadow-2xl overflow-hidden transition-all duration-500">
              {/* Feature preview header */}
              <div className="border-b border-border p-6 bg-muted/30">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${currentFeature.color} flex items-center justify-center`}>
                    <currentFeature.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{currentFeature.preview.title}</h3>
                    <p className="text-sm text-muted-foreground">{currentFeature.preview.description}</p>
                  </div>
                </div>
              </div>

              {/* Screenshot/Demo area */}
              <div className="p-6 bg-background min-h-[400px] transition-all duration-500">
                <div className="animate-fade-in">
                  {currentFeature.preview.screenshot}
                </div>
              </div>

              {/* Stats footer */}
              <div className="border-t border-border p-4 bg-muted/30">
                <div className="grid grid-cols-2 gap-4">
                  {currentFeature.preview.stats.map((stat, i) => (
                    <div key={i} className="text-center">
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                      <p className="text-lg font-bold text-foreground mt-1">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Glow effect on active feature */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${currentFeature.color} rounded-3xl blur opacity-20 -z-10 transition-opacity duration-500`} />
            </div>

            {/* Integration badges */}
            <div className="flex flex-wrap gap-2 mt-6 justify-center">
              {['Property Finder', 'Bayut', 'Dubizzle', 'Facebook', 'WhatsApp'].map((platform) => (
                <div key={platform} className="px-3 py-1.5 bg-muted/50 rounded-full border border-border text-xs font-medium text-muted-foreground">
                  {platform}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust indicators at bottom */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-16 pt-8 border-t border-border">
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
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <span>500+ Agencies</span>
          </div>
        </div>
      </div>
    </section>
  );
}
