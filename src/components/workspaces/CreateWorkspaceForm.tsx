
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Building2, 
  ArrowLeft,
  Sparkles,
  User,
  MapPin,
  Link2,
  Phone,
  Clock,
  Globe,
  Briefcase,
  Users
} from 'lucide-react';

interface CreateWorkspaceFormData {
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
  businessType: string;
}

interface CreateWorkspaceFormProps {
  onBack: () => void;
  onSubmit: (data: CreateWorkspaceFormData) => void;
  formData: CreateWorkspaceFormData;
  onFormDataChange: (field: string, value: string) => void;
}

const countries = [
  'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan',
  'Bahrain', 'Bangladesh', 'Belarus', 'Belgium', 'Bolivia', 'Bosnia and Herzegovina', 'Brazil', 'Bulgaria',
  'Cambodia', 'Canada', 'Chile', 'China', 'Colombia', 'Croatia', 'Czech Republic', 'Denmark',
  'Ecuador', 'Egypt', 'Estonia', 'Ethiopia', 'Finland', 'France', 'Georgia', 'Germany', 'Ghana',
  'Greece', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy',
  'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait', 'Latvia', 'Lebanon', 'Lithuania', 'Luxembourg',
  'Malaysia', 'Mexico', 'Morocco', 'Netherlands', 'New Zealand', 'Nigeria', 'Norway', 'Oman',
  'Pakistan', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Saudi Arabia',
  'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka',
  'Sweden', 'Switzerland', 'Thailand', 'Turkey', 'Ukraine', 'United Arab Emirates', 'United Kingdom',
  'United States', 'Uruguay', 'Venezuela', 'Vietnam'
];

const usStates = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
  'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

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

const businessTypes = ['B2B', 'B2C', 'B2B2C'];

export function CreateWorkspaceForm({ 
  onBack, 
  onSubmit, 
  formData, 
  onFormDataChange 
}: CreateWorkspaceFormProps) {
  const [availableStates, setAvailableStates] = useState<string[]>([]);

  // Update available states when country changes
  useEffect(() => {
    if (formData.country === 'United States') {
      setAvailableStates(usStates);
    } else {
      setAvailableStates([]);
      // Clear state selection if not US
      if (formData.state) {
        onFormDataChange('state', '');
      }
    }
  }, [formData.country, formData.state, onFormDataChange]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-gray-50/50 via-blue-50/30 to-purple-50/50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 hover:bg-white/70"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Workspaces
        </Button>

        {/* Create Workspace Form */}
        <Card className="bg-white/95 backdrop-blur-md border border-gray-200/50 shadow-2xl rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-b border-gray-200/50 p-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                  Create New Workspace
                </CardTitle>
                <CardDescription className="text-gray-600 mt-1">
                  Set up a new workspace to organize your campaigns and content.
                </CardDescription>
              </div>
            </div>
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
                      onChange={(e) => onFormDataChange('fullName', e.target.value)}
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
                      onChange={(e) => onFormDataChange('mobileNumber', e.target.value)}
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
                      onChange={(e) => onFormDataChange('name', e.target.value)}
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
                      onChange={(e) => onFormDataChange('websiteUrl', e.target.value)}
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
                    onChange={(e) => onFormDataChange('description', e.target.value)}
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
                    onChange={(e) => onFormDataChange('address', e.target.value)}
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
                    <Select value={formData.country} onValueChange={(value) => onFormDataChange('country', value)} required>
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
                      State
                    </Label>
                    <Select 
                      value={formData.state} 
                      onValueChange={(value) => onFormDataChange('state', value)}
                      disabled={availableStates.length === 0}
                    >
                      <SelectTrigger className="h-12 border-gray-200 rounded-xl bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-purple-500/50 focus:border-purple-300">
                        <SelectValue placeholder={availableStates.length > 0 ? "Select state" : "Select country first"} />
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
                    <Select value={formData.industry} onValueChange={(value) => onFormDataChange('industry', value)} required>
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
                    <Select value={formData.companySize} onValueChange={(value) => onFormDataChange('companySize', value)}>
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

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-semibold text-gray-700 mb-2 block flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      Timezone *
                    </Label>
                    <Select value={formData.timezone} onValueChange={(value) => onFormDataChange('timezone', value)} required>
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

                  <div>
                    <Label className="text-sm font-semibold text-gray-700 mb-2 block flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      Business Type *
                    </Label>
                    <Select value={formData.businessType} onValueChange={(value) => onFormDataChange('businessType', value)} required>
                      <SelectTrigger className="h-12 border-gray-200 rounded-xl bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-purple-500/50 focus:border-purple-300">
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        {businessTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 pt-6 border-t border-gray-200/50">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onBack}
                  className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 rounded-xl transition-all duration-200 h-12"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl h-12"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Create Workspace
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
