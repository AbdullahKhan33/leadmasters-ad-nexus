
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useWorkspace } from '@/contexts/WorkspaceContext';
import { 
  Building2, 
  Plus, 
  Search, 
  Filter, 
  Users, 
  MoreHorizontal,
  Edit,
  Trash2,
  Globe,
  Briefcase
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

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

const mockWorkspaces: Workspace[] = [
  {
    id: '1',
    name: 'TechCorp Solutions',
    description: 'Leading technology solutions provider specializing in enterprise software development and digital transformation.',
    country: 'United States',
    industry: 'Technology',
    businessType: 'B2B',
    memberCount: 12,
    isActive: true
  },
  {
    id: '2',
    name: 'Green Earth Marketing',
    description: 'Sustainable marketing agency focused on eco-friendly brands and environmental awareness campaigns.',
    country: 'Canada',
    industry: 'Marketing',
    businessType: 'B2C',
    memberCount: 8,
    isActive: false
  },
  {
    id: '3',
    name: 'FinanceFirst Consulting',
    description: 'Financial advisory services for small and medium enterprises, providing strategic investment guidance.',
    country: 'United Kingdom',
    industry: 'Finance',
    businessType: 'B2B',
    memberCount: 15,
    isActive: true
  },
  {
    id: '4',
    name: 'HealthWell Clinic',
    description: 'Modern healthcare facility offering comprehensive medical services and wellness programs.',
    country: 'Australia',
    industry: 'Healthcare',
    businessType: 'B2C',
    memberCount: 25,
    isActive: true
  },
  {
    id: '5',
    name: 'EduTech Innovations',
    description: 'Educational technology company creating interactive learning platforms for K-12 education.',
    country: 'Germany',
    industry: 'Education',
    businessType: 'B2B',
    memberCount: 6,
    isActive: false
  }
];

export function Workspaces() {
  const [workspaces] = useState<Workspace[]>(mockWorkspaces);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterActive, setFilterActive] = useState<'all' | 'active' | 'inactive'>('all');
  const { selectWorkspace } = useWorkspace();
  const { toast } = useToast();

  const filteredWorkspaces = workspaces.filter(workspace => {
    const matchesSearch = workspace.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workspace.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workspace.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterActive === 'all' || 
                         (filterActive === 'active' && workspace.isActive) ||
                         (filterActive === 'inactive' && !workspace.isActive);
    return matchesSearch && matchesFilter;
  });

  const handleWorkspaceSelect = (workspace: Workspace) => {
    selectWorkspace(workspace);
    toast({
      title: "Workspace Selected",
      description: `Switched to ${workspace.name}`,
    });
  };

  const EmptyState = () => (
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
      <Button className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white px-8 py-3 rounded-xl shadow-lg">
        <Plus className="w-5 h-5 mr-2" />
        Create First Workspace
      </Button>
    </div>
  );

  if (workspaces.length === 0) {
    return (
      <div className="flex-1 overflow-auto bg-gradient-to-br from-gray-50/50 via-blue-50/30 to-purple-50/50 p-8">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-gray-50/50 via-blue-50/30 to-purple-50/50">
      {/* Header Section */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200/50 p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent mb-2">
              Workspaces
            </h1>
            <p className="text-gray-600 text-lg">
              Organize your campaigns and posts by team, client, or project.
            </p>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl">
            <Plus className="w-5 h-5 mr-2" />
            Create Workspace
          </Button>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search workspaces..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-300 transition-all duration-200"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterActive === 'all' ? 'default' : 'outline'}
              onClick={() => setFilterActive('all')}
              className="px-4 py-3 rounded-xl"
            >
              <Filter className="w-4 h-4 mr-2" />
              All
            </Button>
            <Button
              variant={filterActive === 'active' ? 'default' : 'outline'}
              onClick={() => setFilterActive('active')}
              className="px-4 py-3 rounded-xl"
            >
              Active
            </Button>
            <Button
              variant={filterActive === 'inactive' ? 'default' : 'outline'}
              onClick={() => setFilterActive('inactive')}
              className="px-4 py-3 rounded-xl"
            >
              Inactive
            </Button>
          </div>
        </div>
      </div>

      {/* Workspaces Grid */}
      <div className="p-8">
        {filteredWorkspaces.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No workspaces match your search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredWorkspaces.map((workspace) => (
              <Card 
                key={workspace.id} 
                className="group bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:bg-white/90 cursor-pointer h-full"
                onClick={() => handleWorkspaceSelect(workspace)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-xl ${workspace.isActive 
                        ? 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg' 
                        : 'bg-gray-100 text-gray-500'
                      } transition-all duration-300`}>
                        <Building2 className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-xl font-semibold text-gray-800 group-hover:text-gray-900 transition-colors truncate">
                          {workspace.name}
                        </CardTitle>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge 
                            variant={workspace.isActive ? "default" : "secondary"}
                            className={`text-xs ${workspace.isActive 
                              ? 'bg-green-100 text-green-700 border-green-200' 
                              : 'bg-gray-100 text-gray-600 border-gray-200'
                            }`}
                          >
                            {workspace.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-600 hover:text-gray-700"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
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
                      className="flex-1 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 rounded-lg transition-all duration-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWorkspaceSelect(workspace);
                      }}
                    >
                      Select
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
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
