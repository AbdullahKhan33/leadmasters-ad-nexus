import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { AICreativeSelector } from "./AICreativeSelector";

interface ImageSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAICreativeSelect: (imageUrl: string) => void;
  selectedAICreative: string | null;
  acceptFileTypes?: string;
  uploadLabel?: string;
  uploadDescription?: string;
}

export function ImageSelectionModal({
  isOpen,
  onClose,
  onFileUpload,
  onAICreativeSelect,
  selectedAICreative,
  acceptFileTypes = "image/*",
  uploadLabel = "Click to upload or drag and drop",
  uploadDescription = "PNG, JPG up to 10MB"
}: ImageSelectionModalProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFileUpload(event);
    if (event.target.files && event.target.files.length > 0) {
      onClose();
    }
  };

  const handleAISelect = (imageUrl: string) => {
    onAICreativeSelect(imageUrl);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Select Image</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="ai-creatives" className="flex-1 flex flex-col min-h-0">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="ai-creatives">My Creatives</TabsTrigger>
            <TabsTrigger value="upload">Upload from Computer</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ai-creatives" className="flex-1 overflow-y-auto mt-4">
            <AICreativeSelector 
              onSelect={handleAISelect}
              selectedImageUrl={selectedAICreative}
            />
          </TabsContent>
          
          <TabsContent value="upload" className="flex-1 flex items-center justify-center mt-4">
            <div className="w-full max-w-md">
              <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary/50 transition-colors">
                <input
                  type="file"
                  id="modal-image-upload"
                  accept={acceptFileTypes}
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor="modal-image-upload" className="cursor-pointer flex flex-col items-center">
                  <Upload className="w-12 h-12 text-muted-foreground mb-4" />
                  <p className="text-sm text-foreground font-medium mb-1">
                    {uploadLabel}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {uploadDescription}
                  </p>
                </label>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
