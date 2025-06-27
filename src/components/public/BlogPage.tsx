
import React from 'react';
import { PublicHeader } from './PublicHeader';
import { PublicFooter } from './PublicFooter';
import { ArrowRight, Calendar, User, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function BlogPage() {
  const featuredPosts = [
    {
      title: "10 AI Tools Every Small Business Should Use in 2024",
      excerpt: "Discover the essential AI tools that are transforming how small businesses operate, compete, and grow in today's digital marketplace.",
      author: "LeadMasters Team",
      date: "Dec 20, 2024",
      readTime: "8 min read",
      category: "AI Tools",
      featured: true
    },
    {
      title: "WhatsApp Marketing: The Complete Guide for Small Businesses",
      excerpt: "Learn how to leverage WhatsApp Business to connect with customers, automate responses, and drive sales for your small business.",
      author: "Marketing Team",
      date: "Dec 18, 2024",
      readTime: "12 min read",
      category: "WhatsApp Marketing",
      featured: true
    }
  ];

  const recentPosts = [
    {
      title: "5 Lead Generation Mistakes That Are Killing Your Sales",
      excerpt: "Avoid these common lead generation pitfalls that prevent small businesses from converting prospects into paying customers.",
      author: "Sales Team",
      date: "Dec 15, 2024",
      readTime: "6 min read",
      category: "Lead Generation"
    },
    {
      title: "How to Write AI Prompts That Actually Work for Your Business",
      excerpt: "Master the art of prompt engineering to get better results from AI tools and save hours of manual work.",
      author: "AI Team",
      date: "Dec 12, 2024",
      readTime: "7 min read",
      category: "AI Tips"
    },
    {
      title: "Facebook Ads vs. Google Ads: Which is Better for Small Businesses?",
      excerpt: "Compare the pros and cons of Facebook and Google advertising to determine the best platform for your business goals.",
      author: "Advertising Team",
      date: "Dec 10, 2024",
      readTime: "9 min read",
      category: "Advertising"
    },
    {
      title: "Building a CRM That Actually Gets Used: 7 Essential Features",
      excerpt: "Learn what makes a CRM system that your team will actually use, and how to implement it effectively in your business.",
      author: "Product Team",
      date: "Dec 8, 2024",
      readTime: "5 min read",
      category: "CRM"
    },
    {
      title: "The Small Business Owner's Guide to Marketing Automation",
      excerpt: "Discover how to set up marketing automation that saves time and increases sales without the complexity.",
      author: "Automation Team",
      date: "Dec 5, 2024",
      readTime: "10 min read",
      category: "Automation"
    },
    {
      title: "Why Your Business Needs a Professional Website (And How to Get One Fast)",
      excerpt: "Learn why a professional website is crucial for small business success and how to create one quickly and affordably.",
      author: "Web Team",
      date: "Dec 3, 2024",
      readTime: "8 min read",
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

  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
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

        {/* Categories */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category, index) => (
                <Button
                  key={index}
                  variant={index === 0 ? "default" : "outline"}
                  size="sm"
                  className={index === 0 ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">Featured Articles</h2>
            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              {featuredPosts.map((post, index) => (
                <article key={index} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
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

        {/* Recent Posts */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">Recent Posts</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post, index) => (
                <article key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
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
