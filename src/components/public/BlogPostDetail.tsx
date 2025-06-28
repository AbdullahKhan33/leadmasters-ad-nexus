
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { PublicHeader } from './PublicHeader';
import { PublicFooter } from './PublicFooter';
import { Calendar, User, Clock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { blogPosts, featuredPost } from '@/data/blogData';
import { facebookVsGoogleAdsContent } from '@/content/facebook-vs-google-ads';
import { marketingAutomationWorkflowsContent } from '@/content/marketing-automation-workflows';
import { crmImplementationGuideContent } from '@/content/crm-implementation-guide';
import { websiteConversionOptimizationContent } from '@/content/website-conversion-optimization';

const blogContent = {
  [facebookVsGoogleAdsContent.id]: facebookVsGoogleAdsContent,
  [marketingAutomationWorkflowsContent.id]: marketingAutomationWorkflowsContent,
  [crmImplementationGuideContent.id]: crmImplementationGuideContent,
  [websiteConversionOptimizationContent.id]: websiteConversionOptimizationContent,
};

export function BlogPostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the blog post
  const allPosts = [featuredPost, ...blogPosts];
  const post = allPosts.find(p => p.id === id);
  const content = id ? blogContent[id as keyof typeof blogContent] : null;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // For posts without full content, show a placeholder
  if (!content) {
    return (
      <div className="min-h-screen bg-white">
        <PublicHeader />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button 
            variant="ghost" 
            className="mb-8"
            onClick={() => navigate('/blog')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>

          <article className="prose prose-lg max-w-none">
            <div className="mb-8">
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
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
              
              <span className="inline-block bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-sm font-semibold px-3 py-1 rounded-full mb-4">
                {post.category}
              </span>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                {post.title}
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                {post.excerpt}
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                Content Coming Soon!
              </h3>
              <p className="text-yellow-700">
                We're currently working on the full content for this article. 
                Check back soon for the complete guide with actionable insights and strategies!
              </p>
            </div>
          </article>
        </main>
        <PublicFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button 
          variant="ghost" 
          className="mb-8"
          onClick={() => navigate('/blog')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Button>

        <article className="prose prose-lg max-w-none">
          <div className="mb-8">
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
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
            
            <span className="inline-block bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-sm font-semibold px-3 py-1 rounded-full mb-4">
              {post.category}
            </span>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              {content.title}
            </h1>
          </div>

          <div 
            className="blog-content"
            dangerouslySetInnerHTML={{ 
              __html: content.content
                .replace(/\n/g, '<br/>')
                .replace(/## (.*?)(<br\/>|$)/g, '<h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">$1</h2>')
                .replace(/### (.*?)(<br\/>|$)/g, '<h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">$1</h3>')
                .replace(/#### (.*?)(<br\/>|$)/g, '<h4 class="text-lg font-semibold text-gray-800 mt-4 mb-2">$1</h4>')
                .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
                .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
                .replace(/^# (.*?)(<br\/>|$)/gm, '<h1 class="text-3xl font-bold text-gray-900 mt-8 mb-6">$1</h1>')
                .replace(/^- (.*?)(<br\/>|$)/gm, '<li class="ml-4">$1</li>')
                .replace(/^✅ (.*?)(<br\/>|$)/gm, '<li class="flex items-start space-x-2 mb-2"><span class="text-green-500 mt-1">✅</span><span>$1</span></li>')
                .replace(/^❌ (.*?)(<br\/>|$)/gm, '<li class="flex items-start space-x-2 mb-2"><span class="text-red-500 mt-1">❌</span><span>$1</span></li>')
            }}
          />
        </article>
      </main>
      <PublicFooter />
    </div>
  );
}
