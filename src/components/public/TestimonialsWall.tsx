import React, { useState } from 'react';
import { Star, Play, TrendingUp, Users, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function TestimonialsWall() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  const testimonials = [
    {
      name: 'Sarah Al-Mansouri',
      role: 'CEO',
      company: 'Premium Properties Dubai',
      image: '👩‍💼',
      rating: 5,
      quote: "We went from manually handling 50 leads per month to automatically processing 600+. Our close rate improved from 12% to 31%.",
      results: {
        metric: 'Revenue',
        before: '$180K/mo',
        after: '$890K/mo',
        change: '+394%'
      },
      video: true
    },
    {
      name: 'Ahmed Hassan',
      role: 'Marketing Director',
      company: 'Gulf Real Estate Group',
      image: '👨‍💼',
      rating: 5,
      quote: "The AI Quick Launch saved us $45,000 in agency fees. We now create better campaigns in-house in minutes.",
      results: {
        metric: 'Cost Savings',
        before: '$8K/mo',
        after: '$1.2K/mo',
        change: '-85%'
      },
      video: false
    },
    {
      name: 'Priya Sharma',
      role: 'Founder',
      company: 'Mumbai Luxury Homes',
      image: '👩',
      rating: 5,
      quote: "WhatsApp automation alone recovered 200+ leads we would have lost. The ROI was positive within week one.",
      results: {
        metric: 'Response Rate',
        before: '23%',
        after: '94%',
        change: '+309%'
      },
      video: true
    }
  ];

  const industries = [
    'Real Estate Agencies',
    'Property Developers', 
    'E-commerce Brands',
    'B2B SaaS',
    'Financial Services',
    'Healthcare',
    'Education',
    'Automotive'
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Users className="w-4 h-4" />
            Trusted by 7,500+ Businesses
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Real Results from Real Customers
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't take our word for it. Here's what happens when you automate your sales pipeline.
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-background rounded-2xl border-2 border-border hover:border-primary/50 transition-all duration-300 overflow-hidden group">
              {/* Header */}
              <div className="p-6 border-b border-border">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{testimonial.image}</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-sm font-medium text-primary">{testimonial.company}</p>
                  </div>
                </div>
                <div className="flex gap-1 mt-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
              </div>

              {/* Quote */}
              <div className="p-6">
                <p className="text-foreground leading-relaxed mb-6">
                  "{testimonial.quote}"
                </p>

                {/* Results */}
                <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg p-4 border border-green-500/20">
                  <p className="text-xs font-medium text-muted-foreground mb-2">{testimonial.results.metric}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Before</p>
                      <p className="text-xl font-bold text-foreground">{testimonial.results.before}</p>
                    </div>
                    <TrendingUp className="w-6 h-6 text-green-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">After</p>
                      <p className="text-xl font-bold text-green-500">{testimonial.results.after}</p>
                    </div>
                  </div>
                  <div className="mt-2 text-center">
                    <span className="text-lg font-bold text-green-500">{testimonial.results.change}</span>
                  </div>
                </div>
              </div>

              {/* Video badge */}
              {testimonial.video && (
                <div className="px-6 pb-6">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => setActiveVideo(index)}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Watch Video Testimonial
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl border-2 border-primary/20 p-8 mb-16">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Users, label: 'Active Users', value: '7,500+' },
              { icon: TrendingUp, label: 'Leads Generated', value: '350,000+' },
              { icon: DollarSign, label: 'Revenue Generated', value: '$127M+' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Industry logos */}
        <div className="text-center">
          <p className="text-sm font-medium text-muted-foreground mb-6">
            Powering Growth Across Industries
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {industries.map((industry, index) => (
              <div key={index} className="px-6 py-3 bg-muted/50 rounded-full border border-border text-sm font-medium text-foreground">
                {industry}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
