import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, Check } from "lucide-react";

// Mock data for pre-existing images in the gallery
const mockGalleryImages = [
  { id: "1", url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=200&fit=crop", name: "Woman with laptop" },
  { id: "2", url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=200&fit=crop", name: "Gray laptop computer" },
  { id: "3", url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=200&fit=crop", name: "Circuit board macro" },
  { id: "4", url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop", name: "Java programming" },
  { id: "5", url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=200&fit=crop", name: "MacBook Pro in use" },
  { id: "6", url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop", name: "Woman using laptop" },
];

interface GalleryImage {
  id: string;
  url: string;
  name: string;
  file?: File;
}

interface FacebookAdGalleryProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (image: GalleryImage) => void;
}

export function FacebookAdGallery({ isOpen, onClose, onSelectImage }: FacebookAdGalleryProps) {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(mockGalleryImages);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const newImage: GalleryImage = {
        id: `uploaded-${Date.now()}`,
        url: e.target?.result as string,
        name: file.name,
        file: file
      };
      
      setGalleryImages(prev => [...prev, newImage]);
      setSelectedImageId(newImage.id);
    };
    reader.readAsDataURL(file);
    
    // Reset the input
    event.target.value = '';
  };

  const handleSelectImage = () => {
    if (!selectedImageId) return;
    
    const selectedImage = galleryImages.find(img => img.id === selectedImageId);
    if (selectedImage) {
      onSelectImage(selectedImage);
      onClose();
      setSelectedImageId(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Facebook Ad Gallery
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Upload Section */}
          <div className="mb-6 flex-shrink-0">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-purple-400 transition-colors">
              <input
                type="file"
                id="galleryImageUpload"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label htmlFor="galleryImageUpload" className="cursor-pointer">
                <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  Upload new image to gallery
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG up to 10MB
                </p>
              </label>
            </div>
          </div>

          {/* Gallery Grid - Scrollable */}
          <div className="flex-1 overflow-y-auto pr-2">
            <div className="grid grid-cols-3 gap-4 pb-4">
              {galleryImages.map((image) => (
                <div
                  key={image.id}
                  className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImageId === image.id
                      ? "border-purple-500 ring-2 ring-purple-200"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedImageId(image.id)}
                >
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-32 object-cover"
                  />
                  
                  {/* Selected Indicator */}
                  {selectedImageId === image.id && (
                    <div className="absolute inset-0 bg-purple-500/20 flex items-center justify-center">
                      <div className="bg-purple-500 text-white rounded-full p-1">
                        <Check className="w-4 h-4" />
                      </div>
                    </div>
                  )}
                  
                  {/* Image Name */}
                  <div className="p-2 bg-white">
                    <p className="text-xs text-gray-600 truncate" title={image.name}>
                      {image.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons - Fixed at bottom */}
          <div className="flex-shrink-0 flex justify-end space-x-3 mt-4 pt-4 border-t bg-white">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSelectImage}
              disabled={!selectedImageId}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Select Image
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}