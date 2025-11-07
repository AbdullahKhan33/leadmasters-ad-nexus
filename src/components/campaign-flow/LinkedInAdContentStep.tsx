
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, Eye, Upload } from "lucide-react";
import { LinkedInCampaignData } from "../LinkedInAdCampaignFlow";

import { AICampaignSuggestions } from "@/types/ai-campaign";

interface LinkedInAdContentStepProps {
  data: LinkedInCampaignData;
  onUpdate: (data: Partial<LinkedInCampaignData>) => void;
  onBack: () => void;
  onSaveDraft?: () => Promise<void>;
  aiSuggestions?: AICampaignSuggestions | null;
}

export function LinkedInAdContentStep({ data, onUpdate, onBack, onSaveDraft }: LinkedInAdContentStepProps) {
  const [formData, setFormData] = useState({
    adFormat: data.adFormat || "",
    headline: data.headline || "",
    description: data.description || "",
    callToAction: data.callToAction || "",
    destinationUrl: data.destinationUrl || "",
    uploadedImage: data.uploadedImage || null,
    companyName: data.companyName || ""
  });

  // Update formData when data prop changes (from AI suggestions)
  useEffect(() => {
    setFormData({
      adFormat: data.adFormat || "",
      headline: data.headline || "",
      description: data.description || "",
      callToAction: data.callToAction || "",
      destinationUrl: data.destinationUrl || "",
      uploadedImage: data.uploadedImage || null,
      companyName: data.companyName || ""
    });
  }, [data.adFormat, data.headline, data.description, data.callToAction, data.destinationUrl, data.uploadedImage, data.companyName]);

  const handleChange = (field: string, value: string | File | null) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onUpdate(newData);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    handleChange("uploadedImage", file);
  };

  const isFormValid = () => {
    return formData.adFormat && 
           formData.headline && 
           formData.description && 
           formData.destinationUrl &&
           formData.callToAction;
  };

  const saveDraft = async () => {
    if (onSaveDraft) {
      await onSaveDraft();
    }
  };

  const publishCampaign = () => {
    console.log("Publishing LinkedIn campaign:", { ...data, ...formData });
  };

  return (
    <div className="space-y-6">
      <Card className="border border-gray-200 shadow-sm bg-white">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Form */}
            <div className="space-y-6">
              {/* Ad Format */}
              <div className="space-y-2">
                <Label htmlFor="adFormat" className="text-sm font-medium text-gray-700">
                  Ad Format *
                </Label>
                <Select value={formData.adFormat} onValueChange={(value) => handleChange("adFormat", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ad format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single_image">Single Image Ad</SelectItem>
                    <SelectItem value="carousel">Carousel Ad</SelectItem>
                    <SelectItem value="video">Video Ad</SelectItem>
                    <SelectItem value="message">Message Ad</SelectItem>
                    <SelectItem value="conversation">Conversation Ad</SelectItem>
                    <SelectItem value="text">Text Ad</SelectItem>
                    <SelectItem value="spotlight">Spotlight Ad</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Company Name */}
              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-sm font-medium text-gray-700">
                  Company Name
                </Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => handleChange("companyName", e.target.value)}
                  placeholder="Enter your company name"
                />
              </div>

              {/* Headline */}
              <div className="space-y-2">
                <Label htmlFor="headline" className="text-sm font-medium text-gray-700">
                  Headline * (max 200 characters)
                </Label>
                <Input
                  id="headline"
                  value={formData.headline}
                  onChange={(e) => handleChange("headline", e.target.value)}
                  placeholder="Enter compelling headline"
                  maxLength={200}
                />
                <span className="text-xs text-gray-500">{formData.headline.length}/200</span>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                  Description * (max 600 characters)
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Write your ad description..."
                  maxLength={600}
                  rows={4}
                />
                <span className="text-xs text-gray-500">{formData.description.length}/600</span>
              </div>

              {/* Destination URL */}
              <div className="space-y-2">
                <Label htmlFor="destinationUrl" className="text-sm font-medium text-gray-700">
                  Destination URL *
                </Label>
                <Input
                  id="destinationUrl"
                  value={formData.destinationUrl}
                  onChange={(e) => handleChange("destinationUrl", e.target.value)}
                  placeholder="https://example.com"
                />
              </div>

              {/* Call to Action */}
              <div className="space-y-2">
                <Label htmlFor="callToAction" className="text-sm font-medium text-gray-700">
                  Call to Action *
                </Label>
                <Select value={formData.callToAction} onValueChange={(value) => handleChange("callToAction", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select call to action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="learn_more">Learn More</SelectItem>
                    <SelectItem value="sign_up">Sign Up</SelectItem>
                    <SelectItem value="download">Download</SelectItem>
                    <SelectItem value="visit_website">Visit Website</SelectItem>
                    <SelectItem value="contact_us">Contact Us</SelectItem>
                    <SelectItem value="apply_now">Apply Now</SelectItem>
                    <SelectItem value="register">Register</SelectItem>
                    <SelectItem value="get_quote">Get Quote</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Upload Image
                </Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">
                    Upload your ad image (Recommended: 1200x627px)
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => document.getElementById('image-upload')?.click()}
                  >
                    Choose File
                  </Button>
                  {formData.uploadedImage && (
                    <p className="text-sm text-green-600 mt-2">
                      ✓ {formData.uploadedImage.name} uploaded
                    </p>
                  )}
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
                <div className="space-y-3">
                  {/* Company Info */}
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-600 rounded text-white text-sm font-bold flex items-center justify-center">
                      {formData.companyName ? formData.companyName.charAt(0).toUpperCase() : "C"}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {formData.companyName || "Your Company"}
                      </div>
                      <div className="text-xs text-gray-500">Promoted</div>
                    </div>
                  </div>
                  
                  {/* Image Preview */}
                  {formData.uploadedImage && (
                    <div className="w-full h-48 bg-gray-200 rounded overflow-hidden">
                      <img 
                        src={URL.createObjectURL(formData.uploadedImage)} 
                        alt="Ad preview" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  {/* Headline */}
                  <div className="text-sm font-medium text-gray-900">
                    {formData.headline || "Your compelling headline will appear here"}
                  </div>
                  
                  {/* Description */}
                  <div className="text-sm text-gray-600">
                    {formData.description || "Your ad description will appear here..."}
                  </div>
                  
                  {/* CTA Button */}
                  <Button 
                    size="sm" 
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs"
                    disabled
                  >
                    {formData.callToAction ? formData.callToAction.replace('_', ' ').split(' ').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ') : "Call to Action"}
                  </Button>
                </div>
              </Card>

              <div className="text-xs text-gray-500 p-3 bg-gray-50 rounded">
                <strong>Note:</strong> This is a simplified preview. Your actual ad may appear differently based on placement and LinkedIn's formatting.
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
