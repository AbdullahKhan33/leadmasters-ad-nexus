
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

// Helper function to format blog content with proper HTML structure
const formatBlogContent = (content: string) => {
  return content
    // Convert double line breaks to paragraph breaks
    .split('\n\n')
    .map(paragraph => {
      // Handle headings
      if (paragraph.startsWith('## ')) {
        return `<h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4 leading-tight">${paragraph.replace('## ', '')}</h2>`;
      }
      if (paragraph.startsWith('### ')) {
        return `<h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3 leading-tight">${paragraph.replace('### ', '')}</h3>`;
      }
      if (paragraph.startsWith('#### ')) {
        return `<h4 class="text-lg font-semibold text-gray-800 mt-4 mb-2 leading-tight">${paragraph.replace('#### ', '')}</h4>`;
      }
      
      // Handle lists
      if (paragraph.includes('\n- ') || paragraph.startsWith('- ')) {
        const listItems = paragraph
          .split('\n')
          .filter(line => line.trim().startsWith('- '))
          .map(line => `<li class="mb-2">${line.replace('- ', '')}</li>`)
          .join('');
        return `<ul class="list-disc list-inside space-y-2 my-4 ml-4">${listItems}</ul>`;
      }
      
      // Handle emoji lists
      if (paragraph.includes('\n✅ ') || paragraph.startsWith('✅ ')) {
        const listItems = paragraph
          .split('\n')
          .filter(line => line.trim().startsWith('✅ '))
          .map(line => `<li class="flex items-start space-x-3 mb-3"><span class="text-green-500 text-lg mt-0.5">✅</span><span class="flex-1">${line.replace('✅ ', '')}</span></li>`)
          .join('');
        return `<ul class="space-y-3 my-6">${listItems}</ul>`;
      }
      
      if (paragraph.includes('\n❌ ') || paragraph.startsWith('❌ ')) {
        const listItems = paragraph
          .split('\n')
          .filter(line => line.trim().startsWith('❌ '))
          .map(line => `<li class="flex items-start space-x-3 mb-3"><span class="text-red-500 text-lg mt-0.5">❌</span><span class="flex-1">${line.replace('❌ ', '')}</span></li>`)
          .join('');
        return `<ul class="space-y-3 my-6">${listItems}</ul>`;
      }
      
      // Handle regular paragraphs
      if (paragraph.trim()) {
        let formattedParagraph = paragraph
          // Bold text
          .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
          // Italic text
          .replace(/\*(.*?)\*/g, '<em class="italic text-gray-700">$1</em>')
          // Handle line breaks within paragraphs
          .replace(/\n/g, '<br/>');
        
        return `<p class="text-gray-700 leading-relaxed mb-6">${formattedParagraph}</p>`;
      }
      
      return '';
    })
    .filter(item => item.trim())
    .join('');
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
            className="mb-8 hover:bg-gray-100"
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
              
              <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
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
          className="mb-8 hover:bg-gray-100"
          onClick={() => navigate('/blog')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Button>

        <article>
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
            
            <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {content.title}
            </h1>
          </div>

          <div 
            className="blog-content max-w-none"
            dangerouslySetInnerHTML={{ 
              __html: formatBlogContent(content.content)
            }}
          />
        </article>
      </main>
      <PublicFooter />
    </div>
  );
}
