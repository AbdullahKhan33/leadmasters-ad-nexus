import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Zap, MessageSquare, Link2, TrendingUp, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function SolutionShowcase() {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: Zap,
      title: 'AI Quick Launch',
      subtitle: 'Facebook + Instagram + Google Ads in 120 Seconds',
      metric: '4.2x faster campaign creation',
      gradient: 'gradient-primary',
      details: [
        'AI analyzes your business & generates campaigns',
        'Automatic audience targeting & budget optimization',
        'Multi-platform deployment with one click',
        'A/B testing built-in from day one'
      ],
      demo: '/images/quick-launch-demo.png'
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp Lead Engine',
      subtitle: 'Turn Every Chat Into a Sale (Automatically)',
      metric: '94% response rate, 2.3min avg reply time',
      gradient: 'from-green-500 to-emerald-600',
      details: [
        'AI responds instantly 24/7 in your brand voice',
        'Auto-qualify leads & route to right agent',
        'Smart follow-ups prevent leads going cold',
        'Full conversation history in CRM'
      ],
      demo: '/images/whatsapp-demo.png'
    },
    {
      icon: Link2,
      title: 'Portal Integration',
      subtitle: 'Property Finder → Your CRM in 0.3 Seconds',
      gradient: 'from-secondary to-primary',
      metric: 'Zero manual data entry',
      details: [
        'Real-time sync from Property Finder, Bayut, Dubizzle',
        'Automatic lead enrichment with contact data',
        'Duplicate detection & merging',
        'Instant notifications to sales team'
      ],
      demo: '/images/portal-demo.png'
    },
    {
      icon: TrendingUp,
      title: 'AI Sales Pipeline',
      subtitle: 'Predict, Prioritize, Close More Deals',
      metric: '3.8x higher conversion rate',
      gradient: 'from-primary to-accent',
      details: [
        'AI scores every lead based on close probability',
        'Automatic task creation & reminders',
        'Deal forecasting with 89% accuracy',
        'Real-time analytics dashboard'
      ],
      demo: '/images/pipeline-demo.png'
    }
  ];

  const currentFeature = features[activeFeature];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            The Complete AI Sales Stack
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to generate, nurture, and close leads. No integrations needed.
          </p>
        </div>

        {/* Feature navigation */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {features.map((feature, index) => (
            <button
              key={index}
              onClick={() => setActiveFeature(index)}
              className={`text-left p-6 rounded-xl border-2 transition-all duration-300 ${
                activeFeature === index
                  ? 'border-primary bg-primary/5 shadow-lg'
                  : 'border-border hover:border-primary/30 bg-background'
              }`}
            >
              <div className={`w-12 h-12 rounded-lg ${feature.gradient === 'gradient-primary' ? 'gradient-primary' : `bg-gradient-to-br ${feature.gradient}`} flex items-center justify-center mb-4`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-foreground mb-1">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.subtitle}</p>
            </button>
          ))}
        </div>

        {/* Active feature showcase */}
        <div className="bg-gradient-to-br from-muted/50 to-background rounded-2xl border-2 border-border p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${currentFeature.gradient === 'gradient-primary' ? 'gradient-primary' : `bg-gradient-to-r ${currentFeature.gradient}`} text-white text-sm font-medium`}>
                <currentFeature.icon className="w-4 h-4" />
                {currentFeature.metric}
              </div>

              <div>
                <h3 className="text-3xl font-bold text-foreground mb-2">
                  {currentFeature.title}
                </h3>
                <p className="text-lg text-muted-foreground">
                  {currentFeature.subtitle}
                </p>
              </div>

              <ul className="space-y-3">
                {currentFeature.details.map((detail, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${currentFeature.gradient} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <ArrowRight className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-foreground">{detail}</span>
                  </li>
                ))}
              </ul>

              <Button 
                size="lg"
                className="gradient-primary hover:opacity-90"
                onClick={() => navigate('/auth')}
              >
                Try This Feature Free
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>

            {/* Demo visual */}
            <div className="relative">
              <div className={`aspect-square ${currentFeature.gradient === 'gradient-primary' ? 'gradient-primary' : `bg-gradient-to-br ${currentFeature.gradient}`} rounded-xl border-2 border-primary/20 flex items-center justify-center overflow-hidden shadow-2xl`}>
                <currentFeature.icon className="w-32 h-32 text-white opacity-40" />
              </div>
              {/* Floating metric cards */}
              <div className="absolute -top-4 -right-4 bg-background border-2 border-border rounded-lg p-4 shadow-xl">
                <p className="text-sm text-muted-foreground">Performance</p>
                <p className="text-2xl font-bold text-green-500">+340%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom stats bar */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[
            { label: 'Average Setup Time', value: '< 5 minutes' },
            { label: 'Leads Generated Monthly', value: '12,500+' },
            { label: 'Customer ROI', value: '780%' }
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 bg-muted/30 rounded-xl border border-border">
              <p className="text-3xl font-bold text-foreground mb-2">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
