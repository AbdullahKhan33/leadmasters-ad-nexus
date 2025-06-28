
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
      <div className="min-h-screen bg-gray-50">
        <PublicHeader />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button 
            variant="ghost" 
            className="mb-8 text-purple-600 hover:text-purple-700"
            onClick={() => navigate('/blog')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>

          <article className="bg-white rounded-lg shadow-sm p-8">
            <div className="mb-8">
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {post.author}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {post.date}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {post.readTime}
                </div>
              </div>
              
              <span className="inline-block bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full mb-4">
                {post.category}
              </span>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {post.title}
              </h1>
              
              <p className="text-lg text-gray-600">
                {post.excerpt}
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                Content Coming Soon!
              </h3>
              <p className="text-yellow-700">
                We're crafting exceptional content for this article. Check back soon!
              </p>
            </div>
          </article>
        </main>
        <PublicFooter />
      </div>
    );
  }

  const formatContent = (text: string) => {
    const lines = text.split('\n').filter(line => line.trim());
    
    return lines.map((line, index) => {
      const trimmedLine = line.trim();
      
      if (!trimmedLine) return null;
      
      // Main title
      if (trimmedLine.startsWith('# ')) {
        const title = trimmedLine.replace('# ', '');
        return (
          <h1 key={index} className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 leading-tight">
            {title}
          </h1>
        );
      }
      
      // Subtitle in italics
      if (trimmedLine.startsWith('*') && trimmedLine.endsWith('*')) {
        const subtitle = trimmedLine.slice(1, -1);
        return (
          <div key={index} className="mb-12 p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-l-4 border-purple-400 rounded-r-lg">
            <p className="text-xl text-gray-700 italic font-medium leading-relaxed">
              {subtitle}
            </p>
          </div>
        );
      }
      
      // Major headings
      if (trimmedLine.startsWith('## ')) {
        const heading = trimmedLine.replace('## ', '');
        return (
          <div key={index} className="mt-16 mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {heading}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
          </div>
        );
      }
      
      // Sub-headings
      if (trimmedLine.startsWith('### ')) {
        const heading = trimmedLine.replace('### ', '');
        return (
          <h3 key={index} className="text-2xl font-bold text-gray-800 mt-12 mb-6 border-l-4 border-purple-400 pl-4 bg-gray-50 py-3 rounded-r-lg">
            {heading}
          </h3>
        );
      }
      
      // Smaller headings
      if (trimmedLine.startsWith('#### ')) {
        const heading = trimmedLine.replace('#### ', '');
        return (
          <h4 key={index} className="text-xl font-semibold text-purple-700 mt-8 mb-4 flex items-center">
            <span className="w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
            {heading}
          </h4>
        );
      }
      
      // Bold standalone lines
      if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
        const boldText = trimmedLine.slice(2, -2);
        return (
          <div key={index} className="my-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
            <p className="text-lg font-bold text-gray-800">
              {boldText}
            </p>
          </div>
        );
      }
      
      // List items
      if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
        const listItem = trimmedLine.replace(/^[\-\*]\s/, '');
        return (
          <div key={index} className="flex items-start mb-3 ml-4">
            <span className="w-2 h-2 bg-purple-500 rounded-full mt-3 mr-4 flex-shrink-0"></span>
            <p className="text-gray-700 leading-relaxed">
              {listItem.replace(/\*\*(.*?)\*\*/g, '<strong className="font-semibold text-gray-900">$1</strong>')}
            </p>
          </div>
        );
      }
      
      // Regular paragraphs
      const formattedText = trimmedLine
        .replace(/\*\*(.*?)\*\*/g, '<strong className="font-semibold text-gray-900 bg-yellow-100 px-1 rounded">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em className="italic text-purple-700">$1</em>');
      
      return (
        <p 
          key={index} 
          className="text-gray-700 leading-relaxed mb-6 text-lg"
          dangerouslySetInnerHTML={{ __html: formattedText }}
        />
      );
    }).filter(element => element !== null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PublicHeader />
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button 
          variant="ghost" 
          className="mb-8 text-purple-600 hover:text-purple-700 hover:bg-purple-50"
          onClick={() => navigate('/blog')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Button>

        <article className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Hero Header */}
          <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 p-8 md:p-16 text-white relative">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-6 text-sm mb-8 opacity-90">
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
              
              <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm font-bold px-6 py-3 rounded-full mb-8 border border-white/30">
                {post.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-16">
            <div className="prose prose-lg max-w-none">
              {formatContent(content.content)}
            </div>
          </div>
        </article>
      </main>
      
      <PublicFooter />
    </div>
  );
}
