
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

const formatBlogContent = (content: string) => {
  const sections = content.split('\n\n').filter(p => p.trim());
  
  return sections.map((section, index) => {
    const trimmed = section.trim();
    
    if (!trimmed) return '';
    
    // Main title (# )
    if (trimmed.startsWith('# ') && !trimmed.includes('\n')) {
      const title = trimmed.replace('# ', '');
      return `
        <div key="${index}" className="mb-12 text-center">
          <h1 className="text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent leading-tight">
            ${title}
          </h1>
        </div>
      `;
    }
    
    // Italic subtitle
    if (trimmed.startsWith('*') && trimmed.endsWith('*') && !trimmed.includes('\n')) {
      const subtitle = trimmed.replace(/^\*/, '').replace(/\*$/, '');
      return `
        <div key="${index}" className="mb-16">
          <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed font-light text-center max-w-4xl mx-auto border-l-4 border-purple-300 pl-8 py-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-r-2xl shadow-sm">
            ${subtitle}
          </p>
        </div>
      `;
    }
    
    // Major headings (## )
    if (trimmed.startsWith('## ')) {
      const heading = trimmed.replace('## ', '');
      return `
        <div key="${index}" className="mb-12 mt-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-8 bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent leading-tight">
            ${heading}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-8"></div>
        </div>
      `;
    }
    
    // Sub-headings (### )
    if (trimmed.startsWith('### ')) {
      const heading = trimmed.replace('### ', '');
      return `
        <div key="${index}" className="mb-10 mt-12">
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6 border-l-6 border-purple-500 pl-6 py-4 bg-gradient-to-r from-purple-50 to-transparent rounded-r-xl shadow-sm">
            ${heading}
          </h3>
        </div>
      `;
    }
    
    // Smaller headings (#### )
    if (trimmed.startsWith('#### ')) {
      const heading = trimmed.replace('#### ', '');
      return `
        <div key="${index}" className="mb-8 mt-10">
          <h4 className="text-xl lg:text-2xl font-semibold text-purple-700 mb-4 flex items-center">
            <span className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-4"></span>
            ${heading}
          </h4>
        </div>
      `;
    }
    
    // Lists with bullet points
    if (trimmed.includes('\n- ') || trimmed.includes('\n* ') || trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const listItems = trimmed.split('\n').filter(line => {
        const cleaned = line.trim();
        return cleaned.startsWith('- ') || cleaned.startsWith('* ');
      }).map((item, itemIndex) => {
        const cleanItem = item.replace(/^[\-\*]\s/, '').trim();
        return `
          <li key="${itemIndex}" className="flex items-start mb-4 group">
            <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-3 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform"></span>
            <span className="text-gray-700 leading-relaxed text-lg">${cleanItem}</span>
          </li>
        `;
      }).join('');
      
      return `
        <div key="${index}" className="mb-10">
          <ul className="space-y-2 bg-gradient-to-br from-purple-50 via-white to-pink-50 p-8 rounded-2xl border border-purple-100 shadow-lg">
            ${listItems}
          </ul>
        </div>
      `;
    }
    
    // Bold sections (**text**)
    if (trimmed.startsWith('**') && trimmed.endsWith('**') && !trimmed.includes('\n')) {
      const boldText = trimmed.replace(/^\*\*/, '').replace(/\*\*$/, '');
      return `
        <div key="${index}" className="mb-8">
          <p className="text-xl lg:text-2xl font-bold text-gray-800 bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-xl border-l-4 border-yellow-400 shadow-sm">
            ${boldText}
          </p>
        </div>
      `;
    }
    
    // Regular paragraphs
    let formatted = trimmed
      .replace(/\*\*(.*?)\*\*/g, '<strong className="font-bold text-gray-900 bg-yellow-100 px-2 py-1 rounded-md">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em className="italic text-purple-700 font-medium">$1</em>')
      .replace(/\n/g, '<br/>');
    
    // Check if it's an intro paragraph (first few paragraphs)
    const isIntro = index < 4 && !trimmed.startsWith('#') && !trimmed.startsWith('*');
    
    if (isIntro) {
      return `
        <div key="${index}" className="mb-10">
          <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed font-light tracking-wide border-l-4 border-purple-300 pl-8 py-6 bg-gradient-to-r from-purple-50/70 to-pink-50/70 rounded-r-2xl shadow-sm">
            ${formatted}
          </p>
        </div>
      `;
    }
    
    return `
      <div key="${index}" className="mb-8">
        <p className="text-lg lg:text-xl text-gray-700 leading-relaxed tracking-wide mb-6">
          ${formatted}
        </p>
      </div>
    `;
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30">
      <PublicHeader />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button 
          variant="ghost" 
          className="mb-12 hover:bg-purple-100 text-purple-700 hover:text-purple-800 font-semibold transition-all duration-200 shadow-sm"
          onClick={() => navigate('/blog')}
        >
          <ArrowLeft className="w-5 h-5 mr-3" />
          Back to Blog
        </Button>

        <article className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-purple-100/50">
          {/* Hero Header */}
          <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 p-8 lg:p-16 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-4 text-sm mb-10 opacity-90">
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <User className="w-4 h-4" />
                  <span className="font-medium">{post.author}</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
              
              <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm font-bold px-6 py-3 rounded-full mb-10 border border-white/30">
                {post.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 lg:p-16 max-w-none">
            <div 
              className="prose prose-xl max-w-none"
              dangerouslySetInnerHTML={{ 
                __html: formattedContent
              }}
            />
          </div>
        </article>
      </main>
      <PublicFooter />
    </div>
  );
}
