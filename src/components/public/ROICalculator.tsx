import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { TrendingUp, DollarSign, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function ROICalculator() {
  const navigate = useNavigate();
  const [adSpend, setAdSpend] = useState(5000);
  const [closeRate, setCloseRate] = useState(15);
  const [dealValue, setDealValue] = useState(10000);
  const [results, setResults] = useState({
    currentRevenue: 0,
    withPlatform: 0,
    increase: 0,
    monthlyGain: 0
  });

  useEffect(() => {
    // Current scenario
    const leadsPerMonth = (adSpend / 50); // Assume $50 per lead
    const currentClosedDeals = leadsPerMonth * (closeRate / 100);
    const currentRevenue = currentClosedDeals * dealValue;

    // With platform (conservative estimates)
    const improvedLeads = leadsPerMonth * 1.4; // 40% more leads from better targeting
    const improvedCloseRate = Math.min(closeRate * 1.6, 100); // 60% better close rate
    const improvedClosedDeals = improvedLeads * (improvedCloseRate / 100);
    const withPlatform = improvedClosedDeals * dealValue;

    const increase = ((withPlatform - currentRevenue) / currentRevenue) * 100;
    const monthlyGain = withPlatform - currentRevenue;

    setResults({
      currentRevenue,
      withPlatform,
      increase,
      monthlyGain
    });
  }, [adSpend, closeRate, dealValue]);

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Calculate Your ROI
            </h2>
            <p className="text-xl text-muted-foreground">
              See how much revenue you're leaving on the table
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input panel */}
            <div className="bg-background rounded-2xl border-2 border-border p-8 space-y-8">
              <h3 className="text-2xl font-bold text-foreground">Your Current Numbers</h3>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label htmlFor="adSpend" className="text-base font-medium">
                      Monthly Ad Spend
                    </Label>
                    <span className="text-2xl font-bold text-primary">
                      ${adSpend.toLocaleString()}
                    </span>
                  </div>
                  <Slider
                    id="adSpend"
                    min={1000}
                    max={50000}
                    step={1000}
                    value={[adSpend]}
                    onValueChange={(value) => setAdSpend(value[0])}
                    className="w-full"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label htmlFor="closeRate" className="text-base font-medium">
                      Current Close Rate
                    </Label>
                    <span className="text-2xl font-bold text-primary">
                      {closeRate}%
                    </span>
                  </div>
                  <Slider
                    id="closeRate"
                    min={5}
                    max={50}
                    step={1}
                    value={[closeRate]}
                    onValueChange={(value) => setCloseRate(value[0])}
                    className="w-full"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label htmlFor="dealValue" className="text-base font-medium">
                      Average Deal Value
                    </Label>
                    <span className="text-2xl font-bold text-primary">
                      ${dealValue.toLocaleString()}
                    </span>
                  </div>
                  <Slider
                    id="dealValue"
                    min={1000}
                    max={100000}
                    step={1000}
                    value={[dealValue]}
                    onValueChange={(value) => setDealValue(value[0])}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  * Results based on average improvements from 500+ customers
                </p>
              </div>
            </div>

            {/* Results panel */}
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl border-2 border-primary/20 p-8">
              <h3 className="text-2xl font-bold text-foreground mb-8">
                With Our Platform
              </h3>

              <div className="space-y-6">
                {/* Current vs New */}
                <div className="bg-background/80 backdrop-blur rounded-xl p-6">
                  <p className="text-sm text-muted-foreground mb-2">Current Monthly Revenue</p>
                  <p className="text-3xl font-bold text-foreground">
                    ${results.currentRevenue.toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div className="gradient-primary rounded-xl p-6 text-white">
                  <p className="text-sm opacity-90 mb-2">Projected Monthly Revenue</p>
                  <p className="text-4xl font-bold">
                    ${results.withPlatform.toLocaleString()}
                  </p>
                </div>

                {/* Increase highlight */}
                <div className="bg-green-500/10 border-2 border-green-500/20 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-foreground">Revenue Increase</p>
                    <span className="text-3xl font-bold text-green-500">
                      +{results.increase.toFixed(0)}%
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-green-500">
                    <DollarSign className="w-5 h-5" />
                    <span className="text-xl font-bold">
                      +${results.monthlyGain.toLocaleString()}/month
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <Button 
                  size="lg" 
                  className="w-full text-lg py-6 gradient-primary hover:opacity-90"
                  onClick={() => navigate('/auth')}
                >
                  Start Increasing Revenue Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>

              <div className="mt-6 p-4 bg-background/50 rounded-lg">
                <p className="text-xs text-muted-foreground text-center">
                  These projections are based on conservative averages. Many customers see 5-10x improvements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
