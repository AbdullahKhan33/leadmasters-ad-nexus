
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Save } from "lucide-react";
import { LinkedInCampaignData } from "../LinkedInAdCampaignFlow";

import { AICampaignSuggestions } from "@/types/ai-campaign";

interface LinkedInTargetAudienceStepProps {
  data: LinkedInCampaignData;
  onUpdate: (data: Partial<LinkedInCampaignData>) => void;
  onNext: () => void;
  onBack: () => void;
  onSaveDraft?: () => Promise<void>;
  aiSuggestions?: AICampaignSuggestions | null;
}

export function LinkedInTargetAudienceStep({ data, onUpdate, onNext, onBack, onSaveDraft }: LinkedInTargetAudienceStepProps) {
  const [formData, setFormData] = useState({
    targetLocations: data.targetLocations || [],
    jobTitles: data.jobTitles || [],
    companies: data.companies || [],
    industries: data.industries || [],
    skills: data.skills || [],
    seniority: data.seniority || [],
    companySize: data.companySize || [],
    targetGender: data.targetGender || "",
    ageRange: data.ageRange || [25, 55] as [number, number]
  });

  const [locationInput, setLocationInput] = useState("");
  const [jobTitleInput, setJobTitleInput] = useState("");
  const [companyInput, setCompanyInput] = useState("");
  const [industryInput, setIndustryInput] = useState("");
  const [skillInput, setSkillInput] = useState("");

  // Update formData when data prop changes (from AI suggestions)
  useEffect(() => {
    setFormData({
      targetLocations: data.targetLocations || [],
      jobTitles: data.jobTitles || [],
      companies: data.companies || [],
      industries: data.industries || [],
      skills: data.skills || [],
      seniority: data.seniority || [],
      companySize: data.companySize || [],
      targetGender: data.targetGender || "",
      ageRange: data.ageRange || [25, 55] as [number, number]
    });
  }, [data.targetLocations, data.jobTitles, data.companies, data.industries, data.skills, data.seniority, data.companySize, data.targetGender, data.ageRange]);

  const handleChange = (field: string, value: any) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onUpdate(newData);
  };

  const addToArray = (arrayName: string, value: string, setInput: (value: string) => void) => {
    if (value.trim()) {
      const currentArray = formData[arrayName as keyof typeof formData] as string[];
      const newArray = [...currentArray, value.trim()];
      handleChange(arrayName, newArray);
      setInput("");
    }
  };

  const removeFromArray = (arrayName: string, index: number) => {
    const currentArray = formData[arrayName as keyof typeof formData] as string[];
    const newArray = currentArray.filter((_, i) => i !== index);
    handleChange(arrayName, newArray);
  };

  const isFormValid = () => {
    return formData.targetLocations.length > 0 && 
           (formData.jobTitles.length > 0 || formData.companies.length > 0 || formData.industries.length > 0);
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
                onKeyPress={(e) => e.key === 'Enter' && addToArray("targetLocations", locationInput, setLocationInput)}
              />
              <Button type="button" onClick={() => addToArray("targetLocations", locationInput, setLocationInput)} variant="outline">Add</Button>
            </div>
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
              {formData.targetLocations.map((location, index) => (
                <span
                  key={index}
                  className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center space-x-1"
                >
                  <span>{location}</span>
                  <button
                    onClick={() => removeFromArray("targetLocations", index)}
                    className="text-purple-600 hover:text-purple-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Job Titles */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">Job Titles</Label>
            <div className="flex space-x-2">
              <Input
                value={jobTitleInput}
                onChange={(e) => setJobTitleInput(e.target.value)}
                placeholder="Enter job title"
                onKeyPress={(e) => e.key === 'Enter' && addToArray("jobTitles", jobTitleInput, setJobTitleInput)}
              />
              <Button type="button" onClick={() => addToArray("jobTitles", jobTitleInput, setJobTitleInput)} variant="outline">Add</Button>
            </div>
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
              {formData.jobTitles.map((title, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center space-x-1"
                >
                  <span>{title}</span>
                  <button
                    onClick={() => removeFromArray("jobTitles", index)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Companies */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">Target Companies</Label>
            <div className="flex space-x-2">
              <Input
                value={companyInput}
                onChange={(e) => setCompanyInput(e.target.value)}
                placeholder="Enter company name"
                onKeyPress={(e) => e.key === 'Enter' && addToArray("companies", companyInput, setCompanyInput)}
              />
              <Button type="button" onClick={() => addToArray("companies", companyInput, setCompanyInput)} variant="outline">Add</Button>
            </div>
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
              {formData.companies.map((company, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center space-x-1"
                >
                  <span>{company}</span>
                  <button
                    onClick={() => removeFromArray("companies", index)}
                    className="text-green-600 hover:text-green-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Industries */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">Industries</Label>
            <div className="flex space-x-2">
              <Input
                value={industryInput}
                onChange={(e) => setIndustryInput(e.target.value)}
                placeholder="Enter industry"
                onKeyPress={(e) => e.key === 'Enter' && addToArray("industries", industryInput, setIndustryInput)}
              />
              <Button type="button" onClick={() => addToArray("industries", industryInput, setIndustryInput)} variant="outline">Add</Button>
            </div>
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
              {formData.industries.map((industry, index) => (
                <span
                  key={index}
                  className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm flex items-center space-x-1"
                >
                  <span>{industry}</span>
                  <button
                    onClick={() => removeFromArray("industries", index)}
                    className="text-yellow-600 hover:text-yellow-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">Skills</Label>
            <div className="flex space-x-2">
              <Input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="Enter skill"
                onKeyPress={(e) => e.key === 'Enter' && addToArray("skills", skillInput, setSkillInput)}
              />
              <Button type="button" onClick={() => addToArray("skills", skillInput, setSkillInput)} variant="outline">Add</Button>
            </div>
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
              {formData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm flex items-center space-x-1"
                >
                  <span>{skill}</span>
                  <button
                    onClick={() => removeFromArray("skills", index)}
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Seniority Level */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Seniority Level</Label>
            <Select 
              value={formData.seniority.join(",")} 
              onValueChange={(value) => handleChange("seniority", value.split(",").filter(Boolean))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select seniority levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unpaid">Unpaid</SelectItem>
                <SelectItem value="training">Training</SelectItem>
                <SelectItem value="entry">Entry</SelectItem>
                <SelectItem value="associate">Associate</SelectItem>
                <SelectItem value="mid_senior">Mid-Senior Level</SelectItem>
                <SelectItem value="director">Director</SelectItem>
                <SelectItem value="executive">Executive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Company Size */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Company Size</Label>
            <Select 
              value={formData.companySize.join(",")} 
              onValueChange={(value) => handleChange("companySize", value.split(",").filter(Boolean))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select company sizes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="self_employed">Self-employed</SelectItem>
                <SelectItem value="1_10">1-10 employees</SelectItem>
                <SelectItem value="11_50">11-50 employees</SelectItem>
                <SelectItem value="51_200">51-200 employees</SelectItem>
                <SelectItem value="201_500">201-500 employees</SelectItem>
                <SelectItem value="501_1000">501-1,000 employees</SelectItem>
                <SelectItem value="1001_5000">1,001-5,000 employees</SelectItem>
                <SelectItem value="5001_10000">5,001-10,000 employees</SelectItem>
                <SelectItem value="10001_plus">10,001+ employees</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Gender Targeting */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Gender</Label>
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

          {/* Age Range */}
          <div className="md:col-span-2 space-y-3">
            <Label className="text-sm font-medium text-gray-700">
              Age Range: {formData.ageRange[0]} - {formData.ageRange[1]} years
            </Label>
            <Slider
              value={formData.ageRange}
              onValueChange={(value) => handleChange("ageRange", value as [number, number])}
              max={65}
              min={18}
              step={1}
              className="w-full"
            />
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
