import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Twitter, ExternalLink } from "lucide-react";

interface TwitterIntegrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TwitterIntegrationDialog({ open, onOpenChange }: TwitterIntegrationDialogProps) {
  const handleConnectTwitter = () => {
    // Developer will implement routing logic here
    console.log("Navigate to social logins for Twitter integration");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-black rounded-full flex items-center justify-center shadow-lg">
              <Twitter className="w-8 h-8 text-white" />
            </div>
          </div>
          <DialogTitle className="text-xl font-bold text-gray-900">
            Connect Your X (Twitter) Account
          </DialogTitle>
          <DialogDescription className="text-gray-600 mt-2">
            To post to X (formerly Twitter), you need to integrate your X account first. This will allow you to publish your AI-generated content directly to your X profile.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-6">
          <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">What you'll get:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Direct posting to X</li>
              <li>• Auto-thread creation</li>
              <li>• Schedule tweets in advance</li>
              <li>• Track retweets and engagement</li>
            </ul>
          </div>
          
          <div className="flex flex-col space-y-3">
            <Button 
              onClick={handleConnectTwitter}
              className="w-full bg-gradient-to-r from-gray-800 to-black hover:from-gray-900 hover:to-gray-800 text-white"
            >
              <Twitter className="w-4 h-4 mr-2" />
              Connect X Account
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