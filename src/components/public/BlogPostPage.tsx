import React, { useState, useEffect } from 'react';
import { PublicHeader } from './PublicHeader';
import { PublicFooter } from './PublicFooter';
import { ArrowRight, Calendar, User, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useParams } from 'react-router-dom';

export function BlogPostPage() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    // Mock fetching of blog post based on slug
    // In a real app, you'd fetch this from an API
    const mockPost = {
      id: slug,
      title: `Blog Post Title for ${slug}`,
      content: `This is the content of the blog post with slug ${slug}. Replace this with actual content.`,
      author: "LeadMasters Team",
      date: "Jan 1, 2025",
      readTime: "5 min read",
      category: "Example Category"
    };
    setPost(mockPost);
  }, [slug]);

  // Add scroll to top effect when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />
      <main className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Button variant="ghost" onClick={() => navigate('/blog')}>
              <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
              Back to Blog
            </Button>
          </div>

          <header className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            <div className="flex items-center space-x-4 text-gray-500">
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
          </header>

          <div className="prose prose-lg">
            <p>{post.content}</p>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
