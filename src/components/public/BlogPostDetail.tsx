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
      return `<h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6 leading-tight border-b border-gray-200 pb-3">${trimmed.replace('## ', '')}</h2>`;
    }
    
    // Handle sub-headings (###)
    if (trimmed.startsWith('### ')) {
      return `<h3 class="text-2xl font-semibold text-gray-800 mt-10 mb-4 leading-tight">${trimmed.replace('### ', '')}</h3>`;
    }
    
    // Handle smaller headings (####)
    if (trimmed.startsWith('#### ')) {
      return `<h4 class="text-xl font-semibold text-gray-800 mt-8 mb-3 leading-tight">${trimmed.replace('#### ', '')}</h4>`;
    }
    
    // Handle section headers that start with numbers (like "1. HubSpot CRM")
    if (/^\d+\.\s/.test(trimmed)) {
      return `<h3 class="text-2xl font-bold text-purple-700 mt-10 mb-4 leading-tight bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border-l-4 border-purple-500">${trimmed}</h3>`;
    }
    
    // Handle bold standalone lines (like "**Best For**:")
    if (trimmed.startsWith('**') && trimmed.endsWith('**') && !trimmed.includes(' ')) {
      return `<h4 class="text-lg font-bold text-gray-800 mt-6 mb-2">${trimmed.replace(/\*\*/g, '')}</h4>`;
    }
    
    // Handle checkbox lists (✅)
    if (trimmed.includes('✅')) {
      const items = trimmed.split('\n').filter(line => line.includes('✅'));
      const listItems = items.map(item => {
        const cleanItem = item.replace('✅', '').trim();
        return `<li class="flex items-start space-x-3 mb-4">
          <span class="text-green-500 text-xl mt-1 flex-shrink-0">✅</span>
          <span class="text-gray-700 leading-relaxed">${cleanItem}</span>
        </li>`;
      }).join('');
      return `<ul class="space-y-2 my-6 bg-green-50 p-6 rounded-lg border border-green-200">${listItems}</ul>`;
    }
    
    // Handle bullet point lists (-)
    if (trimmed.includes('\n- ') || trimmed.startsWith('- ')) {
      const items = trimmed.split('\n').filter(line => line.trim().startsWith('- '));
      const listItems = items.map(item => {
        const cleanItem = item.replace(/^- /, '').trim();
        return `<li class="text-gray-700 leading-relaxed mb-2">${cleanItem}</li>`;
      }).join('');
      return `<ul class="list-disc list-inside space-y-2 my-6 ml-6 text-gray-700">${listItems}</ul>`;
    }
    
    // Handle numbered lists that aren't headings
    if (/^\d+\./.test(trimmed) && !trimmed.match(/^\d+\.\s[A-Z]/)) {
      const items = trimmed.split('\n').filter(line => /^\d+\./.test(line.trim()));
      const listItems = items.map(item => {
        const cleanItem = item.replace(/^\d+\.\s*/, '').trim();
        return `<li class="text-gray-700 leading-relaxed mb-3">${cleanItem}</li>`;
      }).join('');
      return `<ol class="list-decimal list-inside space-y-2 my-6 ml-6 text-gray-700">${listItems}</ol>`;
    }
    
    // Handle pros/cons sections
    if (trimmed.includes('**Pros**:') || trimmed.includes('**Cons**:')) {
      let formatted = trimmed
        .replace(/\*\*Pros\*\*:/g, '<h4 class="text-lg font-semibold text-green-700 mt-4 mb-3">✅ Pros:</h4>')
        .replace(/\*\*Cons\*\*:/g, '<h4 class="text-lg font-semibold text-red-700 mt-4 mb-3">❌ Cons:</h4>')
        .replace(/\n- /g, '<br/>• ')
        .replace(/^- /g, '• ');
      return `<div class="bg-gray-50 p-6 rounded-lg border border-gray-200 my-6">${formatted}</div>`;
    }
    
    // Handle pricing information
    if (trimmed.includes('**Pricing**:')) {
      const formatted = trimmed.replace(/\*\*Pricing\*\*:/g, '<span class="font-semibold text-blue-700">💰 Pricing:</span>');
      return `<p class="text-gray-700 leading-relaxed mb-4 bg-blue-50 p-4 rounded-lg border border-blue-200">${formatted}</p>`;
    }
    
    // Handle user reviews
    if (trimmed.includes('**Real User Review**:')) {
      const formatted = trimmed
        .replace(/\*\*Real User Review\*\*:/g, '')
        .replace(/"/g, '"')
        .trim();
      return `<blockquote class="border-l-4 border-purple-500 bg-purple-50 p-6 my-6 rounded-r-lg">
        <p class="text-gray-700 italic leading-relaxed mb-3">${formatted}</p>
      </blockquote>`;
    }
    
    // Handle adoption scores
    if (trimmed.includes('Adoption Score:')) {
      const score = trimmed.match(/(\d+\.\d+)\/10/)?.[1];
      const scoreColor = score && parseFloat(score) >= 8.5 ? 'text-green-600' : 
                        score && parseFloat(score) >= 7.5 ? 'text-yellow-600' : 'text-red-600';
      return `<div class="text-center my-4">
        <span class="inline-block bg-gray-100 px-4 py-2 rounded-full">
          <span class="font-semibold text-gray-700">Adoption Score: </span>
          <span class="font-bold ${scoreColor} text-lg">${trimmed.replace('Adoption Score: ', '')}</span>
        </span>
      </div>`;
    }
    
    // Handle special callout boxes
    if (trimmed.includes('**Problem**:') || trimmed.includes('**Solution**:')) {
      const formatted = trimmed
        .replace(/\*\*Problem\*\*:/g, '<span class="font-semibold text-red-700">⚠️ Problem:</span>')
        .replace(/\*\*Solution\*\*:/g, '<span class="font-semibold text-green-700">✅ Solution:</span>');
      return `<div class="bg-yellow-50 border border-yellow-200 p-6 rounded-lg my-6">${formatted}</div>`;
    }
    
    // Handle regular paragraphs with inline formatting
    if (trimmed.length > 0) {
      let formatted = trimmed
        // Bold text
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
        // Italic text  
        .replace(/\*(.*?)\*/g, '<em class="italic text-gray-700">$1</em>')
        // Line breaks
        .replace(/\n/g, '<br/>');
      
      // Check if it's a standalone statistic or important statement
      if (formatted.includes('%') || formatted.includes('$') || formatted.length < 100) {
        return `<p class="text-lg font-medium text-gray-800 leading-relaxed mb-6 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">${formatted}</p>`;
      }
      
      return `<p class="text-gray-700 leading-relaxed mb-6">${formatted}</p>`;
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
            
            <span className="inline-block bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-sm font-semibold px-3 py-1 rounded-full mb-6">
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
