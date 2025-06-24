
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Save, ArrowLeft, Upload, Eye } from "lucide-react";
import { CampaignData } from "../FacebookAdCampaignFlow";

interface AdContentStepProps {
  data: CampaignData;
  onUpdate: (data: Partial<CampaignData>) => void;
  onBack: () => void;
}

export function AdContentStep({ data, onUpdate, onBack }: AdContentStepProps) {
  const [formData, setFormData] = useState({
    primaryText: data.primaryText || "",
    adLinkUrl: data.adLinkUrl || "",
    heading: data.heading || "",
    description: data.description || "",
    adFormat: data.adFormat || "single",
    callToAction: data.callToAction || ""
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (field: string, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onUpdate(newData);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpdate({ uploadedImage: file });
      
      // Create preview URL for the uploaded image
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const isFormValid = () => {
    return formData.primaryText && 
           formData.adLinkUrl && 
           formData.heading && 
           formData.callToAction;
  };

  const publishAd = () => {
    console.log("Publishing ad:", { ...data, ...formData });
    // TODO: Implement publish functionality
  };

  const saveDraft = () => {
    console.log("Saving draft:", formData);
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
                Primary Text *
              </Label>
              <Textarea
                id="primaryText"
                value={formData.primaryText}
                onChange={(e) => handleChange("primaryText", e.target.value)}
                placeholder="Write the main text for your ad..."
                className="min-h-[100px]"
                maxLength={2200}
              />
              <div className="text-xs text-gray-500 text-right">
                {formData.primaryText.length}/2200 characters
              </div>
            </div>

            {/* Ad Link URL */}
            <div className="space-y-2">
              <Label htmlFor="adLinkUrl" className="text-sm font-medium text-gray-700">
                Ad Link URL *
              </Label>
              <Input
                id="adLinkUrl"
                type="url"
                value={formData.adLinkUrl}
                onChange={(e) => handleChange("adLinkUrl", e.target.value)}
                placeholder="https://your-website.com"
              />
            </div>

            {/* Heading */}
            <div className="space-y-2">
              <Label htmlFor="heading" className="text-sm font-medium text-gray-700">
                Heading *
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
              </RadioGroup>
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Upload Image
              </Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label htmlFor="imageUpload" className="cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG up to 10MB
                  </p>
                </label>
              </div>
              {data.uploadedImage && (
                <div className="mt-2 text-sm text-green-600">
                  ✓ Image uploaded: {data.uploadedImage.name}
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
                </SelectContent>
              </Select>
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
              onClick={publishAd}
              disabled={!isFormValid()}
              className="bg-gradient-to-r from-[#7C3AED] to-[#D946EF] hover:from-purple-700 hover:to-pink-600 text-white px-8"
            >
              Publish Ad
            </Button>
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
          
          {/* Mock Facebook Ad Preview */}
          <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
            {/* Facebook Post Header */}
            <div className="p-3 border-b flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                L
              </div>
              <div>
                <div className="font-semibold text-sm">LeadMasters Official</div>
                <div className="text-xs text-gray-500">Sponsored</div>
              </div>
            </div>
            
            {/* Ad Content */}
            <div className="p-3">
              {formData.primaryText && (
                <p className="text-sm text-gray-900 mb-3">
                  {formData.primaryText}
                </p>
              )}
            </div>
            
            {/* Image Preview */}
            <div className="bg-gray-200 h-48 flex items-center justify-center">
              {imagePreview ? (
                <img 
                  src={imagePreview} 
                  alt="Ad preview" 
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <div className="text-gray-500 text-center">
                  <Upload className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm">Image Preview</p>
                </div>
              )}
            </div>
            
            {/* Link Preview */}
            <div className="p-3 bg-gray-50 border-t">
              <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                {formData.adLinkUrl || "your-website.com"}
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
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                    {formData.callToAction.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          {/* Preview Notes */}
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-700">
              <strong>Preview Note:</strong> This is a simplified preview. Your actual ad may appear differently based on Facebook's algorithms and user device.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
