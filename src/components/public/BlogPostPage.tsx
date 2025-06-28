
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
    // Mock blog posts data - should match the data from BlogSection and BlogPage
    const blogPosts = {
      'generate-100-leads-30-days': {
        id: 'generate-100-leads-30-days',
        title: "How to Generate 100 Leads in 30 Days (Without Spending a Fortune)",
        content: `
          <p>Lead generation doesn't have to break the bank. In this comprehensive guide, we'll walk you through the exact step-by-step blueprint we use to help small businesses consistently generate qualified leads using AI-powered marketing strategies.</p>
          
          <h2>The 30-Day Lead Generation Framework</h2>
          <p>Our proven framework focuses on three core pillars: content marketing, social media automation, and email nurturing. By combining these elements with AI tools, you can create a lead generation machine that works around the clock.</p>
          
          <h3>Week 1: Foundation Setup</h3>
          <p>Start by setting up your lead magnets and capture forms. Create valuable content that your target audience actually wants - this could be a free guide, checklist, or mini-course related to your industry.</p>
          
          <h3>Week 2: Content Amplification</h3>
          <p>Use AI tools to create and distribute content across multiple platforms. Focus on platforms where your audience is most active, whether that's LinkedIn, Facebook, or industry-specific forums.</p>
          
          <h3>Week 3: Automation Implementation</h3>
          <p>Set up automated email sequences and social media posting. This is where the magic happens - your lead generation continues even while you sleep.</p>
          
          <h3>Week 4: Optimization and Scaling</h3>
          <p>Analyze your results and optimize what's working. Double down on the channels and content types that are generating the most qualified leads.</p>
          
          <p>Ready to implement this strategy? Contact our team to learn how LeadMasters.ai can automate this entire process for your business.</p>
        `,
        author: "LeadMasters Team",
        date: "Jan 15, 2025",
        readTime: "8 min read",
        category: "Lead Generation"
      },
      'ai-tools-small-business-2024': {
        id: 'ai-tools-small-business-2024',
        title: "10 AI Tools Every Small Business Should Use in 2025",
        content: `
          <p>Artificial Intelligence is no longer just for tech giants. Small businesses can now leverage powerful AI tools to compete with larger companies and streamline their operations. Here are the essential AI tools that every small business should consider in 2025.</p>
          
          <h2>1. ChatGPT for Content Creation</h2>
          <p>Use ChatGPT to create blog posts, social media content, email campaigns, and more. It's like having a writing assistant available 24/7.</p>
          
          <h2>2. Canva AI for Design</h2>
          <p>Create professional graphics, presentations, and marketing materials without hiring a designer. Canva's AI features make design accessible to everyone.</p>
          
          <h2>3. LeadMasters.ai for Lead Generation</h2>
          <p>Automate your lead generation process with AI-powered campaigns that identify and nurture potential customers while you focus on closing deals.</p>
          
          <h2>4. Calendly for Scheduling</h2>
          <p>Let AI handle your appointment scheduling, reducing back-and-forth emails and ensuring you never miss a potential client meeting.</p>
          
          <h2>5. HubSpot's AI Tools</h2>
          <p>Use AI-powered CRM features to score leads, predict customer behavior, and automate follow-up sequences.</p>
          
          <p>The key is to start small and gradually integrate these tools into your workflow. Don't try to implement everything at once - choose one or two tools that address your biggest pain points first.</p>
        `,
        author: "Marketing Team",
        date: "Jan 12, 2025",
        readTime: "5 min read",
        category: "AI Tools"
      }
    };

    // Get the post data or create a default post
    const postData = blogPosts[slug] || {
      id: slug,
      title: `Blog Post: ${slug?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`,
      content: `
        <p>This is a sample blog post about ${slug?.replace(/-/g, ' ')}. In a real application, this content would be fetched from your content management system or database.</p>
        
        <h2>Introduction</h2>
        <p>Welcome to this comprehensive guide where we explore the topic in detail and provide actionable insights for your business.</p>
        
        <h2>Key Takeaways</h2>
        <ul>
          <li>Practical strategies you can implement immediately</li>
          <li>Real-world examples and case studies</li>
          <li>Step-by-step implementation guide</li>
        </ul>
        
        <h2>Conclusion</h2>
        <p>We hope you found this article helpful. For more insights and strategies, explore our other blog posts or contact our team.</p>
      `,
      author: "LeadMasters Team",
      date: "Jan 1, 2025",
      readTime: "5 min read",
      category: "Business Growth"
    };

    setPost(postData);
  }, [slug]);

  // Add scroll to top effect when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    );
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
            <div className="mb-4">
              <span className="inline-block bg-purple-100 text-purple-700 text-sm font-semibold px-3 py-1 rounded-full">
                {post.category}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>
            <div className="flex items-center space-x-6 text-gray-500">
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

          <article className="prose prose-lg max-w-none">
            <div 
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          {/* Related Articles */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Continue Reading</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div 
                className="bg-gray-50 rounded-lg p-6 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => navigate('/blog/ai-tools-small-business-2024')}
              >
                <h4 className="font-semibold text-gray-900 mb-2">10 AI Tools Every Small Business Should Use</h4>
                <p className="text-gray-600 text-sm">Discover the essential AI tools that are transforming how small businesses operate and grow.</p>
              </div>
              <div 
                className="bg-gray-50 rounded-lg p-6 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => navigate('/blog/whatsapp-marketing-secret-weapon')}
              >
                <h4 className="font-semibold text-gray-900 mb-2">WhatsApp Marketing Guide</h4>
                <p className="text-gray-600 text-sm">Learn how to leverage WhatsApp Business to connect with customers and drive sales.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
