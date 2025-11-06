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
      setActiveTab('segments');
      toast({
        title: "Success",
        description: "Segment created from template",
      });
      // Scroll to top where new segments are visible
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
  
  const handleCreateSampleSegments = async () => {
    try {
      const supabase = await import('@/integrations/supabase/client').then(m => m.supabase);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in",
          variant: "destructive",
        });
        return;
      }

      // Sample segments to create (Real Estate + EdTech)
      const sampleSegments = [
        // Real Estate Segments
        {
          name: 'Delhi NCR First-Time Homebuyers',
          description: 'First-time buyers in Delhi looking for homes ₹50L-₹1Cr, ready in 1-3 months',
          criteria: [
            { id: 'c1', field: 'city', operator: 'equals' as const, value: 'delhi', label: 'City: Delhi' },
            { id: 'c2', field: 'budget_range', operator: 'in' as const, value: ['inr_50_75l', 'inr_75l_1cr'], label: 'Budget: ₹50-75L, ₹75L-1Cr' },
            { id: 'c3', field: 'buyer_type', operator: 'equals' as const, value: 'first_time', label: 'Buyer Type: First-time' },
            { id: 'c4', field: 'timeline', operator: 'equals' as const, value: '1_3_months', label: 'Timeline: 1-3 Months' }
          ],
          color: '#3B82F6',
          is_active: true
        },
        {
          name: 'Dubai Downtown Luxury Buyers',
          description: 'Luxury property investors in Downtown Dubai, Marina - AED 2-5M+',
          criteria: [
            { id: 'c1', field: 'city', operator: 'equals' as const, value: 'dubai', label: 'City: Dubai' },
            { id: 'c2', field: 'property_type', operator: 'in' as const, value: ['apartment', 'penthouse'], label: 'Property Type: Apartment, Penthouse' },
            { id: 'c3', field: 'budget_range', operator: 'in' as const, value: ['aed_2_5m', 'aed_5m_plus'], label: 'Budget: AED 2-5M+' },
            { id: 'c4', field: 'property_purpose', operator: 'equals' as const, value: 'investment', label: 'Purpose: Investment' }
          ],
          color: '#10B981',
          is_active: true
        },
        {
          name: 'Doha Investment Property Seekers',
          description: 'Investment property buyers in Doha, Al Wakrah - QAR 1M+',
          criteria: [
            { id: 'c1', field: 'city', operator: 'in' as const, value: ['doha', 'al_wakrah'], label: 'City: Doha, Al Wakrah' },
            { id: 'c2', field: 'property_purpose', operator: 'in' as const, value: ['investment', 'rental_income'], label: 'Purpose: Investment, Rental Income' },
            { id: 'c3', field: 'buyer_type', operator: 'equals' as const, value: 'investor', label: 'Buyer Type: Investor' }
          ],
          color: '#F59E0B',
          is_active: true
        },
        {
          name: 'Riyadh Premium Villa Buyers',
          description: 'Premium villa buyers in Riyadh - SAR 3M+ with luxury features',
          criteria: [
            { id: 'c1', field: 'city', operator: 'equals' as const, value: 'riyadh', label: 'City: Riyadh' },
            { id: 'c2', field: 'property_type', operator: 'in' as const, value: ['villa', 'townhouse'], label: 'Property Type: Villa, Townhouse' },
            { id: 'c3', field: 'budget_range', operator: 'equals' as const, value: 'sar_qar_3m_plus', label: 'Budget: SAR 3M+' }
          ],
          color: '#8B5CF6',
          is_active: true
        },
        // EdTech Segments
        {
          name: 'India Tech Career Switchers',
          description: 'Career changers in India interested in programming/data science - ₹50K-₹1L budget',
          criteria: [
            { id: 'c1', field: 'country', operator: 'equals' as const, value: 'india', label: 'Country: India' },
            { id: 'c2', field: 'career_stage', operator: 'equals' as const, value: 'career_switcher', label: 'Career Stage: Career Switcher' },
            { id: 'c3', field: 'course_interest', operator: 'in' as const, value: ['programming', 'data_science'], label: 'Course Interest: Programming, Data Science' },
            { id: 'c4', field: 'course_budget', operator: 'in' as const, value: ['inr_50k_1l', 'inr_1l_plus'], label: 'Budget: ₹50K-₹1L+' }
          ],
          color: '#06B6D4',
          is_active: true
        },
        {
          name: 'Delhi Professional Upskilling',
          description: 'Working professionals in Delhi seeking business/marketing courses - ₹1L-₹2L',
          criteria: [
            { id: 'c1', field: 'city', operator: 'equals' as const, value: 'delhi', label: 'City: Delhi' },
            { id: 'c2', field: 'career_stage', operator: 'equals' as const, value: 'professional_upskilling', label: 'Career Stage: Professional Upskilling' },
            { id: 'c3', field: 'course_interest', operator: 'in' as const, value: ['business_mba', 'digital_marketing'], label: 'Course Interest: Business/MBA, Digital Marketing' }
          ],
          color: '#84CC16',
          is_active: true
        },
        {
          name: 'Dubai Expat Career Growth',
          description: 'Early career professionals in Dubai - AED 5K-10K courses',
          criteria: [
            { id: 'c1', field: 'city', operator: 'equals' as const, value: 'dubai', label: 'City: Dubai' },
            { id: 'c2', field: 'career_stage', operator: 'in' as const, value: ['fresh_graduate', 'career_switcher'], label: 'Career Stage: Fresh Graduate, Career Switcher' },
            { id: 'c3', field: 'course_budget', operator: 'in' as const, value: ['aed_sar_5_10k', 'aed_sar_10_20k'], label: 'Budget: AED 5K-20K' }
          ],
          color: '#F97316',
          is_active: true
        },
        {
          name: 'High-Priority Hot Leads',
          description: 'Hot leads with high scores created in last 30 days - immediate follow-up needed',
          criteria: [
            { id: 'c1', field: 'lead_score', operator: 'greater_than' as const, value: 70, label: 'Lead Score: >70' },
            { id: 'c2', field: 'priority_level', operator: 'equals' as const, value: 'high', label: 'Priority: High' },
            { id: 'c3', field: 'created_at', operator: 'in_last_days' as const, value: { days: 30 }, label: 'Created: Last 30 days' },
            { id: 'c4', field: 'qualification_status', operator: 'in' as const, value: ['qualified', 'hot_lead'], label: 'Status: Qualified, Hot Lead' }
          ],
          color: '#EF4444',
          is_active: true
        },
        {
          name: 'Re-engagement - Inactive Leads',
          description: 'Leads not contacted in 30+ days with email - re-engagement campaign',
          criteria: [
            { id: 'c1', field: 'last_interaction_at', operator: 'in_last_days' as const, value: { days: 60 }, label: 'Last Interaction: 30-60 days ago' },
            { id: 'c2', field: 'email_status', operator: 'equals' as const, value: 'has_email', label: 'Email: Has Email' },
            { id: 'c3', field: 'lead_score', operator: 'greater_than' as const, value: 40, label: 'Lead Score: >40' }
          ],
          color: '#EC4899',
          is_active: true
        }
      ];
      
      // Check for duplicates and insert only new ones
      let createdCount = 0;
      for (const segment of sampleSegments) {
        const { data: existing } = await supabase
          .from('segments')
          .select('id')
          .eq('user_id', user.id)
          .eq('name', segment.name)
          .maybeSingle();
        
        if (!existing) {
          const { error } = await supabase
            .from('segments')
            .insert({
              user_id: user.id,
              name: segment.name,
              description: segment.description,
              criteria: segment.criteria,
              color: segment.color,
              is_active: segment.is_active,
              lead_count: 0
            });
          
          if (!error) createdCount++;
        }
      }

      await refetch();
      toast({
        title: "Success",
        description: `Created ${createdCount} sample segment${createdCount !== 1 ? 's' : ''}`,
      });
    } catch (error: any) {
      console.error('Error creating sample segments:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create sample segments",
        variant: "destructive",
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
          <Button onClick={() => openBuilder()} variant="gradient" className="gap-2">
            <Plus className="w-4 h-4" />
            Create Segment
          </Button>
        </div>
      </div>

      {/* Search */}
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
