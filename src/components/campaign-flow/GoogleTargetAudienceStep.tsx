
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save } from "lucide-react";
import { GoogleCampaignData } from "../GoogleAdCampaignFlow";

import { AICampaignSuggestions } from "@/types/ai-campaign";

interface GoogleTargetAudienceStepProps {
  data: GoogleCampaignData;
  onUpdate: (data: Partial<GoogleCampaignData>) => void;
  onNext: () => void;
  onBack: () => void;
  onSaveDraft?: () => Promise<void>;
  aiSuggestions?: AICampaignSuggestions | null;
}

export function GoogleTargetAudienceStep({ data, onUpdate, onNext, onBack, onSaveDraft }: GoogleTargetAudienceStepProps) {
  const [formData, setFormData] = useState({
    targetLocations: data.targetLocations || [],
    targetLanguages: data.targetLanguages || [],
    targetGender: data.targetGender || "",
    ageRange: data.ageRange || [18, 65] as [number, number],
    keywords: data.keywords || [],
    audienceType: data.audienceType || ""
  });

  const [locationInput, setLocationInput] = useState("");
  const [languageInput, setLanguageInput] = useState("");
  const [keywordInput, setKeywordInput] = useState("");

  // Update formData when data prop changes (from AI suggestions)
  useEffect(() => {
    setFormData({
      targetLocations: data.targetLocations || [],
      targetLanguages: data.targetLanguages || [],
      targetGender: data.targetGender || "",
      ageRange: data.ageRange || [18, 65] as [number, number],
      keywords: data.keywords || [],
      audienceType: data.audienceType || ""
    });
  }, [data.targetLocations, data.targetLanguages, data.targetGender, data.ageRange, data.keywords, data.audienceType]);

  const handleChange = (field: string, value: any) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onUpdate(newData);
  };

  const addLocation = () => {
    if (locationInput.trim()) {
      const newLocations = [...formData.targetLocations, locationInput.trim()];
      handleChange("targetLocations", newLocations);
      setLocationInput("");
    }
  };

  const addLanguage = () => {
    if (languageInput.trim()) {
      const newLanguages = [...formData.targetLanguages, languageInput.trim()];
      handleChange("targetLanguages", newLanguages);
      setLanguageInput("");
    }
  };

  const addKeyword = () => {
    if (keywordInput.trim()) {
      const newKeywords = [...formData.keywords, keywordInput.trim()];
      handleChange("keywords", newKeywords);
      setKeywordInput("");
    }
  };

  const removeLocation = (index: number) => {
    const newLocations = formData.targetLocations.filter((_, i) => i !== index);
    handleChange("targetLocations", newLocations);
  };

  const removeLanguage = (index: number) => {
    const newLanguages = formData.targetLanguages.filter((_, i) => i !== index);
    handleChange("targetLanguages", newLanguages);
  };

  const removeKeyword = (index: number) => {
    const newKeywords = formData.keywords.filter((_, i) => i !== index);
    handleChange("keywords", newKeywords);
  };

  const isFormValid = () => {
    return formData.targetLocations.length > 0 && 
           formData.targetLanguages.length > 0 &&
           formData.targetGender &&
           formData.audienceType;
  };

  const saveDraft = async () => {
    if (onSaveDraft) {
      await onSaveDraft();
    }
  };

  return (
    <Card className="border border-gray-200 shadow-sm bg-white">
      <CardContent className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Target Locations */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">Target Locations *</Label>
            <div className="flex space-x-2">
              <Input
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                placeholder="Enter location"
                onKeyPress={(e) => e.key === 'Enter' && addLocation()}
              />
              <Button type="button" onClick={addLocation} variant="outline">Add</Button>
            </div>
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
              {formData.targetLocations.map((location, index) => (
                <span
                  key={index}
                  className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center space-x-1"
                >
                  <span>{location}</span>
                  <button
                    onClick={() => removeLocation(index)}
                    className="text-purple-600 hover:text-purple-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Target Languages */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">Target Languages *</Label>
            <div className="flex space-x-2">
              <Input
                value={languageInput}
                onChange={(e) => setLanguageInput(e.target.value)}
                placeholder="Enter language"
                onKeyPress={(e) => e.key === 'Enter' && addLanguage()}
              />
              <Button type="button" onClick={addLanguage} variant="outline">Add</Button>
            </div>
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
              {formData.targetLanguages.map((language, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center space-x-1"
                >
                  <span>{language}</span>
                  <button
                    onClick={() => removeLanguage(index)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Gender Targeting */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Gender *</Label>
            <Select value={formData.targetGender} onValueChange={(value) => handleChange("targetGender", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genders</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Audience Type */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Audience Type *</Label>
            <Select value={formData.audienceType} onValueChange={(value) => handleChange("audienceType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select audience type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="search_terms">Search Terms</SelectItem>
                <SelectItem value="display_keywords">Display Keywords</SelectItem>
                <SelectItem value="interests">Interests</SelectItem>
                <SelectItem value="demographics">Demographics</SelectItem>
                <SelectItem value="remarketing">Remarketing</SelectItem>
                <SelectItem value="similar_audiences">Similar Audiences</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Age Range */}
          <div className="md:col-span-2 space-y-3">
            <Label className="text-sm font-medium text-gray-700">
              Age Range: {formData.ageRange[0]} - {formData.ageRange[1]} years
            </Label>
            <Slider
              value={formData.ageRange}
              onValueChange={(value) => handleChange("ageRange", value as [number, number])}
              max={75}
              min={18}
              step={1}
              className="w-full"
            />
          </div>
        </div>

        {/* Keywords - Full Width Below */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">Keywords (Optional)</Label>
            <div className="flex space-x-2">
              <Input
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                placeholder="Enter keyword"
                onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
              />
              <Button type="button" onClick={addKeyword} variant="outline">Add</Button>
            </div>
            
            {/* Keyword Chips - Full Width */}
            {formData.keywords.length > 0 && (
              <div className="flex flex-row flex-wrap gap-2 items-center mt-3">
                {formData.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm space-x-1"
                  >
                    <span>{keyword}</span>
                    <button
                      onClick={() => removeKeyword(index)}
                      className="text-green-600 hover:text-green-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
            <p className="text-xs text-gray-500">Press Enter to add keywords</p>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={onBack}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
            
            <Button 
              variant="outline" 
              onClick={saveDraft}
              className="flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save as Draft</span>
            </Button>
          </div>
          
          <Button 
            onClick={onNext}
            disabled={!isFormValid()}
            className="bg-gradient-to-r from-[#7C3AED] to-[#D946EF] hover:from-purple-700 hover:to-pink-600 text-white px-8"
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
