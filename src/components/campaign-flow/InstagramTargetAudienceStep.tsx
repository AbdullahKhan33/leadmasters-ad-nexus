
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Save, ArrowLeft, Users, MapPin, Heart } from "lucide-react";
import { InstagramCampaignData } from "../InstagramAdCampaignFlow";

import { AICampaignSuggestions } from "@/types/ai-campaign";

interface InstagramTargetAudienceStepProps {
  data: InstagramCampaignData;
  onUpdate: (data: Partial<InstagramCampaignData>) => void;
  onNext: () => void;
  onBack: () => void;
  aiSuggestions?: AICampaignSuggestions | null;
}

export function InstagramTargetAudienceStep({ data, onUpdate, onNext, onBack }: InstagramTargetAudienceStepProps) {
  const [formData, setFormData] = useState({
    instagramAccount: data.instagramAccount || "",
    targetLocations: data.targetLocations || [],
    targetGender: data.targetGender || "",
    ageRange: data.ageRange || [18, 65] as [number, number],
    interests: data.interests || []
  });

  const [locationInput, setLocationInput] = useState("");
  const [interestInput, setInterestInput] = useState("");

  const handleChange = (field: string, value: any) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onUpdate(newData);
  };

  const addLocation = (location: string) => {
    if (location && !formData.targetLocations.includes(location)) {
      const newLocations = [...formData.targetLocations, location];
      handleChange("targetLocations", newLocations);
      setLocationInput("");
    }
  };

  const removeLocation = (location: string) => {
    const newLocations = formData.targetLocations.filter(loc => loc !== location);
    handleChange("targetLocations", newLocations);
  };

  const addInterest = (interest: string) => {
    if (interest && !formData.interests.includes(interest)) {
      const newInterests = [...formData.interests, interest];
      handleChange("interests", newInterests);
      setInterestInput("");
    }
  };

  const removeInterest = (interest: string) => {
    const newInterests = formData.interests.filter(int => int !== interest);
    handleChange("interests", newInterests);
  };

  const getAudienceWidth = () => {
    const locations = formData.targetLocations.length;
    const interests = formData.interests.length;
    const ageSpan = formData.ageRange[1] - formData.ageRange[0];
    const hasGender = formData.targetGender && formData.targetGender !== "all";
    
    let width = 50;
    if (locations > 0) width += 15;
    if (interests > 0) width += 10;
    if (ageSpan < 20) width -= 15;
    if (hasGender) width -= 10;
    
    return Math.max(20, Math.min(80, width));
  };

  const getEstimatedReach = () => {
    const baseReach = 800000;
    const width = getAudienceWidth();
    return Math.floor((baseReach * width) / 100);
  };

  const isFormValid = () => {
    return formData.instagramAccount && 
           formData.targetLocations.length > 0 && 
           formData.targetGender;
  };

  const saveDraft = () => {
    console.log("Saving Instagram draft:", formData);
  };

  return (
    <Card className="border border-gray-200 shadow-sm bg-white">
      <CardContent className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {/* Instagram Account */}
            <div className="space-y-2">
              <Label htmlFor="instagramAccount" className="text-sm font-medium text-gray-700">
                Select Instagram Account *
              </Label>
              <Select value={formData.instagramAccount} onValueChange={(value) => handleChange("instagramAccount", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose your Instagram account" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="account1">@leadmasters_official</SelectItem>
                  <SelectItem value="account2">@business_solutions</SelectItem>
                  <SelectItem value="account3">@marketing_hub</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Target Locations */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700">
                Target Locations *
              </Label>
              <div className="flex space-x-2">
                <Select value={locationInput} onValueChange={setLocationInput}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Search and select locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="india">India</SelectItem>
                    <SelectItem value="mumbai">Mumbai, India</SelectItem>
                    <SelectItem value="delhi">Delhi, India</SelectItem>
                    <SelectItem value="bangalore">Bangalore, India</SelectItem>
                    <SelectItem value="hyderabad">Hyderabad, India</SelectItem>
                    <SelectItem value="pune">Pune, India</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  type="button" 
                  onClick={() => addLocation(locationInput)}
                  disabled={!locationInput}
                  variant="outline"
                >
                  Add
                </Button>
              </div>
              
              {formData.targetLocations.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.targetLocations.map((location, index) => (
                    <div 
                      key={index}
                      className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                    >
                      <MapPin className="w-3 h-3" />
                      <span>{location}</span>
                      <button 
                        onClick={() => removeLocation(location)}
                        className="text-purple-600 hover:text-purple-800"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Target Gender */}
            <div className="space-y-2">
              <Label htmlFor="targetGender" className="text-sm font-medium text-gray-700">
                Target Gender *
              </Label>
              <Select value={formData.targetGender} onValueChange={(value) => handleChange("targetGender", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Age Range */}
            <div className="space-y-4">
              <Label className="text-sm font-medium text-gray-700">
                Age Range: {formData.ageRange[0]} - {formData.ageRange[1]} years
              </Label>
              <Slider
                value={formData.ageRange}
                onValueChange={(value) => handleChange("ageRange", value as [number, number])}
                min={18}
                max={65}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>18</span>
                <span>65</span>
              </div>
            </div>

            {/* Interests */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700">
                Interests & Behaviors
              </Label>
              <div className="flex space-x-2">
                <Select value={interestInput} onValueChange={setInterestInput}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Add interests" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fitness">Fitness & Wellness</SelectItem>
                    <SelectItem value="fashion">Fashion</SelectItem>
                    <SelectItem value="travel">Travel</SelectItem>
                    <SelectItem value="food">Food & Cooking</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="photography">Photography</SelectItem>
                    <SelectItem value="art">Art & Design</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  type="button" 
                  onClick={() => addInterest(interestInput)}
                  disabled={!interestInput}
                  variant="outline"
                >
                  Add
                </Button>
              </div>
              
              {formData.interests.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.interests.map((interest, index) => (
                    <div 
                      key={index}
                      className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                    >
                      <Heart className="w-3 h-3" />
                      <span>{interest}</span>
                      <button 
                        onClick={() => removeInterest(interest)}
                        className="text-pink-600 hover:text-pink-800"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Audience Insights Panel */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Users className="w-5 h-5 text-purple-600" />
                <span>Audience Insights</span>
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Audience Definition</span>
                  <span className="text-purple-600 font-medium">
                    {getAudienceWidth() < 40 ? "Narrow" : getAudienceWidth() > 60 ? "Broad" : "Balanced"}
                  </span>
                </div>
                
                <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div className="flex h-full">
                    <div className="bg-red-400 w-1/3"></div>
                    <div className="bg-green-400 w-1/3"></div>
                    <div className="bg-red-400 w-1/3"></div>
                  </div>
                  <div 
                    className="absolute top-0 h-full w-2 bg-purple-600 rounded-full transition-all duration-300"
                    style={{ left: `${getAudienceWidth()}%`, transform: 'translateX(-50%)' }}
                  ></div>
                </div>
                
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Too Narrow</span>
                  <span>Balanced</span>
                  <span>Too Broad</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white rounded-lg border">
                <div className="text-sm text-gray-600 mb-1">Estimated Audience Size</div>
                <div className="text-2xl font-bold text-purple-600">
                  {getEstimatedReach().toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">people</div>
              </div>

              <div className="mt-4 text-xs text-gray-600">
                <p className="mb-2">📱 <strong>Instagram Tip:</strong> Visual content performs best with interest-based targeting.</p>
                <p>🎯 Consider adding lifestyle interests for better engagement rates.</p>
              </div>
            </div>
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
