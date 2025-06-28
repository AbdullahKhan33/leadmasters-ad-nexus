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
import { generate100Leads30DaysContent } from '@/content/generate-100-leads-30-days';
import { aiToolsSmallBusiness2024Content } from '@/content/ai-tools-small-business-2024';
import { whatsappAutomationWorkflowsContent } from '@/content/whatsapp-automation-workflows';

const blogContent = {
  [facebookVsGoogleAdsContent.id]: facebookVsGoogleAdsContent,
  [marketingAutomationWorkflowsContent.id]: marketingAutomationWorkflowsContent,
  [crmImplementationGuideContent.id]: crmImplementationGuideContent,
  [websiteConversionOptimizationContent.id]: websiteConversionOptimizationContent,
  [generate100Leads30DaysContent.id]: generate100Leads30DaysContent,
  [aiToolsSmallBusiness2024Content.id]: aiToolsSmallBusiness2024Content,
  [whatsappAutomationWorkflowsContent.id]: whatsappAutomationWorkflowsContent,
};

// Enhanced formatting only for specific blogs
const formatEnhancedBlogContent = (content: string) => {
  const paragraphs = content.split('\n\n').filter(p => p.trim());
  
  return paragraphs.map(paragraph => {
    const trimmed = paragraph.trim();
    
    if (!trimmed) return '';
    
    // Handle main headings (##)
    if (trimmed.startsWith('## ')) {
      return `<h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">${trimmed.replace('## ', '')}</h2>`;
    }
    
    // Handle sub-headings (###)
    if (trimmed.startsWith('### ')) {
      return `<h3 class="text-2xl font-semibold text-gray-800 mt-8 mb-4">${trimmed.replace('### ', '')}</h3>`;
    }
    
    // Handle smaller headings (####)
    if (trimmed.startsWith('#### ')) {
      return `<h4 class="text-xl font-semibold text-gray-700 mt-6 mb-3">${trimmed.replace('#### ', '')}</h4>`;
    }
    
    // Handle single line headings (starting with #)
    if (trimmed.startsWith('# ') && !trimmed.includes('\n')) {
      return `<h1 class="text-4xl font-bold text-gray-900 mt-8 mb-6">${trimmed.replace('# ', '')}</h1>`;
    }
    
    // Handle bullet points that start with - or *
    if (trimmed.includes('\n- ') || trimmed.includes('\n* ') || trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const listItems = trimmed.split('\n').filter(line => {
        const cleaned = line.trim();
        return cleaned.startsWith('- ') || cleaned.startsWith('* ');
      }).map(item => {
        const cleanItem = item.replace(/^[\-\*]\s/, '').trim();
        return `<li class="mb-2">${cleanItem}</li>`;
      }).join('');
      return `<ul class="list-disc list-inside space-y-2 my-6 ml-4">${listItems}</ul>`;
    }
    
    // Handle checkmarks (✅)
    if (trimmed.includes('✅')) {
      const items = trimmed.split('\n').filter(line => line.includes('✅'));
      const listItems = items.map(item => {
        const cleanItem = item.replace('✅', '').trim();
        return `<li class="flex items-start space-x-3 mb-3">
          <span class="text-green-500 text-lg flex-shrink-0">✅</span>
          <span>${cleanItem}</span>
        </li>`;
      }).join('');
      return `<ul class="space-y-2 my-6">${listItems}</ul>`;
    }
    
    // Handle regular paragraphs
    let formatted = trimmed
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/\n/g, '<br/>');
    
    return `<p class="text-gray-700 leading-relaxed mb-6">${formatted}</p>`;
  }).filter(html => html.trim()).join('');
};

// Simple formatting for all other blogs
const formatSimpleBlogContent = (content: string) => {
  const paragraphs = content.split('\n\n').filter(p => p.trim());
  
  return paragraphs.map(paragraph => {
    const trimmed = paragraph.trim();
    
    if (!trimmed) return '';
    
    // Simple headings
    if (trimmed.startsWith('## ')) {
      return `<h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">${trimmed.replace('## ', '')}</h2>`;
    }
    
    if (trimmed.startsWith('### ')) {
      return `<h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">${trimmed.replace('### ', '')}</h3>`;
    }
    
    // Simple bullet points
    if (trimmed.includes('\n- ') || trimmed.startsWith('- ')) {
      const listItems = trimmed.split('\n').filter(line => line.trim().startsWith('- '))
        .map(item => `<li>${item.replace('- ', '').trim()}</li>`).join('');
      return `<ul class="list-disc list-inside my-4">${listItems}</ul>`;
    }
    
    // Simple paragraphs
    let formatted = trimmed
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br/>');
    
    return `<p class="text-gray-700 mb-4">${formatted}</p>`;
  }).filter(html => html.trim()).join('');
};

export function BlogPostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the blog post
  const allPosts = [featuredPost, ...blogPosts];
  const post = allPosts.find(p => p.id === id);
  const content = id ? blogContent[id as keyof typeof blogContent] : null;

  console.log('Blog post ID:', id);
  console.log('Found post:', post);
  console.log('Content available:', !!content);

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

  // Determine which formatting to use based on the blog post ID
  const shouldUseEnhancedFormatting = [
    'marketing-automation-workflows',
    'crm-implementation-guide', 
    'website-conversion-optimization'
  ].includes(id || '');

  const formattedContent = shouldUseEnhancedFormatting 
    ? formatEnhancedBlogContent(content.content)
    : formatSimpleBlogContent(content.content);

  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button 
          variant="ghost" 
          className="mb-8 hover:bg-gray-100 text-purple-600 hover:text-purple-700"
          onClick={() => navigate('/blog')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Button>

        <article>
          <div className="mb-12">
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
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
            
            <span className="inline-block bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-sm font-semibold px-4 py-2 rounded-full mb-8">
              {post.category}
            </span>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-8 leading-tight">
              {content.title}
            </h1>
          </div>

          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ 
              __html: formattedContent
            }}
          />
        </article>
      </main>
      <PublicFooter />
    </div>
  );
}
