
import { useState } from "react";
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
import { Plus, Smartphone } from "lucide-react";

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
    headerFormat: '',
    bodyText: '',
    footerText: '',
    buttons: [] as string[]
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.bodyText) {
      return;
    }

    const newTemplate: Template = {
      id: `TMP-${Date.now()}`,
      name: formData.name,
      type: 'Marketing',
      category: formData.category || 'General',
      language: formData.language || 'English',
      status: 'Pending',
      createdAt: new Date().toLocaleDateString()
    };

    onTemplateCreated(newTemplate);
  };

  const addButton = () => {
    setFormData(prev => ({
      ...prev,
      buttons: [...prev.buttons, '']
    }));
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <Card className="border border-gray-200 shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Template Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Template Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Template Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter template name"
                className="w-full"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="transactional">Transactional</SelectItem>
                  <SelectItem value="utility">Utility</SelectItem>
                  <SelectItem value="authentication">Authentication</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Language */}
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, language: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                  <SelectItem value="german">German</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Header Format */}
            <div className="space-y-2">
              <Label htmlFor="headerFormat">Header Format</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, headerFormat: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select header format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="media">Media</SelectItem>
                  <SelectItem value="location">Location</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Body Text */}
            <div className="space-y-2">
              <Label htmlFor="bodyText">Body Text *</Label>
              <Textarea
                id="bodyText"
                value={formData.bodyText}
                onChange={(e) => setFormData(prev => ({ ...prev, bodyText: e.target.value }))}
                placeholder="Enter your message content here..."
                className="min-h-[120px] resize-none"
              />
              <p className="text-xs text-gray-500">
                Use variables like {{1}} for personalization
              </p>
            </div>

            {/* Footer Text */}
            <div className="space-y-2">
              <Label htmlFor="footerText">Footer Text</Label>
              <Textarea
                id="footerText"
                value={formData.footerText}
                onChange={(e) => setFormData(prev => ({ ...prev, footerText: e.target.value }))}
                placeholder="Optional footer text"
                className="min-h-[60px] resize-none"
              />
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Buttons (Optional)</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addButton}
                  className="text-purple-600 border-purple-200 hover:bg-purple-50"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Button
                </Button>
              </div>
              {formData.buttons.map((button, index) => (
                <Input
                  key={index}
                  value={button}
                  onChange={(e) => {
                    const newButtons = [...formData.buttons];
                    newButtons[index] = e.target.value;
                    setFormData(prev => ({ ...prev, buttons: newButtons }));
                  }}
                  placeholder="Button text"
                />
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <Button
                onClick={handleSubmit}
                className="flex-1 bg-gradient-to-r from-[#7C3AED] to-[#D946EF] hover:from-purple-700 hover:to-pink-600 text-white transition-all duration-200 shadow-lg hover:shadow-xl"
                disabled={!formData.name || !formData.bodyText}
              >
                Submit Template
              </Button>
              <Button
                onClick={onCancel}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Live Preview Section */}
        <Card className="border border-gray-200 shadow-sm bg-white">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Smartphone className="w-5 h-5 text-gray-600" />
              <CardTitle className="text-lg font-semibold text-gray-900">Live Preview</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 rounded-lg p-4 max-w-sm mx-auto">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                {/* Header */}
                {formData.headerFormat && (
                  <div className="mb-3 p-2 bg-gray-50 rounded text-center text-sm text-gray-600">
                    [{formData.headerFormat.toUpperCase()} HEADER]
                  </div>
                )}
                
                {/* Body */}
                <div className="mb-3">
                  <p className="text-sm text-gray-800 whitespace-pre-wrap">
                    {formData.bodyText || "Your message will appear here..."}
                  </p>
                </div>

                {/* Footer */}
                {formData.footerText && (
                  <div className="mb-3 pt-2 border-t border-gray-200">
                    <p className="text-xs text-gray-500">
                      {formData.footerText}
                    </p>
                  </div>
                )}

                {/* Buttons */}
                {formData.buttons.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-gray-200">
                    {formData.buttons.map((button, index) => (
                      button && (
                        <div key={index} className="bg-blue-50 text-blue-600 text-center py-2 px-3 rounded text-sm font-medium">
                          {button}
                        </div>
                      )
                    ))}
                  </div>
                )}
              </div>
              
              <div className="text-center mt-3">
                <p className="text-xs text-gray-500">WhatsApp Business Message</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
