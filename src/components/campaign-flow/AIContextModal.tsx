import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, Loader2, Globe, Zap, Settings } from 'lucide-react';
import { AIBusinessContext } from '@/types/ai-campaign';
import { currencies, countries, getBudgetRanges } from '@/utils/currencyData';
import { useBusinessContexts } from '@/hooks/useBusinessContexts';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface AIContextModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (context: AIBusinessContext, autoBuild?: boolean) => Promise<boolean | void>;
  platform: 'facebook' | 'instagram' | 'google' | 'linkedin';
  isLoading?: boolean;
}

export function AIContextModal({ open, onClose, onSubmit, platform, isLoading }: AIContextModalProps) {
  const { contexts, saveContext, updateContext, deleteContext } = useBusinessContexts();
  const [saveForFuture, setSaveForFuture] = useState(false);
  const [contextName, setContextName] = useState('');
  const [selectedContextId, setSelectedContextId] = useState<string>('');
  const [contextToDelete, setContextToDelete] = useState<string | null>(null);
  
  // Auto-build progress states
  const [isAutoBuilding, setIsAutoBuilding] = useState(false);
  const [buildProgress, setBuildProgress] = useState(0);
  const [buildStage, setBuildStage] = useState('');
  
  const [formData, setFormData] = useState({
    industry: '',
    businessType: '',
    targetCountries: [] as string[],
    targetCities: '',
    campaignGoal: '',
    currency: 'USD',
    budgetRange: '',
    websiteUrl: ''
  });

  const [countrySearchTerm, setCountrySearchTerm] = useState('');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  // Load selected context
  useEffect(() => {
    if (selectedContextId) {
      const context = contexts.find(c => c.id === selectedContextId);
      if (context) {
        setFormData({
          industry: context.industry,
          businessType: context.business_type,
          targetCountries: context.target_countries,
          targetCities: context.target_cities || '',
          campaignGoal: context.campaign_goal,
          currency: context.currency,
          budgetRange: context.budget_range || '',
          websiteUrl: (context as any).website_url || ''
        });
        setContextName(context.name);
      }
    }
  }, [selectedContextId, contexts]);

  const loadContext = (contextId: string) => {
    setSelectedContextId(contextId);
  };

  const handleDeleteContext = async () => {
    if (contextToDelete) {
      await deleteContext(contextToDelete);
      if (selectedContextId === contextToDelete) {
        // Clear form if we're deleting the currently selected context
        setSelectedContextId('');
        setFormData({
          industry: '',
          businessType: '',
          targetCountries: [],
          targetCities: '',
          campaignGoal: '',
          currency: 'USD',
          budgetRange: '',
          websiteUrl: ''
        });
        setContextName('');
      }
      setContextToDelete(null);
    }
  };

  const canAutoBuild = () => {
    return (
      formData.industry &&
      formData.businessType &&
      formData.targetCountries.length > 0 &&
      formData.campaignGoal &&
      formData.currency &&
      formData.websiteUrl
    );
  };

  const handleAutoBuild = async () => {
    if (!canAutoBuild()) {
      toast.error('Please fill in all required fields before auto-building');
      return;
    }

    setIsAutoBuilding(true);
    
    try {
      // Stage 1: Analyzing context (0-20%)
      setBuildStage('🔍 Analyzing your business context...');
      setBuildProgress(10);
      await new Promise(resolve => setTimeout(resolve, 800));
      setBuildProgress(20);
      
      // Stage 2: Calling AI (20-40%)
      setBuildStage('🤖 Generating AI suggestions...');
      setBuildProgress(30);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Save context if needed before making AI call
      if (saveForFuture && contextName.trim()) {
        if (selectedContextId) {
          await updateContext(selectedContextId, {
            name: contextName.trim(),
            industry: formData.industry,
            business_type: formData.businessType,
            target_countries: formData.targetCountries,
            target_cities: formData.targetCities || null,
            campaign_goal: formData.campaignGoal,
            currency: formData.currency,
            budget_range: formData.budgetRange || null,
            website_url: formData.websiteUrl || null,
          } as any);
        } else {
          await saveContext({
            name: contextName.trim(),
            industry: formData.industry,
            business_type: formData.businessType,
            target_countries: formData.targetCountries,
            target_cities: formData.targetCities || null,
            campaign_goal: formData.campaignGoal,
            currency: formData.currency,
            budget_range: formData.budgetRange || null,
            website_url: formData.websiteUrl || null,
            is_default: false,
          } as any);
        }
      }
      
      // Make the actual AI call
      setBuildProgress(40);
      const aiSuccess = await onSubmit({
        ...formData,
        targetCities: formData.targetCities || undefined,
        budgetRange: formData.budgetRange || undefined,
        websiteUrl: formData.websiteUrl || undefined,
        platform
      }, true); // autoBuild = true
      
      // If AI generation failed, stop the process
      if (aiSuccess === false) {
        throw new Error('AI generation failed');
      }
      
      // Stage 3: Applying campaign setup (40-60%)
      setBuildStage('⚙️ Configuring campaign settings...');
      setBuildProgress(50);
      await new Promise(resolve => setTimeout(resolve, 800));
      setBuildProgress(60);
      
      // Stage 4: Setting up audience (60-80%)
      setBuildStage('🎯 Setting up target audience...');
      setBuildProgress(70);
      await new Promise(resolve => setTimeout(resolve, 800));
      setBuildProgress(80);
      
      // Stage 5: Creating ad content (80-95%)
      setBuildStage('✨ Creating ad content...');
      setBuildProgress(90);
      await new Promise(resolve => setTimeout(resolve, 800));
      setBuildProgress(95);
      
      // Stage 6: Finalizing (95-100%)
      setBuildStage('🎉 Finalizing your campaign...');
      setBuildProgress(100);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Success - modal will close automatically
      toast.success('🎉 Campaign auto-built successfully!');
      
    } catch (error) {
      console.error('Auto-build error:', error);
      toast.error('Failed to auto-build campaign. Please try again.');
    } finally {
      // Reset states
      setTimeout(() => {
        setIsAutoBuilding(false);
        setBuildProgress(0);
        setBuildStage('');
      }, 500);
    }
  };

  const handleSubmit = async () => {
    if (!formData.industry || !formData.businessType || formData.targetCountries.length === 0 || !formData.campaignGoal || !formData.currency || !formData.websiteUrl) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Save or update context if checkbox is checked
    if (saveForFuture && contextName.trim()) {
      // Check if we're updating an existing context or creating a new one
      if (selectedContextId) {
        // Update existing context
        await updateContext(selectedContextId, {
          name: contextName.trim(),
          industry: formData.industry,
          business_type: formData.businessType,
          target_countries: formData.targetCountries,
          target_cities: formData.targetCities || null,
          campaign_goal: formData.campaignGoal,
          currency: formData.currency,
          budget_range: formData.budgetRange || null,
          website_url: formData.websiteUrl || null,
        } as any);
      } else {
        // Create new context
        await saveContext({
          name: contextName.trim(),
          industry: formData.industry,
          business_type: formData.businessType,
          target_countries: formData.targetCountries,
          target_cities: formData.targetCities || null,
          campaign_goal: formData.campaignGoal,
          currency: formData.currency,
          budget_range: formData.budgetRange || null,
          website_url: formData.websiteUrl || null,
          is_default: false,
        } as any);
      }
    }

    const success = await onSubmit({
      ...formData,
      targetCities: formData.targetCities || undefined,
      budgetRange: formData.budgetRange || undefined,
      websiteUrl: formData.websiteUrl || undefined,
      platform
    }, false); // Generate suggestions only, no auto-build
    
    // Only close modal if AI generation was successful
    if (success !== false) {
      onClose();
    }
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
            Choose how you want to create your campaign: fully automated or guided setup.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="quick" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="quick" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:via-purple-600 data-[state=active]:to-pink-500 data-[state=active]:text-white">
              <Zap className="w-4 h-4" />
              Quick Launch
            </TabsTrigger>
            <TabsTrigger value="guided" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Settings className="w-4 h-4" />
              Guided Setup
            </TabsTrigger>
          </TabsList>

          <TabsContent value="quick" className="space-y-4 mt-0">
          {/* Saved Contexts Badges */}
          <div className="space-y-2 pb-4 border-b">
            <Label className="text-sm text-muted-foreground">Saved Contexts</Label>
            {contexts.length === 0 ? (
              <div className="text-sm text-muted-foreground italic py-2">
                No saved contexts yet
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {contexts.map(context => (
                  <Badge
                    key={context.id}
                    variant={selectedContextId === context.id ? "gradient" : "outline"}
                    className={cn(
                      "cursor-pointer transition-all hover:scale-105 pr-1 text-xs",
                      selectedContextId === context.id && 
                      "ring-2 ring-primary ring-offset-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500"
                    )}
                  >
                    <span 
                      onClick={() => loadContext(context.id)}
                      className="pr-2"
                    >
                      {context.name}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setContextToDelete(context.id);
                      }}
                      className="ml-1 hover:bg-white/20 rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            )}
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

            {/* Website URL */}
            <div className="space-y-2">
              <Label htmlFor="websiteUrl">Landing Page / Website URL *</Label>
              <Input
                id="websiteUrl"
                type="url"
                placeholder="https://example.com"
                value={formData.websiteUrl}
                onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">
                Where do you want to send users when they click your ad?
              </p>
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

            {/* Progress Bar (only visible during auto-build) */}
            {isAutoBuilding && (
              <div className="space-y-2 mb-4 p-4 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20 rounded-lg">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-purple-600 dark:text-purple-400">{buildStage}</span>
                  <span className="text-muted-foreground">{buildProgress}%</span>
                </div>
                <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 transition-all duration-500 ease-out"
                    style={{ width: `${buildProgress}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose} className="flex-1" disabled={isLoading || isAutoBuilding}>
                Cancel
              </Button>
              <Button
                onClick={handleAutoBuild}
                disabled={isAutoBuilding || isLoading || !canAutoBuild()}
                className="flex-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:opacity-90 text-white font-semibold"
              >
                {isAutoBuilding ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Building Campaign...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 mr-2" />
                    Auto-Build Complete Campaign
                  </>
                )}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="guided" className="space-y-4 mt-0">
            {/* Saved Contexts Badges */}
            <div className="space-y-2 pb-4 border-b">
              <Label className="text-sm text-muted-foreground">Saved Contexts</Label>
              {contexts.length === 0 ? (
                <div className="text-sm text-muted-foreground italic py-2">
                  No saved contexts yet
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {contexts.map(context => (
                    <Badge
                      key={context.id}
                      variant={selectedContextId === context.id ? "gradient" : "outline"}
                      className={cn(
                        "cursor-pointer transition-all hover:scale-105 pr-1 text-xs",
                        selectedContextId === context.id && 
                        "ring-2 ring-primary ring-offset-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500"
                      )}
                    >
                      <span 
                        onClick={() => loadContext(context.id)}
                        className="pr-2"
                      >
                        {context.name}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setContextToDelete(context.id);
                        }}
                        className="ml-1 hover:bg-white/20 rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
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

            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose} className="flex-1" disabled={isLoading}>
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                className="flex-1 bg-primary hover:bg-primary/90"
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
                    Generate AI Suggestions
                  </>
                )}
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!contextToDelete} onOpenChange={() => setContextToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Context?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this saved context.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleDeleteContext}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DialogContent>
    </Dialog>
  );
}
