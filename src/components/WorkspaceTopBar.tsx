
import React from 'react';
import { useWorkspace } from '@/contexts/WorkspaceContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown, Building2 } from 'lucide-react';

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
            <Building2 className="w-5 h-5 text-purple-600" />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Working in: <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">{activeWorkspace.name}</span>
              </h2>
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
        
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" className="text-sm">
            <ChevronDown className="w-4 h-4 mr-2" />
            Switch Workspace
          </Button>
        </div>
      </div>
    </div>
  );
}
