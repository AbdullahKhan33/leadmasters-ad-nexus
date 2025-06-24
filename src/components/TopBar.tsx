
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, Coins } from "lucide-react";

export function TopBar() {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">My Project 123</h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Business Manager:</span>
              <Select defaultValue="bot-campus">
                <SelectTrigger className="w-40 h-8 text-sm border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bot-campus">Bot Campus AI</SelectItem>
                  <SelectItem value="other">Other Account</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            size="sm"
            className="border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:border-blue-300 transition-colors duration-200"
          >
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            className="border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100 hover:border-orange-300 transition-colors duration-200"
          >
            <Coins className="w-4 h-4 mr-2" />
            Credits
          </Button>
          
          <Button 
            variant="outline" 
            className="border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            Explore Plans
          </Button>
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-white transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Make Live
          </Button>
        </div>
      </div>
    </div>
  );
}
