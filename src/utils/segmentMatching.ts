import { SegmentCriteria } from '@/types/segments';

interface Lead {
  source_metadata?: any;
  status?: string;
  source?: string;
  [key: string]: any;
}

/**
 * Matches a lead against segment criteria
 */
export function matchesCriteria(lead: Lead, criteria: SegmentCriteria[]): boolean {
  if (!criteria || criteria.length === 0) return false;

  // All criteria must match (AND logic)
  return criteria.every(criterion => matchesSingleCriterion(lead, criterion));
}

function matchesSingleCriterion(lead: Lead, criterion: SegmentCriteria): boolean {
  const { field, operator, value } = criterion;
  
  // Get field value - use database columns for date fields, otherwise check source_metadata
  let leadValue;
  if (field === 'created_at' || field === 'updated_at') {
    leadValue = lead[field];
  } else if (field === 'last_interaction_at' || field === 'reminder_date') {
    leadValue = lead.source_metadata?.[field] ?? lead[field];
  } else {
    leadValue = lead.source_metadata?.[field] ?? lead[field];
  }
  
  // Special handling for computed fields
  if (field === 'email_status') {
    if (!lead.email) return value === 'no_email';
    return value === 'has_email';
  }
  
  if (field === 'phone_status') {
    if (!lead.phone) return value === 'no_phone';
    return value === 'has_phone';
  }
  
  if (field === 'lead_score') {
    leadValue = lead.source_metadata?.lead_score ?? 0;
  }
  
  // Handle null/undefined leadValue
  if (leadValue === null || leadValue === undefined) {
    // For date operators, null means no date set
    if (operator === 'before' || operator === 'after' || operator === 'between' || 
        operator === 'in_last_days' || operator === 'in_next_days') {
      return false;
    }
    return false;
  }
  
  // Handle date operators
  if (operator === 'before' || operator === 'after' || operator === 'between' || 
      operator === 'in_last_days' || operator === 'in_next_days') {
    const leadDate = new Date(leadValue);
    if (isNaN(leadDate.getTime())) return false;
    
    const now = new Date();
    
    switch (operator) {
      case 'before':
        if (typeof value !== 'string') return false;
        return leadDate < new Date(value);
        
      case 'after':
        if (typeof value !== 'string') return false;
        return leadDate > new Date(value);
        
      case 'between':
        if (typeof value !== 'object' || !('min' in value) || !('max' in value)) return false;
        const minDate = new Date(value.min);
        const maxDate = new Date(value.max);
        return leadDate >= minDate && leadDate <= maxDate;
        
      case 'in_last_days':
        const daysAgo = typeof value === 'object' && 'days' in value 
          ? value.days 
          : (typeof value === 'number' ? value : 30);
        const pastDate = new Date(now);
        pastDate.setDate(pastDate.getDate() - Number(daysAgo));
        return leadDate >= pastDate && leadDate <= now;
        
      case 'in_next_days':
        const daysAhead = typeof value === 'object' && 'days' in value 
          ? value.days 
          : (typeof value === 'number' ? value : 30);
        const futureDate = new Date(now);
        futureDate.setDate(futureDate.getDate() + Number(daysAhead));
        return leadDate >= now && leadDate <= futureDate;
        
      default:
        return false;
    }
  }
  
  // Handle different operators
  switch (operator) {
    case 'equals':
      // If leadValue is an array, check if it contains the value
      if (Array.isArray(leadValue)) {
        return leadValue.some(v => String(v).toLowerCase() === String(value).toLowerCase());
      }
      return String(leadValue).toLowerCase() === String(value).toLowerCase();
      
    case 'in':
      if (!Array.isArray(value)) return false;
      // If leadValue is an array, check for any overlap
      if (Array.isArray(leadValue)) {
        return value.some(v => 
          leadValue.some(lv => String(lv).toLowerCase() === String(v).toLowerCase())
        );
      }
      const normalizedLeadValue = String(leadValue).toLowerCase();
      return value.some(v => String(v).toLowerCase() === normalizedLeadValue);
      
    case 'not_equals':
      if (Array.isArray(leadValue)) {
        return !leadValue.some(v => String(v).toLowerCase() === String(value).toLowerCase());
      }
      return String(leadValue).toLowerCase() !== String(value).toLowerCase();
      
    case 'contains':
      if (Array.isArray(leadValue)) {
        return leadValue.some(v => String(v).toLowerCase().includes(String(value).toLowerCase()));
      }
      return String(leadValue).toLowerCase().includes(String(value).toLowerCase());
      
    case 'greater_than':
      return Number(leadValue) > Number(value);
      
    case 'less_than':
      return Number(leadValue) < Number(value);
      
    case 'not_in':
      if (!Array.isArray(value)) return true;
      if (Array.isArray(leadValue)) {
        return !value.some(v => 
          leadValue.some(lv => String(lv).toLowerCase() === String(v).toLowerCase())
        );
      }
      const normalizedValue = String(leadValue).toLowerCase();
      return !value.some(v => String(v).toLowerCase() === normalizedValue);
      
    default:
      return false;
  }
}
