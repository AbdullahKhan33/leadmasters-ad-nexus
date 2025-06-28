import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Globe, Briefcase, Users } from "lucide-react";
import { countries, getStatesForCountry, hasStates } from "@/utils/countriesAndStates";

interface CreateWorkspaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateWorkspace: (workspace: {
    name: string;
    description: string;
    country: string;
    state?: string;
    industry: string;
    businessType: string;
  }) => void;
}

export function CreateWorkspaceModal({ isOpen, onClose, onCreateWorkspace }: CreateWorkspaceModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    country: '',
    state: '',
    industry: '',
    businessType: ''
  });

  const [availableStates, setAvailableStates] = useState<string[]>([]);

  const industries = [
    'Technology',
    'Marketing',
    'Finance',
    'Healthcare',
    'Education',
    'Retail',
    'Manufacturing',
    'Real Estate',
    'Consulting',
    'Media & Entertainment'
  ];

  const businessTypes = ['B2B', 'B2C', 'B2B2C'];

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
    if (formData.name && formData.description && formData.country && formData.industry && formData.businessType) {
      onCreateWorkspace(formData);
      setFormData({
        name: '',
        description: '',
        country: '',
        state: '',
        industry: '',
        businessType: ''
      });
      onClose();
    }
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white/95 backdrop-blur-md border border-gray-200/50 shadow-2xl">
        <DialogHeader>
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                Create New Workspace
              </DialogTitle>
              <DialogDescription className="text-gray-600 mt-1">
                Set up a new workspace to organize your campaigns and content.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm font-semibold text-gray-700 mb-2 block">
                Workspace Name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter workspace name..."
                className="border border-gray-200 rounded-xl bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-purple-500/50 focus:border-purple-300"
                required
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-sm font-semibold text-gray-700 mb-2 block">
                Description *
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe your workspace..."
                className="border border-gray-200 rounded-xl bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-purple-500/50 focus:border-purple-300 min-h-[80px]"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-semibold text-gray-700 mb-2 block flex items-center">
                  <Globe className="w-4 h-4 mr-2" />
                  Country *
                </Label>
                <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)} required>
                  <SelectTrigger className="border border-gray-200 rounded-xl bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-purple-500/50 focus:border-purple-300">
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
                  <SelectTrigger className="border border-gray-200 rounded-xl bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-purple-500/50 focus:border-purple-300">
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

            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-2 block flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Business Type *
              </Label>
              <Select value={formData.businessType} onValueChange={(value) => handleInputChange('businessType', value)} required>
                <SelectTrigger className="border border-gray-200 rounded-xl bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-purple-500/50 focus:border-purple-300">
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

          <DialogFooter className="flex space-x-3 pt-6 border-t border-gray-200/50">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 rounded-xl transition-all duration-200"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl"
            >
              Create Workspace
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
