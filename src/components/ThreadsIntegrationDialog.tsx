import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageSquare, ExternalLink } from "lucide-react";

interface ThreadsIntegrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ThreadsIntegrationDialog({ open, onOpenChange }: ThreadsIntegrationDialogProps) {
  const handleConnectThreads = () => {
    // Developer will implement routing logic here
    console.log("Navigate to social logins for Threads integration");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-black rounded-full flex items-center justify-center shadow-lg">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
          </div>
          <DialogTitle className="text-xl font-bold text-gray-900">
            Connect Your Threads Account
          </DialogTitle>
          <DialogDescription className="text-gray-600 mt-2">
            To post to Threads, you need to integrate your Threads account first. This will allow you to publish your AI-generated content directly to your Threads profile.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-6">
          <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">What you'll get:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Direct posting to Threads</li>
              <li>• Cross-platform with Instagram</li>
              <li>• Schedule threads in advance</li>
              <li>• Track conversations and replies</li>
            </ul>
          </div>
          
          <div className="flex flex-col space-y-3">
            <Button 
              onClick={handleConnectThreads}
              className="w-full bg-gradient-to-r from-gray-800 to-black hover:from-gray-900 hover:to-gray-800 text-white"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Connect Threads Account
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