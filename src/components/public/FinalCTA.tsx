import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function FinalCTA() {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-gradient-to-br from-primary via-accent to-primary relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
            Ready to 10x Your Lead Flow?
          </h2>
          
          <p className="text-xl lg:text-2xl text-white/90">
            Join 7,500+ businesses generating 350,000+ leads per month
          </p>

          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-6 py-6">
            {[
              'Setup in 5 minutes',
              'No credit card required',
              'Cancel anytime',
              '24/7 support'
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-white">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-medium">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              size="lg"
              className="text-lg px-10 py-7 bg-white text-primary hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all"
              onClick={() => navigate('/auth')}
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="text-lg px-10 py-7 border-2 border-white text-white hover:bg-white/10"
            >
              <MessageSquare className="mr-2 w-5 h-5" />
              Chat with Our Team
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="pt-8 border-t border-white/20">
            <div className="flex flex-wrap justify-center gap-8 text-white/80">
              <div className="text-center">
                <p className="text-3xl font-bold text-white">4.9/5</p>
                <p className="text-sm">Average Rating</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">99.9%</p>
                <p className="text-sm">Uptime SLA</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">&lt;2min</p>
                <p className="text-sm">Avg Support Response</p>
              </div>
            </div>
          </div>

          {/* Final trust line */}
          <p className="text-white/80 text-sm">
            No long-term contracts. Scale up or down anytime. Your data is always yours.
          </p>
        </div>
      </div>
    </section>
  );
}
