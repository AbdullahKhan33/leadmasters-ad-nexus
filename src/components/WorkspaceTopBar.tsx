
import React from 'react';
import { useWorkspace } from '@/contexts/WorkspaceContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building2, Bell, ChevronDown } from 'lucide-react';

export function WorkspaceTopBar() {
  const { activeWorkspace } = useWorkspace();

  if (!activeWorkspace) {
    return null;
  }

  return (
    <div className="border-b border-gray-200/50 bg-white/95 backdrop-blur-sm px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <Building2 className="w-6 h-6 text-purple-600" />
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                {activeWorkspace.name}
              </h1>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline" className="text-xs border-blue-200 text-blue-700 bg-blue-50">
                  {activeWorkspace.country}
                </Badge>
                <Badge variant="outline" className="text-xs border-purple-200 text-purple-700 bg-purple-50">
                  {activeWorkspace.industry}
                </Badge>
                <Badge variant="outline" className="text-xs border-pink-200 text-pink-700 bg-pink-50">
                  {activeWorkspace.businessType}
                </Badge>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="outline" size="sm" className="text-gray-700 border-gray-200 hover:bg-gray-50">
            Business Manager
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
          <Button variant="outline" size="sm" className="text-gray-700 border-gray-200 hover:bg-gray-50">
            Explore Plans
          </Button>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white px-4 py-2 rounded-lg">
            Make Live
          </Button>
        </div>
      </div>
    </div>
  );
}
