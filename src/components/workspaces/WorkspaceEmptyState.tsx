
import React from 'react';
import { Button } from "@/components/ui/button";
import { Building2, Plus } from 'lucide-react';

interface WorkspaceEmptyStateProps {
  onCreateClick: () => void;
}

export function WorkspaceEmptyState({ onCreateClick }: WorkspaceEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center">
        <Building2 className="w-12 h-12 text-purple-600" />
      </div>
      <h3 className="text-2xl font-semibold text-gray-800 mb-3">
        No workspaces yet
      </h3>
      <p className="text-gray-600 mb-8 max-w-md">
        Create your first workspace to start organizing your campaigns and posts by team, client, or project.
      </p>
      <Button 
        onClick={onCreateClick}
        className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white px-8 py-3 rounded-xl shadow-lg"
      >
        <Plus className="w-5 h-5 mr-2" />
        Create First Workspace
      </Button>
    </div>
  );
}
