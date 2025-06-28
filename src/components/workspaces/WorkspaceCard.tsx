
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Globe,
  Briefcase,
  Users,
  Edit,
  Trash2,
  Settings
} from 'lucide-react';

interface Workspace {
  id: string;
  name: string;
  description: string;
  country: string;
  industry: string;
  businessType: string;
  memberCount: number;
  isActive: boolean;
}

interface WorkspaceCardProps {
  workspace: Workspace;
  isSelected: boolean;
  onSelect: (workspace: Workspace) => void;
  onSettings: (workspace: Workspace, event: React.MouseEvent) => void;
  onDelete: (workspace: Workspace, event: React.MouseEvent) => void;
}

export function WorkspaceCard({ 
  workspace, 
  isSelected, 
  onSelect, 
  onSettings, 
  onDelete 
}: WorkspaceCardProps) {
  return (
    <Card 
      className={`group bg-white/70 backdrop-blur-sm border rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:bg-white/90 cursor-pointer h-full ${
        isSelected 
          ? 'border-blue-500 bg-blue-50/50 ring-2 ring-blue-200' 
          : 'border-gray-200/50'
      }`}
      onClick={() => onSelect(workspace)}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-xl transition-all duration-300 ${
              isSelected
                ? 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg'
                : workspace.isActive 
                  ? 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-500'
            }`}>
              <Building2 className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className={`text-xl font-semibold transition-colors truncate ${
                isSelected ? 'text-blue-800' : 'text-gray-800 group-hover:text-gray-900'
              }`}>
                {workspace.name}
              </CardTitle>
              <div className="flex items-center space-x-2 mt-2">
                <Badge 
                  variant="default"
                  className={`text-xs ${isSelected 
                    ? 'bg-green-100 text-green-700 border-green-200' 
                    : 'bg-gray-100 text-gray-600 border-gray-200'
                  }`}
                >
                  {isSelected ? 'Active' : 'Inactive'}
                </Badge>
                {isSelected && (
                  <Badge className="text-xs bg-blue-100 text-blue-700 border-blue-200">
                    Selected
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-all duration-200 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg shadow-sm"
              onClick={(e) => onSettings(workspace, e)}
              title="Workspace Settings"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 flex-1 flex flex-col">
        <CardDescription className="text-gray-600 leading-relaxed text-sm line-clamp-2">
          {workspace.description}
        </CardDescription>
        
        <div className="space-y-3 flex-1">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2 text-gray-500">
              <Globe className="w-4 h-4" />
              <span>{workspace.country}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-500">
              <Briefcase className="w-4 h-4" />
              <span>{workspace.industry}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Users className="w-4 h-4" />
              <span>{workspace.memberCount} members</span>
            </div>
            <Badge variant="outline" className="text-xs border-gray-200 text-gray-600">
              {workspace.businessType}
            </Badge>
          </div>
        </div>

        <div className="flex space-x-2 pt-4 border-t border-gray-100">
          <Button
            variant="outline"
            size="sm"
            className={`flex-1 rounded-lg transition-all duration-200 ${
              isSelected
                ? 'border-blue-500 bg-blue-500 text-white hover:bg-blue-600'
                : 'border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(workspace);
            }}
          >
            {isSelected ? 'Selected' : 'Select'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 rounded-lg transition-all duration-200"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300 rounded-lg transition-all duration-200"
            onClick={(e) => onDelete(workspace, e)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
