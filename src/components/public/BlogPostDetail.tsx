
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

// Enhanced styling for premium blog post appearance
const formatBlogContent = (content: string) => {
  const paragraphs = content.split('\n\n').filter(p => p.trim());
  
  return paragraphs.map((paragraph, index) => {
    const trimmed = paragraph.trim();
    
    if (!trimmed) return '';
    
    // Main headings (##) - Dual-colored and prominent
    if (trimmed.startsWith('## ')) {
      const headingText = trimmed.replace('## ', '');
      const words = headingText.split(' ');
      const firstHalf = words.slice(0, Math.ceil(words.length / 2)).join(' ');
      const secondHalf = words.slice(Math.ceil(words.length / 2)).join(' ');
      
      return `<div key="${index}" className="my-12">
        <h2 className="text-3xl lg:text-4xl font-bold leading-tight mb-6">
          <span className="text-purple-600">${firstHalf}</span>
          <span className="text-pink-500 ml-2">${secondHalf}</span>
        </h2>
      </div>`;
    }
    
    // Sub-headings (###) - Clean and structured
    if (trimmed.startsWith('### ')) {
      const headingText = trimmed.replace('### ', '');
      return `<div key="${index}" className="my-10">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-l-4 border-purple-500 pl-4 bg-gray-50 py-3 rounded-r-lg">
          ${headingText}
        </h3>
      </div>`;
    }
    
    // Smaller headings (####) - Accent styling
    if (trimmed.startsWith('#### ')) {
      const headingText = trimmed.replace('#### ', '');
      return `<div key="${index}" className="my-8">
        <h4 className="text-xl font-semibold text-purple-700 mb-3 flex items-center">
          <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
          ${headingText}
        </h4>
      </div>`;
    }
    
    // Hero headings (#) - Dual-colored main titles
    if (trimmed.startsWith('# ') && !trimmed.includes('\n')) {
      const headingText = trimmed.replace('# ', '');
      const words = headingText.split(' ');
      const firstHalf = words.slice(0, Math.ceil(words.length / 2)).join(' ');
      const secondHalf = words.slice(Math.ceil(words.length / 2)).join(' ');
      
      return `<div key="${index}" className="my-16 text-center">
        <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-8">
          <span className="text-purple-600">${firstHalf}</span>
          <span className="text-pink-500 ml-2">${secondHalf}</span>
        </h1>
      </div>`;
    }
    
    // Enhanced bullet points with better spacing
    if (trimmed.includes('\n- ') || trimmed.includes('\n* ') || trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const listItems = trimmed.split('\n').filter(line => {
        const cleaned = line.trim();
        return cleaned.startsWith('- ') || cleaned.startsWith('* ');
      }).map((item, itemIndex) => {
        const cleanItem = item.replace(/^[\-\*]\s/, '').trim();
        return `<li key="${itemIndex}" className="flex items-start mb-4">
          <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-4 flex-shrink-0"></span>
          <span className="text-gray-700 leading-relaxed">${cleanItem}</span>
        </li>`;
      }).join('');
      
      return `<div key="${index}" className="my-8">
        <ul className="space-y-2 bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
          ${listItems}
        </ul>
      </div>`;
    }
    
    // Premium checkmark styling
    if (trimmed.includes('✅')) {
      const items = trimmed.split('\n').filter(line => line.includes('✅'));
      const listItems = items.map((item, itemIndex) => {
        const cleanItem = item.replace('✅', '').trim();
        return `<div key="${itemIndex}" className="flex items-start space-x-4 mb-4 p-4 bg-green-50 rounded-lg border border-green-200 hover:shadow-sm transition-shadow">
          <span className="text-green-600 text-xl flex-shrink-0">✅</span>
          <span className="text-gray-800 leading-relaxed">${cleanItem}</span>
        </div>`;
      }).join('');
      
      return `<div key="${index}" className="my-10 space-y-4">${listItems}</div>`;
    }
    
    // Enhanced paragraph styling with better typography
    let formatted = trimmed
      .replace(/\*\*(.*?)\*\*/g, '<span className="font-bold text-gray-900 bg-yellow-100 px-2 py-1 rounded">$1</span>')
      .replace(/\*(.*?)\*/g, '<span className="italic text-purple-700 font-medium">$1</span>')
      .replace(/\n/g, '<br/>');
    
    // Different styling for intro paragraphs vs regular content
    const isIntro = index < 3;
    const paragraphClass = isIntro 
      ? "text-xl text-gray-600 leading-relaxed mb-8 font-light tracking-wide border-l-4 border-purple-200 pl-6 bg-gradient-to-r from-purple-50/50 to-transparent py-4 rounded-r-lg"
      : "text-lg text-gray-700 leading-relaxed mb-6 tracking-wide";
    
    return `<p key="${index}" className="${paragraphClass}">${formatted}</p>`;
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
              <h3 className="text-2xl font-bold text-yellow-800 mb-4 flex items-center">
                <span className="text-3xl mr-3">🚀</span>
                Content Coming Soon!
              </h3>
              <p className="text-lg text-yellow-700 leading-relaxed">
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

  // Split title for dual color effect
  const titleWords = content.title.split(' ');
  const titleFirstHalf = titleWords.slice(0, Math.ceil(titleWords.length / 2)).join(' ');
  const titleSecondHalf = titleWords.slice(Math.ceil(titleWords.length / 2)).join(' ');

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
              <span className="text-white">{titleFirstHalf}</span>
              <span className="text-yellow-300 ml-2">{titleSecondHalf}</span>
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
