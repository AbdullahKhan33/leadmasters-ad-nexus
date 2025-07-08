import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Facebook, ExternalLink } from "lucide-react";

interface FacebookIntegrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FacebookIntegrationDialog({ open, onOpenChange }: FacebookIntegrationDialogProps) {
  const handleConnectFacebook = () => {
    // Developer will implement routing logic here
    console.log("Navigate to social logins for Facebook integration");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg">
              <Facebook className="w-8 h-8 text-white" />
            </div>
          </div>
          <DialogTitle className="text-xl font-bold text-gray-900">
            Connect Your Facebook Account
          </DialogTitle>
          <DialogDescription className="text-gray-600 mt-2">
            To post to Facebook, you need to integrate your Facebook account first. This will allow you to publish your AI-generated content directly to your Facebook profile or pages.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
            <h4 className="font-semibold text-gray-900 mb-2">What you'll get:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Direct posting to Facebook</li>
              <li>• Manage multiple pages</li>
              <li>• Schedule posts in advance</li>
              <li>• Track engagement metrics</li>
            </ul>
          </div>
          
          <div className="flex flex-col space-y-3">
            <Button 
              onClick={handleConnectFacebook}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
            >
              <Facebook className="w-4 h-4 mr-2" />
              Connect Facebook Account
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