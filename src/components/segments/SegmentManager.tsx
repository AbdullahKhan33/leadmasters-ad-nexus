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
import { useSegments } from '@/hooks/useSegments';
import { SegmentBuilder } from './SegmentBuilder';
import { CustomSegment } from '@/types/segments';
import { useToast } from '@/hooks/use-toast';

export function SegmentManager() {
  const [activeTab, setActiveTab] = useState('segments');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSegment, setSelectedSegment] = useState<CustomSegment | null>(null);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  
  const { 
    segments, 
    templates, 
    isLoading, 
    error, 
    createSegment, 
    updateSegment, 
    deleteSegment, 
    duplicateSegment, 
    createFromTemplate, 
    searchSegments 
  } = useSegments();
  
  const { toast } = useToast();
  
  const filteredSegments = searchSegments(searchQuery);
  
  const handleCreateSegment = async (segmentData: Omit<CustomSegment, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      await createSegment(segmentData);
      setIsBuilderOpen(false);
      setSelectedSegment(null);
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
          <h2 className="text-2xl font-bold text-gray-900">Audience Segments</h2>
          <p className="text-gray-600">Create and manage custom audience segments for targeted campaigns</p>
        </div>
        <Button onClick={() => openBuilder()} className="gap-2">
          <Plus className="w-4 h-4" />
          Create Segment
        </Button>
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
          {filteredSegments.length === 0 ? (
            <div className="text-center py-12">
              <Target className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No segments found</h3>
              <p className="text-gray-600 mb-4">
                {searchQuery ? 'Try adjusting your search terms' : 'Create your first custom segment to get started'}
              </p>
              <Button onClick={() => openBuilder()} className="gap-2">
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
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-4 py-2 mb-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-800">Pre-built Templates</span>
            </div>
            <p className="text-gray-600 text-sm">Quick-start your segmentation with proven templates</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onCreateFromTemplate={handleCreateFromTemplate}
              />
            ))}
          </div>
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

interface TemplateCardProps {
  template: any;
  onCreateFromTemplate: (templateId: string) => void;
}

function TemplateCard({ template, onCreateFromTemplate }: TemplateCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const getCategoryColor = (category: string) => {
    const colors = {
      demographics: { bg: '#3B82F6', text: 'text-blue-600', border: 'border-blue-200' },
      behavior: { bg: '#10B981', text: 'text-emerald-600', border: 'border-emerald-200' },
      engagement: { bg: '#8B5CF6', text: 'text-purple-600', border: 'border-purple-200' },
      business: { bg: '#F59E0B', text: 'text-amber-600', border: 'border-amber-200' },
      custom: { bg: '#6B7280', text: 'text-gray-600', border: 'border-gray-200' }
    };
    return colors[category as keyof typeof colors] || colors.custom;
  };

  const handleCreateFromTemplate = async () => {
    setIsCreating(true);
    try {
      await onCreateFromTemplate(template.id);
    } finally {
      setIsCreating(false);
    }
  };

  const categoryStyle = getCategoryColor(template.category);

  return (
    <Card 
      className={`group relative overflow-hidden transition-all duration-300 cursor-pointer ${
        isHovered ? 'shadow-xl scale-[1.02] border-primary/20' : 'shadow-md hover:shadow-lg'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background gradient */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
        style={{ background: `linear-gradient(135deg, ${categoryStyle.bg}20, transparent)` }}
      />
      
      <CardHeader className="pb-3 relative z-10">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg ${categoryStyle.border} bg-gradient-to-br from-white to-gray-50`}>
              <Star className={`w-4 h-4 ${categoryStyle.text}`} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                {template.name}
              </h3>
              <Badge 
                style={{ backgroundColor: categoryStyle.bg }}
                className="text-xs text-white mt-1 shadow-sm"
              >
                {template.category}
              </Badge>
            </div>
          </div>
          <div className={`w-3 h-3 rounded-full ${categoryStyle.border} border-2`} 
               style={{ backgroundColor: categoryStyle.bg }} />
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 relative z-10">
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
          {template.description}
        </p>
        
        {/* Criteria preview */}
        <div className="mb-4 p-3 bg-gray-50 rounded-lg border">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-3 h-3 text-gray-500" />
            <span className="text-xs font-medium text-gray-700">
              {template.criteria.length} criteria included
            </span>
          </div>
          <div className="space-y-1">
            {template.criteria.slice(0, 2).map((criteria, index) => (
              <div key={index} className="text-xs text-gray-600 bg-white rounded px-2 py-1 border">
                • {criteria.label}
              </div>
            ))}
            {template.criteria.length > 2 && (
              <div className="text-xs text-gray-500 italic px-2">
                +{template.criteria.length - 2} more criteria...
              </div>
            )}
          </div>
        </div>
        
        <Button 
          onClick={handleCreateFromTemplate}
          disabled={isCreating}
          className={`w-full transition-all duration-200 ${
            isHovered 
              ? 'bg-gradient-to-r from-primary to-primary/80 shadow-lg transform -translate-y-0.5' 
              : 'bg-gray-900 hover:bg-gray-800'
          }`}
        >
          {isCreating ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              Creating...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Use Template
            </div>
          )}
        </Button>
      </CardContent>
      
      {/* Hover effect overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
    </Card>
  );
}