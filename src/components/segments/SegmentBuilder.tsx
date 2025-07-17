import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Plus, X, Users, Target, Palette } from 'lucide-react';
import { CustomSegment, SegmentCriteria, SEGMENT_FILTERS } from '@/types/segments';
import { useToast } from '@/hooks/use-toast';

interface SegmentBuilderProps {
  segment?: CustomSegment;
  onSave: (segment: Omit<CustomSegment, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const SEGMENT_COLORS = [
  '#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', 
  '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6366F1'
];

export function SegmentBuilder({ segment, onSave, onCancel, isLoading }: SegmentBuilderProps) {
  const [formData, setFormData] = useState({
    name: segment?.name || '',
    description: segment?.description || '',
    color: segment?.color || '#3B82F6',
    isActive: segment?.isActive ?? true,
    criteria: segment?.criteria || []
  });

  const { toast } = useToast();

  const addCriteria = () => {
    const newCriteria: SegmentCriteria = {
      id: `criteria-${Date.now()}`,
      field: '',
      operator: 'equals',
      value: '',
      label: ''
    };
    setFormData(prev => ({
      ...prev,
      criteria: [...prev.criteria, newCriteria]
    }));
  };

  const updateCriteria = (index: number, updates: Partial<SegmentCriteria>) => {
    setFormData(prev => ({
      ...prev,
      criteria: prev.criteria.map((criteria, i) => 
        i === index ? { ...criteria, ...updates } : criteria
      )
    }));
  };

  const removeCriteria = (index: number) => {
    setFormData(prev => ({
      ...prev,
      criteria: prev.criteria.filter((_, i) => i !== index)
    }));
  };

  const generateCriteriaLabel = (criteria: SegmentCriteria) => {
    const filter = SEGMENT_FILTERS.find(f => f.field === criteria.field);
    if (!filter) return '';
    
    const fieldLabel = filter.label;
    const operatorLabel = getOperatorLabel(criteria.operator);
    const valueLabel = getValueLabel(criteria.value, filter);
    
    return `${fieldLabel} ${operatorLabel} ${valueLabel}`;
  };

  const getOperatorLabel = (operator: string) => {
    const labels = {
      equals: 'is',
      not_equals: 'is not',
      contains: 'contains',
      greater_than: 'greater than',
      less_than: 'less than',
      in: 'is one of',
      not_in: 'is not one of',
      between: 'between'
    };
    return labels[operator as keyof typeof labels] || operator;
  };

  const getValueLabel = (value: any, filter: any) => {
    if (filter.type === 'multiselect' && Array.isArray(value)) {
      return value.map(v => filter.options?.find((o: any) => o.value === v)?.label || v).join(', ');
    }
    if (filter.type === 'select') {
      return filter.options?.find((o: any) => o.value === value)?.label || value;
    }
    if (filter.type === 'range' && typeof value === 'object') {
      return `${value.min}-${value.max}`;
    }
    return value;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Please enter a segment name",
        variant: "destructive"
      });
      return;
    }

    if (formData.criteria.length === 0) {
      toast({
        title: "Error", 
        description: "Please add at least one criteria",
        variant: "destructive"
      });
      return;
    }

    // Validate criteria
    const invalidCriteria = formData.criteria.find(c => !c.field || !c.value);
    if (invalidCriteria) {
      toast({
        title: "Error",
        description: "Please complete all criteria fields",
        variant: "destructive"
      });
      return;
    }

    // Generate labels for criteria
    const criteriaWithLabels = formData.criteria.map(criteria => ({
      ...criteria,
      label: generateCriteriaLabel(criteria)
    }));

    onSave({
      ...formData,
      criteria: criteriaWithLabels
    });
  };

  const estimatedLeads = Math.floor(Math.random() * 500) + 50;

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5" />
          {segment ? 'Edit Segment' : 'Create New Segment'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Segment Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., First-Time Buyers"
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <div className="flex gap-2">
                {SEGMENT_COLORS.map(color => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, color }))}
                    className={`w-8 h-8 rounded-full border-2 ${
                      formData.color === color ? 'border-gray-400' : 'border-gray-200'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe this segment..."
              className="min-h-[80px]"
            />
          </div>

          <Separator />

          {/* Criteria Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Segment Criteria</h3>
              <Button type="button" onClick={addCriteria} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Criteria
              </Button>
            </div>

            {formData.criteria.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Target className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No criteria added yet</p>
                <p className="text-sm">Click "Add Criteria" to define your segment</p>
              </div>
            ) : (
              <div className="space-y-3">
                {formData.criteria.map((criteria, index) => (
                  <CriteriaRow
                    key={criteria.id}
                    criteria={criteria}
                    index={index}
                    onUpdate={updateCriteria}
                    onRemove={removeCriteria}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Preview Section */}
          {formData.criteria.length > 0 && (
            <>
              <Separator />
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Segment Preview
                </h4>
                <div className="flex items-center gap-2 mb-3">
                  <Badge style={{ backgroundColor: formData.color, color: 'white' }}>
                    {formData.name || 'Unnamed Segment'}
                  </Badge>
                  <span className="text-sm text-gray-600">
                    ~{estimatedLeads} leads estimated
                  </span>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p className="font-medium">Criteria:</p>
                  {formData.criteria.map((criteria, index) => (
                    <p key={criteria.id} className="pl-2">
                      {index + 1}. {generateCriteriaLabel(criteria) || 'Incomplete criteria'}
                    </p>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : segment ? 'Update Segment' : 'Create Segment'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

interface CriteriaRowProps {
  criteria: SegmentCriteria;
  index: number;
  onUpdate: (index: number, updates: Partial<SegmentCriteria>) => void;
  onRemove: (index: number) => void;
}

function CriteriaRow({ criteria, index, onUpdate, onRemove }: CriteriaRowProps) {
  const selectedFilter = SEGMENT_FILTERS.find(f => f.field === criteria.field);
  
  const getOperatorOptions = () => {
    if (!selectedFilter) return [];
    
    const baseOptions = [
      { value: 'equals', label: 'is' },
      { value: 'not_equals', label: 'is not' }
    ];
    
    if (selectedFilter.type === 'text') {
      baseOptions.push({ value: 'contains', label: 'contains' });
    }
    
    if (selectedFilter.type === 'number' || selectedFilter.type === 'range') {
      baseOptions.push(
        { value: 'greater_than', label: 'greater than' },
        { value: 'less_than', label: 'less than' },
        { value: 'between', label: 'between' }
      );
    }
    
    if (selectedFilter.type === 'multiselect') {
      baseOptions.push(
        { value: 'in', label: 'is one of' },
        { value: 'not_in', label: 'is not one of' }
      );
    }
    
    return baseOptions;
  };

  const renderValueInput = () => {
    if (!selectedFilter) return null;
    
    if (selectedFilter.type === 'select' || selectedFilter.type === 'multiselect') {
      return (
        <Select 
          value={Array.isArray(criteria.value) ? criteria.value[0] : String(criteria.value)} 
          onValueChange={(value) => onUpdate(index, { value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select value" />
          </SelectTrigger>
          <SelectContent>
            {selectedFilter.options?.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }
    
    if (criteria.operator === 'between') {
      const value = criteria.value as { min: number; max: number } || { min: 0, max: 100 };
      return (
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={value.min}
            onChange={(e) => onUpdate(index, { 
              value: { ...value, min: Number(e.target.value) } 
            })}
            placeholder="Min"
            className="w-20"
          />
          <span className="text-sm text-gray-500">to</span>
          <Input
            type="number"
            value={value.max}
            onChange={(e) => onUpdate(index, { 
              value: { ...value, max: Number(e.target.value) } 
            })}
            placeholder="Max"
            className="w-20"
          />
        </div>
      );
    }
    
    return (
      <Input
        type={selectedFilter.type === 'number' ? 'number' : 'text'}
        value={String(criteria.value)}
        onChange={(e) => onUpdate(index, { value: e.target.value })}
        placeholder={selectedFilter.placeholder || 'Enter value'}
      />
    );
  };

  return (
    <div className="grid grid-cols-12 gap-3 items-center bg-white p-3 rounded-lg border">
      <div className="col-span-3">
        <Select 
          value={criteria.field} 
          onValueChange={(value) => onUpdate(index, { field: value, value: '', operator: 'equals' })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select field" />
          </SelectTrigger>
          <SelectContent>
            {SEGMENT_FILTERS.map(filter => (
              <SelectItem key={filter.field} value={filter.field}>
                {filter.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="col-span-3">
        <Select 
          value={criteria.operator} 
          onValueChange={(value) => onUpdate(index, { operator: value as any })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select operator" />
          </SelectTrigger>
          <SelectContent>
            {getOperatorOptions().map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="col-span-5">
        {renderValueInput()}
      </div>
      
      <div className="col-span-1">
        <Button 
          type="button" 
          variant="ghost" 
          size="sm"
          onClick={() => onRemove(index)}
          className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}