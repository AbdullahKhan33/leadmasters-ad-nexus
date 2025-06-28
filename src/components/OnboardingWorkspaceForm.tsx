import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, User, Globe, Briefcase, MapPin, Users, Link2, Phone, Clock, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { countries, getStatesForCountry, hasStates } from "@/utils/countriesAndStates";

interface OnboardingWorkspaceFormProps {
  onCreateWorkspace: (workspace: {
    fullName: string;
    name: string;
    description: string;
    address: string;
    country: string;
    state: string;
    industry: string;
    companySize: string;
    websiteUrl: string;
    mobileNumber: string;
    timezone: string;
  }) => void;
}

export function OnboardingWorkspaceForm({ onCreateWorkspace }: OnboardingWorkspaceFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    name: '',
    description: '',
    address: '',
    country: '',
    state: '',
    industry: '',
    companySize: '',
    websiteUrl: '',
    mobileNumber: '',
    timezone: ''
  });

  const [availableStates, setAvailableStates] = useState<string[]>([]);

  const { toast } = useToast();

  const industries = [
    'Technology',
    'Marketing & Advertising',
    'Finance & Banking',
    'Healthcare',
    'Education',
    'Retail & E-commerce',
    'Manufacturing',
    'Real Estate',
    'Consulting',
    'Media & Entertainment',
    'Hospitality',
    'Construction',
    'Transportation',
    'Energy',
    'Non-profit',
    'Government',
    'Other'
  ];

  const companySizes = [
    '1-10 employees',
    '11-50 employees',
    '51-200 employees',
    '201-500 employees',
    '501-1000 employees',
    '1000+ employees'
  ];

  const timezones = [
    'UTC-12:00 (Baker Island)',
    'UTC-11:00 (American Samoa)',
    'UTC-10:00 (Hawaii)',
    'UTC-09:00 (Alaska)',
    'UTC-08:00 (Pacific Time)',
    'UTC-07:00 (Mountain Time)',
    'UTC-06:00 (Central Time)',
    'UTC-05:00 (Eastern Time)',
    'UTC-04:00 (Atlantic Time)',
    'UTC-03:00 (Argentina)',
    'UTC-02:00 (South Georgia)',
    'UTC-01:00 (Azores)',
    'UTC+00:00 (London)',
    'UTC+01:00 (Central Europe)',
    'UTC+02:00 (Eastern Europe)',
    'UTC+03:00 (Moscow)',
    'UTC+04:00 (Gulf)',
    'UTC+05:00 (Pakistan)',
    'UTC+05:30 (India)',
    'UTC+06:00 (Bangladesh)',
    'UTC+07:00 (Thailand)',
    'UTC+08:00 (Singapore)',
    'UTC+09:00 (Japan)',
    'UTC+10:00 (Australia East)',
    'UTC+11:00 (Solomon Islands)',
    'UTC+12:00 (New Zealand)'
  ];

  // Update available states when country changes
  useEffect(() => {
    const states = getStatesForCountry(formData.country);
    setAvailableStates(states);
    
    // Clear state selection if country changed and current state is not valid for new country
    if (formData.state && !states.includes(formData.state)) {
      setFormData(prev => ({ ...prev, state: '' }));
    }
  }, [formData.country]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = ['fullName', 'name', 'description', 'country', 'industry', 'timezone'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    onCreateWorkspace(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getStatePlaceholder = () => {
    if (!formData.country) {
      return "Select country first";
    } else if (hasStates(formData.country)) {
      return "Select state/province";
    } else {
      return "Not applicable";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/50 via-blue-50/30 to-purple-50/50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Welcome Header */}
        <div className="text-center space-y-4 py-8">
          <div className="flex items-center justify-center space-x-3">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white shadow-2xl">
              <Building2 className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                Welcome to Your Journey!
              </h1>
              <div className="flex items-center justify-center space-x-2 mt-2">
                <Sparkles className="w-5 h-5 text-purple-500" />
                <p className="text-gray-600 text-lg">Let's set up your workspace to get started</p>
                <Sparkles className="w-5 h-5 text-purple-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <Card className="bg-white/95 backdrop-blur-md border border-gray-200/50 shadow-2xl rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-b border-gray-200/50 p-8">
            <CardTitle className="text-2xl font-bold text-center text-gray-800">
              Create Your Workspace
            </CardTitle>
            <CardDescription className="text-center text-gray-600 mt-2">
              Tell us about yourself and your business to personalize your experience
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <User className="w-5 h-5 mr-2 text-blue-600" />
                  Personal Information
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName" className="text-sm font-semibold text-gray-700 mb-2 block">
                      Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="Enter your full name"
                      className="h-12 border-gray-200 rounded-xl bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-purple-500/50 focus:border-purple-300"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="mobileNumber" className="text-sm font-semibold text-gray-700 mb-2 block flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      Mobile Number
                    </Label>
                    <Input
                      id="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                      placeholder="Enter your mobile number"
                      className="h-12 border-gray-200 rounded-xl bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-purple-500/50 focus:border-purple-300"
                    />
                  </div>
                </div>
              </div>

              {/* Company Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <Building2 className="w-5 h-5 mr-2 text-blue-600" />
                  Company Information
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-sm font-semibold text-gray-700 mb-2 block">
                      Company Name *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter company name"
                      className="h-12 border-gray-200 rounded-xl bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-purple-500/50 focus:border-purple-300"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="websiteUrl" className="text-sm font-semibold text-gray-700 mb-2 block flex items-center">
                      <Link2 className="w-4 h-4 mr-2" />
                      Website URL
                    </Label>
                    <Input
                      id="websiteUrl"
                      value={formData.websiteUrl}
                      onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
                      placeholder="https://www.yourcompany.com"
                      className="h-12 border-gray-200 rounded-xl bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-purple-500/50 focus:border-purple-300"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description" className="text-sm font-semibold text-gray-700 mb-2 block">
                    Company Description *
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe your company and what you do..."
                    className="border-gray-200 rounded-xl bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-purple-500/50 focus:border-purple-300 min-h-[100px] resize-none"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="address" className="text-sm font-semibold text-gray-700 mb-2 block flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    Company Address
                  </Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Enter company address"
                    className="h-12 border-gray-200 rounded-xl bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-purple-500/50 focus:border-purple-300"
                  />
                </div>
              </div>

              {/* Location & Business Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-blue-600" />
                  Location & Business Details
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                      Country *
                    </Label>
                    <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)} required>
                      <SelectTrigger className="h-12 border-gray-200 rounded-xl bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-purple-500/50 focus:border-purple-300">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                      State/Province
                    </Label>
                    <Select 
                      value={formData.state} 
                      onValueChange={(value) => handleInputChange('state', value)}
                      disabled={!hasStates(formData.country)}
                    >
                      <SelectTrigger className="h-12 border-gray-200 rounded-xl bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-purple-500/50 focus:border-purple-300">
                        <SelectValue placeholder={getStatePlaceholder()} />
                      </SelectTrigger>
                      <SelectContent>
                        {availableStates.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-semibold text-gray-700 mb-2 block flex items-center">
                      <Briefcase className="w-4 h-4 mr-2" />
                      Industry *
                    </Label>
                    <Select value={formData.industry} onValueChange={(value) => handleInputChange('industry', value)} required>
                      <SelectTrigger className="h-12 border-gray-200 rounded-xl bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-purple-500/50 focus:border-purple-300">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map((industry) => (
                          <SelectItem key={industry} value={industry}>
                            {industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-semibold text-gray-700 mb-2 block flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      Company Size
                    </Label>
                    <Select value={formData.companySize} onValueChange={(value) => handleInputChange('companySize', value)}>
                      <SelectTrigger className="h-12 border-gray-200 rounded-xl bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-purple-500/50 focus:border-purple-300">
                        <SelectValue placeholder="Select company size" />
                      </SelectTrigger>
                      <SelectContent>
                        {companySizes.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-semibold text-gray-700 mb-2 block flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    Timezone *
                  </Label>
                  <Select value={formData.timezone} onValueChange={(value) => handleInputChange('timezone', value)} required>
                    <SelectTrigger className="h-12 border-gray-200 rounded-xl bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-purple-500/50 focus:border-purple-300">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      {timezones.map((timezone) => (
                        <SelectItem key={timezone} value={timezone}>
                          {timezone}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t border-gray-200/50">
                <Button
                  type="submit"
                  className="w-full h-14 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl text-lg font-semibold"
                >
                  Create Workspace & Get Started
                  <Sparkles className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
