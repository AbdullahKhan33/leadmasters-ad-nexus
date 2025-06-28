import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useWorkspace } from '@/contexts/WorkspaceContext';
import { Plus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { OnboardingWorkspaceForm } from './OnboardingWorkspaceForm';
import { WorkspaceCard } from './workspaces/WorkspaceCard';
import { WorkspaceFilters } from './workspaces/WorkspaceFilters';
import { CreateWorkspaceForm } from './workspaces/CreateWorkspaceForm';
import { WorkspaceEmptyState } from './workspaces/WorkspaceEmptyState';

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

export function Workspaces({ onWorkspaceSettingsClick }: { onWorkspaceSettingsClick?: (workspace: Workspace) => void }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterActive, setFilterActive] = useState<'all' | 'active' | 'inactive'>('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createFormData, setCreateFormData] = useState({
    fullName: '',
    name: '',
    description: '',
    address: '',
    country: '',
    state: '',
    industry: '',
    companySize: '',
    websiteUrl: '',
    mobileNumber: '',
    timezone: '',
    businessType: ''
  });
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; workspace: Workspace | null }>({ 
    isOpen: false, 
    workspace: null 
  });
  const { workspaces, selectWorkspace, activeWorkspace, addWorkspace, deleteWorkspace, hasWorkspaces } = useWorkspace();
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

  const handleWorkspaceSettings = (workspace: Workspace, event: React.MouseEvent) => {
    event.stopPropagation();
    if (onWorkspaceSettingsClick) {
      onWorkspaceSettingsClick(workspace);
    }
  };

  const handleDeleteWorkspace = (workspace: Workspace, event: React.MouseEvent) => {
    event.stopPropagation();
    setDeleteConfirmation({ isOpen: true, workspace });
  };

  const confirmDeleteWorkspace = () => {
    if (deleteConfirmation.workspace) {
      deleteWorkspace(deleteConfirmation.workspace.id);
      toast({
        title: "Workspace Deleted",
        description: `${deleteConfirmation.workspace.name} has been deleted successfully.`,
        variant: "destructive",
      });
      setDeleteConfirmation({ isOpen: false, workspace: null });
    }
  };

  const handleCreateWorkspace = (formData: typeof createFormData) => {
    // Validate required fields
    const requiredFields = ['fullName', 'name', 'description', 'country', 'industry', 'timezone'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const newWorkspace: Workspace = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      country: formData.country,
      industry: formData.industry,
      businessType: formData.businessType || 'B2B',
      memberCount: 1,
      isActive: true
    };

    addWorkspace(newWorkspace);

    toast({
      title: "Workspace Created",
      description: `${formData.name} has been created successfully.`,
    });

    // Reset form and hide it
    setCreateFormData({
      fullName: '',
      name: '',
      description: '',
      address: '',
      country: '',
      state: '',
      industry: '',
      companySize: '',
      websiteUrl: '',
      mobileNumber: '',
      timezone: '',
      businessType: ''
    });
    setShowCreateForm(false);
  };

  const handleOnboardingWorkspaceCreate = (workspaceData: {
    fullName: string;
    name: string;
    description: string;
    address: string;
    country: string;
    state: string;
    industry: string;
    companySize: string;
    websiteUrl: string;
    mobileNumber: string;
    timezone: string;
  }) => {
    const newWorkspace: Workspace = {
      id: Date.now().toString(),
      name: workspaceData.name,
      description: workspaceData.description,
      country: workspaceData.country,
      industry: workspaceData.industry,
      businessType: 'B2B', // Default for onboarding
      memberCount: 1,
      isActive: true
    };

    addWorkspace(newWorkspace);
    
    toast({
      title: "Welcome to Your Workspace!",
      description: `${workspaceData.name} has been created successfully. Let's start your journey!`,
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setCreateFormData(prev => ({ ...prev, [field]: value }));
  };

  const isWorkspaceSelected = (workspace: Workspace) => {
    return activeWorkspace?.id === workspace.id;
  };

  // Show onboarding form for new users
  if (!hasWorkspaces) {
    return <OnboardingWorkspaceForm onCreateWorkspace={handleOnboardingWorkspaceCreate} />;
  }

  // Show create workspace form
  if (showCreateForm) {
    return (
      <CreateWorkspaceForm
        onBack={() => setShowCreateForm(false)}
        onSubmit={handleCreateWorkspace}
        formData={createFormData}
        onFormDataChange={handleInputChange}
      />
    );
  }

  if (workspaces.length === 0) {
    return (
      <div className="flex-1 overflow-auto bg-gradient-to-br from-gray-50/50 via-blue-50/30 to-purple-50/50 p-8">
        <WorkspaceEmptyState onCreateClick={() => setShowCreateForm(true)} />
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
          <Button 
            onClick={() => setShowCreateForm(true)}
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Workspace
          </Button>
        </div>

        {/* Search and Filter Controls */}
        <WorkspaceFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterActive={filterActive}
          onFilterChange={setFilterActive}
        />
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
              <WorkspaceCard
                key={workspace.id}
                workspace={workspace}
                isSelected={isWorkspaceSelected(workspace)}
                onSelect={handleWorkspaceSelect}
                onSettings={handleWorkspaceSettings}
                onDelete={handleDeleteWorkspace}
              />
            ))}
          </div>
        )}
      </div>

      <AlertDialog open={deleteConfirmation.isOpen} onOpenChange={(open) => 
        setDeleteConfirmation({ isOpen: open, workspace: deleteConfirmation.workspace })
      }>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Workspace</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deleteConfirmation.workspace?.name}"? This action cannot be undone and will permanently remove all data associated with this workspace.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteWorkspace}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete Workspace
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
