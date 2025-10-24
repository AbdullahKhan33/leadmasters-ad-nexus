import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Target, 
  Search, 
  Plus, 
  Edit, 
  Copy, 
  Trash2, 
  Users, 
  TrendingUp,
  Filter,
  Star,
  Sparkles
} from 'lucide-react';
import { useSegmentsData } from '@/hooks/useSegmentsData';
import { useSegments } from '@/hooks/useSegments';
import { useSegmentsDb } from '@/hooks/useSegmentsDb';
import { SegmentBuilder } from './SegmentBuilder';
import { TemplateGallery } from './TemplateGallery';
import { CustomSegment } from '@/types/segments';
import { useToast } from '@/hooks/use-toast';
import { Segment } from '@/types/campaigns';

export function SegmentManager() {
  const [activeTab, setActiveTab] = useState('segments');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSegment, setSelectedSegment] = useState<CustomSegment | null>(null);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  
  // Fetch actual segments from database
  const { segments: dbSegments, isLoading: dbLoading, refetch } = useSegmentsData();
  
  // Use the template hook for templates only
  const { templates } = useSegments();
  
  // Use the DB hook for CRUD operations
  const { 
    createSegment, 
    updateSegment, 
    deleteSegment, 
    duplicateSegment, 
    createFromTemplate,
    deleteAllUserSegments,
    createDefaultSegments
  } = useSegmentsDb();
  
  // Convert database segments to CustomSegment format and filter by search
  const segments = dbSegments.map(seg => ({
    id: seg.id,
    name: seg.name,
    description: seg.description || '',
    color: '#3b82f6',
    criteria: Array.isArray(seg.criteria) ? seg.criteria : [],
    leadCount: seg.lead_count || 0,
    isActive: seg.is_active,
    createdAt: seg.created_at,
    updatedAt: seg.updated_at || seg.created_at
  } as CustomSegment));
  
  const filteredSegments = searchQuery 
    ? segments.filter(seg => 
        seg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        seg.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : segments;
  
  const isLoading = dbLoading;
  
  const { toast } = useToast();
  
  const handleCreateSegment = async (segmentData: Omit<CustomSegment, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      await createSegment(segmentData);
      setIsBuilderOpen(false);
      setSelectedSegment(null);
      await refetch(); // Refresh segments from database
      toast({
        title: "Success",
        description: "Segment created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create segment",
        variant: "destructive"
      });
    }
  };

  const handleUpdateSegment = async (segmentData: Omit<CustomSegment, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!selectedSegment) return;
    
    try {
      await updateSegment(selectedSegment.id, segmentData);
      setIsBuilderOpen(false);
      setSelectedSegment(null);
      await refetch(); // Refresh segments from database
      toast({
        title: "Success",
        description: "Segment updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update segment",
        variant: "destructive"
      });
    }
  };

  const handleDeleteSegment = async (segment: CustomSegment) => {
    if (window.confirm(`Are you sure you want to delete "${segment.name}"?`)) {
      try {
        await deleteSegment(segment.id);
        await refetch(); // Refresh segments from database
        toast({
          title: "Success",
          description: "Segment deleted successfully",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete segment",
          variant: "destructive"
        });
      }
    }
  };

  const handleDuplicateSegment = async (segment: CustomSegment) => {
    try {
      await duplicateSegment(segment.id);
      await refetch(); // Refresh segments from database
      toast({
        title: "Success",
        description: "Segment duplicated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to duplicate segment",
        variant: "destructive"
      });
    }
  };

  const handleCreateFromTemplate = async (templateId: string) => {
    try {
      await createFromTemplate(templateId);
      await refetch(); // Refresh segments from database
      toast({
        title: "Success",
        description: "Segment created from template",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create segment from template",
        variant: "destructive"
      });
    }
  };

  const handleResetSegments = async () => {
    if (!window.confirm('This will delete all your segments and create new ones from templates. Are you sure?')) {
      return;
    }
    
    try {
      await deleteAllUserSegments();
      await createDefaultSegments();
      await refetch();
      toast({
        title: "Success",
        description: "Segments reset successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reset segments",
        variant: "destructive"
      });
    }
  };

  const handleCustomizeTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (!template) return;
    
    const customSegment: CustomSegment = {
      id: '',
      name: template.name,
      description: template.description,
      criteria: template.criteria,
      color: '#8B5CF6',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setSelectedSegment(customSegment);
    setIsBuilderOpen(true);
  };

  const openBuilder = (segment?: CustomSegment) => {
    setSelectedSegment(segment || null);
    setIsBuilderOpen(true);
  };

  const closeBuilder = () => {
    setIsBuilderOpen(false);
    setSelectedSegment(null);
  };

  if (isBuilderOpen) {
    return (
      <SegmentBuilder
        segment={selectedSegment}
        onSave={selectedSegment ? handleUpdateSegment : handleCreateSegment}
        onCancel={closeBuilder}
        isLoading={isLoading}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
            Audience Segments
          </h2>
          <p className="text-muted-foreground">Create and manage custom audience segments for targeted campaigns</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleResetSegments} variant="outline" size="sm" className="gap-2">
            <Target className="w-4 h-4" />
            Reset My Segments
          </Button>
          <Button onClick={() => openBuilder()} variant="gradient" className="gap-2">
            <Plus className="w-4 h-4" />
            Create Segment
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search segments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="segments">My Segments ({segments.length})</TabsTrigger>
          <TabsTrigger value="templates">Templates ({templates.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="segments" className="space-y-4">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading segments...</p>
            </div>
          ) : filteredSegments.length === 0 ? (
            <div className="text-center py-12">
              <Target className="w-16 h-16 mx-auto text-muted-foreground/40 mb-4" />
              <h3 className="text-lg font-medium mb-2">No segments found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery ? 'Try adjusting your search terms' : 'Create your first custom segment to get started'}
              </p>
              <Button onClick={() => openBuilder()} variant="gradient" className="gap-2">
                <Plus className="w-4 h-4" />
                Create Segment
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSegments.map((segment) => (
                <SegmentCard
                  key={segment.id}
                  segment={segment}
                  onEdit={openBuilder}
                  onDelete={handleDeleteSegment}
                  onDuplicate={handleDuplicateSegment}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-chart-2/10 rounded-full px-4 py-2 mb-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Region & Industry-Specific Templates</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Pre-built segments for Real Estate & EdTech across India, UAE, Qatar, and Saudi Arabia
            </p>
          </div>
          <TemplateGallery 
            templates={templates}
            onCreateFromTemplate={handleCreateFromTemplate}
            onCustomizeTemplate={handleCustomizeTemplate}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface SegmentCardProps {
  segment: CustomSegment;
  onEdit: (segment: CustomSegment) => void;
  onDelete: (segment: CustomSegment) => void;
  onDuplicate: (segment: CustomSegment) => void;
}

function SegmentCard({ segment, onEdit, onDelete, onDuplicate }: SegmentCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Badge 
              style={{ backgroundColor: segment.color, color: 'white' }}
              className="text-xs"
            >
              {segment.name}
            </Badge>
            {!segment.isActive && (
              <Badge variant="secondary" className="text-xs">
                Inactive
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(segment)}
              className="h-8 w-8 p-0"
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDuplicate(segment)}
              className="h-8 w-8 p-0"
            >
              <Copy className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(segment)}
              className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {segment.description || 'No description'}
        </p>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-gray-500">
            <Users className="w-4 h-4" />
            <span>{segment.leadCount || 0} leads</span>
          </div>
          {segment.performance && (
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span>{segment.performance.conversionRate}%</span>
            </div>
          )}
        </div>
        
        <div className="mt-3 text-xs text-gray-500">
          <p>{segment.criteria.length} criteria</p>
        </div>
      </CardContent>
    </Card>
  );
}
