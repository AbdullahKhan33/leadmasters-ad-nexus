
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Save, ArrowLeft, Upload, Eye, Instagram, Globe, MessageCircle } from "lucide-react";
import { InstagramCampaignData } from "../InstagramAdCampaignFlow";

interface InstagramAdContentStepProps {
  data: InstagramCampaignData;
  onUpdate: (data: Partial<InstagramCampaignData>) => void;
  onBack: () => void;
}

export function InstagramAdContentStep({ data, onUpdate, onBack }: InstagramAdContentStepProps) {
  const [formData, setFormData] = useState({
    primaryText: data.primaryText || "",
    heading: data.heading || "",
    description: data.description || "",
    adFormat: data.adFormat || "single",
    callToAction: data.callToAction || "",
    selectedChannel: data.selectedChannel || "website",
    websiteUrl: data.websiteUrl || "",
    whatsappNumber: data.whatsappNumber || "",
    instagramHandle: data.instagramHandle || ""
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (field: string, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onUpdate(newData);
  };

  const handleChannelChange = (channel: 'website' | 'whatsapp' | 'instagram') => {
    const newData = { ...formData, selectedChannel: channel };
    setFormData(newData);
    onUpdate(newData);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpdate({ uploadedImage: file });
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const isFormValid = () => {
    const channelFieldValid = 
      (formData.selectedChannel === 'website' && formData.websiteUrl) ||
      (formData.selectedChannel === 'whatsapp' && formData.whatsappNumber) ||
      (formData.selectedChannel === 'instagram' && formData.instagramHandle);
    
    return formData.primaryText && 
           channelFieldValid && 
           formData.heading && 
           formData.callToAction;
  };

  const publishAd = () => {
    console.log("Publishing Instagram ad:", { ...data, ...formData });
  };

  const saveDraft = () => {
    console.log("Saving Instagram draft:", formData);
  };

  const getChannelInfo = () => {
    switch (formData.selectedChannel) {
      case 'website':
        return {
          url: formData.websiteUrl,
          displayText: formData.websiteUrl ? new URL(formData.websiteUrl).hostname : "your-website.com"
        };
      case 'whatsapp':
        return {
          url: `https://wa.me/${formData.whatsappNumber.replace(/[^\d]/g, '')}`,
          displayText: formData.whatsappNumber || "WhatsApp"
        };
      case 'instagram':
        return {
          url: `https://instagram.com/${formData.instagramHandle}`,
          displayText: formData.instagramHandle ? `@${formData.instagramHandle}` : "@your_handle"
        };
      default:
        return { url: "", displayText: "" };
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Form Section */}
      <Card className="border border-gray-200 shadow-sm bg-white">
        <CardContent className="p-8">
          <div className="space-y-6">
            {/* Primary Text */}
            <div className="space-y-2">
              <Label htmlFor="primaryText" className="text-sm font-medium text-gray-700">
                Caption *
              </Label>
              <Textarea
                id="primaryText"
                value={formData.primaryText}
                onChange={(e) => handleChange("primaryText", e.target.value)}
                placeholder="Write your Instagram caption..."
                className="min-h-[100px]"
                maxLength={2200}
              />
              <div className="text-xs text-gray-500 text-right">
                {formData.primaryText.length}/2200 characters
              </div>
            </div>

            {/* Channel Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700">
                Choose Channel
              </Label>
              <div className="flex space-x-3">
                <Button
                  type="button"
                  variant={formData.selectedChannel === 'website' ? 'default' : 'outline'}
                  onClick={() => handleChannelChange('website')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 h-12 ${
                    formData.selectedChannel === 'website' 
                      ? 'bg-blue-500 hover:bg-blue-600 text-white border-blue-500' 
                      : 'border-gray-300 text-gray-700 hover:border-blue-400'
                  }`}
                >
                  <Globe className="w-5 h-5" />
                  <span>Website</span>
                </Button>
                <Button
                  type="button"
                  variant={formData.selectedChannel === 'whatsapp' ? 'default' : 'outline'}
                  onClick={() => handleChannelChange('whatsapp')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 h-12 ${
                    formData.selectedChannel === 'whatsapp' 
                      ? 'bg-green-500 hover:bg-green-600 text-white border-green-500' 
                      : 'border-gray-300 text-gray-700 hover:border-green-400'
                  }`}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>WhatsApp</span>
                </Button>
                <Button
                  type="button"
                  variant={formData.selectedChannel === 'instagram' ? 'default' : 'outline'}
                  onClick={() => handleChannelChange('instagram')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 h-12 ${
                    formData.selectedChannel === 'instagram' 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-purple-500' 
                      : 'border-gray-300 text-gray-700 hover:border-purple-400'
                  }`}
                >
                  <Instagram className="w-5 h-5" />
                  <span>Instagram</span>
                </Button>
              </div>
              
              {/* Channel-specific input */}
              {formData.selectedChannel === 'website' && (
                <div className="space-y-2">
                  <Label htmlFor="websiteUrl" className="text-sm font-medium text-gray-700">
                    Website URL *
                  </Label>
                  <Input
                    id="websiteUrl"
                    type="url"
                    value={formData.websiteUrl}
                    onChange={(e) => handleChange("websiteUrl", e.target.value)}
                    placeholder="https://your-website.com"
                  />
                </div>
              )}
              
              {formData.selectedChannel === 'whatsapp' && (
                <div className="space-y-2">
                  <Label htmlFor="whatsappNumber" className="text-sm font-medium text-gray-700">
                    WhatsApp Number *
                  </Label>
                  <Input
                    id="whatsappNumber"
                    type="tel"
                    value={formData.whatsappNumber}
                    onChange={(e) => handleChange("whatsappNumber", e.target.value)}
                    placeholder="+1234567890"
                  />
                </div>
              )}
              
              {formData.selectedChannel === 'instagram' && (
                <div className="space-y-2">
                  <Label htmlFor="instagramHandle" className="text-sm font-medium text-gray-700">
                    Instagram Handle *
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-500">
                      @
                    </div>
                    <Input
                      id="instagramHandle"
                      value={formData.instagramHandle}
                      onChange={(e) => handleChange("instagramHandle", e.target.value)}
                      placeholder="bot_campus_ai"
                      className="pl-8"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Remove the old Ad Link URL field - replaced by channel-specific inputs */}

            {/* Heading */}
            <div className="space-y-2">
              <Label htmlFor="heading" className="text-sm font-medium text-gray-700">
                Headline *
              </Label>
              <Input
                id="heading"
                value={formData.heading}
                onChange={(e) => handleChange("heading", e.target.value)}
                placeholder="Enter a compelling headline"
                maxLength={40}
              />
              <div className="text-xs text-gray-500 text-right">
                {formData.heading.length}/40 characters
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Add a brief description..."
                maxLength={150}
              />
              <div className="text-xs text-gray-500 text-right">
                {formData.description.length}/150 characters
              </div>
            </div>

            {/* Ad Format */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700">
                Ad Format
              </Label>
              <RadioGroup 
                value={formData.adFormat} 
                onValueChange={(value) => handleChange("adFormat", value)}
                className="flex space-x-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="single" id="single" />
                  <Label htmlFor="single" className="text-sm">Single Image</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="carousel" id="carousel" />
                  <Label htmlFor="carousel" className="text-sm">Carousel</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="story" id="story" />
                  <Label htmlFor="story" className="text-sm">Story</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Upload Image/Video
              </Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*,video/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label htmlFor="imageUpload" className="cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG, MP4 up to 10MB
                  </p>
                </label>
              </div>
              {data.uploadedImage && (
                <div className="mt-2 text-sm text-green-600">
                  ✓ Media uploaded: {data.uploadedImage.name}
                </div>
              )}
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
                  <SelectItem value="shop_now">Shop Now</SelectItem>
                  <SelectItem value="sign_up">Sign Up</SelectItem>
                  <SelectItem value="download">Download</SelectItem>
                  <SelectItem value="get_quote">Get Quote</SelectItem>
                  <SelectItem value="contact_us">Contact Us</SelectItem>
                  <SelectItem value="book_now">Book Now</SelectItem>
                  <SelectItem value="watch_more">Watch More</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Preview Panel */}
      <Card className="border border-gray-200 shadow-sm bg-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <Eye className="w-5 h-5 text-purple-600" />
              <span>Live Preview</span>
            </h3>
          </div>
          
          {/* Mock Instagram Ad Preview */}
          <div className="border rounded-lg overflow-hidden bg-white shadow-sm max-w-sm mx-auto">
            {/* Instagram Post Header */}
            <div className="p-3 border-b flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                <Instagram className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm">leadmasters_official</div>
                <div className="text-xs text-gray-500">Sponsored</div>
              </div>
            </div>
            
            {/* Image Preview */}
            <div className="bg-gray-200 aspect-square flex items-center justify-center">
              {imagePreview ? (
                <img 
                  src={imagePreview} 
                  alt="Ad preview" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-gray-500 text-center">
                  <Upload className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm">Image Preview</p>
                </div>
              )}
            </div>
            
            {/* Instagram Post Content */}
            <div className="p-3">
              {formData.primaryText && (
                <div className="text-sm text-gray-900 mb-3">
                  <span className="font-semibold">leadmasters_official</span>{" "}
                  {formData.primaryText}
                </div>
              )}
              
              {/* Link Preview */}
              {getChannelInfo().url && (
                <div className="border rounded-lg p-3 bg-gray-50 mt-3">
                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                    {getChannelInfo().displayText}
                  </div>
                  <div className="font-semibold text-sm text-gray-900">
                    {formData.heading || "Your Headline Here"}
                  </div>
                  {formData.description && (
                    <div className="text-sm text-gray-600 mt-1">
                      {formData.description}
                    </div>
                  )}
                  {formData.callToAction && (
                    <div className="mt-3">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs">
                        {formData.callToAction.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Preview Notes */}
          <div className="mt-4 p-3 bg-pink-50 rounded-lg">
            <p className="text-xs text-pink-700">
              <strong>Preview Note:</strong> This is a simplified preview. Your actual Instagram ad may appear differently based on Instagram's algorithms and user device.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Fixed Bottom Actions */}
      <div className="lg:col-span-2 mt-8">
        <Card className="border border-gray-200 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
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
                onClick={publishAd}
                disabled={!isFormValid()}
                className="bg-gradient-to-r from-[#7C3AED] to-[#D946EF] hover:from-purple-700 hover:to-pink-600 text-white px-8"
              >
                Publish Ad
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
