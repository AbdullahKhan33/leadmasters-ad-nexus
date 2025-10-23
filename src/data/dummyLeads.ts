export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  source: 'Meta Lead' | '99acres' | 'MagicBricks' | 'Custom API' | 'Housing.com';
  stage: 'new' | 'no-reply' | 'qualified' | 'nurturing' | 'long-term' | 'won';
  status: string;
  aiScore?: number;
  budget?: string;
  location?: string;
  timeline?: string;
  lastContact: Date;
  nextAction?: Date;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  engagement: {
    messagesSent: number;
    messagesOpened: number;
    lastOpened?: Date;
  };
  assignedTo?: string;
  tags: string[];
  createdAt: Date;
  notes?: string;
  // Database fields
  user_id?: string;
  lead_source_type?: 'ai_automation' | 'crm_contact' | 'manual' | 'csv_import';
  workflow_stage?: string;
  current_workflow_id?: string;
  assigned_agent_id?: string;
  last_interaction_at?: string;
  created_at?: string;
  source_metadata?: any;
}

const indianNames = [
  "Rajesh Kumar", "Priya Sharma", "Amit Patel", "Sneha Reddy", "Vikram Singh",
  "Arjun Mehta", "Kavita Joshi", "Ravi Kumar", "Neha Gupta", "Suresh Iyer",
  "Pooja Desai", "Karthik Menon", "Deepa Shah", "Manish Agarwal", "Anita Rao",
  "Sanjay Verma", "Divya Nair", "Rohit Kapoor", "Meera Pillai", "Arun Bose",
  "Lakshmi Krishnan", "Vijay Malhotra", "Shalini Chopra", "Prakash Jain", "Rekha Menon",
  "Naveen Reddy", "Anjali Kulkarni", "Rajeev Sinha", "Swati Banerjee", "Harish Rao",
  "Gayatri Iyer", "Ashok Kumar", "Ramya Naidu", "Sachin Patil", "Nisha Agarwal",
  "Mahesh Sharma", "Pallavi Deshmukh", "Sandeep Mathur", "Preeti Saxena", "Anil Gupta",
  "Sunita Reddy", "Mohan Das", "Shweta Joshi", "Varun Kapoor", "Anuradha Nair",
  "Kishore Kumar", "Madhavi Rao", "Dinesh Mehta", "Usha Pillai", "Gopal Krishna"
];

const locations = ["Mumbai", "Bangalore", "Delhi", "Pune", "Hyderabad", "Chennai", "Kolkata", "Ahmedabad"];
const sources: Lead['source'][] = ['Meta Lead', '99acres', 'MagicBricks', 'Custom API', 'Housing.com'];

const generatePhone = () => `+91 ${Math.floor(7000000000 + Math.random() * 3000000000)}`;
const generateEmail = (name: string) => `${name.toLowerCase().replace(/\s+/g, '.')}@${['gmail', 'yahoo', 'outlook'][Math.floor(Math.random() * 3)]}.com`;
const generateBudget = () => `₹${[30, 40, 50, 60, 75, 85, 100, 120, 150, 200][Math.floor(Math.random() * 10)]}L`;

const now = new Date();

export const dummyLeads: Lead[] = [
  // NEW LEADS (20) - 40% of volume
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `new-${i + 1}`,
    name: indianNames[i],
    phone: generatePhone(),
    email: generateEmail(indianNames[i]),
    source: sources[Math.floor(Math.random() * sources.length)],
    stage: 'new' as const,
    status: ['AI analyzing signals...', 'High intent detected', 'Timeline: Urgent', 'Budget verified'][Math.floor(Math.random() * 4)],
    aiScore: i < 5 ? 0.85 + Math.random() * 0.1 : 0.6 + Math.random() * 0.2,
    budget: generateBudget(),
    location: locations[Math.floor(Math.random() * locations.length)],
    timeline: ['Urgent', 'Within 1 month', 'Within 3 months', '6 months'][Math.floor(Math.random() * 4)],
    lastContact: new Date(now.getTime() - Math.random() * 6 * 60 * 60 * 1000),
    nextAction: new Date(now.getTime() + (2 + Math.random() * 22) * 60 * 60 * 1000),
    priority: (i < 3 ? 'urgent' : i < 8 ? 'high' : 'medium') as Lead['priority'],
    engagement: {
      messagesSent: 1,
      messagesOpened: Math.random() > 0.5 ? 1 : 0,
      lastOpened: Math.random() > 0.5 ? new Date(now.getTime() - Math.random() * 2 * 60 * 60 * 1000) : undefined
    },
    assignedTo: i < 5 ? undefined : `Agent ${Math.floor(Math.random() * 5) + 1}`,
    tags: ['new-lead', 'auto-captured'],
    createdAt: new Date(now.getTime() - Math.random() * 12 * 60 * 60 * 1000),
    notes: 'Lead captured from campaign'
  })),

  // NO REPLY (10) - 20%
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `no-reply-${i + 1}`,
    name: indianNames[20 + i],
    phone: generatePhone(),
    email: generateEmail(indianNames[20 + i]),
    source: sources[Math.floor(Math.random() * sources.length)],
    stage: 'no-reply' as const,
    status: `Reminder ${i % 3 + 1}/3 • Next: ${['Tomorrow', 'In 22h', 'Final attempt'][i % 3]}`,
    budget: generateBudget(),
    location: locations[Math.floor(Math.random() * locations.length)],
    timeline: ['Within 1 month', 'Within 3 months'][Math.floor(Math.random() * 2)],
    lastContact: new Date(now.getTime() - (24 + i * 24) * 60 * 60 * 1000),
    nextAction: new Date(now.getTime() + (i < 5 ? 2 : 24) * 60 * 60 * 1000),
    priority: (i < 2 ? 'urgent' : 'medium') as Lead['priority'],
    engagement: {
      messagesSent: i % 3 + 1,
      messagesOpened: 0
    },
    assignedTo: `Agent ${Math.floor(Math.random() * 5) + 1}`,
    tags: ['no-reply', 'follow-up-pending'],
    createdAt: new Date(now.getTime() - (48 + i * 24) * 60 * 60 * 1000),
    notes: 'Awaiting response after multiple attempts'
  })),

  // QUALIFIED (8) - 16%
  ...Array.from({ length: 8 }, (_, i) => ({
    id: `qualified-${i + 1}`,
    name: indianNames[30 + i],
    phone: generatePhone(),
    email: generateEmail(indianNames[30 + i]),
    source: sources[Math.floor(Math.random() * sources.length)],
    stage: 'qualified' as const,
    status: i < 2 ? `Budget: ${generateBudget()} • Unassigned` : `Timeline: ${['2 months', '1 month', 'Urgent'][i % 3]} • Agent #${i % 5 + 1}`,
    aiScore: 0.78 + Math.random() * 0.2,
    budget: generateBudget(),
    location: locations[Math.floor(Math.random() * locations.length)],
    timeline: ['Within 1 month', '2 months', 'Urgent'][i % 3],
    lastContact: new Date(now.getTime() - (12 + i * 12) * 60 * 60 * 1000),
    nextAction: new Date(now.getTime() + (4 + i * 8) * 60 * 60 * 1000),
    priority: (i < 2 ? 'urgent' : i < 5 ? 'high' : 'medium') as Lead['priority'],
    engagement: {
      messagesSent: 3 + i,
      messagesOpened: 2 + Math.floor(i / 2),
      lastOpened: new Date(now.getTime() - (6 + i * 2) * 60 * 60 * 1000)
    },
    assignedTo: i < 2 ? undefined : `Agent ${i % 5 + 1}`,
    tags: ['qualified', 'high-intent', 'budget-confirmed'],
    createdAt: new Date(now.getTime() - (3 + i) * 24 * 60 * 60 * 1000),
    notes: 'Qualified lead ready for sales engagement'
  })),

  // NURTURING (7) - 14%
  ...Array.from({ length: 7 }, (_, i) => ({
    id: `nurturing-${i + 1}`,
    name: indianNames[38 + i],
    phone: generatePhone(),
    email: generateEmail(indianNames[38 + i]),
    source: sources[Math.floor(Math.random() * sources.length)],
    stage: 'nurturing' as const,
    status: `Day ${i + 1}/7 • Opened: ${i + 1}/${i + 2} msgs • Engagement: ${['High', 'Medium', 'Low'][i % 3]}`,
    budget: generateBudget(),
    location: locations[Math.floor(Math.random() * locations.length)],
    timeline: ['Within 3 months', '6 months'][Math.floor(Math.random() * 2)],
    lastContact: new Date(now.getTime() - (i + 1) * 24 * 60 * 60 * 1000),
    nextAction: new Date(now.getTime() + 24 * 60 * 60 * 1000),
    priority: 'medium' as const,
    engagement: {
      messagesSent: i + 2,
      messagesOpened: i + 1,
      lastOpened: new Date(now.getTime() - (i + 1) * 12 * 60 * 60 * 1000)
    },
    assignedTo: `Agent ${i % 5 + 1}`,
    tags: ['nurturing', 'engaged'],
    createdAt: new Date(now.getTime() - (7 + i) * 24 * 60 * 60 * 1000),
    notes: 'In automated nurture sequence'
  })),

  // LONG-TERM (4) - 8%
  ...Array.from({ length: 4 }, (_, i) => ({
    id: `long-term-${i + 1}`,
    name: indianNames[45 + i],
    phone: generatePhone(),
    email: generateEmail(indianNames[45 + i]),
    source: sources[Math.floor(Math.random() * sources.length)],
    stage: 'long-term' as const,
    status: `Next contact: ${i + 3} days • Interest: Low`,
    budget: generateBudget(),
    location: locations[Math.floor(Math.random() * locations.length)],
    timeline: '6+ months',
    lastContact: new Date(now.getTime() - (10 + i * 2) * 24 * 60 * 60 * 1000),
    nextAction: new Date(now.getTime() + (3 + i) * 24 * 60 * 60 * 1000),
    priority: 'low' as const,
    engagement: {
      messagesSent: 5 + i,
      messagesOpened: 2,
      lastOpened: new Date(now.getTime() - (8 + i) * 24 * 60 * 60 * 1000)
    },
    assignedTo: `Agent ${i % 5 + 1}`,
    tags: ['long-term', 'low-priority'],
    createdAt: new Date(now.getTime() - (15 + i * 5) * 24 * 60 * 60 * 1000),
    notes: 'Low engagement, scheduled for periodic check-ins'
  })),

  // WON (1) - 2%
  {
    id: 'won-1',
    name: indianNames[49],
    phone: generatePhone(),
    email: generateEmail(indianNames[49]),
    source: 'Meta Lead',
    stage: 'won' as const,
    status: 'Deal: ₹1.2Cr • Converted!',
    aiScore: 0.96,
    budget: '₹120L',
    location: 'Mumbai',
    timeline: 'Closed',
    lastContact: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
    priority: 'high' as const,
    engagement: {
      messagesSent: 12,
      messagesOpened: 10,
      lastOpened: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000)
    },
    assignedTo: 'Agent 1',
    tags: ['won', 'converted', 'vip'],
    createdAt: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
    notes: 'Successfully converted lead - property purchased'
  }
];

export const getLeadsByStage = (stage: Lead['stage']) => {
  return dummyLeads.filter(lead => lead.stage === stage);
};

export const getPriorityLeads = () => {
  const urgent = dummyLeads.filter(lead => 
    lead.priority === 'urgent' || 
    (lead.stage === 'no-reply' && lead.engagement.messagesSent >= 2) ||
    (lead.stage === 'qualified' && !lead.assignedTo)
  ).slice(0, 5);

  const highValue = dummyLeads.filter(lead => 
    lead.aiScore && lead.aiScore > 0.85 && lead.stage === 'qualified'
  ).slice(0, 3);

  const expiring = dummyLeads.filter(lead => 
    lead.nextAction && 
    lead.nextAction.getTime() - now.getTime() < 24 * 60 * 60 * 1000
  ).slice(0, 5);

  return { urgent, highValue, expiring };
};

export const getStageMetrics = (stage: Lead['stage']) => {
  const leads = getLeadsByStage(stage);
  const totalLeads = leads.length;

  switch (stage) {
    case 'new':
      const todayLeads = leads.filter(l => 
        now.getTime() - l.createdAt.getTime() < 24 * 60 * 60 * 1000
      ).length;
      return `${todayLeads} today`;
    
    case 'no-reply':
      const responded = dummyLeads.filter(l => 
        l.stage !== 'no-reply' && l.engagement.messagesOpened > 0
      ).length;
      const totalSent = dummyLeads.filter(l => 
        l.engagement.messagesSent > 0
      ).length;
      const responseRate = totalSent > 0 ? Math.round((responded / totalSent) * 100) : 0;
      return `${responseRate}% response rate`;
    
    case 'qualified':
      const avgTime = leads.reduce((acc, l) => {
        return acc + (l.lastContact.getTime() - l.createdAt.getTime());
      }, 0) / totalLeads;
      const avgHours = Math.round(avgTime / (1000 * 60 * 60) * 10) / 10;
      return `Avg ${avgHours}h to qualify`;
    
    case 'nurturing':
      const completed = leads.filter(l => 
        l.status.includes('Day 7')
      ).length;
      const completionRate = totalLeads > 0 ? Math.round((completed / totalLeads) * 100) : 0;
      return `${completionRate}% completion rate`;
    
    case 'long-term':
      const reengaged = 2; // dummy
      const reengagementRate = totalLeads > 0 ? Math.round((reengaged / totalLeads) * 100) : 0;
      return `${reengagementRate}% re-engagement`;
    
    case 'won':
      const totalValue = leads.reduce((acc, l) => {
        const value = parseFloat(l.budget?.replace(/[₹LCr,]/g, '') || '0');
        return acc + value;
      }, 0);
      return `₹${totalValue.toFixed(1)}Cr this month`;
    
    default:
      return '';
  }
};
