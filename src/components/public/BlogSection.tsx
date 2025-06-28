import React from 'react';
import { ArrowRight, Calendar, User, Clock, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export function BlogSection() {
  const navigate = useNavigate();

  const featuredPost = {
    id: 'generate-100-leads-30-days',
    title: "How to Generate 100 Leads in 30 Days (Without Spending a Fortune)",
    excerpt: "The exact step-by-step blueprint we use to help small businesses consistently generate qualified leads using AI-powered marketing strategies that cost less than $500/month.",
    author: "LeadMasters Team",
    date: "Jan 15, 2025",
    readTime: "8 min read",
    category: "Lead Generation",
    featured: true
  };

  const blogPosts = [
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
    },
    {
      id: 'small-business-hiring-guide',
      title: "The Small Business Hiring Blueprint: Find A-Players on a Budget",
      excerpt: "Stop making expensive hiring mistakes. This proven blueprint shows you exactly how to attract, interview, and hire A-players even when you can't compete on salary alone.",
      author: "HR & Talent Team",
      date: "Feb 5, 2025",
      readTime: "18 min read",
      category: "Small Business Tips"
    },
    {
      id: 'whatsapp-customer-service',
      title: "WhatsApp Customer Service: Turn Support Into Sales Opportunities",
      excerpt: "Smart businesses are using WhatsApp customer service to solve problems AND increase sales. Here's how to turn every support interaction into a potential upsell opportunity.",
      author: "Customer Success Team",
      date: "Jan 28, 2025",
      readTime: "10 min read",
      category: "WhatsApp Marketing"
    }
  ];

  const handleBlogClick = (postId: string) => {
    navigate(`/blog/${postId}`);
  };

  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full mb-6">
            <TrendingUp className="w-4 h-4 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-blue-700">Fresh Insights & Strategies</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Latest from Our <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Blog</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Practical tips, proven strategies, and real insights to help you grow your business smarter, not harder.
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-16">
          <div 
            className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow duration-300"
            onClick={() => handleBlogClick(featuredPost.id)}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
            <div className="relative z-10">
              <div className="flex items-center space-x-4 mb-6">
                <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                  FEATURED
                </span>
                <span className="bg-yellow-400 text-yellow-900 text-xs font-semibold px-3 py-1 rounded-full">
                  {featuredPost.category}
                </span>
              </div>
              
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                {featuredPost.title}
              </h3>
              
              <p className="text-lg opacity-90 mb-6 max-w-3xl">
                {featuredPost.excerpt}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6 text-sm opacity-80">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{featuredPost.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
                <Button variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
                  Read Article
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Regular Posts */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <article 
              key={index} 
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 group cursor-pointer"
              onClick={() => handleBlogClick(post.id)}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50">
                    Read More
                    <ArrowRight className="ml-1 w-3 h-3" />
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 text-center border border-blue-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Never Miss a Growth Opportunity</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Get our latest insights, strategies, and case studies delivered straight to your inbox. Join 1,000+ business owners who rely on our weekly newsletter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6">
              Subscribe Free
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-3">No spam. Unsubscribe anytime.</p>
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg" 
            className="border-purple-200 text-purple-700 hover:bg-purple-50"
            onClick={() => navigate('/blog')}
          >
            View All Articles
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
