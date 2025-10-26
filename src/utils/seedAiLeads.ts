import { supabase } from "@/integrations/supabase/client";

export type AiDbStage = 'no_reply' | 'qualified' | 'nurturing_7day' | 'long_term' | 'won' | 'new';

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function makeName(i: number) {
  const first = [
    'Alex','Jordan','Taylor','Riley','Morgan','Casey','Jamie','Avery','Parker','Drew',
    'Quinn','Rowan','Skyler','Reese','Charlie','Elliot','Harper','Logan','Emerson','Finley'
  ];
  const last = [
    'Smith','Johnson','Williams','Brown','Jones','Garcia','Miller','Davis','Rodriguez','Martinez',
    'Hernandez','Lopez','Gonzalez','Wilson','Anderson','Thomas','Taylor','Moore','Jackson','Martin'
  ];
  const firstName = randomFrom(first);
  const lastName = randomFrom(last);
  return { firstName, lastName, fullName: `${firstName} ${lastName}` };
}

function makeCompany() {
  const companies = [
    'Tech Solutions Inc', 'Global Enterprises', 'Innovation Labs', 'Digital Dynamics', 'Smart Systems',
    'Future Tech Corp', 'Alpha Industries', 'Beta Solutions', 'Gamma Technologies', 'Delta Innovations',
    'Omega Consulting', 'Sigma Services', 'Prime Ventures', 'Apex Group', 'Zenith Corporation'
  ];
  return randomFrom(companies);
}

function makeJobTitle() {
  const titles = [
    'CEO', 'CTO', 'Marketing Director', 'Sales Manager', 'Operations Manager',
    'Business Development Manager', 'Product Manager', 'VP of Sales', 'Head of Marketing',
    'Account Executive', 'Customer Success Manager', 'Director of Operations'
  ];
  return randomFrom(titles);
}

function makeIndustry() {
  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Real Estate', 'Education',
    'Retail', 'Manufacturing', 'Hospitality', 'Automotive', 'Other'
  ];
  return randomFrom(industries);
}

function makeCity() {
  const cities = [
    'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix',
    'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose',
    'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'San Francisco'
  ];
  return randomFrom(cities);
}

function makeState() {
  const states = [
    'CA', 'NY', 'TX', 'FL', 'IL', 'PA', 'OH', 'GA', 'NC', 'MI',
    'NJ', 'VA', 'WA', 'AZ', 'MA', 'TN', 'IN', 'MO', 'MD', 'WI'
  ];
  return randomFrom(states);
}

function makeLastMessage(stage: AiDbStage): string {
  const messages: Record<AiDbStage, string[]> = {
    new: [
      "Just submitted inquiry form",
      "Initial contact made",
      "Requested information about services",
      "Expressed interest in product demo"
    ],
    no_reply: [
      "Sent follow-up email - awaiting response",
      "Left voicemail - no callback yet",
      "Messaged on WhatsApp - not seen",
      "Sent proposal - waiting for feedback"
    ],
    qualified: [
      "Budget confirmed, moving to next stage",
      "Decision maker identified and engaged",
      "Timeline established for implementation",
      "Requirements fully understood"
    ],
    nurturing_7day: [
      "Scheduled demo for next week",
      "Sent case studies for review",
      "Following up after initial meeting",
      "Sharing additional resources"
    ],
    long_term: [
      "Will revisit in Q2 next year",
      "Timing not right, staying in touch",
      "Budget allocated for next fiscal year",
      "Monitoring for future opportunities"
    ],
    won: [
      "Contract signed and onboarding scheduled",
      "Deal closed successfully",
      "Payment received, project kicked off",
      "Customer onboarded and active"
    ]
  };
  return randomFrom(messages[stage]);
}

function stageToStatus(stage: AiDbStage): string {
  switch (stage) {
    case 'qualified': return 'Qualified';
    case 'no_reply': return 'No Reply';
    case 'nurturing_7day': return 'Nurturing';
    case 'long_term': return 'Long Term';
    case 'won': return 'Won';
    default: return 'New';
  }
}

function stageDate(stage: AiDbStage): { created_at: string; last_interaction_at: string } {
  // Distribute timestamps to feel realistic per stage
  const now = Date.now();
  const days = {
    new: randomInt(0, 2),
    no_reply: randomInt(1, 7),
    qualified: randomInt(1, 5),
    nurturing_7day: randomInt(3, 14),
    long_term: randomInt(15, 45),
    won: randomInt(1, 14),
  } as const;
  const d = days[stage] ?? 0;
  const created = new Date(now - d * 24 * 60 * 60 * 1000);
  const last = new Date(created.getTime() + randomInt(0, d) * 24 * 60 * 60 * 1000);
  return { created_at: created.toISOString(), last_interaction_at: last.toISOString() };
}

export async function ensureSeedAiAutomationLeads(minTotal = 150) {
  try {
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData?.user?.id;
    if (!userId) return;

    // Count existing AI automation leads for this user
    const { count } = await supabase
      .from('leads')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('lead_source_type', 'ai_automation');

    if ((count || 0) >= minTotal) return; // already seeded enough

    const toCreate = minTotal - (count || 0);

    // Target distribution (sum = 150): 35 new, 30 no_reply, 30 qualified, 25 nurturing, 20 long_term, 10 won
    const target: Record<AiDbStage, number> = {
      new: 35,
      no_reply: 30,
      qualified: 30,
      nurturing_7day: 25,
      long_term: 20,
      won: 10,
    };

    // If we need fewer than 150, scale down proportionally
    const totalTarget = 150;
    const scale = toCreate / totalTarget;
    const plan: Record<AiDbStage, number> = Object.fromEntries(
      (Object.keys(target) as AiDbStage[]).map((k) => [k, Math.max(0, Math.round(target[k] * scale))])
    ) as Record<AiDbStage, number>;

    // Adjust rounding to match exactly toCreate
    let planned = (Object.values(plan).reduce((a, b) => a + b, 0));
    const keys = Object.keys(plan) as AiDbStage[];
    let idx = 0;
    while (planned < toCreate) {
      plan[keys[idx % keys.length]] += 1;
      planned += 1;
      idx += 1;
    }

    const rows: any[] = [];
    let i = 1;
    const sources = ['Custom API', 'Inbound Form', 'Facebook Ads', 'Google Ads', 'Referral'];

    for (const stage of keys) {
      for (let j = 0; j < plan[stage]; j++) {
        const nameData = makeName(i);
        const num = 5000000000 + randomInt(0, 499999999);
        const phone = `+1${num}`;
        const mobileNum = 5000000000 + randomInt(0, 499999999);
        const mobile = `+1${mobileNum}`;
        const email = `${nameData.firstName.toLowerCase()}.${nameData.lastName.toLowerCase()}@example.com`;
        const { created_at, last_interaction_at } = stageDate(stage);
        const ai_score = randomInt(55, 98);
        
        const company = makeCompany();
        const title = makeJobTitle();
        const industry = makeIndustry();
        const city = makeCity();
        const state = makeState();
        const lastMessage = makeLastMessage(stage);
        
        const employeesCounts = ['1-10', '11-50', '51-200', '201-500', '500+'];
        const revenues = ['$100K-$500K', '$500K-$1M', '$1M-$5M', '$5M-$10M', '$10M+'];
        const ratings = ['Hot', 'Warm', 'Cold'];
        
        const source_metadata = {
          first_name: nameData.firstName,
          last_name: nameData.lastName,
          company,
          title,
          mobile,
          website: `https://www.${company.toLowerCase().replace(/\s+/g, '')}.com`,
          industry,
          employees_count: randomFrom(employeesCounts),
          annual_revenue: randomFrom(revenues),
          rating: randomFrom(ratings),
          city,
          state,
          country: 'United States',
          zip_code: `${randomInt(10000, 99999)}`,
          street: `${randomInt(100, 9999)} ${randomFrom(['Main', 'Oak', 'Pine', 'Maple', 'Cedar'])} ${randomFrom(['St', 'Ave', 'Blvd', 'Dr'])}`,
          description: `Potential customer interested in our services. ${stage === 'qualified' ? 'Budget confirmed and timeline established.' : stage === 'won' ? 'Successfully onboarded customer.' : 'Following up on initial inquiry.'}`,
        };

        rows.push({
          user_id: userId,
          name: nameData.fullName,
          phone,
          email,
          source: randomFrom(sources),
          status: stageToStatus(stage),
          lead_source_type: 'ai_automation',
          workflow_stage: stage === 'new' ? null : stage,
          ai_score,
          last_interaction_at,
          last_message: lastMessage,
          created_at,
          updated_at: created_at,
          notes: `Seeded demo lead for ${stage} stage. ${stage === 'qualified' ? 'High priority - ready to move forward.' : stage === 'no_reply' ? 'Needs immediate follow-up.' : 'Standard nurturing process.'}`,
          category: 'customer',
          list: 'general',
          source_metadata,
        });
        i += 1;
      }
    }

    // Insert in chunks to be safe
    const chunkSize = 100;
    for (let start = 0; start < rows.length; start += chunkSize) {
      const chunk = rows.slice(start, start + chunkSize);
      const { error } = await supabase.from('leads').insert(chunk);
      if (error) throw error;
    }
  } catch (e) {
    console.warn('AI Leads seeding skipped or failed:', e);
  }
}
