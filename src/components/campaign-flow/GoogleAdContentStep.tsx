
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, Eye } from "lucide-react";
import { GoogleCampaignData } from "../GoogleAdCampaignFlow";

import { AICampaignSuggestions } from "@/types/ai-campaign";

interface GoogleAdContentStepProps {
  data: GoogleCampaignData;
  onUpdate: (data: Partial<GoogleCampaignData>) => void;
  onBack: () => void;
  onSaveDraft?: () => Promise<void>;
  aiSuggestions?: AICampaignSuggestions | null;
}

export function GoogleAdContentStep({ data, onUpdate, onBack, onSaveDraft }: GoogleAdContentStepProps) {
  const [formData, setFormData] = useState({
    headline1: data.headline1 || "",
    headline2: data.headline2 || "",
    headline3: data.headline3 || "",
    description1: data.description1 || "",
    description2: data.description2 || "",
    finalUrl: data.finalUrl || "",
    displayUrl: data.displayUrl || "",
    adFormat: data.adFormat || "",
    callToAction: data.callToAction || ""
  });

  // Update formData when data prop changes (from AI suggestions)
  useEffect(() => {
    setFormData({
      headline1: data.headline1 || "",
      headline2: data.headline2 || "",
      headline3: data.headline3 || "",
      description1: data.description1 || "",
      description2: data.description2 || "",
      finalUrl: data.finalUrl || "",
      displayUrl: data.displayUrl || "",
      adFormat: data.adFormat || "",
      callToAction: data.callToAction || ""
    });
  }, [data.headline1, data.headline2, data.headline3, data.description1, data.description2, data.finalUrl, data.displayUrl, data.adFormat, data.callToAction]);

  const handleChange = (field: string, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onUpdate(newData);
  };

  const isFormValid = () => {
    return formData.headline1 && 
           formData.description1 && 
           formData.finalUrl && 
           formData.adFormat;
  };

  const saveDraft = async () => {
    if (onSaveDraft) {
      await onSaveDraft();
    }
  };

  const publishCampaign = () => {
    console.log("Publishing Google Ads campaign:", { ...data, ...formData });
  };

  return (
    <div className="space-y-6">
      <Card className="border border-gray-200 shadow-sm bg-white">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Form */}
            <div className="space-y-6">
              {/* Headlines */}
              <div className="space-y-4">
                <Label className="text-lg font-medium text-gray-900">Headlines</Label>
                
                <div className="space-y-2">
                  <Label htmlFor="headline1" className="text-sm font-medium text-gray-700">
                    Headline 1 * (max 30 characters)
                  </Label>
                  <Input
                    id="headline1"
                    value={formData.headline1}
                    onChange={(e) => handleChange("headline1", e.target.value)}
                    placeholder="Enter main headline"
                    maxLength={30}
                  />
                  <span className="text-xs text-gray-500">{formData.headline1.length}/30</span>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="headline2" className="text-sm font-medium text-gray-700">
                    Headline 2 (max 30 characters)
                  </Label>
                  <Input
                    id="headline2"
                    value={formData.headline2}
                    onChange={(e) => handleChange("headline2", e.target.value)}
                    placeholder="Enter second headline"
                    maxLength={30}
                  />
                  <span className="text-xs text-gray-500">{formData.headline2.length}/30</span>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="headline3" className="text-sm font-medium text-gray-700">
                    Headline 3 (max 30 characters)
                  </Label>
                  <Input
                    id="headline3"
                    value={formData.headline3}
                    onChange={(e) => handleChange("headline3", e.target.value)}
                    placeholder="Enter third headline"
                    maxLength={30}
                  />
                  <span className="text-xs text-gray-500">{formData.headline3.length}/30</span>
                </div>
              </div>

              {/* Descriptions */}
              <div className="space-y-4">
                <Label className="text-lg font-medium text-gray-900">Descriptions</Label>
                
                <div className="space-y-2">
                  <Label htmlFor="description1" className="text-sm font-medium text-gray-700">
                    Description 1 * (max 90 characters)
                  </Label>
                  <Textarea
                    id="description1"
                    value={formData.description1}
                    onChange={(e) => handleChange("description1", e.target.value)}
                    placeholder="Enter main description"
                    maxLength={90}
                    rows={3}
                  />
                  <span className="text-xs text-gray-500">{formData.description1.length}/90</span>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description2" className="text-sm font-medium text-gray-700">
                    Description 2 (max 90 characters)
                  </Label>
                  <Textarea
                    id="description2"
                    value={formData.description2}
                    onChange={(e) => handleChange("description2", e.target.value)}
                    placeholder="Enter second description"
                    maxLength={90}
                    rows={3}
                  />
                  <span className="text-xs text-gray-500">{formData.description2.length}/90</span>
                </div>
              </div>

              {/* URLs and Format */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="finalUrl" className="text-sm font-medium text-gray-700">
                    Final URL *
                  </Label>
                  <Input
                    id="finalUrl"
                    value={formData.finalUrl}
                    onChange={(e) => handleChange("finalUrl", e.target.value)}
                    placeholder="https://example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="displayUrl" className="text-sm font-medium text-gray-700">
                    Display URL
                  </Label>
                  <Input
                    id="displayUrl"
                    value={formData.displayUrl}
                    onChange={(e) => handleChange("displayUrl", e.target.value)}
                    placeholder="example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="adFormat" className="text-sm font-medium text-gray-700">
                    Ad Format *
                  </Label>
                  <Select value={formData.adFormat} onValueChange={(value) => handleChange("adFormat", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ad format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="responsive_search">Responsive Search Ad</SelectItem>
                      <SelectItem value="expanded_text">Expanded Text Ad</SelectItem>
                      <SelectItem value="display_responsive">Responsive Display Ad</SelectItem>
                      <SelectItem value="image">Image Ad</SelectItem>
                      <SelectItem value="video">Video Ad</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="callToAction" className="text-sm font-medium text-gray-700">
                    Call to Action
                  </Label>
                  <Select value={formData.callToAction} onValueChange={(value) => handleChange("callToAction", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select call to action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="learn_more">Learn More</SelectItem>
                      <SelectItem value="shop_now">Shop Now</SelectItem>
                      <SelectItem value="sign_up">Sign Up</SelectItem>
                      <SelectItem value="download">Download</SelectItem>
                      <SelectItem value="get_quote">Get Quote</SelectItem>
                      <SelectItem value="contact_us">Contact Us</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Right Column - Preview */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-4">
                <Eye className="w-5 h-5 text-gray-600" />
                <Label className="text-lg font-medium text-gray-900">Ad Preview</Label>
              </div>
              
              <Card className="border border-gray-300 bg-white p-4">
                <div className="space-y-2">
                  <div className="text-blue-600 text-sm">{formData.displayUrl || "example.com"}</div>
                  <div className="text-blue-800 text-lg font-medium hover:underline cursor-pointer">
                    {formData.headline1 || "Your headline here"}
                  </div>
                  {formData.headline2 && (
                    <div className="text-blue-800 text-lg font-medium hover:underline cursor-pointer">
                      {formData.headline2}
                    </div>
                  )}
                  <div className="text-gray-700 text-sm">
                    {formData.description1 || "Your description will appear here..."}
                  </div>
                </div>
              </Card>

              <div className="text-xs text-gray-500 p-3 bg-gray-50 rounded">
                <strong>Note:</strong> This is a simplified preview. Your actual ad may appear differently based on device, placement, and Google's formatting.
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
              onClick={publishCampaign}
              disabled={!isFormValid()}
              className="bg-gradient-to-r from-[#7C3AED] to-[#D946EF] hover:from-purple-700 hover:to-pink-600 text-white px-8"
            >
              Launch Campaign
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
