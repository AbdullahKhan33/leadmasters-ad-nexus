// Core segment types and interfaces
export interface SegmentCriteria {
  id: string;
  field: string; // e.g., 'age', 'location', 'source', 'status', 'lastActivity'
  operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than' | 'in' | 'not_in' | 'between';
  value: string | number | string[] | { min: number; max: number };
  label: string;
}

export interface CustomSegment {
  id: string;
  name: string;
  description?: string;
  criteria: SegmentCriteria[];
  color: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  leadCount?: number;
  performance?: {
    openRate: number;
    clickRate: number;
    conversionRate: number;
  };
}

export interface SegmentTemplate {
  id: string;
  name: string;
  description: string;
  category: 'demographics' | 'behavior' | 'engagement' | 'business' | 'custom';
  criteria: SegmentCriteria[];
  isPrebuilt: boolean;
}

export interface SegmentAnalytics {
  segmentId: string;
  totalLeads: number;
  activeLeads: number;
  campaignsSent: number;
  avgResponseTime: number;
  conversionRate: number;
  engagementScore: number;
  trends: {
    period: string;
    growth: number;
    engagement: number;
  }[];
}

export interface SegmentFilter {
  field: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'multiselect' | 'date' | 'range';
  options?: { value: string; label: string; }[];
  placeholder?: string;
}

// Available segment filters
export const SEGMENT_FILTERS: SegmentFilter[] = [
  {
    field: 'age',
    label: 'Age',
    type: 'range',
    placeholder: '18-65'
  },
  {
    field: 'location',
    label: 'Location',
    type: 'multiselect',
    options: [
      { value: 'india', label: 'India' },
      { value: 'mumbai', label: 'Mumbai' },
      { value: 'delhi', label: 'Delhi' },
      { value: 'bangalore', label: 'Bangalore' },
      { value: 'uae', label: 'UAE' },
      { value: 'dubai', label: 'Dubai' }
    ]
  },
  {
    field: 'source',
    label: 'Lead Source',
    type: 'multiselect',
    options: [
      { value: 'whatsapp', label: 'WhatsApp' },
      { value: 'facebook', label: 'Facebook' },
      { value: 'instagram', label: 'Instagram' },
      { value: 'linkedin', label: 'LinkedIn' },
      { value: 'website', label: 'Website' },
      { value: 'referral', label: 'Referral' }
    ]
  },
  {
    field: 'status',
    label: 'Lead Status',
    type: 'multiselect',
    options: [
      { value: 'new', label: 'New' },
      { value: 'active', label: 'Active' },
      { value: 'qualified', label: 'Qualified' },
      { value: 'converted', label: 'Converted' },
      { value: 'lost', label: 'Lost' }
    ]
  },
  {
    field: 'lastActivity',
    label: 'Last Activity',
    type: 'select',
    options: [
      { value: 'today', label: 'Today' },
      { value: 'week', label: 'This Week' },
      { value: 'month', label: 'This Month' },
      { value: 'quarter', label: 'This Quarter' }
    ]
  },
  {
    field: 'engagement',
    label: 'Engagement Level',
    type: 'select',
    options: [
      { value: 'high', label: 'High' },
      { value: 'medium', label: 'Medium' },
      { value: 'low', label: 'Low' }
    ]
  },
  {
    field: 'industry',
    label: 'Industry',
    type: 'multiselect',
    options: [
      { value: 'technology', label: 'Technology' },
      { value: 'healthcare', label: 'Healthcare' },
      { value: 'finance', label: 'Finance' },
      { value: 'education', label: 'Education' },
      { value: 'retail', label: 'Retail' },
      { value: 'manufacturing', label: 'Manufacturing' }
    ]
  },
  {
    field: 'company_size',
    label: 'Company Size',
    type: 'select',
    options: [
      { value: 'startup', label: 'Startup (1-10)' },
      { value: 'small', label: 'Small (11-50)' },
      { value: 'medium', label: 'Medium (51-200)' },
      { value: 'large', label: 'Large (200+)' }
    ]
  }
];

// Predefined segment templates
export const SEGMENT_TEMPLATES: SegmentTemplate[] = [
  {
    id: 'template-new-leads',
    name: 'New Leads',
    description: 'Leads acquired in the last 7 days',
    category: 'engagement',
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
        field: 'lastActivity',
        operator: 'equals',
        value: 'week',
        label: 'Last Activity: This Week'
      }
    ],
    isPrebuilt: true
  },
  {
    id: 'template-high-value',
    name: 'High-Value Prospects',
    description: 'Active leads with high engagement from premium sources',
    category: 'business',
    criteria: [
      {
        id: 'criteria-1',
        field: 'status',
        operator: 'in',
        value: ['active', 'qualified'],
        label: 'Status is Active or Qualified'
      },
      {
        id: 'criteria-2',
        field: 'engagement',
        operator: 'equals',
        value: 'high',
        label: 'High Engagement'
      },
      {
        id: 'criteria-3',
        field: 'source',
        operator: 'in',
        value: ['linkedin', 'referral'],
        label: 'Source: LinkedIn or Referral'
      }
    ],
    isPrebuilt: true
  },
  {
    id: 'template-millennials',
    name: 'Millennials',
    description: 'Age group 25-40 with active social media presence',
    category: 'demographics',
    criteria: [
      {
        id: 'criteria-1',
        field: 'age',
        operator: 'between',
        value: { min: 25, max: 40 },
        label: 'Age: 25-40'
      },
      {
        id: 'criteria-2',
        field: 'source',
        operator: 'in',
        value: ['facebook', 'instagram'],
        label: 'Source: Facebook or Instagram'
      }
    ],
    isPrebuilt: true
  },
  {
    id: 'template-enterprise',
    name: 'Enterprise Clients',
    description: 'Large company decision makers',
    category: 'business',
    criteria: [
      {
        id: 'criteria-1',
        field: 'company_size',
        operator: 'in',
        value: ['large'],
        label: 'Company Size: Large (200+)'
      },
      {
        id: 'criteria-2',
        field: 'source',
        operator: 'equals',
        value: 'linkedin',
        label: 'Source: LinkedIn'
      }
    ],
    isPrebuilt: true
  },
  {
    id: 'template-dormant',
    name: 'Dormant Leads',
    description: 'Previously active leads that need re-engagement',
    category: 'engagement',
    criteria: [
      {
        id: 'criteria-1',
        field: 'status',
        operator: 'equals',
        value: 'active',
        label: 'Status is Active'
      },
      {
        id: 'criteria-2',
        field: 'lastActivity',
        operator: 'equals',
        value: 'month',
        label: 'Last Activity: Over a Month Ago'
      }
    ],
    isPrebuilt: true
  }
];