import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { CarouselCard } from "../FacebookAdCampaignFlow";

interface CarouselCardEditModalProps {
  card: CarouselCard;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedCard: CarouselCard) => void;
}

export function CarouselCardEditModal({ card, isOpen, onClose, onSave }: CarouselCardEditModalProps) {
  const [formData, setFormData] = useState({
    headline: card.headline,
    description: card.description,
    url: card.url
  });

  const handleSave = () => {
    onSave({
      ...card,
      headline: formData.headline,
      description: formData.description,
      url: formData.url
    });
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Edit Card</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Headline */}
          <div className="space-y-2">
            <Label htmlFor="headline" className="text-sm font-medium text-gray-700">
              Headline
            </Label>
            <Input
              id="headline"
              value={formData.headline}
              onChange={(e) => handleChange("headline", e.target.value)}
              placeholder="Enter headline"
              maxLength={40}
            />
            <div className="text-xs text-gray-500 text-right">
              {formData.headline.length}/40 characters
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
              placeholder="Enter description"
              maxLength={150}
              className="min-h-[80px]"
            />
            <div className="text-xs text-gray-500 text-right">
              {formData.description.length}/150 characters
            </div>
          </div>

          {/* URL */}
          <div className="space-y-2">
            <Label htmlFor="url" className="text-sm font-medium text-gray-700">
              URL
            </Label>
            <Input
              id="url"
              type="url"
              value={formData.url}
              onChange={(e) => handleChange("url", e.target.value)}
              placeholder="https://example.com"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}