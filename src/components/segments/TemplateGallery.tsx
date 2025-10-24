import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building2, 
  GraduationCap, 
  Plus, 
  Star, 
  Target,
  MapPin,
  TrendingUp
} from 'lucide-react';
import { SegmentTemplate } from '@/types/segments';

interface TemplateGalleryProps {
  templates: SegmentTemplate[];
  onCreateFromTemplate: (templateId: string) => void;
}

export function TemplateGallery({ templates, onCreateFromTemplate }: TemplateGalleryProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<'all' | 'real_estate' | 'edtech'>('all');
  const [selectedRegion, setSelectedRegion] = useState<'all' | 'india' | 'uae' | 'qatar' | 'saudi'>('all');

  const getIndustryFromTemplate = (template: SegmentTemplate): 'real_estate' | 'edtech' | 'other' => {
    const name = template.name.toLowerCase();
    if (name.includes('property') || name.includes('home') || name.includes('real estate') || 
        name.includes('apartment') || name.includes('villa') || name.includes('dubai') || 
        name.includes('mumbai') || name.includes('doha') || name.includes('riyadh') ||
        name.includes('buyer') || name.includes('investor') || name.includes('nri')) {
      return 'real_estate';
    }
    if (name.includes('career') || name.includes('course') || name.includes('learning') || 
        name.includes('education') || name.includes('tech') || name.includes('skill') ||
        name.includes('student') || name.includes('graduate') || name.includes('professional')) {
      return 'edtech';
    }
    return 'other';
  };

  const getRegionFromTemplate = (template: SegmentTemplate): 'india' | 'uae' | 'qatar' | 'saudi' | 'other' => {
    const name = template.name.toLowerCase();
    const desc = template.description.toLowerCase();
    const text = name + ' ' + desc;
    
    if (text.includes('india') || text.includes('mumbai') || text.includes('delhi') || 
        text.includes('bangalore') || text.includes('tier-2') || text.includes('nri') ||
        text.includes('pune') || text.includes('jaipur')) {
      return 'india';
    }
    if (text.includes('dubai') || text.includes('uae') || text.includes('abu dhabi') || 
        text.includes('sharjah') || text.includes('aed')) {
      return 'uae';
    }
    if (text.includes('qatar') || text.includes('doha') || text.includes('qar')) {
      return 'qatar';
    }
    if (text.includes('saudi') || text.includes('riyadh') || text.includes('jeddah') || 
        text.includes('vision 2030') || text.includes('sar')) {
      return 'saudi';
    }
    return 'other';
  };

  const filteredTemplates = templates.filter(template => {
    const industry = getIndustryFromTemplate(template);
    const region = getRegionFromTemplate(template);
    
    const matchesIndustry = selectedIndustry === 'all' || industry === selectedIndustry;
    const matchesRegion = selectedRegion === 'all' || region === selectedRegion;
    
    return matchesIndustry && matchesRegion;
  });

  const realEstateTemplates = filteredTemplates.filter(t => getIndustryFromTemplate(t) === 'real_estate');
  const edtechTemplates = filteredTemplates.filter(t => getIndustryFromTemplate(t) === 'edtech');

  return (
    <div className="space-y-6">
      {/* Quick Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">Industry:</span>
          <Button
            variant={selectedIndustry === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedIndustry('all')}
          >
            All
          </Button>
          <Button
            variant={selectedIndustry === 'real_estate' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedIndustry('real_estate')}
            className="gap-2"
          >
            <Building2 className="w-4 h-4" />
            Real Estate
          </Button>
          <Button
            variant={selectedIndustry === 'edtech' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedIndustry('edtech')}
            className="gap-2"
          >
            <GraduationCap className="w-4 h-4" />
            EdTech
          </Button>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <span className="text-sm font-medium text-muted-foreground">Region:</span>
          <Button
            variant={selectedRegion === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedRegion('all')}
          >
            All
          </Button>
          <Button
            variant={selectedRegion === 'india' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedRegion('india')}
          >
            India
          </Button>
          <Button
            variant={selectedRegion === 'uae' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedRegion('uae')}
          >
            UAE
          </Button>
          <Button
            variant={selectedRegion === 'qatar' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedRegion('qatar')}
          >
            Qatar
          </Button>
          <Button
            variant={selectedRegion === 'saudi' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedRegion('saudi')}
          >
            Saudi Arabia
          </Button>
        </div>
      </div>

      {/* Templates Grid */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Templates ({filteredTemplates.length})</TabsTrigger>
          <TabsTrigger value="real_estate">
            <Building2 className="w-4 h-4 mr-2" />
            Real Estate ({realEstateTemplates.length})
          </TabsTrigger>
          <TabsTrigger value="edtech">
            <GraduationCap className="w-4 h-4 mr-2" />
            EdTech ({edtechTemplates.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                industry={getIndustryFromTemplate(template)}
                region={getRegionFromTemplate(template)}
                onCreateFromTemplate={onCreateFromTemplate}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="real_estate" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {realEstateTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                industry="real_estate"
                region={getRegionFromTemplate(template)}
                onCreateFromTemplate={onCreateFromTemplate}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="edtech" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {edtechTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                industry="edtech"
                region={getRegionFromTemplate(template)}
                onCreateFromTemplate={onCreateFromTemplate}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <Target className="w-16 h-16 mx-auto text-muted-foreground mb-4 opacity-50" />
          <h3 className="text-lg font-medium mb-2">No templates found</h3>
          <p className="text-muted-foreground">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
}

interface TemplateCardProps {
  template: SegmentTemplate;
  industry: 'real_estate' | 'edtech' | 'other';
  region: 'india' | 'uae' | 'qatar' | 'saudi' | 'other';
  onCreateFromTemplate: (templateId: string) => void;
}

function TemplateCard({ template, industry, region, onCreateFromTemplate }: TemplateCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const industryConfig = {
    real_estate: { 
      icon: Building2, 
      color: 'hsl(var(--primary))', 
      bg: 'bg-primary/10',
      label: 'Real Estate' 
    },
    edtech: { 
      icon: GraduationCap, 
      color: 'hsl(var(--chart-2))', 
      bg: 'bg-chart-2/10',
      label: 'EdTech' 
    },
    other: { 
      icon: Star, 
      color: 'hsl(var(--muted-foreground))', 
      bg: 'bg-muted/10',
      label: 'General' 
    }
  };

  const regionConfig = {
    india: { label: '🇮🇳 India', color: 'text-orange-600' },
    uae: { label: '🇦🇪 UAE', color: 'text-green-600' },
    qatar: { label: '🇶🇦 Qatar', color: 'text-purple-600' },
    saudi: { label: '🇸🇦 Saudi Arabia', color: 'text-blue-600' },
    other: { label: 'Global', color: 'text-muted-foreground' }
  };

  const config = industryConfig[industry];
  const regionInfo = regionConfig[region];
  const Icon = config.icon;

  const handleCreate = async () => {
    setIsCreating(true);
    try {
      await onCreateFromTemplate(template.id);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Card
      className={`group relative overflow-hidden transition-all duration-300 cursor-pointer ${
        isHovered ? 'shadow-xl scale-[1.02] border-primary/20' : 'shadow-md hover:shadow-lg'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient overlay */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
        style={{ background: `linear-gradient(135deg, ${config.color}20, transparent)` }}
      />

      <CardHeader className="pb-3 relative z-10">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className={`p-2 rounded-lg ${config.bg} border`}>
                <Icon className="w-4 h-4" style={{ color: config.color }} />
              </div>
              <Badge variant="outline" className={regionInfo.color}>
                <MapPin className="w-3 h-3 mr-1" />
                {regionInfo.label}
              </Badge>
            </div>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {template.name}
            </h3>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 relative z-10">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
          {template.description}
        </p>

        {/* Criteria preview */}
        <div className="mb-4 p-3 bg-muted/50 rounded-lg border">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs font-medium">
              {template.criteria.length} criteria
            </span>
          </div>
          <div className="space-y-1">
            {template.criteria.slice(0, 2).map((criteria, index) => (
              <div key={index} className="text-xs text-muted-foreground bg-background rounded px-2 py-1 border">
                • {criteria.label}
              </div>
            ))}
            {template.criteria.length > 2 && (
              <div className="text-xs text-muted-foreground italic px-2">
                +{template.criteria.length - 2} more...
              </div>
            )}
          </div>
        </div>

        <Button
          onClick={handleCreate}
          disabled={isCreating}
          className={`w-full transition-all duration-200 ${
            isHovered 
              ? 'bg-gradient-to-r from-primary to-primary/80 shadow-lg transform -translate-y-0.5' 
              : ''
          }`}
        >
          {isCreating ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-primary-foreground/20 border-t-primary-foreground rounded-full animate-spin" />
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

      {/* Hover effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </Card>
  );
}
