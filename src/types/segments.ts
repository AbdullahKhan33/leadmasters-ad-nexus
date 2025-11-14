// Core segment types and interfaces
export interface SegmentCriteriaNew {
  status?: string[];
  source?: string[];
  category?: string[];
  list?: string[];
  ai_score_min?: number;
  ai_score_max?: number;
  created_after?: string;
  created_before?: string;
  has_email?: boolean;
  has_phone?: boolean;
}

export interface Segment {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  criteria: SegmentCriteriaNew;
  color?: string;
  is_active: boolean;
  lead_count?: number;
  created_at: string;
  updated_at: string;
}

export interface SegmentCriteria {
  id: string;
  field: string; // e.g., 'age', 'location', 'source', 'status', 'lastActivity'
  operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than' | 'in' | 'not_in' | 'between' | 'before' | 'after' | 'in_last_days' | 'in_next_days';
  value: string | number | string[] | { min: number; max: number } | { days: number };
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
  type: 'text' | 'number' | 'select' | 'multiselect' | 'date' | 'daterange' | 'range';
  options?: { value: string; label: string; }[];
  placeholder?: string;
}

// Available segment filters
export const SEGMENT_FILTERS: SegmentFilter[] = [
  // Date & Time Filters
  {
    field: 'date',
    label: 'Date',
    type: 'date',
    placeholder: 'Select date or range'
  },
  
  // Lead Quality & Scoring
  {
    field: 'lead_score',
    label: 'Lead Score',
    type: 'number',
    placeholder: '0-100'
  },
  {
    field: 'qualification_status',
    label: 'Qualification Status',
    type: 'select',
    options: [
      { value: 'unqualified', label: 'Unqualified' },
      { value: 'qualifying', label: 'Qualifying' },
      { value: 'qualified', label: 'Qualified' },
      { value: 'hot_lead', label: 'Hot Lead' },
      { value: 'disqualified', label: 'Disqualified' }
    ]
  },
  {
    field: 'priority_level',
    label: 'Priority Level',
    type: 'select',
    options: [
      { value: 'high', label: 'High Priority' },
      { value: 'medium', label: 'Medium Priority' },
      { value: 'low', label: 'Low Priority' }
    ]
  },
  
  // Contact Information Status
  {
    field: 'email_status',
    label: 'Email Status',
    type: 'select',
    options: [
      { value: 'has_email', label: 'Has Email' },
      { value: 'no_email', label: 'No Email' },
      { value: 'email_verified', label: 'Email Verified' },
      { value: 'email_bounced', label: 'Email Bounced' }
    ]
  },
  {
    field: 'phone_status',
    label: 'Phone Status',
    type: 'select',
    options: [
      { value: 'has_phone', label: 'Has Phone' },
      { value: 'no_phone', label: 'No Phone' },
      { value: 'phone_verified', label: 'Phone Verified' },
      { value: 'phone_invalid', label: 'Phone Invalid' }
    ]
  },
  {
    field: 'whatsapp_status',
    label: 'WhatsApp Status',
    type: 'select',
    options: [
      { value: 'whatsapp_active', label: 'WhatsApp Active' },
      { value: 'whatsapp_opted_out', label: 'WhatsApp Opted Out' },
      { value: 'no_whatsapp', label: 'No WhatsApp' }
    ]
  },
  
  // Location-Based Filters
  {
    field: 'country',
    label: 'Country',
    type: 'multiselect',
    options: [
      { value: 'india', label: 'India' },
      { value: 'uae', label: 'UAE' },
      { value: 'qatar', label: 'Qatar' },
      { value: 'saudi_arabia', label: 'Saudi Arabia' }
    ]
  },
  {
    field: 'city',
    label: 'City',
    type: 'multiselect',
    options: [
      // India
      { value: 'mumbai', label: 'Mumbai' },
      { value: 'delhi', label: 'Delhi' },
      { value: 'bangalore', label: 'Bangalore' },
      { value: 'pune', label: 'Pune' },
      { value: 'hyderabad', label: 'Hyderabad' },
      { value: 'chennai', label: 'Chennai' },
      { value: 'kolkata', label: 'Kolkata' },
      { value: 'ahmedabad', label: 'Ahmedabad' },
      { value: 'jaipur', label: 'Jaipur' },
      { value: 'tier2_india', label: 'Tier-2 Cities (India)' },
      // UAE
      { value: 'dubai', label: 'Dubai' },
      { value: 'abu_dhabi', label: 'Abu Dhabi' },
      { value: 'sharjah', label: 'Sharjah' },
      { value: 'ajman', label: 'Ajman' },
      // Qatar
      { value: 'doha', label: 'Doha' },
      { value: 'al_wakrah', label: 'Al Wakrah' },
      { value: 'al_rayyan', label: 'Al Rayyan' },
      // Saudi Arabia
      { value: 'riyadh', label: 'Riyadh' },
      { value: 'jeddah', label: 'Jeddah' },
      { value: 'dammam', label: 'Dammam' },
      { value: 'mecca', label: 'Mecca' }
    ]
  },
  
  // Real Estate Specific Filters
  {
    field: 'property_type',
    label: 'Property Type',
    type: 'multiselect',
    options: [
      { value: 'apartment', label: 'Apartment' },
      { value: 'villa', label: 'Villa' },
      { value: 'townhouse', label: 'Townhouse' },
      { value: 'penthouse', label: 'Penthouse' },
      { value: 'studio', label: 'Studio' },
      { value: 'commercial', label: 'Commercial' },
      { value: 'plot_land', label: 'Plot/Land' }
    ]
  },
  {
    field: 'property_purpose',
    label: 'Property Purpose',
    type: 'select',
    options: [
      { value: 'first_home', label: 'First Home' },
      { value: 'investment', label: 'Investment' },
      { value: 'upgrade', label: 'Upgrade' },
      { value: 'rental_income', label: 'Rental Income' },
      { value: 'resale', label: 'Resale' }
    ]
  },
  {
    field: 'budget_range',
    label: 'Budget Range',
    type: 'select',
    options: [
      // India
      { value: 'inr_30_50l', label: '₹30-50L' },
      { value: 'inr_50_75l', label: '₹50-75L' },
      { value: 'inr_75l_1cr', label: '₹75L-1Cr' },
      { value: 'inr_1_2cr', label: '₹1-2Cr' },
      { value: 'inr_2cr_plus', label: '₹2Cr+' },
      // UAE/Qatar/Saudi
      { value: 'aed_500k_1m', label: 'AED 500K-1M' },
      { value: 'aed_1_2m', label: 'AED 1-2M' },
      { value: 'aed_2_5m', label: 'AED 2-5M' },
      { value: 'aed_5m_plus', label: 'AED 5M+' },
      { value: 'sar_qar_1_3m', label: 'SAR/QAR 1-3M' },
      { value: 'sar_qar_3m_plus', label: 'SAR/QAR 3M+' }
    ]
  },
  {
    field: 'buyer_type',
    label: 'Buyer Type',
    type: 'select',
    options: [
      { value: 'first_time', label: 'First-time Buyer' },
      { value: 'investor', label: 'Investor' },
      { value: 'upgrading', label: 'Upgrading' },
      { value: 'nri_expat', label: 'NRI/Expat' }
    ]
  },
  {
    field: 'property_features',
    label: 'Property Features',
    type: 'multiselect',
    options: [
      { value: 'ready_to_move', label: 'Ready-to-move' },
      { value: 'under_construction', label: 'Under-construction' },
      { value: 'furnished', label: 'Furnished' },
      { value: 'pool', label: 'Pool' },
      { value: 'gym', label: 'Gym' },
      { value: 'security', label: 'Security' },
      { value: 'parking', label: 'Parking' }
    ]
  },
  
  // EdTech Specific Filters
  {
    field: 'course_interest',
    label: 'Course Interest',
    type: 'multiselect',
    options: [
      { value: 'programming', label: 'Programming' },
      { value: 'data_science', label: 'Data Science' },
      { value: 'digital_marketing', label: 'Digital Marketing' },
      { value: 'business_mba', label: 'Business/MBA' },
      { value: 'design', label: 'Design' },
      { value: 'language_learning', label: 'Language Learning' },
      { value: 'test_prep', label: 'Test Prep (GMAT/GRE/IELTS)' },
      { value: 'certifications', label: 'Professional Certifications' }
    ]
  },
  {
    field: 'career_stage',
    label: 'Career Stage',
    type: 'select',
    options: [
      { value: 'student', label: 'Student' },
      { value: 'fresh_graduate', label: 'Fresh Graduate' },
      { value: 'career_switcher', label: 'Career Switcher' },
      { value: 'professional_upskilling', label: 'Professional Upskilling' },
      { value: 'executive', label: 'Executive' }
    ]
  },
  {
    field: 'course_budget',
    label: 'Course Budget',
    type: 'select',
    options: [
      // India
      { value: 'inr_10_25k', label: '₹10-25K' },
      { value: 'inr_25_50k', label: '₹25-50K' },
      { value: 'inr_50k_1l', label: '₹50K-1L' },
      { value: 'inr_1l_plus', label: '₹1L+' },
      // UAE/Qatar/Saudi
      { value: 'aed_sar_1_5k', label: 'AED/SAR 1-5K' },
      { value: 'aed_sar_5_10k', label: 'AED/SAR 5-10K' },
      { value: 'aed_sar_10_20k', label: 'AED/SAR 10-20K' },
      { value: 'aed_sar_20k_plus', label: 'AED/SAR 20K+' }
    ]
  },
  {
    field: 'learning_preference',
    label: 'Learning Preference',
    type: 'select',
    options: [
      { value: 'self_paced', label: 'Self-paced' },
      { value: 'live_classes', label: 'Live Classes' },
      { value: 'hybrid', label: 'Hybrid' },
      { value: 'in_person', label: 'In-person' }
    ]
  },
  {
    field: 'course_timeline',
    label: 'Course Timeline',
    type: 'select',
    options: [
      { value: 'short_course', label: 'Short Course (1-3 months)' },
      { value: 'bootcamp', label: 'Bootcamp (3-6 months)' },
      { value: 'degree_program', label: 'Degree Program (1+ year)' }
    ]
  },
  {
    field: 'language_preference',
    label: 'Language Preference',
    type: 'multiselect',
    options: [
      { value: 'english', label: 'English' },
      { value: 'hindi', label: 'Hindi' },
      { value: 'arabic', label: 'Arabic' },
      { value: 'urdu', label: 'Urdu' }
    ]
  },
  {
    field: 'demo_status',
    label: 'Demo Status',
    type: 'select',
    options: [
      { value: 'not_contacted', label: 'Not Contacted' },
      { value: 'demo_scheduled', label: 'Demo Scheduled' },
      { value: 'demo_completed', label: 'Demo Completed' },
      { value: 'not_interested', label: 'Not Interested' }
    ]
  },
  
  // Common Behavioral Filters
  {
    field: 'timeline',
    label: 'Timeline',
    type: 'select',
    options: [
      { value: 'immediate', label: 'Immediate' },
      { value: '1_3_months', label: '1-3 Months' },
      { value: '3_6_months', label: '3-6 Months' },
      { value: '6_12_months', label: '6-12 Months' },
      { value: '1_year_plus', label: '1+ Year' }
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
    field: 'engagement_level',
    label: 'Engagement Level',
    type: 'select',
    options: [
      { value: 'hot', label: 'Hot (70%+ opens)' },
      { value: 'warm', label: 'Warm (30-70% opens)' },
      { value: 'cold', label: 'Cold (<30% opens)' }
    ]
  },
  {
    field: 'last_interaction',
    label: 'Last Interaction',
    type: 'select',
    options: [
      { value: 'less_24h', label: '<24 hours' },
      { value: '1_3_days', label: '1-3 Days' },
      { value: '3_7_days', label: '3-7 Days' },
      { value: '1_2_weeks', label: '1-2 Weeks' },
      { value: '2_4_weeks', label: '2-4 Weeks' },
      { value: '1_month_plus', label: '1+ Month' }
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
      { value: 'real_estate', label: 'Real Estate' },
      { value: 'retail', label: 'Retail' },
      { value: 'manufacturing', label: 'Manufacturing' }
    ]
  }
];

// Predefined segment templates
export const SEGMENT_TEMPLATES: SegmentTemplate[] = [
  // ============= REAL ESTATE TEMPLATES =============
  
  // India Real Estate (3 templates)
  {
    id: 'template-mumbai-luxury',
    name: 'Mumbai Luxury Apartment Buyers',
    description: 'Premium property seekers in Mumbai - Apartments & Penthouses ₹2Cr+',
    category: 'business',
    criteria: [
      { id: 'c1', field: 'city', operator: 'equals', value: 'mumbai', label: 'City: Mumbai' },
      { id: 'c2', field: 'property_type', operator: 'in', value: ['apartment', 'penthouse'], label: 'Property Type: Apartment, Penthouse' },
      { id: 'c3', field: 'budget_range', operator: 'equals', value: 'inr_2cr_plus', label: 'Budget: ₹2Cr+' },
      { id: 'c4', field: 'timeline', operator: 'in', value: ['3_6_months'], label: 'Timeline: 3-6 Months' }
    ],
    isPrebuilt: true
  },
  {
    id: 'template-tier2-first-home',
    name: 'Tier-2 City First-Time Home Buyers',
    description: 'First-time home buyers in Tier-2 cities, budget ₹30-75L',
    category: 'demographics',
    criteria: [
      { id: 'c1', field: 'city', operator: 'in', value: ['tier2_india', 'jaipur', 'pune', 'ahmedabad'], label: 'City: Tier-2, Jaipur, Pune, Ahmedabad' },
      { id: 'c2', field: 'property_type', operator: 'in', value: ['apartment', 'villa'], label: 'Property Type: Apartment, Villa' },
      { id: 'c3', field: 'budget_range', operator: 'in', value: ['inr_30_50l', 'inr_50_75l'], label: 'Budget: ₹30-75L' },
      { id: 'c4', field: 'buyer_type', operator: 'equals', value: 'first_time', label: 'Buyer Type: First-time' },
      { id: 'c5', field: 'property_purpose', operator: 'equals', value: 'first_home', label: 'Purpose: First Home' }
    ],
    isPrebuilt: true
  },
  {
    id: 'template-nri-investment',
    name: 'NRI Investment Property Seekers',
    description: 'NRIs looking for rental income properties in India ₹75L+',
    category: 'business',
    criteria: [
      { id: 'c1', field: 'country', operator: 'equals', value: 'india', label: 'Country: India' },
      { id: 'c2', field: 'buyer_type', operator: 'equals', value: 'nri_expat', label: 'Buyer Type: NRI/Expat' },
      { id: 'c3', field: 'property_type', operator: 'in', value: ['apartment', 'commercial'], label: 'Property Type: Apartment, Commercial' },
      { id: 'c4', field: 'property_purpose', operator: 'in', value: ['investment', 'rental_income'], label: 'Purpose: Investment, Rental Income' },
      { id: 'c5', field: 'property_features', operator: 'in', value: ['ready_to_move', 'security'], label: 'Features: Ready-to-move, Security' }
    ],
    isPrebuilt: true
  },
  
  // Dubai/UAE Real Estate (3 templates)
  {
    id: 'template-dubai-downtown-luxury',
    name: 'Dubai Downtown Luxury Investors',
    description: 'Luxury property investors in Downtown Dubai, Marina - AED 2-5M+',
    category: 'business',
    criteria: [
      { id: 'c1', field: 'city', operator: 'equals', value: 'dubai', label: 'City: Dubai' },
      { id: 'c2', field: 'property_type', operator: 'in', value: ['apartment', 'penthouse'], label: 'Property Type: Apartment, Penthouse' },
      { id: 'c3', field: 'budget_range', operator: 'in', value: ['aed_2_5m', 'aed_5m_plus'], label: 'Budget: AED 2-5M+' },
      { id: 'c4', field: 'property_purpose', operator: 'equals', value: 'investment', label: 'Purpose: Investment' },
      { id: 'c5', field: 'property_features', operator: 'in', value: ['pool', 'gym', 'furnished'], label: 'Features: Pool, Gym, Furnished' }
    ],
    isPrebuilt: true
  },
  {
    id: 'template-affordable-dubai-family',
    name: 'Affordable Dubai Family Homes',
    description: 'Budget-friendly family homes in Dubai, Sharjah, Ajman - AED 500K-1M',
    category: 'demographics',
    criteria: [
      { id: 'c1', field: 'city', operator: 'in', value: ['dubai', 'sharjah', 'ajman'], label: 'City: Dubai, Sharjah, Ajman' },
      { id: 'c2', field: 'property_type', operator: 'in', value: ['apartment', 'townhouse'], label: 'Property Type: Apartment, Townhouse' },
      { id: 'c3', field: 'budget_range', operator: 'equals', value: 'aed_500k_1m', label: 'Budget: AED 500K-1M' },
      { id: 'c4', field: 'buyer_type', operator: 'equals', value: 'first_time', label: 'Buyer Type: First-time' },
      { id: 'c5', field: 'timeline', operator: 'equals', value: '1_3_months', label: 'Timeline: 1-3 Months' }
    ],
    isPrebuilt: true
  },
  {
    id: 'template-dubai-offplan',
    name: 'Dubai Off-Plan Investment Deals',
    description: 'Off-plan property investors with payment plans - AED 1-2M',
    category: 'business',
    criteria: [
      { id: 'c1', field: 'city', operator: 'equals', value: 'dubai', label: 'City: Dubai' },
      { id: 'c2', field: 'property_type', operator: 'in', value: ['apartment', 'villa'], label: 'Property Type: Apartment, Villa' },
      { id: 'c3', field: 'property_features', operator: 'equals', value: 'under_construction', label: 'Features: Under-construction' },
      { id: 'c4', field: 'budget_range', operator: 'equals', value: 'aed_1_2m', label: 'Budget: AED 1-2M' },
      { id: 'c5', field: 'timeline', operator: 'equals', value: '6_12_months', label: 'Timeline: 6-12 Months' }
    ],
    isPrebuilt: true
  },
  
  // Qatar Real Estate (3 templates)
  {
    id: 'template-doha-expat-rental',
    name: 'Doha Expat Rental Seekers',
    description: 'Expats looking for furnished rentals in Doha - immediate need',
    category: 'demographics',
    criteria: [
      { id: 'c1', field: 'city', operator: 'equals', value: 'doha', label: 'City: Doha' },
      { id: 'c2', field: 'property_type', operator: 'in', value: ['apartment', 'villa'], label: 'Property Type: Apartment, Villa' },
      { id: 'c3', field: 'buyer_type', operator: 'equals', value: 'nri_expat', label: 'Buyer Type: Expat' },
      { id: 'c4', field: 'timeline', operator: 'in', value: ['immediate', '1_3_months'], label: 'Timeline: Immediate - 3 Months' },
      { id: 'c5', field: 'property_features', operator: 'in', value: ['furnished', 'parking', 'security'], label: 'Features: Furnished, Parking, Security' }
    ],
    isPrebuilt: true
  },
  {
    id: 'template-qatar-investment',
    name: 'Qatar Investment Properties',
    description: 'Investment property buyers in Doha, Al Wakrah - QAR 1M+',
    category: 'business',
    criteria: [
      { id: 'c1', field: 'city', operator: 'in', value: ['doha', 'al_wakrah'], label: 'City: Doha, Al Wakrah' },
      { id: 'c2', field: 'property_type', operator: 'in', value: ['commercial', 'apartment'], label: 'Property Type: Commercial, Apartment' },
      { id: 'c3', field: 'property_purpose', operator: 'in', value: ['investment', 'rental_income'], label: 'Purpose: Investment, Rental Income' },
      { id: 'c4', field: 'buyer_type', operator: 'equals', value: 'investor', label: 'Buyer Type: Investor' }
    ],
    isPrebuilt: true
  },
  {
    id: 'template-doha-luxury-villa',
    name: 'Doha Luxury Villa Buyers',
    description: 'High-net-worth villa buyers in Doha compounds - QAR 3M+',
    category: 'business',
    criteria: [
      { id: 'c1', field: 'city', operator: 'equals', value: 'doha', label: 'City: Doha' },
      { id: 'c2', field: 'property_type', operator: 'equals', value: 'villa', label: 'Property Type: Villa' },
      { id: 'c3', field: 'budget_range', operator: 'equals', value: 'sar_qar_3m_plus', label: 'Budget: QAR 3M+' },
      { id: 'c4', field: 'property_features', operator: 'in', value: ['pool', 'security', 'furnished'], label: 'Features: Pool, Security, Furnished' },
      { id: 'c5', field: 'timeline', operator: 'equals', value: '3_6_months', label: 'Timeline: 3-6 Months' }
    ],
    isPrebuilt: true
  },
  
  // Saudi Arabia Real Estate (3 templates)
  {
    id: 'template-riyadh-vision2030',
    name: 'Riyadh Vision 2030 Investors',
    description: 'Vision 2030 mega-project investors - NEOM, entertainment cities',
    category: 'business',
    criteria: [
      { id: 'c1', field: 'city', operator: 'equals', value: 'riyadh', label: 'City: Riyadh' },
      { id: 'c2', field: 'property_type', operator: 'in', value: ['commercial', 'apartment'], label: 'Property Type: Commercial, Apartment' },
      { id: 'c3', field: 'property_purpose', operator: 'equals', value: 'investment', label: 'Purpose: Investment' },
      { id: 'c4', field: 'timeline', operator: 'in', value: ['6_12_months', '1_year_plus'], label: 'Timeline: 6-12 Months+' }
    ],
    isPrebuilt: true
  },
  {
    id: 'template-riyadh-family-compound',
    name: 'Riyadh Family Compound Seekers',
    description: 'Saudi families looking for residential compounds - SAR 1-3M',
    category: 'demographics',
    criteria: [
      { id: 'c1', field: 'city', operator: 'equals', value: 'riyadh', label: 'City: Riyadh' },
      { id: 'c2', field: 'property_type', operator: 'in', value: ['villa', 'townhouse'], label: 'Property Type: Villa, Townhouse' },
      { id: 'c3', field: 'property_purpose', operator: 'equals', value: 'first_home', label: 'Purpose: First Home' },
      { id: 'c4', field: 'budget_range', operator: 'equals', value: 'sar_qar_1_3m', label: 'Budget: SAR 1-3M' },
      { id: 'c5', field: 'property_features', operator: 'in', value: ['security', 'parking'], label: 'Features: Security, Parking' }
    ],
    isPrebuilt: true
  },
  {
    id: 'template-jeddah-waterfront',
    name: 'Jeddah Waterfront Properties',
    description: 'Corniche & Red Sea waterfront property buyers - SAR 2M+',
    category: 'business',
    criteria: [
      { id: 'c1', field: 'city', operator: 'equals', value: 'jeddah', label: 'City: Jeddah' },
      { id: 'c2', field: 'property_type', operator: 'in', value: ['apartment', 'villa'], label: 'Property Type: Apartment, Villa' },
      { id: 'c3', field: 'budget_range', operator: 'equals', value: 'sar_qar_3m_plus', label: 'Budget: SAR 2M+' },
      { id: 'c4', field: 'property_features', operator: 'in', value: ['ready_to_move', 'furnished'], label: 'Features: Ready-to-move, Furnished' },
      { id: 'c5', field: 'timeline', operator: 'equals', value: '1_3_months', label: 'Timeline: 1-3 Months' }
    ],
    isPrebuilt: true
  },
  
  // ============= EDTECH TEMPLATES =============
  
  // India EdTech (3 templates)
  {
    id: 'template-india-career-switcher',
    name: 'India Career Switchers - Tech',
    description: 'Career switchers & fresh grads interested in Programming/Data Science',
    category: 'business',
    criteria: [
      { id: 'c1', field: 'country', operator: 'equals', value: 'india', label: 'Country: India' },
      { id: 'c2', field: 'career_stage', operator: 'in', value: ['career_switcher', 'fresh_graduate'], label: 'Career Stage: Career Switcher, Fresh Graduate' },
      { id: 'c3', field: 'course_interest', operator: 'in', value: ['programming', 'data_science'], label: 'Course: Programming, Data Science' },
      { id: 'c4', field: 'course_budget', operator: 'in', value: ['inr_50k_1l'], label: 'Budget: ₹50K-1L' },
      { id: 'c5', field: 'course_timeline', operator: 'equals', value: 'bootcamp', label: 'Timeline: Bootcamp (3-6 months)' }
    ],
    isPrebuilt: true
  },
  {
    id: 'template-india-test-prep',
    name: 'India Test Prep Aspirants',
    description: 'Study abroad aspirants - GMAT/GRE/IELTS test prep',
    category: 'demographics',
    criteria: [
      { id: 'c1', field: 'country', operator: 'equals', value: 'india', label: 'Country: India' },
      { id: 'c2', field: 'course_interest', operator: 'equals', value: 'test_prep', label: 'Course: Test Prep (GMAT/GRE/IELTS)' },
      { id: 'c3', field: 'career_stage', operator: 'in', value: ['student', 'professional_upskilling'], label: 'Career Stage: Student, Professional' },
      { id: 'c4', field: 'course_budget', operator: 'in', value: ['inr_10_25k', 'inr_25_50k'], label: 'Budget: ₹10-50K' },
      { id: 'c5', field: 'course_timeline', operator: 'equals', value: 'short_course', label: 'Timeline: Short Course (1-3 months)' }
    ],
    isPrebuilt: true
  },
  {
    id: 'template-india-professional-upskilling',
    name: 'India Professional Upskilling',
    description: 'Working professionals upgrading skills - Business/Digital Marketing',
    category: 'business',
    criteria: [
      { id: 'c1', field: 'country', operator: 'equals', value: 'india', label: 'Country: India' },
      { id: 'c2', field: 'career_stage', operator: 'in', value: ['professional_upskilling', 'executive'], label: 'Career Stage: Professional, Executive' },
      { id: 'c3', field: 'course_interest', operator: 'in', value: ['business_mba', 'digital_marketing', 'certifications'], label: 'Course: Business/MBA, Digital Marketing, Certifications' },
      { id: 'c4', field: 'course_budget', operator: 'in', value: ['inr_25_50k', 'inr_1l_plus'], label: 'Budget: ₹25K-1L+' },
      { id: 'c5', field: 'learning_preference', operator: 'in', value: ['self_paced', 'hybrid'], label: 'Learning: Self-paced, Hybrid' }
    ],
    isPrebuilt: true
  },
  
  // Dubai/UAE EdTech (3 templates)
  {
    id: 'template-dubai-expat-career',
    name: 'Dubai Expat Career Transition',
    description: 'Expats transitioning to tech/digital roles - Programming/Marketing',
    category: 'business',
    criteria: [
      { id: 'c1', field: 'city', operator: 'in', value: ['dubai', 'abu_dhabi'], label: 'City: Dubai, Abu Dhabi' },
      { id: 'c2', field: 'career_stage', operator: 'in', value: ['career_switcher', 'professional_upskilling'], label: 'Career Stage: Career Switcher, Professional' },
      { id: 'c3', field: 'course_interest', operator: 'in', value: ['programming', 'data_science', 'digital_marketing'], label: 'Course: Programming, Data Science, Digital Marketing' },
      { id: 'c4', field: 'course_budget', operator: 'in', value: ['aed_sar_5_10k', 'aed_sar_10_20k'], label: 'Budget: AED 5-20K' },
      { id: 'c5', field: 'demo_status', operator: 'in', value: ['demo_completed', 'demo_scheduled'], label: 'Demo: Completed, Scheduled' }
    ],
    isPrebuilt: true
  },
  {
    id: 'template-uae-certifications',
    name: 'UAE Professional Certifications',
    description: 'Professionals seeking certifications - PMP, CFA, executive programs',
    category: 'business',
    criteria: [
      { id: 'c1', field: 'country', operator: 'equals', value: 'uae', label: 'Country: UAE' },
      { id: 'c2', field: 'career_stage', operator: 'in', value: ['professional_upskilling', 'executive'], label: 'Career Stage: Professional, Executive' },
      { id: 'c3', field: 'course_interest', operator: 'in', value: ['certifications', 'business_mba'], label: 'Course: Certifications, Business/MBA' },
      { id: 'c4', field: 'course_budget', operator: 'in', value: ['aed_sar_10_20k', 'aed_sar_20k_plus'], label: 'Budget: AED 10-20K+' },
      { id: 'c5', field: 'learning_preference', operator: 'in', value: ['live_classes', 'in_person'], label: 'Learning: Live, In-person' }
    ],
    isPrebuilt: true
  },
  {
    id: 'template-dubai-arabic-learners',
    name: 'Dubai Arabic Language Learners',
    description: 'Expats learning Arabic for career advancement',
    category: 'demographics',
    criteria: [
      { id: 'c1', field: 'city', operator: 'equals', value: 'dubai', label: 'City: Dubai' },
      { id: 'c2', field: 'course_interest', operator: 'equals', value: 'language_learning', label: 'Course: Language Learning' },
      { id: 'c3', field: 'language_preference', operator: 'equals', value: 'arabic', label: 'Language: Arabic' },
      { id: 'c4', field: 'career_stage', operator: 'equals', value: 'professional_upskilling', label: 'Career Stage: Professional' },
      { id: 'c5', field: 'course_budget', operator: 'equals', value: 'aed_sar_1_5k', label: 'Budget: AED 1-5K' }
    ],
    isPrebuilt: true
  },
  
  // Qatar EdTech (3 templates)
  {
    id: 'template-doha-expat-upskilling',
    name: 'Doha Expat Upskilling',
    description: 'Expat professionals upskilling in Business/Marketing/Data Science',
    category: 'business',
    criteria: [
      { id: 'c1', field: 'city', operator: 'equals', value: 'doha', label: 'City: Doha' },
      { id: 'c2', field: 'career_stage', operator: 'equals', value: 'professional_upskilling', label: 'Career Stage: Professional Upskilling' },
      { id: 'c3', field: 'course_interest', operator: 'in', value: ['business_mba', 'digital_marketing', 'data_science'], label: 'Course: Business/MBA, Digital Marketing, Data Science' },
      { id: 'c4', field: 'course_budget', operator: 'in', value: ['aed_sar_5_10k', 'aed_sar_10_20k'], label: 'Budget: QAR 5-15K' },
      { id: 'c5', field: 'learning_preference', operator: 'in', value: ['hybrid', 'live_classes'], label: 'Learning: Hybrid, Live Classes' }
    ],
    isPrebuilt: true
  },
  {
    id: 'template-qatar-graduate-programs',
    name: 'Qatar Graduate Programs',
    description: 'Fresh graduates & students - Degree programs & university partnerships',
    category: 'demographics',
    criteria: [
      { id: 'c1', field: 'country', operator: 'equals', value: 'qatar', label: 'Country: Qatar' },
      { id: 'c2', field: 'career_stage', operator: 'in', value: ['fresh_graduate', 'student'], label: 'Career Stage: Fresh Graduate, Student' },
      { id: 'c3', field: 'course_interest', operator: 'in', value: ['programming', 'design', 'business_mba'], label: 'Course: Programming, Design, Business' },
      { id: 'c4', field: 'course_budget', operator: 'in', value: ['aed_sar_10_20k', 'aed_sar_20k_plus'], label: 'Budget: QAR 10-30K' },
      { id: 'c5', field: 'course_timeline', operator: 'equals', value: 'degree_program', label: 'Timeline: Degree Program (1+ year)' }
    ],
    isPrebuilt: true
  },
  {
    id: 'template-qatar-executive-education',
    name: 'Qatar Executive Education',
    description: 'Executive leadership programs & executive MBA',
    category: 'business',
    criteria: [
      { id: 'c1', field: 'city', operator: 'equals', value: 'doha', label: 'City: Doha' },
      { id: 'c2', field: 'career_stage', operator: 'equals', value: 'executive', label: 'Career Stage: Executive' },
      { id: 'c3', field: 'course_interest', operator: 'in', value: ['business_mba', 'certifications'], label: 'Course: Business/MBA, Certifications' },
      { id: 'c4', field: 'course_budget', operator: 'equals', value: 'aed_sar_20k_plus', label: 'Budget: QAR 20K+' },
      { id: 'c5', field: 'learning_preference', operator: 'in', value: ['in_person', 'live_classes'], label: 'Learning: In-person, Live Classes' }
    ],
    isPrebuilt: true
  },
  
  // Saudi Arabia EdTech (3 templates)
  {
    id: 'template-riyadh-vision2030-skills',
    name: 'Riyadh Saudi Vision 2030 Skills',
    description: 'Vision 2030 digital transformation skills - Programming/Data Science',
    category: 'business',
    criteria: [
      { id: 'c1', field: 'city', operator: 'equals', value: 'riyadh', label: 'City: Riyadh' },
      { id: 'c2', field: 'course_interest', operator: 'in', value: ['programming', 'data_science', 'digital_marketing'], label: 'Course: Programming, Data Science, Digital Marketing' },
      { id: 'c3', field: 'career_stage', operator: 'in', value: ['fresh_graduate', 'career_switcher'], label: 'Career Stage: Fresh Graduate, Career Switcher' },
      { id: 'c4', field: 'course_budget', operator: 'in', value: ['aed_sar_10_20k', 'aed_sar_20k_plus'], label: 'Budget: SAR 10-40K' },
      { id: 'c5', field: 'language_preference', operator: 'in', value: ['arabic', 'english'], label: 'Language: Arabic, English' }
    ],
    isPrebuilt: true
  },
  {
    id: 'template-saudi-women-career',
    name: 'Saudi Women Career Development',
    description: 'Women entering workforce - Business/Marketing/Design',
    category: 'demographics',
    criteria: [
      { id: 'c1', field: 'country', operator: 'equals', value: 'saudi_arabia', label: 'Country: Saudi Arabia' },
      { id: 'c2', field: 'career_stage', operator: 'in', value: ['fresh_graduate', 'career_switcher', 'professional_upskilling'], label: 'Career Stage: Fresh Graduate, Career Switcher, Professional' },
      { id: 'c3', field: 'course_interest', operator: 'in', value: ['business_mba', 'digital_marketing', 'design'], label: 'Course: Business/MBA, Digital Marketing, Design' },
      { id: 'c4', field: 'course_budget', operator: 'in', value: ['aed_sar_5_10k', 'aed_sar_10_20k'], label: 'Budget: SAR 5-20K' },
      { id: 'c5', field: 'learning_preference', operator: 'in', value: ['self_paced', 'live_classes'], label: 'Learning: Self-paced, Live Classes' }
    ],
    isPrebuilt: true
  },
  {
    id: 'template-riyadh-tech-talent',
    name: 'Riyadh Tech Talent Pipeline',
    description: 'Students & fresh grads - University collaborations, job placement',
    category: 'business',
    criteria: [
      { id: 'c1', field: 'city', operator: 'in', value: ['riyadh', 'jeddah'], label: 'City: Riyadh, Jeddah' },
      { id: 'c2', field: 'career_stage', operator: 'in', value: ['student', 'fresh_graduate'], label: 'Career Stage: Student, Fresh Graduate' },
      { id: 'c3', field: 'course_interest', operator: 'in', value: ['programming', 'data_science'], label: 'Course: Programming, Data Science' },
      { id: 'c4', field: 'course_budget', operator: 'in', value: ['aed_sar_10_20k', 'aed_sar_20k_plus'], label: 'Budget: SAR 15-50K' },
      { id: 'c5', field: 'demo_status', operator: 'equals', value: 'demo_completed', label: 'Demo: Completed' }
    ],
    isPrebuilt: true
  }
];