
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, Zap, Crown, Building2, ChevronDown } from "lucide-react";

interface PricingScreenProps {
  onClose: () => void;
}

type BillingCycle = 'monthly' | 'quarterly' | 'yearly';
type PlanType = 'free' | 'basic' | 'pro' | 'enterprise';

export function PricingScreen({ onClose }: PricingScreenProps) {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [expandedPlan, setExpandedPlan] = useState<PlanType | null>(null);

  const plans = {
    free: {
      name: 'Free',
      icon: Sparkles,
      prices: { monthly: 0, quarterly: 0, yearly: 0 },
      features: [
        '5 AI-generated posts per month',
        '1 social platform connection',
        'Basic templates',
        'Community support'
      ]
    },
    basic: {
      name: 'Basic',
      icon: Zap,
      prices: { monthly: 29, quarterly: 27.55, yearly: 26.1 },
      features: [
        '50 AI-generated posts per month',
        '3 social platform connections',
        'Advanced templates',
        'Email support',
        'Basic analytics'
      ]
    },
    pro: {
      name: 'Pro',
      icon: Crown,
      prices: { monthly: 79, quarterly: 75.05, yearly: 71.1 },
      features: [
        'Unlimited AI-generated posts',
        '10 social platform connections',
        'Premium templates & customization',
        'Priority support',
        'Advanced analytics & insights',
        'Team collaboration (5 members)',
        'White-label options'
      ],
      popular: true
    },
    enterprise: {
      name: 'Enterprise',
      icon: Building2,
      prices: { monthly: 199, quarterly: 189.05, yearly: 179.1 },
      features: [
        'Everything in Pro',
        'Unlimited platform connections',
        'Custom AI model training',
        'Dedicated account manager',
        'Advanced API access',
        'Unlimited team members',
        'Custom integrations',
        'SLA guarantee'
      ]
    }
  };

  const getDiscount = (cycle: BillingCycle) => {
    switch (cycle) {
      case 'quarterly': return '5% off';
      case 'yearly': return '10% off';
      default: return '';
    }
  };

  const getCurrentPrice = (planKey: PlanType) => {
    return plans[planKey].prices[billingCycle];
  };

  const togglePlanExpansion = (planKey: PlanType) => {
    setExpandedPlan(expandedPlan === planKey ? null : planKey);
  };

  const PurchaseButtons = ({ planKey }: { planKey: PlanType }) => {
    const isExpanded = expandedPlan === planKey;
    const price = getCurrentPrice(planKey);
    
    if (planKey === 'free') {
      return (
        <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium">
          Get Started Free
        </Button>
      );
    }

    return (
      <div className="space-y-3">
        <Button 
          onClick={() => togglePlanExpansion(planKey)}
          className={`w-full transition-all duration-200 flex items-center justify-between font-medium ${
            planKey === 'pro'
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
              : 'bg-gray-900 hover:bg-gray-800 text-white'
          }`}
        >
          <span className="text-white font-medium">Choose This Plan</span>
          <ChevronDown className={`w-4 h-4 text-white transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
        </Button>
        
        {isExpanded && (
          <div className="space-y-2 p-3 bg-gray-50 rounded-lg border animate-in slide-in-from-top-2 duration-200">
            <Button 
              size="sm"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
            >
              <span className="text-white">International Card - ${price}</span>
            </Button>
            <Button 
              size="sm"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium"
            >
              <span className="text-white">Indian Customers - ${price}</span>
            </Button>
            <div className="text-xs text-gray-600 text-center mt-2 font-medium">
              ✓ 30-day money-back guarantee • ✓ Cancel anytime
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <div className="relative p-6">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors text-2xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Billing Cycle Selector */}
        <div className="px-8 py-6 border-b border-gray-100">
          <div className="flex justify-center">
            <div className="bg-gray-100 rounded-full p-1 flex">
              {(['monthly', 'quarterly', 'yearly'] as BillingCycle[]).map((cycle) => (
                <button
                  key={cycle}
                  onClick={() => setBillingCycle(cycle)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-200 flex items-center space-x-2 ${
                    billingCycle === cycle
                      ? 'bg-white text-purple-600 shadow-md'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <span className="capitalize">{cycle}</span>
                  {cycle !== 'monthly' && (
                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                      {getDiscount(cycle)}
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="p-8 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(plans).map(([planKey, plan]) => {
              const IconComponent = plan.icon;
              const isPro = planKey === 'pro';
              
              return (
                <Card 
                  key={planKey}
                  className={`relative transition-all duration-300 hover:shadow-xl flex flex-col h-full ${
                    isPro ? 'border-purple-200 shadow-lg ring-2 ring-purple-100' : 'border-gray-200 hover:border-purple-200'
                  }`}
                >
                  {isPro && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  {planKey === 'enterprise' && (
                    <div className="absolute -top-3 right-4">
                      <Badge variant="outline" className="bg-white border-orange-200 text-orange-700">
                        Best for Teams
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-3">
                      <div className={`p-3 rounded-full ${
                        isPro ? 'bg-gradient-to-r from-purple-100 to-pink-100' : 'bg-gray-100'
                      }`}>
                        <IconComponent className={`w-6 h-6 ${
                          isPro ? 'text-purple-600' : 'text-gray-600'
                        }`} />
                      </div>
                    </div>
                    <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                    <div className="mt-2">
                      <span className="text-4xl font-bold text-gray-900">
                        ${getCurrentPrice(planKey as PlanType)}
                      </span>
                      <span className="text-gray-500 ml-1">
                        /{billingCycle === 'monthly' ? 'month' : billingCycle === 'quarterly' ? 'quarter' : 'year'}
                      </span>
                      {billingCycle !== 'monthly' && planKey !== 'free' && (
                        <div className="text-sm text-green-600 font-medium mt-1">
                          Save ${(plans[planKey as PlanType].prices.monthly - getCurrentPrice(planKey as PlanType)).toFixed(2)}/month
                        </div>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0 flex-1 flex flex-col">
                    <ul className="space-y-3 mb-6 flex-1">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto">
                      <PurchaseButtons planKey={planKey as PlanType} />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
