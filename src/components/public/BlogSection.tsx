
import React from 'react';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function BlogSection() {
  const blogPosts = [
    {
      title: "5 AI Tools Every Business Should Use in 2024",
      excerpt: "Discover the essential AI tools that are transforming how small businesses operate and grow in the digital age.",
      author: "LeadMasters Team",
      date: "Dec 15, 2024",
      readTime: "5 min read",
      category: "AI Tools"
    },
    {
      title: "How WhatsApp Marketing Boosts Sales for Small Businesses",
      excerpt: "Learn proven strategies to leverage WhatsApp for customer engagement and drive more sales for your business.",
      author: "Marketing Team",
      date: "Dec 10, 2024",
      readTime: "7 min read",
      category: "Marketing"
    },
    {
      title: "LeadMasters Behind the Scenes: Our Product Journey",
      excerpt: "Take a peek behind the curtain at how we built LeadMasters.ai and the vision driving our development.",
      author: "Product Team",
      date: "Dec 5, 2024",
      readTime: "6 min read",
      category: "Company"
    }
  ];

  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Latest from Our <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Blog</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest insights, tips, and strategies to grow your business
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <article key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
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

        <div className="text-center">
          <Button variant="outline" size="lg" className="border-purple-200 text-purple-700 hover:bg-purple-50">
            View All Posts
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
