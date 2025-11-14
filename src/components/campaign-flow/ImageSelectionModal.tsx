import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload } from "lucide-react";
import { AICreativeSelector } from "./AICreativeSelector";

interface ImageSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImageSelect: (file: File) => void;
  onAICreativeSelect: (imageUrl: string) => void;
  selectedAICreative?: string | null;
}

export function ImageSelectionModal({
  isOpen,
  onClose,
  onImageSelect,
  onAICreativeSelect,
  selectedAICreative
}: ImageSelectionModalProps) {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageSelect(file);
      onClose();
    }
  };

  const handleAISelect = (imageUrl: string) => {
    onAICreativeSelect(imageUrl);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Select Image</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="ai-creatives" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="ai-creatives">My Creatives</TabsTrigger>
            <TabsTrigger value="upload">Upload from Computer</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ai-creatives" className="mt-4">
            <AICreativeSelector 
              onSelect={handleAISelect}
              selectedImageUrl={selectedAICreative}
            />
          </TabsContent>
          
          <TabsContent value="upload" className="mt-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-primary/50 transition-colors">
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label htmlFor="imageUpload" className="cursor-pointer">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg text-gray-600 mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-sm text-gray-500">
                  PNG, JPG up to 10MB
                </p>
              </label>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}