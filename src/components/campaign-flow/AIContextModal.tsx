import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, Loader2 } from 'lucide-react';
import { AIBusinessContext } from '@/types/ai-campaign';

interface AIContextModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (context: AIBusinessContext) => void;
  platform: 'facebook' | 'instagram' | 'google' | 'linkedin';
  isLoading?: boolean;
}

export function AIContextModal({ open, onClose, onSubmit, platform, isLoading }: AIContextModalProps) {
  const [formData, setFormData] = useState({
    industry: '',
    businessType: '',
    targetMarket: '',
    campaignGoal: '',
    budgetRange: ''
  });

  const handleSubmit = () => {
    if (!formData.industry || !formData.businessType || !formData.targetMarket || !formData.campaignGoal) {
      return;
    }

    onSubmit({
      ...formData,
      platform
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            AI Campaign Assistant
          </DialogTitle>
          <DialogDescription>
            Tell us about your business so AI can generate personalized campaign suggestions.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
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
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessType">Business Type *</Label>
            <Input
              id="businessType"
              placeholder="e.g., B2B SaaS, Local Restaurant, Online Retailer"
              value={formData.businessType}
              onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetMarket">Target Market *</Label>
            <Input
              id="targetMarket"
              placeholder="e.g., Small business owners in USA, College students"
              value={formData.targetMarket}
              onChange={(e) => setFormData({ ...formData, targetMarket: e.target.value })}
            />
          </div>

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
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="budgetRange">Budget Range (Optional)</Label>
            <Select
              value={formData.budgetRange}
              onValueChange={(value) => setFormData({ ...formData, budgetRange: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select budget range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="$500-1000">$500 - $1,000</SelectItem>
                <SelectItem value="$1000-5000">$1,000 - $5,000</SelectItem>
                <SelectItem value="$5000-10000">$5,000 - $10,000</SelectItem>
                <SelectItem value="$10000+">$10,000+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1" disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:opacity-90"
            disabled={!formData.industry || !formData.businessType || !formData.targetMarket || !formData.campaignGoal || isLoading}
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
