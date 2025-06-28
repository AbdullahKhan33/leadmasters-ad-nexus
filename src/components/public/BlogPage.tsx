
import React, { useState } from 'react';
import { PublicHeader } from './PublicHeader';
import { PublicFooter } from './PublicFooter';
import { ArrowRight, Calendar, User, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export function BlogPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All Posts');

  const featuredPosts = [
    {
      id: 'ai-tools-small-business-2024',
      title: "10 AI Tools Every Small Business Should Use in 2025",
      excerpt: "From ChatGPT for content creation to Zapier for automation, discover the essential AI tools that successful entrepreneurs use to save 20+ hours per week while scaling their operations effortlessly.",
      author: "LeadMasters Team",
      date: "Jan 12, 2025",
      readTime: "8 min read",  
      category: "AI Tools",
      featured: true
    },
    {
      id: 'whatsapp-marketing-secret-weapon',
      title: "WhatsApp Marketing: The Complete Guide for Small Businesses",
      excerpt: "Local businesses using WhatsApp are seeing 3x higher engagement rates than email marketing. Here's the complete playbook to turn WhatsApp into your most profitable marketing channel in 2025.",
      author: "Marketing Team",
      date: "Jan 18, 2025",
      readTime: "12 min read",  
      category: "WhatsApp Marketing",
      featured: true
    }
  ];

  const recentPosts = [
    {
      id: 'generate-100-leads-30-days',
      title: "How to Generate 100 Leads in 30 Days (Without Spending a Fortune)",
      excerpt: "The exact step-by-step blueprint we use to help small businesses consistently generate qualified leads using AI-powered marketing strategies that cost less than $500/month.",
      author: "Sales Team",
      date: "Jan 15, 2025",
      readTime: "6 min read",
      category: "Lead Generation"
    },
    {
      id: 'whatsapp-automation-workflows',
      title: "WhatsApp Automation: 5 Workflows That Convert Leads Into Sales",
      excerpt: "These 5 proven WhatsApp automation workflows have helped our clients convert 40% more leads into paying customers. Plus, we're sharing the exact templates you can copy and use today.",
      author: "Automation Team",
      date: "Jan 22, 2025",
      readTime: "9 min read",
      category: "WhatsApp Marketing"
    },
    {
      id: 'whatsapp-broadcast-mastery',
      title: "WhatsApp Broadcast Lists: How to Send 1000+ Messages Without Getting Blocked",
      excerpt: "The complete guide to WhatsApp broadcast lists that actually work. Learn the insider secrets to reach thousands of customers while maintaining 85%+ open rates and avoiding bans completely.",
      author: "WhatsApp Specialists",
      date: "Jan 25, 2025",
      readTime: "11 min read",
      category: "WhatsApp Marketing"
    },
    {
      id: 'whatsapp-customer-service',
      title: "WhatsApp Customer Service: Turn Support Into Sales Opportunities",
      excerpt: "Smart businesses are using WhatsApp customer service to solve problems AND increase sales. Here's how to turn every support interaction into a potential upsell opportunity that customers love.",
      author: "Customer Success Team",
      date: "Jan 28, 2025",
      readTime: "10 min read",
      category: "WhatsApp Marketing"
    },
    {
      id: 'small-business-cash-flow',
      title: "Cash Flow Management: 7 Strategies Every Small Business Owner Must Know",
      excerpt: "78% of small business failures are due to cash flow problems. These 7 battle-tested strategies will help you maintain healthy cash flow and avoid the financial disasters that kill most businesses.",
      author: "Finance Team",
      date: "Feb 1, 2025",
      readTime: "12 min read",
      category: "Small Business Tips"
    },
    {
      id: 'small-business-productivity',
      title: "The 80/20 Productivity System: How Small Business Owners Can Work 4 Hours Less Per Day",
      excerpt: "Successful entrepreneurs are using the 80/20 rule to identify the 20% of activities that drive 80% of results. Here's how to reclaim 4+ hours daily while actually growing your business faster.",
      author: "Productivity Team",
      date: "Feb 3, 2025",
      readTime: "15 min read",
      category: "Small Business Tips"
    },
    {
      id: 'small-business-hiring-guide',
      title: "The Small Business Hiring Blueprint: Find A-Players Without Breaking the Bank",
      excerpt: "Stop making expensive hiring mistakes that cost you thousands. This proven blueprint shows you exactly how to attract, interview, and hire A-players even when you can't compete on salary alone.",
      author: "HR & Talent Team",
      date: "Feb 5, 2025",
      readTime: "18 min read",
      category: "Small Business Tips"
    },
    {
      id: 'ai-prompts-business-guide',
      title: "How to Write AI Prompts That Actually Work for Your Business",
      excerpt: "Most business owners are wasting hours with bad AI prompts. Master the art of prompt engineering to get 10x better results from ChatGPT, Claude, and other AI tools while saving time.",
      author: "AI Team",
      date: "Feb 12, 2025",
      readTime: "7 min read",
      category: "AI Tools"
    },
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
      id: 'crm-implementation-guide',
      title: "CRM Implementation: How to Get Your Team to Actually Use It",
      excerpt: "85% of CRM systems fail because employees refuse to use them. This step-by-step guide shows you how to choose, implement, and get team buy-in for a CRM that drives real results.",
      author: "Sales Operations Team",
      date: "Jan 8, 2025",
      readTime: "16 min read",
      category: "CRM"
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
      id: 'website-conversion-optimization',
      title: "Website Conversion Optimization: Turn More Visitors Into Customers",
      excerpt: "Small changes can create big results. These 12 proven conversion optimization techniques can double your website's lead generation without spending more on advertising.",
      author: "Conversion Team",
      date: "Jan 3, 2025",
      readTime: "11 min read",
      category: "Website"
    }
  ];

  const categories = [
    "All Posts",
    "AI Tools", 
    "Lead Generation",
    "WhatsApp Marketing",
    "Small Business Tips",
    "Marketing Automation",
    "CRM",
    "Website"
  ];

  const allPosts = [...featuredPosts, ...recentPosts];
  const filteredPosts = activeCategory === 'All Posts' 
    ? allPosts 
    : allPosts.filter(post => post.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />
      <main>
        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Small Business <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Growth</span> Blog
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Practical tips, strategies, and insights to help your small business grow with AI-powered marketing and lead generation.
              </p>
            </div>
          </div>
        </section>

        {/* Categories - Styled like your navigation bar */}
        <section className="py-8 bg-white border-b sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveCategory(category)}
                  className={`
                    rounded-full px-6 py-2 font-medium transition-all duration-200
                    ${activeCategory === category 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg' 
                      : index === 1 && activeCategory !== category
                        ? 'border-2 border-gray-300 text-gray-700 hover:border-purple-300 hover:text-purple-600'
                        : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                    }
                  `}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        {activeCategory === 'All Posts' && (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-12">Featured Articles</h2>
              <div className="grid lg:grid-cols-2 gap-8 mb-16">
                {featuredPosts.map((post, index) => (
                  <article 
                    key={index} 
                    className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                    onClick={() => navigate(`/blog/${post.id}`)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-block bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 text-lg">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <User className="w-4 h-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>{post.date}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700">
                        Read More <ArrowRight className="ml-1 w-4 h-4" />
                      </Button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Posts */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">
              {activeCategory === 'All Posts' ? 'Recent Posts' : `${activeCategory} Posts`}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <article 
                  key={index} 
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  onClick={() => navigate(`/blog/${post.id}`)}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-block bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-sm text-gray-500">{post.readTime}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <User className="w-4 h-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>{post.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-500">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Never Miss a Growth Tip
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Get weekly insights on AI, marketing, and lead generation delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white focus:outline-none"
              />
              <Button className="bg-white text-purple-600 hover:bg-gray-100 px-6 py-3">
                Subscribe
              </Button>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
