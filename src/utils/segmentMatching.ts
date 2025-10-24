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
  
  // Get field value from lead (check source_metadata first, then top-level)
  const leadValue = lead.source_metadata?.[field] ?? lead[field];
  
  // Handle different operators
  switch (operator) {
    case 'equals':
      return String(leadValue).toLowerCase() === String(value).toLowerCase();
      
    case 'in':
      if (!Array.isArray(value)) return false;
      const normalizedLeadValue = String(leadValue).toLowerCase();
      return value.some(v => String(v).toLowerCase() === normalizedLeadValue);
      
    case 'not_equals':
      return String(leadValue).toLowerCase() !== String(value).toLowerCase();
      
    case 'contains':
      return String(leadValue).toLowerCase().includes(String(value).toLowerCase());
      
    case 'greater_than':
      return Number(leadValue) > Number(value);
      
    case 'less_than':
      return Number(leadValue) < Number(value);
      
    case 'not_in':
      if (!Array.isArray(value)) return true;
      const normalizedValue = String(leadValue).toLowerCase();
      return !value.some(v => String(v).toLowerCase() === normalizedValue);
      
    case 'between':
      if (typeof value !== 'object' || !('min' in value) || !('max' in value)) return false;
      const numValue = Number(leadValue);
      return numValue >= Number(value.min) && numValue <= Number(value.max);
      
    default:
      return false;
  }
}
