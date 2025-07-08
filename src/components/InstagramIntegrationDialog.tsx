import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Instagram, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface InstagramIntegrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InstagramIntegrationDialog({ open, onOpenChange }: InstagramIntegrationDialogProps) {
  const navigate = useNavigate();

  const handleNavigateToSocialLogins = () => {
    onOpenChange(false);
    navigate('/', { state: { view: 'social-logins' } });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <Instagram className="w-8 h-8 text-white" />
            </div>
          </div>
          <DialogTitle className="text-xl font-bold text-gray-900">
            Connect Your Instagram Account
          </DialogTitle>
          <DialogDescription className="text-gray-600 mt-2">
            To post to Instagram, you need to integrate your Instagram account first. This will allow you to publish your AI-generated content directly to your Instagram profile.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-6">
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-4 border border-pink-200">
            <h4 className="font-semibold text-gray-900 mb-2">What you'll get:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Direct posting to Instagram</li>
              <li>• Schedule posts in advance</li>
              <li>• Manage multiple accounts</li>
              <li>• Track post performance</li>
            </ul>
          </div>
          
          <div className="flex flex-col space-y-3">
            <Button 
              onClick={handleNavigateToSocialLogins}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
            >
              <Instagram className="w-4 h-4 mr-2" />
              Connect Instagram Account
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="w-full"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}