import { useState, useEffect } from 'react';
import { CustomSegment, SegmentTemplate, SEGMENT_TEMPLATES } from '@/types/segments';

// Mock data for segments - in real app, this would come from API/database
const mockSegments: CustomSegment[] = [
  {
    id: 'segment-1',
    name: 'First-Time Buyers',
    description: 'New customers who made their first purchase',
    criteria: [
      {
        id: 'criteria-1',
        field: 'status',
        operator: 'equals',
        value: 'new',
        label: 'Status is New'
      },
      {
        id: 'criteria-2',
        field: 'source',
        operator: 'equals',
        value: 'website',
        label: 'Source: Website'
      }
    ],
    color: '#3B82F6',
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    leadCount: 245,
    performance: {
      openRate: 78.5,
      clickRate: 12.3,
      conversionRate: 4.2
    }
  },
  {
    id: 'segment-2',
    name: 'Luxury Property Investors',
    description: 'High-net-worth individuals interested in premium real estate',
    criteria: [
      {
        id: 'criteria-1',
        field: 'engagement',
        operator: 'equals',
        value: 'high',
        label: 'High Engagement'
      },
      {
        id: 'criteria-2',
        field: 'industry',
        operator: 'equals',
        value: 'finance',
        label: 'Industry: Finance'
      }
    ],
    color: '#10B981',
    isActive: true,
    createdAt: '2024-01-10T14:30:00Z',
    updatedAt: '2024-01-20T09:15:00Z',
    leadCount: 89,
    performance: {
      openRate: 85.2,
      clickRate: 18.7,
      conversionRate: 8.9
    }
  },
  {
    id: 'segment-3',
    name: 'Tech Startups',
    description: 'Early-stage technology companies looking for solutions',
    criteria: [
      {
        id: 'criteria-1',
        field: 'industry',
        operator: 'equals',
        value: 'technology',
        label: 'Industry: Technology'
      },
      {
        id: 'criteria-2',
        field: 'company_size',
        operator: 'equals',
        value: 'startup',
        label: 'Company Size: Startup'
      }
    ],
    color: '#8B5CF6',
    isActive: true,
    createdAt: '2024-01-05T16:45:00Z',
    updatedAt: '2024-01-18T11:20:00Z',
    leadCount: 167,
    performance: {
      openRate: 82.1,
      clickRate: 15.4,
      conversionRate: 6.1
    }
  }
];

export function useSegments() {
  const [segments, setSegments] = useState<CustomSegment[]>(() => {
    // Load segments from localStorage on initialization
    const savedSegments = localStorage.getItem('custom-segments');
    return savedSegments ? JSON.parse(savedSegments) : mockSegments;
  });
  const [templates] = useState<SegmentTemplate[]>(SEGMENT_TEMPLATES);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Save segments to localStorage whenever segments change
  useEffect(() => {
    localStorage.setItem('custom-segments', JSON.stringify(segments));
  }, [segments]);

  // Simulate API loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const createSegment = async (segment: Omit<CustomSegment, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newSegment: CustomSegment = {
        ...segment,
        id: `segment-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        leadCount: Math.floor(Math.random() * 500) + 10,
        performance: {
          openRate: Math.floor(Math.random() * 30) + 60,
          clickRate: Math.floor(Math.random() * 15) + 5,
          conversionRate: Math.floor(Math.random() * 8) + 2
        }
      };
      
      setSegments(prev => [...prev, newSegment]);
      return newSegment;
    } catch (err) {
      setError('Failed to create segment');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateSegment = async (id: string, updates: Partial<CustomSegment>) => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setSegments(prev => 
        prev.map(segment => 
          segment.id === id 
            ? { ...segment, ...updates, updatedAt: new Date().toISOString() }
            : segment
        )
      );
    } catch (err) {
      setError('Failed to update segment');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSegment = async (id: string) => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setSegments(prev => prev.filter(segment => segment.id !== id));
    } catch (err) {
      setError('Failed to delete segment');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const duplicateSegment = async (id: string) => {
    try {
      const originalSegment = segments.find(s => s.id === id);
      if (!originalSegment) throw new Error('Segment not found');
      
      const duplicatedSegment = {
        ...originalSegment,
        name: `${originalSegment.name} (Copy)`,
        id: undefined,
        createdAt: undefined,
        updatedAt: undefined
      };
      
      return await createSegment(duplicatedSegment);
    } catch (err) {
      setError('Failed to duplicate segment');
      throw err;
    }
  };

  const createFromTemplate = async (templateId: string, customName?: string) => {
    try {
      const template = templates.find(t => t.id === templateId);
      if (!template) throw new Error('Template not found');
      
      const segmentFromTemplate: Omit<CustomSegment, 'id' | 'createdAt' | 'updatedAt'> = {
        name: customName || template.name,
        description: template.description,
        criteria: template.criteria,
        color: '#3B82F6',
        isActive: true
      };
      
      return await createSegment(segmentFromTemplate);
    } catch (err) {
      setError('Failed to create segment from template');
      throw err;
    }
  };

  const getSegmentById = (id: string) => {
    return segments.find(segment => segment.id === id);
  };

  const getActiveSegments = () => {
    return segments.filter(segment => segment.isActive);
  };

  const searchSegments = (query: string) => {
    if (!query) return segments;
    const lowerQuery = query.toLowerCase();
    return segments.filter(segment => 
      segment.name.toLowerCase().includes(lowerQuery) ||
      segment.description?.toLowerCase().includes(lowerQuery)
    );
  };

  const clearError = () => {
    setError(null);
  };

  return {
    segments,
    templates,
    isLoading,
    error,
    createSegment,
    updateSegment,
    deleteSegment,
    duplicateSegment,
    createFromTemplate,
    getSegmentById,
    getActiveSegments,
    searchSegments,
    clearError
  };
}
