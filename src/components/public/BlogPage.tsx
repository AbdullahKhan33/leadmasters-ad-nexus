
import React, { useState } from 'react';
import { PublicHeader } from './PublicHeader';
import { PublicFooter } from './PublicFooter';
import { useNavigate } from 'react-router-dom';
import { BlogCard } from '@/components/blog/BlogCard';
import { Newsletter } from '@/components/blog/Newsletter';
import { CategoryFilter } from '@/components/blog/CategoryFilter';
import { featuredPost, blogPosts, categories } from '@/data/blogData';

export function BlogPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All Posts');

  const featuredPosts = [featuredPost, blogPosts[0]]; // Featured post + first blog post
  const recentPosts = blogPosts.slice(1); // Rest of the posts

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

        {/* Categories */}
        <CategoryFilter 
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

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
                    <BlogCard post={post} onClick={() => navigate(`/blog/${post.id}`)} />
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
                <BlogCard key={index} post={post} onClick={() => navigate(`/blog/${post.id}`)} />
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <Newsletter variant="hero" />
      </main>
      <PublicFooter />
    </div>
  );
}
