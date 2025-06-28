
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  featured?: boolean;
}

export const featuredPost: BlogPost = {
  id: 'generate-100-leads-30-days',
  title: "How to Generate 100 Leads in 30 Days (Without Spending a Fortune)",
  excerpt: "The exact step-by-step blueprint we use to help small businesses consistently generate qualified leads using AI-powered marketing strategies that cost less than $500/month.",
  author: "LeadMasters Team",
  date: "Jan 15, 2025",
  readTime: "8 min read",
  category: "Lead Generation",
  featured: true
};

export const blogPosts: BlogPost[] = [
  {
    id: 'facebook-vs-google-ads',
    title: "Facebook Ads vs. Google Ads: Which is Better for Small Businesses?",
    excerpt: "We spent $50,000 testing both platforms for small businesses. Here's our complete comparison of Facebook and Google advertising to help you choose the best platform for your goals and budget.",
    author: "Advertising Team",
    date: "Feb 10, 2025",
    readTime: "9 min read",
    category: "Marketing Automation"
  },
  {
    id: 'marketing-automation-workflows',
    title: "5 Marketing Automation Workflows That Generate Sales While You Sleep",
    excerpt: "Set up these 5 proven automation workflows to nurture leads, recover abandoned carts, and turn one-time buyers into repeat customers automatically, increasing revenue by 40%.",
    author: "Marketing Team",
    date: "Jan 5, 2025",
    readTime: "13 min read",
    category: "Marketing Automation"
  },
  {
    id: 'crm-implementation-guide',
    title: "CRM Implementation: How to Get Your Team to Actually Use It",
    excerpt: "85% of CRM systems fail because employees refuse to use them. This step-by-step guide shows you how to choose, implement, and get team buy-in for a CRM that drives real results.",
    author: "Sales Operations Team",
    date: "Jan 8, 2025",
    readTime: "16 min read",
    category: "CRM"
  },
  {
    id: 'website-conversion-optimization',
    title: "Website Conversion Optimization: Turn More Visitors Into Customers",
    excerpt: "Small changes can create big results. These 12 proven conversion optimization techniques can double your website's lead generation without spending more on advertising.",
    author: "Conversion Team",
    date: "Jan 3, 2025",
    readTime: "11 min read",
    category: "Website"
  },
  {
    id: 'ai-tools-small-business-2024',
    title: "10 AI Tools Every Small Business Should Use in 2025",
    excerpt: "From ChatGPT for content creation to Zapier for automation, discover the essential AI tools that successful entrepreneurs use to save 20+ hours per week while scaling their operations.",
    author: "Marketing Team",
    date: "Jan 12, 2025",
    readTime: "5 min read",
    category: "AI Tools"
  },
  {
    id: 'whatsapp-marketing-secret-weapon',
    title: "WhatsApp Marketing: The Secret Weapon for Local Businesses",
    excerpt: "Local businesses using WhatsApp are seeing 3x higher engagement rates than email. Here's the complete playbook to turn WhatsApp into your most profitable marketing channel.",
    author: "Growth Team",
    date: "Jan 18, 2025",
    readTime: "7 min read",
    category: "WhatsApp Marketing"
  },
  {
    id: 'whatsapp-automation-workflows',
    title: "WhatsApp Automation: 5 Workflows That Convert Leads Into Sales",
    excerpt: "These 5 proven WhatsApp automation workflows have helped our clients convert 40% more leads into paying customers. Plus, we're sharing the exact templates you can copy.",
    author: "Automation Team",
    date: "Jan 22, 2025",
    readTime: "9 min read",
    category: "WhatsApp Marketing"
  },
  {
    id: 'small-business-cash-flow',
    title: "Cash Flow Management: 7 Strategies Every Small Business Owner Must Know",
    excerpt: "78% of small business failures are due to cash flow problems. These 7 battle-tested strategies will help you maintain healthy cash flow and avoid the disasters that kill most businesses.",
    author: "Finance Team",
    date: "Feb 1, 2025",
    readTime: "12 min read",
    category: "Small Business Tips"
  },
  {
    id: 'small-business-productivity',
    title: "The 80/20 Productivity System: Work 4 Hours Less Per Day",
    excerpt: "Successful entrepreneurs are using the 80/20 rule to identify the 20% of activities that drive 80% of results. Here's how to reclaim 4+ hours daily while actually growing faster.",
    author: "Productivity Team",
    date: "Feb 3, 2025",
    readTime: "15 min read",
    category: "Small Business Tips"
  },
  {
    id: 'whatsapp-broadcast-mastery',
    title: "WhatsApp Broadcast Lists: Send 1000+ Messages Without Getting Blocked",
    excerpt: "The complete guide to WhatsApp broadcast lists that actually work. Learn the insider secrets to reach thousands of customers while maintaining 85%+ open rates and avoiding bans.",
    author: "WhatsApp Specialists",
    date: "Jan 25, 2025",
    readTime: "11 min read",
    category: "WhatsApp Marketing"
  }
];

export const categories = [
  "All Posts",
  "AI Tools", 
  "Lead Generation",
  "WhatsApp Marketing",
  "Small Business Tips",
  "Marketing Automation",
  "CRM",
  "Website"
];
