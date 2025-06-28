
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

// Enhanced function to format blog content with proper HTML structure
const formatBlogContent = (content: string) => {
  // Split content into paragraphs and process each one
  const paragraphs = content.split('\n\n').filter(p => p.trim());
  
  return paragraphs.map(paragraph => {
    const trimmed = paragraph.trim();
    
    // Handle main headings (##)
    if (trimmed.startsWith('## ')) {
      return `<h2 class="text-3xl font-bold text-gray-900 mt-8 mb-6 leading-tight">${trimmed.replace('## ', '')}</h2>`;
    }
    
    // Handle sub-headings (###)
    if (trimmed.startsWith('### ')) {
      return `<h3 class="text-2xl font-semibold text-gray-800 mt-6 mb-4 leading-tight">${trimmed.replace('### ', '')}</h3>`;
    }
    
    // Handle smaller headings (####)
    if (trimmed.startsWith('#### ')) {
      return `<h4 class="text-xl font-semibold text-gray-800 mt-5 mb-3 leading-tight">${trimmed.replace('#### ', '')}</h4>`;
    }
    
    // Handle numbered sections (like "1. HubSpot CRM")
    if (/^\d+\.\s/.test(trimmed)) {
      return `<h3 class="text-xl font-semibold text-blue-700 mt-6 mb-4 leading-tight bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">${trimmed}</h3>`;
    }
    
    // Handle bullet point lists (-)
    if (trimmed.includes('\n- ') || trimmed.startsWith('- ')) {
      const items = trimmed.split('\n').filter(line => line.trim().startsWith('- '));
      const listItems = items.map(item => {
        const cleanItem = item.replace(/^- /, '').trim();
        return `<li class="text-gray-700 leading-relaxed mb-2">${cleanItem}</li>`;
      }).join('');
      return `<ul class="list-disc list-inside space-y-2 my-4 ml-4 text-gray-700">${listItems}</ul>`;
    }
    
    // Handle pros/cons sections
    if (trimmed.includes('**Pros**:') || trimmed.includes('**Cons**:')) {
      let formatted = trimmed
        .replace(/\*\*Pros\*\*:/g, '<h4 class="text-lg font-semibold text-green-700 mt-4 mb-2 flex items-center"><span class="mr-2">✅</span>Pros:</h4>')
        .replace(/\*\*Cons\*\*:/g, '<h4 class="text-lg font-semibold text-red-700 mt-4 mb-2 flex items-center"><span class="mr-2">❌</span>Cons:</h4>')
        .replace(/\n- /g, '<br/>• ')
        .replace(/^- /g, '• ');
      return `<div class="bg-gray-50 p-6 rounded-lg border border-gray-200 my-6">${formatted}</div>`;
    }
    
    // Handle pricing information
    if (trimmed.includes('**Pricing**:')) {
      const formatted = trimmed.replace(/\*\*Pricing\*\*:/g, '<span class="font-semibold text-blue-700 flex items-center"><span class="mr-2">💰</span>Pricing:</span>');
      return `<div class="text-gray-700 leading-relaxed mb-4 bg-blue-50 p-4 rounded-lg border border-blue-200">${formatted}</div>`;
    }
    
    // Handle user reviews
    if (trimmed.includes('**Real User Review**:')) {
      const formatted = trimmed
        .replace(/\*\*Real User Review\*\*:/g, '')
        .replace(/"/g, '"')
        .trim();
      return `<blockquote class="border-l-4 border-purple-500 bg-purple-50 p-6 my-6 rounded-r-lg shadow-sm">
        <div class="flex items-center mb-2">
          <span class="text-purple-600 font-semibold">💬 Real User Review</span>
        </div>
        <p class="text-gray-700 italic leading-relaxed">"${formatted}"</p>
      </blockquote>`;
    }
    
    // Handle adoption scores
    if (trimmed.includes('Adoption Score:')) {
      const score = trimmed.match(/(\d+\.\d+)\/10/)?.[1];
      const scoreColor = score && parseFloat(score) >= 8.5 ? 'text-green-600' : 
                        score && parseFloat(score) >= 7.5 ? 'text-yellow-600' : 'text-red-600';
      return `<div class="text-center my-6">
        <div class="inline-block bg-gray-100 px-6 py-3 rounded-full shadow-sm">
          <span class="font-semibold text-gray-700">📊 Adoption Score: </span>
          <span class="font-bold text-2xl ${scoreColor}">${trimmed.replace('Adoption Score: ', '')}</span>
        </div>
      </div>`;
    }
    
    // Handle checkbox lists (✅)
    if (trimmed.includes('✅')) {
      const items = trimmed.split('\n').filter(line => line.includes('✅'));
      const listItems = items.map(item => {
        const cleanItem = item.replace('✅', '').trim();
        return `<li class="flex items-start space-x-3 mb-3">
          <span class="text-green-500 text-lg mt-1 flex-shrink-0">✅</span>
          <span class="text-gray-700 leading-relaxed">${cleanItem}</span>
        </li>`;
      }).join('');
      return `<ul class="space-y-2 my-6 bg-green-50 p-6 rounded-lg border border-green-200 shadow-sm">${listItems}</ul>`;
    }
    
    // Handle regular paragraphs with basic inline formatting
    if (trimmed.length > 0) {
      let formatted = trimmed
        // Bold text
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
        // Italic text  
        .replace(/\*(.*?)\*/g, '<em class="italic text-gray-700">$1</em>')
        // Line breaks
        .replace(/\n/g, '<br/>');
      
      return `<p class="text-gray-700 leading-relaxed mb-6 text-lg">${formatted}</p>`;
    }
    
    return '';
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
  console.log('Content keys:', Object.keys(blogContent));

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
          className="mb-8 hover:bg-gray-100 text-purple-600 hover:text-purple-700"
          onClick={() => navigate('/blog')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Button>

        <article>
          <div className="mb-16">
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
            
            <h1 className="text-5xl font-bold text-gray-900 mb-8 leading-tight">
              {content.title}
            </h1>
          </div>

          <div 
            className="blog-content prose prose-lg max-w-none"
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
