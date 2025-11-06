import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Loader2, Globe } from 'lucide-react';
import { AIBusinessContext } from '@/types/ai-campaign';
import { currencies, countries, getBudgetRanges } from '@/utils/currencyData';
import { useBusinessContexts } from '@/hooks/useBusinessContexts';
import { toast } from 'sonner';

interface AIContextModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (context: AIBusinessContext) => void;
  platform: 'facebook' | 'instagram' | 'google' | 'linkedin';
  isLoading?: boolean;
}

export function AIContextModal({ open, onClose, onSubmit, platform, isLoading }: AIContextModalProps) {
  const { contexts, saveContext } = useBusinessContexts();
  const [saveForFuture, setSaveForFuture] = useState(false);
  const [contextName, setContextName] = useState('');
  const [selectedContextId, setSelectedContextId] = useState<string>('');
  
  const [formData, setFormData] = useState({
    industry: '',
    businessType: '',
    targetCountries: [] as string[],
    targetCities: '',
    campaignGoal: '',
    currency: 'USD',
    budgetRange: ''
  });

  const [countrySearchTerm, setCountrySearchTerm] = useState('');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  // Load selected context
  useEffect(() => {
    if (selectedContextId && selectedContextId !== 'new') {
      const context = contexts.find(c => c.id === selectedContextId);
      if (context) {
        setFormData({
          industry: context.industry,
          businessType: context.business_type,
          targetCountries: context.target_countries,
          targetCities: context.target_cities || '',
          campaignGoal: context.campaign_goal,
          currency: context.currency,
          budgetRange: context.budget_range || ''
        });
        setContextName(context.name);
      }
    }
  }, [selectedContextId, contexts]);

  const handleSubmit = async () => {
    if (!formData.industry || !formData.businessType || formData.targetCountries.length === 0 || !formData.campaignGoal || !formData.currency) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Save context if checkbox is checked
    if (saveForFuture && contextName.trim()) {
      await saveContext({
        name: contextName.trim(),
        industry: formData.industry,
        business_type: formData.businessType,
        target_countries: formData.targetCountries,
        target_cities: formData.targetCities || null,
        campaign_goal: formData.campaignGoal,
        currency: formData.currency,
        budget_range: formData.budgetRange || null,
        is_default: false,
      });
    }

    onSubmit({
      ...formData,
      targetCities: formData.targetCities || undefined,
      budgetRange: formData.budgetRange || undefined,
      platform
    });
  };

  const toggleCountry = (country: string) => {
    setFormData(prev => ({
      ...prev,
      targetCountries: prev.targetCountries.includes(country)
        ? prev.targetCountries.filter(c => c !== country)
        : [...prev.targetCountries, country]
    }));
  };

  const filteredCountries = countries.filter(c => 
    c.toLowerCase().includes(countrySearchTerm.toLowerCase())
  );

  const budgetRanges = getBudgetRanges(formData.currency);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            AI Campaign Assistant
          </DialogTitle>
          <DialogDescription>
            Tell us about your business to generate personalized campaign suggestions.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Load Saved Context */}
          <div className="space-y-2">
            <Label>Load Saved Context (Optional)</Label>
            <Select
              value={selectedContextId}
              onValueChange={(value) => {
                setSelectedContextId(value);
                if (value === 'new') {
                  // Reset form when creating new
                  setFormData({
                    industry: '',
                    businessType: '',
                    targetCountries: [],
                    targetCities: '',
                    campaignGoal: '',
                    currency: 'USD',
                    budgetRange: ''
                  });
                  setContextName('');
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select saved context or create new..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">Create New Context</SelectItem>
                {contexts.map(context => (
                  <SelectItem key={context.id} value={context.id}>
                    {context.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Context Name (if saving) */}
          {saveForFuture && (
            <div className="space-y-2">
              <Label htmlFor="contextName">Context Name *</Label>
              <Input
                id="contextName"
                placeholder="e.g., Real Estate Mumbai Campaign"
                value={contextName}
                onChange={(e) => setContextName(e.target.value)}
              />
            </div>
          )}

          <div className="border-t pt-4 space-y-4">
            {/* Industry */}
            <div className="space-y-2">
              <Label htmlFor="industry">Industry *</Label>
              <Select
                value={formData.industry}
                onValueChange={(value) => setFormData({ ...formData, industry: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Real Estate">Real Estate</SelectItem>
                  <SelectItem value="E-commerce">E-commerce</SelectItem>
                  <SelectItem value="SaaS">SaaS</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Food & Beverage">Food & Beverage</SelectItem>
                  <SelectItem value="Travel & Hospitality">Travel & Hospitality</SelectItem>
                  <SelectItem value="Professional Services">Professional Services</SelectItem>
                  <SelectItem value="Automotive">Automotive</SelectItem>
                  <SelectItem value="Retail">Retail</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Business Description */}
            <div className="space-y-2">
              <Label htmlFor="businessType">Describe Your Business *</Label>
              <Textarea
                id="businessType"
                placeholder="E.g., We provide AI training courses for software engineers looking to upskill in machine learning and automation"
                value={formData.businessType}
                onChange={(e) => {
                  if (e.target.value.length <= 200) {
                    setFormData({ ...formData, businessType: e.target.value });
                  }
                }}
                className="min-h-[80px] resize-none"
                maxLength={200}
              />
              <div className="text-xs text-muted-foreground text-right">
                {formData.businessType.length}/200 characters
              </div>
            </div>

            {/* Target Countries */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Target Countries *
              </Label>
              <div className="relative">
                <Input
                  placeholder="Search and select countries..."
                  value={countrySearchTerm}
                  onChange={(e) => setCountrySearchTerm(e.target.value)}
                  onFocus={() => setShowCountryDropdown(true)}
                />
                {showCountryDropdown && (
                  <div className="absolute z-50 w-full mt-1 bg-popover border rounded-md shadow-lg max-h-60 overflow-y-auto">
                    <div className="p-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-xs mb-2"
                        onClick={() => {
                          setShowCountryDropdown(false);
                          setCountrySearchTerm('');
                        }}
                      >
                        ✓ Done
                      </Button>
                      {filteredCountries.length === 0 ? (
                        <div className="p-3 text-sm text-muted-foreground text-center">
                          No countries found
                        </div>
                      ) : (
                        filteredCountries.map(country => (
                          <div
                            key={country}
                            className="flex items-center space-x-2 p-2 hover:bg-accent rounded cursor-pointer"
                            onClick={() => toggleCountry(country)}
                          >
                            <Checkbox
                              checked={formData.targetCountries.includes(country)}
                              onCheckedChange={() => toggleCountry(country)}
                            />
                            <span className="text-sm">{country}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
              {formData.targetCountries.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.targetCountries.map(country => (
                    <div key={country} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2">
                      {country}
                      <button
                        onClick={() => toggleCountry(country)}
                        className="hover:bg-primary/20 rounded-full w-4 h-4 flex items-center justify-center"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Target Cities */}
            <div className="space-y-2">
              <Label htmlFor="targetCities">Cities/Regions (Optional)</Label>
              <Input
                id="targetCities"
                placeholder="e.g., Mumbai, Dubai, New York"
                value={formData.targetCities}
                onChange={(e) => setFormData({ ...formData, targetCities: e.target.value })}
              />
            </div>

            {/* Campaign Goal */}
            <div className="space-y-2">
              <Label htmlFor="campaignGoal">Campaign Goal *</Label>
              <Select
                value={formData.campaignGoal}
                onValueChange={(value) => setFormData({ ...formData, campaignGoal: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Brand Awareness">Brand Awareness</SelectItem>
                  <SelectItem value="Lead Generation">Lead Generation</SelectItem>
                  <SelectItem value="Website Traffic">Website Traffic</SelectItem>
                  <SelectItem value="Conversions">Conversions</SelectItem>
                  <SelectItem value="App Installs">App Installs</SelectItem>
                  <SelectItem value="Engagement">Engagement</SelectItem>
                  <SelectItem value="Store Visits">Store Visits</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Currency */}
            <div className="space-y-2">
              <Label htmlFor="currency">Currency *</Label>
              <Select
                value={formData.currency}
                onValueChange={(value) => setFormData({ ...formData, currency: value, budgetRange: '' })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map(curr => (
                    <SelectItem key={curr.code} value={curr.code}>
                      {curr.symbol} {curr.name} ({curr.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Budget Amount */}
            <div className="space-y-2">
              <Label htmlFor="budgetAmount">Campaign Budget (Optional)</Label>
              <Input
                id="budgetAmount"
                type="number"
                placeholder={`Enter budget amount in ${formData.currency}`}
                value={formData.budgetRange}
                onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                min="0"
              />
              <p className="text-xs text-muted-foreground">
                Enter your total campaign budget in {formData.currency}
              </p>
            </div>

            {/* Save for Future */}
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox
                id="saveForFuture"
                checked={saveForFuture}
                onCheckedChange={(checked) => setSaveForFuture(checked as boolean)}
              />
              <label
                htmlFor="saveForFuture"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Save this context for future use
              </label>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1" disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:opacity-90"
            disabled={
              !formData.industry || 
              !formData.businessType || 
              formData.targetCountries.length === 0 || 
              !formData.campaignGoal || 
              !formData.currency ||
              (saveForFuture && !contextName.trim()) ||
              isLoading
            }
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Suggestions
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
