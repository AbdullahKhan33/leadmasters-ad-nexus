
import React from 'react';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { BlogCard } from '@/components/blog/BlogCard';
import { Newsletter } from '@/components/blog/Newsletter';
import { featuredPost, blogPosts } from '@/data/blogData';

export function BlogSection() {
  const navigate = useNavigate();

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
          <BlogCard post={featuredPost} onClick={handleBlogClick} variant="featured" />
        </div>

        {/* Regular Posts */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <BlogCard key={index} post={post} onClick={handleBlogClick} />
          ))}
        </div>

        {/* Newsletter Signup */}
        <Newsletter />

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
