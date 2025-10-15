import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PublicHeader } from './PublicHeader';
import { PublicFooter } from './PublicFooter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { businessDiscoverySchema, BusinessDiscoveryFormData } from '@/schemas/businessDiscovery';
import { FileText, ArrowRight, ArrowLeft, CheckCircle, Calendar, Sparkles } from 'lucide-react';

const STEPS = [
  { id: 1, title: 'Business Info', fields: ['full_name', 'phone', 'email', 'company_name', 'website_url', 'industry', 'other_industry', 'location'] },
  { id: 2, title: 'Digital Presence', fields: ['has_website', 'social_platforms', 'posting_frequency'] },
  { id: 3, title: 'Product & Customers', fields: ['main_product_service', 'ideal_customer', 'avg_revenue_per_customer', 'primary_goals'] },
  { id: 4, title: 'Marketing Strategy', fields: ['current_reach_methods', 'monthly_ad_spend', 'advertising_platforms', 'has_crm', 'crm_system_name', 'conversion_rate'] },
  { id: 5, title: 'Future Plans', fields: ['is_gst_registered', 'issues_invoices', 'has_seasonal_peaks', 'top_priorities', 'desired_results', 'current_challenges'] },
];

const INDUSTRIES = [
  'Technology', 'E-commerce', 'Healthcare', 'Education', 'Real Estate',
  'Finance', 'Retail', 'Manufacturing', 'Hospitality', 'Professional Services', 'Other'
];

const SOCIAL_PLATFORMS = ['LinkedIn', 'Instagram', 'Facebook', 'X (Twitter)', 'YouTube', 'TikTok', 'None'];
const POSTING_FREQUENCIES = ['Daily', 'Weekly', 'Monthly', 'Rarely / Never'];
const REVENUE_RANGES = ['₹0 - ₹10,000', '₹10,000 - ₹50,000', '₹50,000 - ₹2,00,000', '₹2,00,000+'];
const PRIMARY_GOALS = ['Lead Generation', 'Brand Awareness', 'Sales Conversion', 'Customer Retention', 'WhatsApp / Email Automation'];
const REACH_METHODS = ['Email Campaigns', 'WhatsApp Campaigns', 'Social Media Ads', 'Cold Calls / Manual Outreach', 'SEO', 'Content Marketing', 'Other'];
const AD_SPEND_RANGES = ['₹0 - ₹25,000', '₹25,000 - ₹1,00,000', '₹1,00,000 - ₹5,00,000', '₹5,00,000+'];
const AD_PLATFORMS = ['Meta (Facebook / Instagram)', 'Google Ads', 'LinkedIn Ads', 'X (Twitter) Ads', 'YouTube Ads', 'Other'];

export function BusinessDiscoveryPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
    clearErrors,
  } = useForm<BusinessDiscoveryFormData>({
    resolver: zodResolver(businessDiscoverySchema),
    mode: 'onTouched', // Only validate after user touches a field
    defaultValues: {
      has_website: false,
      social_platforms: [],
      primary_goals: [],
      current_reach_methods: [],
      advertising_platforms: [],
      has_crm: false,
      is_gst_registered: false,
      issues_invoices: false,
    },
  });

  const watchedValues = watch();

  const progress = (currentStep / STEPS.length) * 100;

  const handleNext = async () => {
    const currentFields = STEPS[currentStep - 1].fields;
    const isValid = await trigger(currentFields as any);
    
    if (isValid) {
      if (currentStep < STEPS.length) {
        // Clear errors for the next step's fields to prevent auto-validation
        const nextStepFields = STEPS[currentStep].fields;
        clearErrors(nextStepFields as any);
        
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const onSubmit = async (data: BusinessDiscoveryFormData) => {
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('business_discovery_submissions')
        .insert({
          full_name: data.full_name,
          phone: data.phone,
          email: data.email,
          company_name: data.company_name,
          website_url: data.website_url || null,
          industry: data.industry,
          other_industry: data.other_industry || null,
          location: data.location,
          has_website: data.has_website,
          social_platforms: data.social_platforms || [],
          posting_frequency: data.posting_frequency,
          main_product_service: data.main_product_service,
          ideal_customer: data.ideal_customer,
          avg_revenue_per_customer: data.avg_revenue_per_customer,
          primary_goals: data.primary_goals || [],
          current_reach_methods: data.current_reach_methods || [],
          monthly_ad_spend: data.monthly_ad_spend,
          advertising_platforms: data.advertising_platforms || [],
          has_crm: data.has_crm,
          crm_system_name: data.crm_system_name || null,
          conversion_rate: data.conversion_rate || null,
          is_gst_registered: data.is_gst_registered,
          issues_invoices: data.issues_invoices,
          has_seasonal_peaks: data.has_seasonal_peaks || null,
          top_priorities: data.top_priorities,
          desired_results: data.desired_results,
          current_challenges: data.current_challenges,
        });

      if (error) throw error;

      setIsSuccess(true);
      toast({
        title: "Submission Successful! 🎉",
        description: "Thank you for completing the questionnaire. We'll review your answers and get back to you within 24 hours.",
      });

      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error: any) {
      console.error('Submission error:', error);
      toast({
        title: "Submission Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleArrayValue = (field: keyof BusinessDiscoveryFormData, value: string) => {
    const currentValues = (watchedValues[field] as string[]) || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    setValue(field, newValues as any);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white">
        <PublicHeader />
        <main className="py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-12 shadow-xl border border-green-100">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Thank You for Your Submission! 🎉
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Our team will review your answers and prepare a customized growth strategy tailored to your business. We'll be in touch within 24 hours with next steps.
              </p>
              
              <div className="bg-white rounded-2xl p-6 mb-8 text-left shadow-md">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
                  What Happens Next?
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Our team analyzes your responses</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>We prepare a personalized strategy document</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>You receive detailed recommendations within 24 hours</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Optional strategy call to discuss implementation</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white px-8"
                  onClick={() => window.open('https://calendly.com/leadmasters', '_blank')}
                >
                  <Calendar className="mr-2 w-5 h-5" />
                  Want to Speed Things Up? Book a Free Strategy Call
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/')}
                >
                  Return to Homepage
                </Button>
              </div>
            </div>
          </div>
        </main>
        <PublicFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <PublicHeader />
      <main className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 mb-6">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              📊 LeadMasters Business Discovery Questionnaire
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-2">
              Answer a few quick questions so we can craft a tailored lead generation, automation, and marketing strategy for your business.
            </p>
            <p className="text-sm text-gray-500">
              ⏱️ Takes just 2 minutes • Helps us understand where you are today and how LeadMasters.ai can deliver the fastest ROI
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              {STEPS.map((step) => (
                <div key={step.id} className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                      currentStep >= step.id
                        ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step.id}
                  </div>
                  <span className={`text-xs mt-2 font-medium ${currentStep >= step.id ? 'text-purple-600' : 'text-gray-400'}`}>
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {STEPS[currentStep - 1].title}
              </h2>

              {/* Step 1: Business Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="full_name">Full Name *</Label>
                    <Input
                      id="full_name"
                      {...register('full_name')}
                      placeholder="John Smith"
                      className="mt-1"
                    />
                    {errors.full_name && (
                      <p className="text-sm text-destructive mt-1">{errors.full_name.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      {...register('phone')}
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="mt-1"
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      {...register('email')}
                      type="email"
                      placeholder="your.email@example.com"
                      className="mt-1"
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="company_name">Company Name *</Label>
                    <Input
                      id="company_name"
                      {...register('company_name')}
                      placeholder="Your Business Name"
                      className="mt-1"
                    />
                    {errors.company_name && (
                      <p className="text-sm text-destructive mt-1">{errors.company_name.message}</p>
                    )}
                  </div>

                  <div>
                    <Label className="mb-3 block">Do you have a website? *</Label>
                    <RadioGroup
                      value={watchedValues.has_website ? 'yes' : 'no'}
                      onValueChange={(value) => setValue('has_website', value === 'yes')}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="has-website-yes" />
                        <Label htmlFor="has-website-yes">Yes, I have a website</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="has-website-no" />
                        <Label htmlFor="has-website-no">No, I don't have a website</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {watchedValues.has_website && (
                    <div>
                      <Label htmlFor="website_url">Website URL *</Label>
                      <Input
                        id="website_url"
                        {...register('website_url')}
                        type="url"
                        placeholder="https://yourwebsite.com"
                        className="mt-1"
                      />
                      {errors.website_url && (
                        <p className="text-sm text-destructive mt-1">{errors.website_url.message}</p>
                      )}
                    </div>
                  )}

                  <div>
                    <Label htmlFor="industry">Industry / Sector *</Label>
                    <select
                      id="industry"
                      {...register('industry')}
                      className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="">Select Industry</option>
                      {INDUSTRIES.map((ind) => (
                        <option key={ind} value={ind}>{ind}</option>
                      ))}
                    </select>
                    {errors.industry && (
                      <p className="text-sm text-destructive mt-1">{errors.industry.message}</p>
                    )}
                  </div>

                  {watchedValues.industry === 'Other' && (
                    <div>
                      <Label htmlFor="other_industry">Please specify your industry *</Label>
                      <Input
                        id="other_industry"
                        {...register('other_industry')}
                        placeholder="Enter your industry"
                        className="mt-1"
                      />
                      {errors.other_industry && (
                        <p className="text-sm text-destructive mt-1">{errors.other_industry.message}</p>
                      )}
                    </div>
                  )}

                  <div>
                    <Label htmlFor="location">Location / Target Market *</Label>
                    <Input
                      id="location"
                      {...register('location')}
                      placeholder="e.g., Bangalore, India or USA"
                      className="mt-1"
                    />
                    {errors.location && (
                      <p className="text-sm text-destructive mt-1">{errors.location.message}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Digital Presence */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <Label className="mb-3 block">Which social media platforms are you active on?</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {SOCIAL_PLATFORMS.map((platform) => (
                        <div key={platform} className="flex items-center space-x-2">
                          <Checkbox
                            id={`platform-${platform}`}
                            checked={(watchedValues.social_platforms || []).includes(platform)}
                            onCheckedChange={() => toggleArrayValue('social_platforms', platform)}
                          />
                          <Label htmlFor={`platform-${platform}`} className="cursor-pointer">
                            {platform}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="mb-3 block">How frequently do you post on social media? *</Label>
                    <RadioGroup
                      value={watchedValues.posting_frequency || ''}
                      onValueChange={(value) => setValue('posting_frequency', value)}
                    >
                      {POSTING_FREQUENCIES.map((freq) => (
                        <div key={freq} className="flex items-center space-x-2">
                          <RadioGroupItem value={freq} id={`freq-${freq}`} />
                          <Label htmlFor={`freq-${freq}`}>{freq}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                    {errors.posting_frequency && (
                      <p className="text-sm text-destructive mt-1">{errors.posting_frequency.message}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Product & Customers */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="main_product_service">What is your main product or service? *</Label>
                    <Textarea
                      id="main_product_service"
                      {...register('main_product_service')}
                      placeholder="Describe what you offer..."
                      className="mt-1 min-h-[100px]"
                    />
                    {errors.main_product_service && (
                      <p className="text-sm text-destructive mt-1">{errors.main_product_service.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="ideal_customer">Describe your ideal customer *</Label>
                    <Textarea
                      id="ideal_customer"
                      {...register('ideal_customer')}
                      placeholder="e.g., B2B/B2C, age group, industry, location..."
                      className="mt-1 min-h-[100px]"
                    />
                    {errors.ideal_customer && (
                      <p className="text-sm text-destructive mt-1">{errors.ideal_customer.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="avg_revenue_per_customer">Average revenue per customer (approx.) *</Label>
                    <select
                      id="avg_revenue_per_customer"
                      {...register('avg_revenue_per_customer')}
                      className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="">Select Range</option>
                      {REVENUE_RANGES.map((range) => (
                        <option key={range} value={range}>{range}</option>
                      ))}
                    </select>
                    {errors.avg_revenue_per_customer && (
                      <p className="text-sm text-destructive mt-1">{errors.avg_revenue_per_customer.message}</p>
                    )}
                  </div>

                  <div>
                    <Label className="mb-3 block">What are your primary goals right now? (Select all that apply) *</Label>
                    <div className="space-y-2">
                      {PRIMARY_GOALS.map((goal) => (
                        <div key={goal} className="flex items-center space-x-2">
                          <Checkbox
                            id={`goal-${goal}`}
                            checked={(watchedValues.primary_goals || []).includes(goal)}
                            onCheckedChange={() => toggleArrayValue('primary_goals', goal)}
                          />
                          <Label htmlFor={`goal-${goal}`} className="cursor-pointer">
                            {goal}
                          </Label>
                        </div>
                      ))}
                    </div>
                    {errors.primary_goals && (
                      <p className="text-sm text-destructive mt-1">{errors.primary_goals.message}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 4: Current Marketing Strategy */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <Label className="mb-3 block">How do you currently reach customers? (Select all that apply) *</Label>
                    <div className="space-y-2">
                      {REACH_METHODS.map((method) => (
                        <div key={method} className="flex items-center space-x-2">
                          <Checkbox
                            id={`method-${method}`}
                            checked={(watchedValues.current_reach_methods || []).includes(method)}
                            onCheckedChange={() => toggleArrayValue('current_reach_methods', method)}
                          />
                          <Label htmlFor={`method-${method}`} className="cursor-pointer">
                            {method}
                          </Label>
                        </div>
                      ))}
                    </div>
                    {errors.current_reach_methods && (
                      <p className="text-sm text-destructive mt-1">{errors.current_reach_methods.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="monthly_ad_spend">Approximate monthly ad spend *</Label>
                    <select
                      id="monthly_ad_spend"
                      {...register('monthly_ad_spend')}
                      className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="">Select Range</option>
                      {AD_SPEND_RANGES.map((range) => (
                        <option key={range} value={range}>{range}</option>
                      ))}
                    </select>
                    {errors.monthly_ad_spend && (
                      <p className="text-sm text-destructive mt-1">{errors.monthly_ad_spend.message}</p>
                    )}
                  </div>

                  <div>
                    <Label className="mb-3 block">Which advertising platforms do you use? (Select all that apply)</Label>
                    <div className="space-y-2">
                      {AD_PLATFORMS.map((platform) => (
                        <div key={platform} className="flex items-center space-x-2">
                          <Checkbox
                            id={`ad-platform-${platform}`}
                            checked={(watchedValues.advertising_platforms || []).includes(platform)}
                            onCheckedChange={() => toggleArrayValue('advertising_platforms', platform)}
                          />
                          <Label htmlFor={`ad-platform-${platform}`} className="cursor-pointer">
                            {platform}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="mb-3 block">Do you have a CRM or lead management system? *</Label>
                    <RadioGroup
                      value={watchedValues.has_crm ? 'yes' : 'no'}
                      onValueChange={(value) => setValue('has_crm', value === 'yes')}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="crm-yes" />
                        <Label htmlFor="crm-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="crm-no" />
                        <Label htmlFor="crm-no">No</Label>
                      </div>
                    </RadioGroup>
                    {watchedValues.has_crm && (
                      <Input
                        id="crm_system_name"
                        {...register('crm_system_name')}
                        placeholder="Which CRM system? (e.g., Salesforce, HubSpot, Zoho)"
                        className="mt-3"
                      />
                    )}
                    {watchedValues.has_crm && errors.crm_system_name && (
                      <p className="text-sm text-destructive mt-1">{errors.crm_system_name.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="conversion_rate">Current conversion rate (approx. % of leads that become paying customers)</Label>
                    <Input
                      id="conversion_rate"
                      {...register('conversion_rate')}
                      placeholder="e.g., 5%, 10-15%, Not sure"
                      className="mt-1"
                    />
                  </div>
                </div>
              )}

              {/* Step 5: Business Compliance & Future Plans */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div>
                    <Label className="mb-3 block">Is your business GST / VAT registered? *</Label>
                    <RadioGroup
                      value={watchedValues.is_gst_registered ? 'yes' : 'no'}
                      onValueChange={(value) => setValue('is_gst_registered', value === 'yes')}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="gst-yes" />
                        <Label htmlFor="gst-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="gst-no" />
                        <Label htmlFor="gst-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label className="mb-3 block">Do you issue invoices or recurring subscription plans? *</Label>
                    <RadioGroup
                      value={watchedValues.issues_invoices ? 'yes' : 'no'}
                      onValueChange={(value) => setValue('issues_invoices', value === 'yes')}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="invoices-yes" />
                        <Label htmlFor="invoices-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="invoices-no" />
                        <Label htmlFor="invoices-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label htmlFor="has_seasonal_peaks">Are there seasonal peaks or specific months that drive most of your revenue?</Label>
                    <Textarea
                      id="has_seasonal_peaks"
                      {...register('has_seasonal_peaks')}
                      placeholder="e.g., Diwali season, Summer months, Year-end, etc."
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="top_priorities">What are your top 3 business priorities for the next 6 months? *</Label>
                    <Textarea
                      id="top_priorities"
                      {...register('top_priorities')}
                      placeholder="List your top 3 priorities..."
                      className="mt-1 min-h-[100px]"
                    />
                    {errors.top_priorities && (
                      <p className="text-sm text-destructive mt-1">{errors.top_priorities.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="desired_results">What results would you like LeadMasters to help you achieve? *</Label>
                    <Textarea
                      id="desired_results"
                      {...register('desired_results')}
                      placeholder="Describe your desired outcomes..."
                      className="mt-1 min-h-[100px]"
                    />
                    {errors.desired_results && (
                      <p className="text-sm text-destructive mt-1">{errors.desired_results.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="current_challenges">What challenges or roadblocks are you facing right now? *</Label>
                    <Textarea
                      id="current_challenges"
                      {...register('current_challenges')}
                      placeholder="Describe your current challenges..."
                      className="mt-1 min-h-[100px]"
                    />
                    {errors.current_challenges && (
                      <p className="text-sm text-destructive mt-1">{errors.current_challenges.message}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  size="lg"
                >
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Previous
                </Button>

                {currentStep < STEPS.length ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white"
                  >
                    Next
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                    className="bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Questionnaire'}
                    {!isSubmitting && <CheckCircle className="ml-2 w-4 h-4" />}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
