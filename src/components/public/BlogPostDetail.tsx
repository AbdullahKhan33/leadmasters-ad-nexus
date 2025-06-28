
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

// Premium styling for all blog posts
const formatBlogContent = (content: string) => {
  const paragraphs = content.split('\n\n').filter(p => p.trim());
  
  return paragraphs.map(paragraph => {
    const trimmed = paragraph.trim();
    
    if (!trimmed) return '';
    
    // Main headings (##) - Bold and prominent
    if (trimmed.startsWith('## ')) {
      return `<h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mt-16 mb-8 leading-tight bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">${trimmed.replace('## ', '')}</h2>`;
    }
    
    // Sub-headings (###) - Elegant and spaced
    if (trimmed.startsWith('### ')) {
      return `<h3 class="text-2xl lg:text-3xl font-semibold text-gray-800 mt-12 mb-6 leading-tight">${trimmed.replace('### ', '')}</h3>`;
    }
    
    // Smaller headings (####) - Clean and modern
    if (trimmed.startsWith('#### ')) {
      return `<h4 class="text-xl lg:text-2xl font-semibold text-gray-700 mt-10 mb-5 leading-snug">${trimmed.replace('#### ', '')}</h4>`;
    }
    
    // Single line headings (#) - Hero style
    if (trimmed.startsWith('# ') && !trimmed.includes('\n')) {
      return `<h1 class="text-4xl lg:text-5xl font-bold text-gray-900 mt-12 mb-10 leading-tight bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">${trimmed.replace('# ', '')}</h1>`;
    }
    
    // Bullet points - Styled with better spacing
    if (trimmed.includes('\n- ') || trimmed.includes('\n* ') || trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const listItems = trimmed.split('\n').filter(line => {
        const cleaned = line.trim();
        return cleaned.startsWith('- ') || cleaned.startsWith('* ');
      }).map(item => {
        const cleanItem = item.replace(/^[\-\*]\s/, '').trim();
        return `<li class="mb-4 text-gray-700 leading-relaxed pl-2">${cleanItem}</li>`;
      }).join('');
      return `<ul class="list-disc list-inside space-y-3 my-8 ml-6 bg-gray-50 p-6 rounded-xl border-l-4 border-purple-500">${listItems}</ul>`;
    }
    
    // Checkmarks (✅) - Premium card style
    if (trimmed.includes('✅')) {
      const items = trimmed.split('\n').filter(line => line.includes('✅'));
      const listItems = items.map(item => {
        const cleanItem = item.replace('✅', '').trim();
        return `<li class="flex items-start space-x-4 mb-5 p-4 bg-green-50 rounded-lg border border-green-200">
          <span class="text-green-600 text-xl flex-shrink-0 mt-1">✅</span>
          <span class="text-gray-800 leading-relaxed">${cleanItem}</span>
        </li>`;
      }).join('');
      return `<ul class="space-y-4 my-10">${listItems}</ul>`;
    }
    
    // Regular paragraphs - Enhanced typography
    let formatted = trimmed
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900 bg-yellow-100 px-1 rounded">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-purple-700 font-medium">$1</em>')
      .replace(/\n/g, '<br/>');
    
    return `<p class="text-lg text-gray-700 leading-relaxed mb-8 font-light tracking-wide">${formatted}</p>`;
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

  // For posts without full content, show a styled placeholder
  if (!content) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <PublicHeader />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Button 
            variant="ghost" 
            className="mb-12 hover:bg-purple-50 text-purple-600 hover:text-purple-700 font-medium"
            onClick={() => navigate('/blog')}
          >
            <ArrowLeft className="w-5 h-5 mr-3" />
            Back to Blog
          </Button>

          <article className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
            <div className="mb-12">
              <div className="flex items-center space-x-6 text-sm text-gray-500 mb-8">
                <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full">
                  <User className="w-4 h-4" />
                  <span className="font-medium">{post.author}</span>
                </div>
                <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
              
              <span className="inline-block bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-sm font-bold px-4 py-2 rounded-full mb-8 shadow-sm">
                {post.category}
              </span>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                {post.title}
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed font-light">
                {post.excerpt}
              </p>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-8 mb-8 shadow-sm">
              <h3 class="text-2xl font-bold text-yellow-800 mb-4 flex items-center">
                <span class="text-3xl mr-3">🚀</span>
                Content Coming Soon!
              </h3>
              <p class="text-lg text-yellow-700 leading-relaxed">
                We're crafting exceptional content for this article with actionable insights and proven strategies. Check back soon!
              </p>
            </div>
          </article>
        </main>
        <PublicFooter />
      </div>
    );
  }

  const formattedContent = formatBlogContent(content.content);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <PublicHeader />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button 
          variant="ghost" 
          className="mb-12 hover:bg-purple-50 text-purple-600 hover:text-purple-700 font-medium shadow-sm"
          onClick={() => navigate('/blog')}
        >
          <ArrowLeft className="w-5 h-5 mr-3" />
          Back to Blog
        </Button>

        <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-8 lg:p-12 text-white">
            <div className="flex flex-wrap items-center gap-4 text-sm mb-8 opacity-90">
              <div className="flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full">
                <User className="w-4 h-4" />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
            
            <span className="inline-block bg-white/20 text-white text-sm font-bold px-4 py-2 rounded-full mb-8">
              {post.category}
            </span>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              {content.title}
            </h1>
          </div>

          <div 
            className="prose prose-lg max-w-none p-8 lg:p-12 bg-white"
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
