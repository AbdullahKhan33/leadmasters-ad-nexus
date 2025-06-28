
import React from 'react';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BlogPost } from '@/data/blogData';

interface BlogCardProps {
  post: BlogPost;
  onClick: (postId: string) => void;
  variant?: 'default' | 'featured';
}

export function BlogCard({ post, onClick, variant = 'default' }: BlogCardProps) {
  if (variant === 'featured') {
    return (
      <div 
        className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow duration-300"
        onClick={() => onClick(post.id)}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-6">
            <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
              FEATURED
            </span>
            <span className="bg-yellow-400 text-yellow-900 text-xs font-semibold px-3 py-1 rounded-full">
              {post.category}
            </span>
          </div>
          
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">
            {post.title}
          </h3>
          
          <p className="text-lg opacity-90 mb-6 max-w-3xl">
            {post.excerpt}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6 text-sm opacity-80">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
            <Button variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
              Read Article
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article 
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 group cursor-pointer"
      onClick={() => onClick(post.id)}
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
  );
}
