import { z } from 'zod';

export const businessDiscoverySchema = z.object({
  // Business Information
  full_name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name too long'),
  phone: z.string().min(10, 'Please enter a valid phone number').max(15, 'Phone number too long'),
  email: z.string().email('Please enter a valid email address').max(100, 'Email too long'),
  company_name: z.string().min(2, 'Company name is required').max(100, 'Company name too long'),
  has_website: z.boolean(),
  website_url: z.string().optional().or(z.literal('')),
  industry: z.string().min(1, 'Please select an industry'),
  other_industry: z.string().optional().or(z.literal('')),
  location: z.string().min(2, 'Location is required').max(100, 'Location too long'),
  
  // Digital Presence
  social_platforms: z.array(z.string()).min(0),
  posting_frequency: z.string().min(1, 'Please select posting frequency'),
  
  // Product & Customers
  main_product_service: z.string().min(10, 'Please describe your product/service (min 10 characters)').max(500, 'Description too long'),
  ideal_customer: z.string().min(10, 'Please describe your ideal customer (min 10 characters)').max(500, 'Description too long'),
  avg_revenue_per_customer: z.string().min(1, 'Please select average revenue'),
  primary_goals: z.array(z.string()).min(1, 'Please select at least one goal'),
  
  // Current Marketing Strategy
  current_reach_methods: z.array(z.string()).min(1, 'Please select at least one method'),
  monthly_ad_spend: z.string().min(1, 'Please select monthly ad spend'),
  advertising_platforms: z.array(z.string()).min(0),
  has_crm: z.boolean(),
  crm_system_name: z.string().optional().or(z.literal('')),
  conversion_rate: z.string().optional(),
  
  // Business Compliance & Future Plans
  is_gst_registered: z.boolean(),
  issues_invoices: z.boolean(),
  has_seasonal_peaks: z.string().max(300, 'Response too long').optional(),
  top_priorities: z.string().min(10, 'Please list your top 3 priorities (min 10 characters)').max(300, 'Response too long'),
  desired_results: z.string().min(10, 'Please describe desired results (min 10 characters)').max(500, 'Response too long'),
  current_challenges: z.string().min(10, 'Please describe your challenges (min 10 characters)').max(500, 'Response too long'),
});

export type BusinessDiscoveryFormData = z.infer<typeof businessDiscoverySchema>;
