
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  TableProperties,
  Megaphone,
  UserPlus,
  Upload
} from "lucide-react";
import { CRMTableView } from "./crm/CRMTableView";
import { CSVImportModal } from "./crm/CSVImportModal";
import { PremiumProvider } from "@/contexts/PremiumContext";
import { PremiumUpgradeModal } from "./premium/PremiumUpgradeModal";
import { SegmentManager } from "./segments/SegmentManager";
import { CampaignDashboard } from "./campaigns/CampaignDashboard";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function CRM() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("campaigns");
  const [upgradeModal, setUpgradeModal] = useState({ isOpen: false, feature: "" });
  const [csvImportModal, setCsvImportModal] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const { toast } = useToast();

  // Handle navigation from other views
  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state]);

  // Auto-load sample data and ensure proper timestamp spread
  useEffect(() => {
    const autoLoadSampleData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Check existing leads and their timestamp spread
        const { data: existingLeads, error } = await supabase
          .from('leads')
          .select('created_at, source_metadata')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(100);

        if (error) throw error;

        // Determine if we need to reseed (only if data is seed data)
        let needsReseed = false;
        const total = existingLeads?.length || 0;
        const seedCount = (existingLeads || []).filter((l:any) => l.source_metadata?.seed === true).length;
        const nonSeedCount = total - seedCount;
        
        if (total === 0) {
          needsReseed = true;
          console.log('No leads found, will seed sample data');
        } else if (nonSeedCount === 0) {
          // Only consider reseed if all existing leads are seed data
          const dates = existingLeads.map((l:any) => new Date(l.created_at).getTime()).filter((d:number) => !isNaN(d));
          if (dates.length > 1) {
            const oldest = Math.min(...dates);
            const newest = Math.max(...dates);
            const spreadDays = (newest - oldest) / (1000 * 60 * 60 * 24);
            
            // Check if many items share the same time-of-day (HH:MM)
            const timeKeys = (existingLeads || []).map((l:any) => {
              const d = new Date(l.created_at);
              return `${d.getHours()}:${d.getMinutes()}`;
            });
            const uniqueTimes = new Set(timeKeys);
            
            if (spreadDays < 7 || uniqueTimes.size <= Math.max(3, Math.floor(timeKeys.length * 0.1))) {
              needsReseed = true;
              console.log(`Reseeding due to ${spreadDays < 7 ? 'low day spread' : 'uniform time-of-day'}`);
            }
          }
        }

        if (needsReseed) {
          console.log('Reseeding contacts with proper timestamp distribution...');
          await handleSeedContacts();
        }
      } catch (error) {
        console.error('Error checking/seeding sample data:', error);
      }
    };

    autoLoadSampleData();
  }, []);

  const handleTabChange = (value: string) => {
    console.log("CRM tab change:", value);
    setActiveTab(value);
  };

  const handleUpgrade = () => {
    console.log("CRM upgrade button clicked");
    // Here you would integrate with your payment system
    console.log("Upgrading to premium...");
    setUpgradeModal({ isOpen: false, feature: "" });
  };

  const handleImportComplete = () => {
    console.log("CRM import complete");
    // Refresh the data when import is complete
    window.location.reload();
  };

  const handleImportClick = () => {
    console.log("CRM import button clicked");
    setCsvImportModal(true);
  };

  const handleSeedContacts = async () => {
    try {
      setIsSeeding(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to seed contacts",
          variant: "destructive",
        });
        return;
      }

      // First, delete all existing leads for this user
      const { error: deleteError } = await supabase
        .from('leads')
        .delete()
        .eq('user_id', user.id);

      if (deleteError) throw deleteError;

      // Indian names pool
      const indianNames = [
        "Aditya Sharma", "Priya Malhotra", "Vikram Desai", "Sneha Patel", "Rajesh Kumar",
        "Kavya Nair", "Arjun Singh", "Ananya Das", "Rohan Gupta", "Divya Iyer",
        "Karthik Reddy", "Meera Krishnan", "Sanjay Verma", "Pooja Mehta", "Amit Joshi",
        "Ritu Kapoor", "Varun Chopra", "Nisha Agarwal", "Manish Kulkarni", "Shruti Menon"
      ];

      // UAE names pool
      const uaeNames = [
        "Mohammed Al Maktoum", "Fatima Al Mansouri", "Ahmed Al Rashid", "Zara Khan",
        "Khalid Al Mulla", "Layla Ibrahim", "Rashid Al Falasi", "Mariam Al Hamadi",
        "Yusuf Al Mazrouei", "Noor Al Shamsi", "Sultan Al Kaabi", "Hessa Al Suwaidi"
      ];

      // Qatar names pool
      const qatarNames = [
        "Hassan Al Thani", "Aisha Al Attiyah", "Omar Al Kuwari", "Maryam Al Jaber",
        "Jassim Al Ansari", "Noora Al Sulaiti", "Abdullah Al Marri", "Sara Al Naimi"
      ];

      // Saudi names pool
      const saudiNames = [
        "Faisal Al Saud", "Nasser Al Qahtani", "Khaled Al Otaibi", "Leila Al Harbi",
        "Ibrahim Al Ghamdi", "Reem Al Dosari", "Turki Al Shehri", "Haya Al Mutairi"
      ];

      const sources = ['whatsapp', 'facebook', 'instagram', 'linkedin', 'website', 'referral'];
      const statuses = ['New', 'Active', 'Qualified'];

      // Helper function to generate phone numbers
      const generatePhone = (country: string) => {
        const formats: Record<string, string> = {
          india: `+91 ${Math.floor(90000 + Math.random() * 10000)} ${Math.floor(10000 + Math.random() * 90000)}`,
          uae: `+971 ${50 + Math.floor(Math.random() * 9)} ${Math.floor(100 + Math.random() * 900)} ${Math.floor(1000 + Math.random() * 9000)}`,
          qatar: `+974 ${Math.floor(5000 + Math.random() * 5000)} ${Math.floor(1000 + Math.random() * 9000)}`,
          saudi_arabia: `+966 ${50 + Math.floor(Math.random() * 9)} ${Math.floor(100 + Math.random() * 900)} ${Math.floor(1000 + Math.random() * 9000)}`
        };
        return formats[country];
      };

      // Helper to get random item
      const random = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
      
      // Helper to generate random date in the past X days with randomized time-of-day
      const randomPastDate = (minDaysAgo: number, maxDaysAgo: number) => {
        const daysAgo = minDaysAgo + Math.floor(Math.random() * Math.max(1, (maxDaysAgo - minDaysAgo + 1)));
        const date = new Date();
        date.setDate(date.getDate() - daysAgo);
        // Randomize time-of-day to avoid identical times
        date.setHours(
          Math.floor(Math.random() * 24),
          Math.floor(Math.random() * 60),
          Math.floor(Math.random() * 60),
          Math.floor(Math.random() * 1000)
        );
        return date.toISOString();
      };
      
      // Helper to generate random future date in next X days with randomized time-of-day
      const randomFutureDate = (maxDaysAhead: number) => {
        const daysAhead = Math.floor(Math.random() * Math.max(1, maxDaysAhead + 1));
        const date = new Date();
        date.setDate(date.getDate() + daysAhead);
        date.setHours(
          Math.floor(Math.random() * 24),
          Math.floor(Math.random() * 60),
          Math.floor(Math.random() * 60),
          Math.floor(Math.random() * 1000)
        );
        return date.toISOString();
      };
      // Helper to generate lead score
      const randomLeadScore = () => Math.floor(Math.random() * 100);
      
      // Helper to get qualification status
      const qualificationStatuses = ['unqualified', 'qualifying', 'qualified', 'hot_lead'];
      const priorityLevels = ['high', 'medium', 'low'];

      // Generate 120+ contacts matching template criteria
      const contacts: any[] = [];
      let nameIndex = { indian: 0, uae: 0, qatar: 0, saudi: 0 };

      // Helper to get next unique name
      const getNextName = (pool: string[], key: 'indian' | 'uae' | 'qatar' | 'saudi') => {
        const name = pool[nameIndex[key] % pool.length];
        nameIndex[key]++;
        return name;
      };

      // REAL ESTATE CONTACTS (60 contacts)

      // Mumbai Luxury (5) - Days 0-60
      for (let i = 0; i < 5; i++) {
        const createdDate = randomPastDate(0, 60);
        contacts.push({
          name: getNextName(indianNames, 'indian'),
          phone: generatePhone('india'),
          status: random(statuses),
          source: random(sources),
          category: 'customer',
          created_at: createdDate,
          source_metadata: {
            seed: true,
            country: 'india',
            city: 'mumbai',
            property_type: random(['apartment', 'penthouse']),
            budget_range: 'inr_2cr_plus',
            timeline: '3_6_months',
            category: 'real_estate',
            lead_score: 70 + Math.floor(Math.random() * 30),
            qualification_status: random(['qualified', 'hot_lead']),
            priority_level: 'high',
            last_interaction_at: randomPastDate(0, 14),
            reminder_date: Math.random() > 0.5 ? randomFutureDate(21) : null,
            email_status: random(['has_email', 'email_verified']),
            phone_status: 'phone_verified',
            whatsapp_status: 'whatsapp_active'
          }
        });
      }

      // Delhi NCR First-Time (5) - Days 30-120
      for (let i = 0; i < 5; i++) {
        const createdDate = randomPastDate(30, 120);
        contacts.push({
          name: getNextName(indianNames, 'indian'),
          phone: generatePhone('india'),
          status: random(statuses),
          source: random(sources),
          category: 'customer',
          created_at: createdDate,
          source_metadata: {
            seed: true,
            country: 'india',
            city: 'delhi',
            property_type: random(['apartment', 'villa']),
            budget_range: random(['inr_30_50l', 'inr_50_75l']),
            buyer_type: 'first_time',
            property_purpose: 'first_home',
            category: 'real_estate',
            lead_score: randomLeadScore(),
            qualification_status: random(qualificationStatuses),
            priority_level: random(priorityLevels),
            last_interaction_at: randomPastDate(10, 60),
            reminder_date: Math.random() > 0.5 ? randomFutureDate(14) : null,
            email_status: random(['has_email', 'no_email']),
            phone_status: 'has_phone',
            whatsapp_status: random(['whatsapp_active', 'whatsapp_opted_out'])
          }
        });
      }

      // NRI Investment (5) - Days 60-180
      for (let i = 0; i < 5; i++) {
        const createdDate = randomPastDate(60, 180);
        contacts.push({
          name: getNextName(indianNames, 'indian'),
          phone: generatePhone('india'),
          status: random(statuses),
          source: random(sources),
          category: 'customer',
          created_at: createdDate,
          source_metadata: {
            seed: true,
            country: 'india',
            buyer_type: 'nri_expat',
            property_type: random(['apartment', 'commercial']),
            property_purpose: random(['investment', 'rental_income']),
            property_features: ['ready_to_move', 'security'],
            category: 'real_estate',
            lead_score: randomLeadScore(),
            qualification_status: random(qualificationStatuses),
            priority_level: random(priorityLevels),
            last_interaction_at: randomPastDate(30, 120),
            reminder_date: Math.random() > 0.5 ? randomFutureDate(30) : null,
            email_status: random(['has_email', 'email_verified']),
            phone_status: 'has_phone',
            whatsapp_status: 'whatsapp_active'
          }
        });
      }

      // Dubai Downtown Luxury (5) - Days 0-90
      for (let i = 0; i < 5; i++) {
        const createdDate = randomPastDate(0, 90);
        contacts.push({
          name: getNextName(uaeNames, 'uae'),
          phone: generatePhone('uae'),
          status: random(statuses),
          source: random(sources),
          category: 'customer',
          created_at: createdDate,
          source_metadata: {
            seed: true,
            country: 'uae',
            city: 'dubai',
            property_type: random(['apartment', 'penthouse']),
            budget_range: random(['aed_2_5m', 'aed_5m_plus']),
            property_purpose: 'investment',
            property_features: ['pool', 'gym', 'furnished'],
            category: 'real_estate',
            lead_score: 65 + Math.floor(Math.random() * 35),
            qualification_status: random(['qualified', 'hot_lead']),
            priority_level: random(['high', 'medium']),
            last_interaction_at: randomPastDate(0, 30),
            reminder_date: Math.random() > 0.5 ? randomFutureDate(7) : null,
            email_status: 'has_email',
            phone_status: 'phone_verified',
            whatsapp_status: 'whatsapp_active'
          }
        });
      }

      // Affordable Dubai Family (5) - Days 45-150
      for (let i = 0; i < 5; i++) {
        const createdDate = randomPastDate(45, 150);
        contacts.push({
          name: getNextName(uaeNames, 'uae'),
          phone: generatePhone('uae'),
          status: random(statuses),
          source: random(sources),
          category: 'customer',
          created_at: createdDate,
          source_metadata: {
            seed: true,
            country: 'uae',
            city: random(['dubai', 'sharjah', 'ajman']),
            property_type: random(['apartment', 'townhouse']),
            budget_range: 'aed_500k_1m',
            buyer_type: 'first_time',
            timeline: '1_3_months',
            category: 'real_estate',
            lead_score: randomLeadScore(),
            qualification_status: random(qualificationStatuses),
            priority_level: random(priorityLevels),
            last_interaction_at: randomPastDate(20, 90),
            reminder_date: Math.random() > 0.5 ? randomFutureDate(14) : null,
            email_status: random(['has_email', 'no_email']),
            phone_status: 'has_phone',
            whatsapp_status: random(['whatsapp_active', 'whatsapp_opted_out'])
          }
        });
      }

      // Dubai Off-Plan (5) - Days 90-240
      for (let i = 0; i < 5; i++) {
        const createdDate = randomPastDate(90, 240);
        contacts.push({
          name: getNextName(uaeNames, 'uae'),
          phone: generatePhone('uae'),
          status: random(statuses),
          source: random(sources),
          category: 'customer',
          created_at: createdDate,
          source_metadata: {
            seed: true,
            country: 'uae',
            city: 'dubai',
            property_type: random(['apartment', 'villa']),
            property_features: 'under_construction',
            budget_range: 'aed_1_2m',
            timeline: '6_12_months',
            category: 'real_estate',
            lead_score: randomLeadScore(),
            qualification_status: random(qualificationStatuses),
            priority_level: random(priorityLevels),
            last_interaction_at: randomPastDate(60, 180),
            reminder_date: Math.random() > 0.5 ? randomFutureDate(30) : null,
            email_status: random(['has_email', 'email_verified']),
            phone_status: 'has_phone',
            whatsapp_status: 'whatsapp_active'
          }
        });
      }

      // Doha Expat Rental (5) - Days 60-180
      for (let i = 0; i < 5; i++) {
        const createdDate = randomPastDate(60, 180);
        contacts.push({
          name: getNextName(qatarNames, 'qatar'),
          phone: generatePhone('qatar'),
          status: random(statuses),
          source: random(sources),
          category: 'customer',
          created_at: createdDate,
          source_metadata: {
            seed: true,
            country: 'qatar',
            city: 'doha',
            property_type: random(['apartment', 'villa']),
            buyer_type: 'nri_expat',
            timeline: random(['immediate', '1_3_months']),
            property_features: ['furnished', 'parking', 'security'],
            category: 'real_estate',
            lead_score: randomLeadScore(),
            qualification_status: random(qualificationStatuses),
            priority_level: random(priorityLevels),
            last_interaction_at: randomPastDate(30, 120),
            reminder_date: Math.random() > 0.5 ? randomFutureDate(21) : null,
            email_status: random(['has_email', 'no_email']),
            phone_status: 'has_phone',
            whatsapp_status: 'whatsapp_active'
          }
        });
      }

      // Doha Investment (5) - Days 60-180
      for (let i = 0; i < 5; i++) {
        const createdDate = randomPastDate(60, 180);
        contacts.push({
          name: getNextName(qatarNames, 'qatar'),
          phone: generatePhone('qatar'),
          status: random(statuses),
          source: random(sources),
          category: 'customer',
          created_at: createdDate,
          source_metadata: {
            seed: true,
            country: 'qatar',
            city: 'doha',
            property_type: random(['commercial', 'apartment']),
            property_purpose: 'investment',
            buyer_type: 'investor',
            category: 'real_estate',
            lead_score: randomLeadScore(),
            qualification_status: random(qualificationStatuses),
            priority_level: random(priorityLevels),
            last_interaction_at: randomPastDate(30, 120),
            reminder_date: Math.random() > 0.5 ? randomFutureDate(30) : null,
            email_status: 'has_email',
            phone_status: 'has_phone',
            whatsapp_status: 'whatsapp_active'
          }
        });
      }

      // Doha Luxury Villa (5) - Days 120-300
      for (let i = 0; i < 5; i++) {
        const createdDate = randomPastDate(120, 300);
        contacts.push({
          name: getNextName(qatarNames, 'qatar'),
          phone: generatePhone('qatar'),
          status: random(statuses),
          source: random(sources),
          category: 'customer',
          created_at: createdDate,
          source_metadata: {
            seed: true,
            country: 'qatar',
            city: 'doha',
            property_type: 'villa',
            budget_range: 'sar_qar_3m_plus',
            property_features: ['pool', 'security', 'furnished'],
            timeline: '3_6_months',
            category: 'real_estate',
            lead_score: randomLeadScore(),
            qualification_status: random(qualificationStatuses),
            priority_level: random(priorityLevels),
            last_interaction_at: randomPastDate(90, 240),
            reminder_date: Math.random() > 0.5 ? randomFutureDate(30) : null,
            email_status: random(['has_email', 'email_verified']),
            phone_status: 'has_phone',
            whatsapp_status: 'whatsapp_active'
          }
        });
      }

      // Riyadh Luxury Villas (5) - Days 90-270
      for (let i = 0; i < 5; i++) {
        const createdDate = randomPastDate(90, 270);
        contacts.push({
          name: getNextName(saudiNames, 'saudi'),
          phone: generatePhone('saudi_arabia'),
          status: random(statuses),
          source: random(sources),
          category: 'customer',
          created_at: createdDate,
          source_metadata: {
            seed: true,
            country: 'saudi_arabia',
            city: 'riyadh',
            property_type: 'villa',
            property_purpose: 'investment',
            timeline: random(['6_12_months', '1_year_plus']),
            category: 'real_estate',
            lead_score: randomLeadScore(),
            qualification_status: random(qualificationStatuses),
            priority_level: random(priorityLevels),
            last_interaction_at: randomPastDate(60, 210),
            reminder_date: Math.random() > 0.5 ? randomFutureDate(30) : null,
            email_status: 'has_email',
            phone_status: 'has_phone',
            whatsapp_status: 'whatsapp_active'
          }
        });
      }

      // Riyadh Compounds (5) - Days 150-365
      for (let i = 0; i < 5; i++) {
        const createdDate = randomPastDate(150, 365);
        contacts.push({
          name: getNextName(saudiNames, 'saudi'),
          phone: generatePhone('saudi_arabia'),
          status: random(statuses),
          source: random(sources),
          category: 'customer',
          created_at: createdDate,
          source_metadata: {
            seed: true,
            country: 'saudi_arabia',
            city: 'riyadh',
            property_type: random(['villa', 'townhouse']),
            property_purpose: 'first_home',
            budget_range: 'sar_qar_1_3m',
            property_features: ['security', 'parking'],
            category: 'real_estate',
            lead_score: randomLeadScore(),
            qualification_status: random(qualificationStatuses),
            priority_level: random(priorityLevels),
            last_interaction_at: randomPastDate(120, 300),
            reminder_date: Math.random() > 0.5 ? randomFutureDate(30) : null,
            email_status: random(['has_email', 'no_email']),
            phone_status: 'has_phone',
            whatsapp_status: random(['whatsapp_active', 'whatsapp_opted_out'])
          }
        });
      }

      // Jeddah Waterfront (5) - Days 90-240
      for (let i = 0; i < 5; i++) {
        const createdDate = randomPastDate(90, 240);
        contacts.push({
          name: getNextName(saudiNames, 'saudi'),
          phone: generatePhone('saudi_arabia'),
          status: random(statuses),
          source: random(sources),
          category: 'customer',
          created_at: createdDate,
          source_metadata: {
            seed: true,
            country: 'saudi_arabia',
            city: 'jeddah',
            property_type: random(['apartment', 'villa']),
            budget_range: 'sar_qar_3m_plus',
            property_features: ['ready_to_move', 'furnished'],
            timeline: '1_3_months',
            category: 'real_estate',
            lead_score: randomLeadScore(),
            qualification_status: random(qualificationStatuses),
            priority_level: random(priorityLevels),
            last_interaction_at: randomPastDate(60, 180),
            reminder_date: Math.random() > 0.5 ? randomFutureDate(21) : null,
            email_status: 'has_email',
            phone_status: 'has_phone',
            whatsapp_status: 'whatsapp_active'
          }
        });
      }

      // EDTECH CONTACTS (60 contacts)

      // India Career Switcher (5) - Days 0-90
      for (let i = 0; i < 5; i++) {
        const createdDate = randomPastDate(0, 90);
        contacts.push({
          name: getNextName(indianNames, 'indian'),
          phone: generatePhone('india'),
          status: random(statuses),
          source: random(sources),
          category: 'lead',
          created_at: createdDate,
          source_metadata: {
            seed: true,
            country: 'india',
            career_stage: 'career_switcher',
            course_interest: random(['programming', 'data_science']),
            course_budget: 'inr_50k_1l',
            course_timeline: 'bootcamp',
            category: 'edtech',
            lead_score: randomLeadScore(),
            qualification_status: random(qualificationStatuses),
            priority_level: random(priorityLevels),
            last_interaction_at: randomPastDate(0, 60),
            reminder_date: Math.random() > 0.5 ? randomFutureDate(14) : null,
            email_status: 'has_email',
            phone_status: 'has_phone',
            whatsapp_status: 'whatsapp_active'
          }
        });
      }

      // India Test Prep (5) - Days 60-180
      for (let i = 0; i < 5; i++) {
        const createdDate = randomPastDate(60, 180);
        contacts.push({
          name: getNextName(indianNames, 'indian'),
          phone: generatePhone('india'),
          status: random(statuses),
          source: random(sources),
          category: 'lead',
          created_at: createdDate,
          source_metadata: {
            seed: true,
            country: 'india',
            course_interest: 'test_prep',
            career_stage: random(['student', 'professional_upskilling']),
            course_budget: random(['inr_10_25k', 'inr_25_50k']),
            course_timeline: 'short_course',
            category: 'edtech',
            lead_score: randomLeadScore(),
            qualification_status: random(qualificationStatuses),
            priority_level: random(priorityLevels),
            last_interaction_at: randomPastDate(30, 120),
            reminder_date: Math.random() > 0.5 ? randomFutureDate(21) : null,
            email_status: random(['has_email', 'no_email']),
            phone_status: 'has_phone',
            whatsapp_status: 'whatsapp_active'
          }
        });
      }

      // Delhi Professional Upskilling (5) - Days 30-150
      for (let i = 0; i < 5; i++) {
        const createdDate = randomPastDate(30, 150);
        contacts.push({
          name: getNextName(indianNames, 'indian'),
          phone: generatePhone('india'),
          status: random(statuses),
          source: random(sources),
          category: 'lead',
          created_at: createdDate,
          source_metadata: {
            seed: true,
            country: 'india',
            city: 'delhi',
            career_stage: 'professional_upskilling',
            course_interest: random(['business_mba', 'digital_marketing', 'certifications']),
            course_budget: random(['inr_25_50k', 'inr_1l_plus']),
            learning_preference: random(['self_paced', 'hybrid']),
            category: 'edtech',
            lead_score: randomLeadScore(),
            qualification_status: random(qualificationStatuses),
            priority_level: random(priorityLevels),
            last_interaction_at: randomPastDate(15, 100),
            reminder_date: Math.random() > 0.5 ? randomFutureDate(14) : null,
            email_status: 'has_email',
            phone_status: 'has_phone',
            whatsapp_status: 'whatsapp_active'
          }
        });
      }

      // Dubai Expat Career Growth (5) - Days 60-180
      for (let i = 0; i < 5; i++) {
        const createdDate = randomPastDate(60, 180);
        contacts.push({
          name: getNextName(uaeNames, 'uae'),
          phone: generatePhone('uae'),
          status: random(statuses),
          source: random(sources),
          category: 'lead',
          created_at: createdDate,
          source_metadata: {
            seed: true,
            country: 'uae',
            city: 'dubai',
            career_stage: random(['early_career', 'professional_upskilling']),
            course_interest: random(['programming', 'data_science', 'digital_marketing']),
            course_budget: random(['aed_sar_5_10k', 'aed_sar_10_20k']),
            demo_status: random(['demo_completed', 'demo_scheduled']),
            category: 'edtech',
            lead_score: randomLeadScore(),
            qualification_status: random(qualificationStatuses),
            priority_level: random(priorityLevels),
            last_interaction_at: randomPastDate(30, 120),
            reminder_date: Math.random() > 0.5 ? randomFutureDate(21) : null,
            email_status: 'has_email',
            phone_status: 'has_phone',
            whatsapp_status: 'whatsapp_active'
          }
        });
      }

      // UAE Professional Certifications (5) - Days 90-240
      for (let i = 0; i < 5; i++) {
        const createdDate = randomPastDate(90, 240);
        contacts.push({
          name: getNextName(uaeNames, 'uae'),
          phone: generatePhone('uae'),
          status: random(statuses),
          source: random(sources),
          category: 'lead',
          created_at: createdDate,
          source_metadata: {
            seed: true,
            country: 'uae',
            career_stage: random(['professional_upskilling', 'executive']),
            course_interest: random(['certifications', 'business_mba']),
            course_budget: random(['aed_sar_10_20k', 'aed_sar_20k_plus']),
            learning_preference: random(['live_classes', 'in_person']),
            category: 'edtech',
            lead_score: randomLeadScore(),
            qualification_status: random(qualificationStatuses),
            priority_level: random(priorityLevels),
            last_interaction_at: randomPastDate(60, 180),
            reminder_date: Math.random() > 0.5 ? randomFutureDate(30) : null,
            email_status: 'has_email',
            phone_status: 'has_phone',
            whatsapp_status: 'whatsapp_active'
          }
        });
      }

      // Dubai Arabic Learners (5) - Days 120-300
      for (let i = 0; i < 5; i++) {
        const createdDate = randomPastDate(120, 300);
        contacts.push({
          name: getNextName(uaeNames, 'uae'),
          phone: generatePhone('uae'),
          status: random(statuses),
          source: random(sources),
          category: 'lead',
          created_at: createdDate,
          source_metadata: {
            seed: true,
            country: 'uae',
            city: 'dubai',
            course_interest: 'language_learning',
            language_preference: 'arabic',
            career_stage: 'professional_upskilling',
            course_budget: 'aed_sar_1_5k',
            category: 'edtech',
            lead_score: randomLeadScore(),
            qualification_status: random(qualificationStatuses),
            priority_level: random(priorityLevels),
            last_interaction_at: randomPastDate(90, 240),
            reminder_date: Math.random() > 0.5 ? randomFutureDate(30) : null,
            email_status: random(['has_email', 'no_email']),
            phone_status: 'has_phone',
            whatsapp_status: 'whatsapp_active'
          }
        });
      }

      // Doha Expat Upskilling (5) - Days 90-270
      for (let i = 0; i < 5; i++) {
        const createdDate = randomPastDate(90, 270);
        contacts.push({
          name: getNextName(qatarNames, 'qatar'),
          phone: generatePhone('qatar'),
          status: random(statuses),
          source: random(sources),
          category: 'lead',
          created_at: createdDate,
          source_metadata: {
            seed: true,
            country: 'qatar',
            city: 'doha',
            career_stage: 'professional_upskilling',
            course_interest: random(['business_mba', 'digital_marketing', 'data_science']),
            course_budget: random(['aed_sar_5_10k', 'aed_sar_10_20k']),
            learning_preference: random(['hybrid', 'live_classes']),
            category: 'edtech',
            lead_score: randomLeadScore(),
            qualification_status: random(qualificationStatuses),
            priority_level: random(priorityLevels),
            last_interaction_at: randomPastDate(60, 210),
            reminder_date: Math.random() > 0.5 ? randomFutureDate(30) : null,
            email_status: 'has_email',
            phone_status: 'has_phone',
            whatsapp_status: 'whatsapp_active'
          }
        });
      }

      // Qatar Graduate Programs (5) - Days 60-180
      for (let i = 0; i < 5; i++) {
        const createdDate = randomPastDate(60, 180);
        contacts.push({
          name: getNextName(qatarNames, 'qatar'),
          phone: generatePhone('qatar'),
          status: random(statuses),
          source: random(sources),
          category: 'lead',
          created_at: createdDate,
          source_metadata: {
            seed: true,
            country: 'qatar',
            career_stage: random(['fresh_graduate', 'student']),
            course_interest: random(['programming', 'design', 'business_mba']),
            course_budget: random(['aed_sar_10_20k', 'aed_sar_20k_plus']),
            course_timeline: 'degree_program',
            category: 'edtech',
            lead_score: randomLeadScore(),
            qualification_status: random(qualificationStatuses),
            priority_level: random(priorityLevels),
            last_interaction_at: randomPastDate(30, 120),
            reminder_date: Math.random() > 0.5 ? randomFutureDate(21) : null,
            email_status: 'has_email',
            phone_status: 'has_phone',
            whatsapp_status: 'whatsapp_active'
          }
        });
      }

      // Qatar Executive Education (5) - Days 150-365
      for (let i = 0; i < 5; i++) {
        const createdDate = randomPastDate(150, 365);
        contacts.push({
          name: getNextName(qatarNames, 'qatar'),
          phone: generatePhone('qatar'),
          status: random(statuses),
          source: random(sources),
          category: 'lead',
          created_at: createdDate,
          source_metadata: {
            seed: true,
            country: 'qatar',
            city: 'doha',
            career_stage: 'executive',
            course_interest: random(['business_mba', 'certifications']),
            course_budget: 'aed_sar_20k_plus',
            learning_preference: random(['in_person', 'live_classes']),
            category: 'edtech',
            lead_score: randomLeadScore(),
            qualification_status: random(qualificationStatuses),
            priority_level: random(priorityLevels),
            last_interaction_at: randomPastDate(120, 300),
            reminder_date: Math.random() > 0.5 ? randomFutureDate(30) : null,
            email_status: 'has_email',
            phone_status: 'has_phone',
            whatsapp_status: 'whatsapp_active'
          }
        });
      }

      // Riyadh Vision 2030 Skills (5) - Days 30-120
      for (let i = 0; i < 5; i++) {
        const createdDate = randomPastDate(30, 120);
        contacts.push({
          name: getNextName(saudiNames, 'saudi'),
          phone: generatePhone('saudi_arabia'),
          status: random(statuses),
          source: random(sources),
          category: 'lead',
          created_at: createdDate,
          source_metadata: {
            seed: true,
            country: 'saudi_arabia',
            city: 'riyadh',
            course_interest: random(['programming', 'data_science', 'digital_marketing']),
            career_stage: random(['fresh_graduate', 'career_switcher']),
            course_budget: random(['aed_sar_10_20k', 'aed_sar_20k_plus']),
            language_preference: ['arabic', 'english'],
            category: 'edtech',
            lead_score: randomLeadScore(),
            qualification_status: random(qualificationStatuses),
            priority_level: random(priorityLevels),
            last_interaction_at: randomPastDate(15, 90),
            reminder_date: Math.random() > 0.5 ? randomFutureDate(14) : null,
            email_status: 'has_email',
            phone_status: 'has_phone',
            whatsapp_status: 'whatsapp_active'
          }
        });
      }

      // Saudi Women Career (5) - Days 90-240
      for (let i = 0; i < 5; i++) {
        const createdDate = randomPastDate(90, 240);
        contacts.push({
          name: getNextName(saudiNames, 'saudi'),
          phone: generatePhone('saudi_arabia'),
          status: random(statuses),
          source: random(sources),
          category: 'lead',
          created_at: createdDate,
          source_metadata: {
            seed: true,
            country: 'saudi_arabia',
            career_stage: random(['fresh_graduate', 'career_switcher', 'professional_upskilling']),
            course_interest: random(['business_mba', 'digital_marketing', 'design']),
            course_budget: random(['aed_sar_5_10k', 'aed_sar_10_20k']),
            learning_preference: random(['self_paced', 'live_classes']),
            category: 'edtech',
            lead_score: randomLeadScore(),
            qualification_status: random(qualificationStatuses),
            priority_level: random(priorityLevels),
            last_interaction_at: randomPastDate(60, 180),
            reminder_date: Math.random() > 0.5 ? randomFutureDate(21) : null,
            email_status: random(['has_email', 'no_email']),
            phone_status: 'has_phone',
            whatsapp_status: 'whatsapp_active'
          }
        });
      }

      // Riyadh Tech Talent (5) - Days 150-365
      for (let i = 0; i < 5; i++) {
        const createdDate = randomPastDate(150, 365);
        contacts.push({
          name: getNextName(saudiNames, 'saudi'),
          phone: generatePhone('saudi_arabia'),
          status: random(statuses),
          source: random(sources),
          category: 'lead',
          created_at: createdDate,
          source_metadata: {
            seed: true,
            country: 'saudi_arabia',
            city: random(['riyadh', 'jeddah']),
            career_stage: random(['student', 'fresh_graduate']),
            course_interest: random(['programming', 'data_science']),
            course_budget: random(['aed_sar_10_20k', 'aed_sar_20k_plus']),
            demo_status: 'demo_completed',
            category: 'edtech',
            lead_score: randomLeadScore(),
            qualification_status: random(qualificationStatuses),
            priority_level: random(priorityLevels),
            last_interaction_at: randomPastDate(120, 300),
            reminder_date: Math.random() > 0.5 ? randomFutureDate(30) : null,
            email_status: 'has_email',
            phone_status: 'has_phone',
            whatsapp_status: 'whatsapp_active'
          }
        });
      }

      // Insert all contacts
      const { error } = await supabase
        .from('leads')
        .insert(
          contacts.map(contact => ({
            ...contact,
            user_id: user.id,
            email: null,
            list: 'general',
            timestamp: contact.created_at || new Date().toISOString(),
            last_interaction_at: contact.source_metadata?.last_interaction_at || null,
            reminder_date: contact.source_metadata?.reminder_date || null
          }))
        );

      if (error) throw error;

      // Now automatically create segments
      const segments = [
        {
          name: "Mumbai Luxury Apartment Buyers",
          description: "High-budget luxury apartment seekers in Mumbai (last 90 days)",
          criteria: [
            { field: 'city', operator: 'equals', value: 'mumbai' },
            { field: 'budget_range', operator: 'equals', value: 'inr_2cr_plus' },
            { field: 'created_at', operator: 'in_last_days', value: { days: 90 } }
          ],
          color: "#8B5CF6",
          is_active: true,
          user_id: user.id
        },
        {
          name: "Delhi NCR First-Time Homebuyers",
          description: "First-time buyers in Delhi NCR looking for homes",
          criteria: [
            { field: 'city', operator: 'equals', value: 'delhi' },
            { field: 'buyer_type', operator: 'equals', value: 'first_time' },
            { field: 'created_at', operator: 'in_last_days', value: { days: 150 } }
          ],
          color: "#10B981",
          is_active: true,
          user_id: user.id
        },
        {
          name: "Dubai Downtown Luxury Buyers",
          description: "High-budget luxury seekers in Dubai Downtown",
          criteria: [
            { field: 'city', operator: 'equals', value: 'dubai' },
            { field: 'budget_range', operator: 'in', value: ['aed_2_5m', 'aed_5m_plus'] },
            { field: 'created_at', operator: 'in_last_days', value: { days: 120 } }
          ],
          color: "#F59E0B",
          is_active: true,
          user_id: user.id
        },
        {
          name: "Doha Investment Property Seekers",
          description: "Investment property seekers in Doha",
          criteria: [
            { field: 'city', operator: 'equals', value: 'doha' },
            { field: 'property_purpose', operator: 'equals', value: 'investment' },
            { field: 'created_at', operator: 'in_last_days', value: { days: 240 } }
          ],
          color: "#EF4444",
          is_active: true,
          user_id: user.id
        },
        {
          name: "Riyadh Premium Villa Buyers",
          description: "Villa buyers in Riyadh with premium budgets",
          criteria: [
            { field: 'city', operator: 'equals', value: 'riyadh' },
            { field: 'property_type', operator: 'equals', value: 'villa' },
            { field: 'created_at', operator: 'in_last_days', value: { days: 300 } }
          ],
          color: "#6366F1",
          is_active: true,
          user_id: user.id
        },
        {
          name: "India Tech Career Switchers",
          description: "Career switchers interested in tech courses in India",
          criteria: [
            { field: 'country', operator: 'equals', value: 'india' },
            { field: 'career_stage', operator: 'equals', value: 'career_switcher' },
            { field: 'created_at', operator: 'in_last_days', value: { days: 120 } }
          ],
          color: "#8B5CF6",
          is_active: true,
          user_id: user.id
        },
        {
          name: "Delhi Professional Upskilling",
          description: "Working professionals seeking upskilling in Delhi",
          criteria: [
            { field: 'city', operator: 'equals', value: 'delhi' },
            { field: 'career_stage', operator: 'equals', value: 'professional_upskilling' },
            { field: 'created_at', operator: 'in_last_days', value: { days: 180 } }
          ],
          color: "#10B981",
          is_active: true,
          user_id: user.id
        },
        {
          name: "Dubai Expat Career Growth",
          description: "Expats in Dubai seeking career advancement",
          criteria: [
            { field: 'city', operator: 'equals', value: 'dubai' },
            { field: 'career_stage', operator: 'in', value: ['early_career', 'professional_upskilling'] },
            { field: 'created_at', operator: 'in_last_days', value: { days: 240 } }
          ],
          color: "#F59E0B",
          is_active: true,
          user_id: user.id
        },
        {
          name: "High-Priority Hot Leads",
          description: "Recent leads with high scores and priority",
          criteria: [
            { field: 'created_at', operator: 'in_last_days', value: { days: 30 } },
            { field: 'lead_score', operator: 'greater_than', value: 70 },
            { field: 'priority_level', operator: 'equals', value: 'high' }
          ],
          color: "#DC2626",
          is_active: true,
          user_id: user.id
        },
        {
          name: "Re-engagement - Inactive Leads",
          description: "Qualified leads that haven't been contacted recently",
          criteria: [
            { field: 'last_interaction_at', operator: 'before', value: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString() },
            { field: 'qualification_status', operator: 'in', value: ['qualified', 'hot_lead'] }
          ],
          color: "#9CA3AF",
          is_active: true,
          user_id: user.id
        }
      ];

      // Check which segments already exist
      const { data: existingSegments } = await supabase
        .from('segments')
        .select('name')
        .eq('user_id', user.id);

      const existingNames = new Set(existingSegments?.map(s => s.name) || []);
      const newSegments = segments.filter(s => !existingNames.has(s.name));

      if (newSegments.length > 0) {
        const { error: segmentError } = await supabase
          .from('segments')
          .insert(newSegments.map(s => ({
            ...s,
            criteria: s.criteria as any
          })));
        
        if (segmentError) {
          console.error('Error creating segments:', segmentError);
        }
      }

      toast({
        title: "Success",
        description: `Created ${contacts.length} contacts and ${newSegments.length} segments!`,
      });

      // Reload to see changes
      window.location.reload();
    } catch (error: any) {
      console.error('Error seeding contacts:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to seed contacts",
        variant: "destructive",
      });
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <PremiumProvider>
      <div className="h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 flex flex-col">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/60 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                LeadMasters CRM
              </h1>
              <p className="text-gray-600 text-sm font-medium">WhatsApp Lead Management</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="shadow-sm hover:shadow-md transition-all duration-200 border-gray-200/80 hover:border-purple-200 hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-purple-50/50 hover:text-purple-700"
                onClick={handleImportClick}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"/>
                </svg>
                Import from Apollo
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white/60 backdrop-blur-sm border-b border-gray-200/50 px-6 shadow-sm">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-gray-50/80 via-blue-50/40 to-purple-50/40 rounded-xl p-1.5 shadow-inner border border-gray-200/30">
              <TabsTrigger 
                value="campaigns" 
                className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:via-purple-600 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gradient-to-r hover:from-blue-50/60 hover:via-purple-50/60 hover:to-pink-50/60 hover:shadow-sm hover:text-purple-700 transition-all duration-200 rounded-lg font-semibold"
              >
                <Megaphone className="w-4 h-4" />
                <span>Campaigns</span>
              </TabsTrigger>
              <TabsTrigger 
                value="table" 
                className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:via-purple-600 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gradient-to-r hover:from-blue-50/60 hover:via-purple-50/60 hover:to-pink-50/60 hover:shadow-sm hover:text-purple-700 transition-all duration-200 rounded-lg font-semibold"
              >
                <TableProperties className="w-4 h-4" />
                <span>Contacts</span>
              </TabsTrigger>
              <TabsTrigger 
                value="segments" 
                className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:via-purple-600 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gradient-to-r hover:from-blue-50/60 hover:via-purple-50/60 hover:to-pink-50/60 hover:shadow-sm hover:text-purple-700 transition-all duration-200 rounded-lg font-semibold"
              >
                <Users className="w-4 h-4" />
                <span>Segments</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          <Tabs value={activeTab} className="h-full">
            <TabsContent value="campaigns" className="h-full m-0">
              <CampaignDashboard />
            </TabsContent>
            <TabsContent value="table" className="h-full m-0">
              <CRMTableView 
                highlightLeadId={location.state?.highlightLeadId}
                onUpgradeClick={(feature) => setUpgradeModal({ isOpen: true, feature })} 
                onImportClick={handleImportClick}
              />
            </TabsContent>
            <TabsContent value="segments" className="h-full m-0">
              <div className="h-full p-6">
                <SegmentManager />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <PremiumUpgradeModal
          isOpen={upgradeModal.isOpen}
          onClose={() => setUpgradeModal({ isOpen: false, feature: "" })}
          feature={upgradeModal.feature}
          onUpgrade={handleUpgrade}
        />

        <CSVImportModal
          isOpen={csvImportModal}
          onClose={() => setCsvImportModal(false)}
          onImportComplete={handleImportComplete}
        />
      </div>
    </PremiumProvider>
  );
}
