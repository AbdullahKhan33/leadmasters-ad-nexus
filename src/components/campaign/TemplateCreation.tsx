
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Smartphone, Upload, MapPin, FileText, Image, Video, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Template {
  id: string;
  name: string;
  type: string;
  category: string;
  language: string;
  status: string;
  createdAt: string;
}

interface TemplateCreationProps {
  onTemplateCreated: (template: Template) => void;
  onCancel: () => void;
}

export function TemplateCreation({ onTemplateCreated, onCancel }: TemplateCreationProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    language: '',
    type: 'text' as 'text' | 'image' | 'video' | 'location',
    bodyText: '',
    footerText: '',
    buttons: [] as string[],
    mediaFile: null as File | null,
    mediaPreview: '',
    location: {
      name: '',
      address: '',
      latitude: '',
      longitude: ''
    }
  });

  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (!formData.name || !formData.bodyText) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (formData.type === 'location' && !formData.location.name) {
      toast({
        title: "Error", 
        description: "Please enter location details",
        variant: "destructive",
      });
      return;
    }

    const newTemplate: Template = {
      id: `TMP-${Date.now()}`,
      name: formData.name,
      type: formData.type.charAt(0).toUpperCase() + formData.type.slice(1),
      category: formData.category || 'General',
      language: formData.language || 'English',
      status: 'Pending',
      createdAt: new Date().toISOString().split('T')[0]
    };

    onTemplateCreated(newTemplate);
    toast({
      title: "Success",
      description: "Template created successfully!",
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');
    
    if (formData.type === 'image' && !isImage) {
      toast({
        title: "Error",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }
    
    if (formData.type === 'video' && !isVideo) {
      toast({
        title: "Error",
        description: "Please select a video file",
        variant: "destructive",
      });
      return;
    }

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    
    setFormData(prev => ({
      ...prev,
      mediaFile: file,
      mediaPreview: previewUrl
    }));
  };

  const removeMedia = () => {
    if (formData.mediaPreview) {
      URL.revokeObjectURL(formData.mediaPreview);
    }
    setFormData(prev => ({
      ...prev,
      mediaFile: null,
      mediaPreview: ''
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const addButton = () => {
    setFormData(prev => ({
      ...prev,
      buttons: [...prev.buttons, '']
    }));
  };

  const removeButton = (index: number) => {
    setFormData(prev => ({
      ...prev,
      buttons: prev.buttons.filter((_, i) => i !== index)
    }));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'text': return <FileText className="w-4 h-4" />;
      case 'image': return <Image className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'location': return <MapPin className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <Card className="border-none shadow-xl bg-gradient-to-br from-white to-purple-50/30 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
            <CardTitle className="text-xl font-bold flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Create New Template</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            {/* Template Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-semibold text-gray-700">Template Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter template name"
                className="h-11 border-2 border-gray-200 focus:border-purple-500 transition-all duration-200"
              />
            </div>

            {/* Template Type */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700">Template Type *</Label>
              <Select value={formData.type} onValueChange={(value: 'text' | 'image' | 'video' | 'location') => 
                setFormData(prev => ({ ...prev, type: value, mediaFile: null, mediaPreview: '' }))
              }>
                <SelectTrigger className="h-11 border-2 border-gray-200 focus:border-purple-500">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(formData.type)}
                    <SelectValue placeholder="Select template type" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4" />
                      <span>Text</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="image">
                    <div className="flex items-center space-x-2">
                      <Image className="w-4 h-4" />
                      <span>Image</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="video">
                    <div className="flex items-center space-x-2">
                      <Video className="w-4 h-4" />
                      <span>Video</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="location">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>Location</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Media Upload for Image/Video */}
            {(formData.type === 'image' || formData.type === 'video') && (
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-700">
                  Upload {formData.type === 'image' ? 'Image' : 'Video'} *
                </Label>
                <div className="flex items-center space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center space-x-2 border-2 border-dashed border-purple-300 hover:border-purple-500 hover:bg-purple-50 transition-all duration-200"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Browse {formData.type === 'image' ? 'Image' : 'Video'}</span>
                  </Button>
                  {formData.mediaFile && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span className="truncate max-w-[200px]">{formData.mediaFile.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={removeMedia}
                        className="text-red-500 hover:text-red-700 h-6 w-6 p-0"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={formData.type === 'image' ? 'image/*' : 'video/*'}
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            )}

            {/* Location Details */}
            {formData.type === 'location' && (
              <div className="space-y-4 p-4 bg-blue-50/50 rounded-lg border border-blue-200">
                <Label className="text-sm font-semibold text-gray-700">Location Details *</Label>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    placeholder="Location name"
                    value={formData.location.name}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      location: { ...prev.location, name: e.target.value }
                    }))}
                    className="border-blue-200 focus:border-blue-500"
                  />
                  <Input
                    placeholder="Address"
                    value={formData.location.address}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      location: { ...prev.location, address: e.target.value }
                    }))}
                    className="border-blue-200 focus:border-blue-500"
                  />
                  <Input
                    placeholder="Latitude (optional)"
                    value={formData.location.latitude}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      location: { ...prev.location, latitude: e.target.value }
                    }))}
                    className="border-blue-200 focus:border-blue-500"
                  />
                  <Input
                    placeholder="Longitude (optional)"
                    value={formData.location.longitude}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      location: { ...prev.location, longitude: e.target.value }
                    }))}
                    className="border-blue-200 focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Category & Language */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Category</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger className="border-2 border-gray-200 focus:border-purple-500">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="transactional">Transactional</SelectItem>
                    <SelectItem value="utility">Utility</SelectItem>
                    <SelectItem value="reminder">Reminder</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Language</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, language: value }))}>
                  <SelectTrigger className="border-2 border-gray-200 focus:border-purple-500">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="hindi">Hindi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Body Text */}
            <div className="space-y-2">
              <Label htmlFor="bodyText" className="text-sm font-semibold text-gray-700">Message Content *</Label>
              <Textarea
                id="bodyText"
                value={formData.bodyText}
                onChange={(e) => setFormData(prev => ({ ...prev, bodyText: e.target.value }))}
                placeholder="Enter your message content here..."
                className="min-h-[120px] resize-none border-2 border-gray-200 focus:border-purple-500 transition-all duration-200"
              />
              <p className="text-xs text-gray-500 flex items-center space-x-1">
                <span>💡</span>
                <span>Use variables like {"{{"} 1 {"}"} for personalization</span>
              </p>
            </div>

            {/* Footer Text */}
            <div className="space-y-2">
              <Label htmlFor="footerText" className="text-sm font-semibold text-gray-700">Footer Text</Label>
              <Textarea
                id="footerText"
                value={formData.footerText}
                onChange={(e) => setFormData(prev => ({ ...prev, footerText: e.target.value }))}
                placeholder="Optional footer text"
                className="min-h-[60px] resize-none border-2 border-gray-200 focus:border-purple-500 transition-all duration-200"
              />
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold text-gray-700">Action Buttons</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addButton}
                  className="text-purple-600 border-purple-300 hover:bg-purple-50 hover:border-purple-500 transition-all duration-200"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Button
                </Button>
              </div>
              {formData.buttons.map((button, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    value={button}
                    onChange={(e) => {
                      const newButtons = [...formData.buttons];
                      newButtons[index] = e.target.value;
                      setFormData(prev => ({ ...prev, buttons: newButtons }));
                    }}
                    placeholder="Button text"
                    className="flex-1 border-2 border-gray-200 focus:border-purple-500"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeButton(index)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 h-9 w-9 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-6 border-t border-gray-200">
              <Button
                onClick={handleSubmit}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] h-12 font-semibold"
              >
                Create Template ✨
              </Button>
              <Button
                onClick={onCancel}
                variant="outline"
                className="flex-1 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 h-12"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Live Preview Section */}
        <Card className="border-none shadow-xl bg-gradient-to-br from-white to-green-50/30 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
            <div className="flex items-center space-x-2">
              <Smartphone className="w-5 h-5" />
              <CardTitle className="text-xl font-bold">Live Preview</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="bg-gradient-to-b from-green-100 to-green-200 rounded-2xl p-6 max-w-xs mx-auto shadow-inner">
              <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
                {/* Template Type Header */}
                <div className="mb-4 flex items-center justify-center space-x-2 p-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
                  {getTypeIcon(formData.type)}
                  <span className="text-xs font-semibold text-purple-700 uppercase tracking-wider">
                    {formData.type} Template
                  </span>
                </div>

                {/* Media Preview */}
                {formData.type === 'image' && formData.mediaPreview && (
                  <div className="mb-4 rounded-lg overflow-hidden">
                    <img 
                      src={formData.mediaPreview} 
                      alt="Preview" 
                      className="w-full h-32 object-cover"
                    />
                  </div>
                )}

                {formData.type === 'video' && formData.mediaPreview && (
                  <div className="mb-4 rounded-lg overflow-hidden bg-black">
                    <video 
                      src={formData.mediaPreview} 
                      className="w-full h-32 object-cover"
                      controls
                      muted
                    />
                  </div>
                )}

                {formData.type === 'location' && formData.location.name && (
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-blue-900 truncate">
                          {formData.location.name}
                        </p>
                        {formData.location.address && (
                          <p className="text-xs text-blue-700 mt-1 line-clamp-2">
                            {formData.location.address}
                          </p>
                        )}
                        {(formData.location.latitude && formData.location.longitude) && (
                          <p className="text-xs text-blue-600 mt-1 font-mono">
                            {formData.location.latitude}, {formData.location.longitude}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Body Message */}
                <div className="mb-4">
                  <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                    {formData.bodyText || (
                      <span className="text-gray-400 italic">
                        Your {formData.type} message will appear here...
                      </span>
                    )}
                  </p>
                </div>

                {/* Footer */}
                {formData.footerText && (
                  <div className="mb-4 pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-500 italic">
                      {formData.footerText}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                {formData.buttons.length > 0 && (
                  <div className="space-y-2 pt-3 border-t border-gray-100">
                    {formData.buttons.map((button, index) => (
                      button && (
                        <div 
                          key={index} 
                          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center py-2.5 px-4 rounded-lg text-sm font-medium shadow-sm hover-scale cursor-pointer transition-all duration-200"
                        >
                          {button}
                        </div>
                      )
                    ))}
                  </div>
                )}

                {/* Empty state for buttons */}
                {formData.buttons.length === 0 && (
                  <div className="pt-3 border-t border-gray-100">
                    <div className="bg-gray-100 text-gray-400 text-center py-2 px-4 rounded-lg text-xs italic">
                      Add buttons to see them here
                    </div>
                  </div>
                )}
              </div>
              
              {/* WhatsApp Footer */}
              <div className="text-center mt-4 space-y-1">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-xs text-gray-600 font-medium">WhatsApp Business</p>
                </div>
                <p className="text-xs text-gray-500">
                  {formData.name || 'Template Name'} • Just now
                </p>
              </div>
            </div>

            {/* Preview Controls */}
            <div className="mt-6 text-center">
              <div className="inline-flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-gray-600 font-medium">Live Preview</span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
