
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
    // Comprehensive blog posts data with rich content
    const blogPosts = {
      'generate-100-leads-30-days': {
        id: 'generate-100-leads-30-days',
        title: "How to Generate 100 Leads in 30 Days (Without Spending a Fortune)",
        content: `
          <div class="prose prose-lg max-w-none">
            <p class="text-xl text-gray-700 mb-8 leading-relaxed">Lead generation doesn't have to break the bank. In this comprehensive guide, we'll walk you through the exact step-by-step blueprint we use to help small businesses consistently generate qualified leads using AI-powered marketing strategies.</p>
            
            <h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">The 30-Day Lead Generation Framework</h2>
            <p class="text-gray-700 mb-6 leading-relaxed">Our proven framework focuses on three core pillars: content marketing, social media automation, and email nurturing. By combining these elements with AI tools, you can create a lead generation machine that works around the clock.</p>
            
            <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-8 my-8 border border-purple-100">
              <h3 class="text-2xl font-bold text-purple-900 mb-4">📊 What You'll Achieve</h3>
              <ul class="space-y-3 text-gray-700">
                <li class="flex items-center"><span class="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>100+ qualified leads in 30 days</li>
                <li class="flex items-center"><span class="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>50% reduction in cost per lead</li>
                <li class="flex items-center"><span class="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>24/7 automated lead generation</li>
              </ul>
            </div>
            
            <h3 class="text-2xl font-bold text-gray-900 mt-10 mb-6">Week 1: Foundation Setup</h3>
            <p class="text-gray-700 mb-6 leading-relaxed">Start by setting up your lead magnets and capture forms. Create valuable content that your target audience actually wants - this could be a free guide, checklist, or mini-course related to your industry.</p>
            
            <h3 class="text-2xl font-bold text-gray-900 mt-10 mb-6">Week 2: Content Amplification</h3>
            <p class="text-gray-700 mb-6 leading-relaxed">Use AI tools to create and distribute content across multiple platforms. Focus on platforms where your audience is most active, whether that's LinkedIn, Facebook, or industry-specific forums.</p>
            
            <h3 class="text-2xl font-bold text-gray-900 mt-10 mb-6">Week 3: Automation Implementation</h3>
            <p class="text-gray-700 mb-6 leading-relaxed">Set up automated email sequences and social media posting. This is where the magic happens - your lead generation continues even while you sleep.</p>
            
            <h3 class="text-2xl font-bold text-gray-900 mt-10 mb-6">Week 4: Optimization and Scaling</h3>
            <p class="text-gray-700 mb-8 leading-relaxed">Analyze your results and optimize what's working. Double down on the channels and content types that are generating the most qualified leads.</p>
            
            <div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white my-12">
              <h3 class="text-2xl font-bold mb-4">🚀 Ready to Get Started?</h3>
              <p class="text-blue-100 mb-6">Contact our team to learn how LeadMasters.ai can automate this entire process for your business.</p>
              <button class="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">Get Your Free Strategy Call</button>
            </div>
          </div>
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
          <div class="prose prose-lg max-w-none">
            <p class="text-xl text-gray-700 mb-8 leading-relaxed">Artificial Intelligence is no longer just for tech giants. Small businesses can now leverage powerful AI tools to compete with larger companies and streamline their operations. Here are the essential AI tools that every small business should consider in 2025.</p>
            
            <div class="grid md:grid-cols-2 gap-6 my-12">
              <div class="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 class="text-xl font-bold text-gray-900 mb-3">💬 1. ChatGPT for Content Creation</h3>
                <p class="text-gray-600">Use ChatGPT to create blog posts, social media content, email campaigns, and more. It's like having a writing assistant available 24/7.</p>
              </div>
              
              <div class="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 class="text-xl font-bold text-gray-900 mb-3">🎨 2. Canva AI for Design</h3>
                <p class="text-gray-600">Create professional graphics, presentations, and marketing materials without hiring a designer. Canva's AI features make design accessible to everyone.</p>
              </div>
              
              <div class="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl border border-purple-200 p-6 shadow-sm">
                <h3 class="text-xl font-bold text-purple-900 mb-3">🎯 3. LeadMasters.ai for Lead Generation</h3>
                <p class="text-purple-700">Automate your lead generation process with AI-powered campaigns that identify and nurture potential customers while you focus on closing deals.</p>
              </div>
              
              <div class="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 class="text-xl font-bold text-gray-900 mb-3">📅 4. Calendly for Scheduling</h3>
                <p class="text-gray-600">Let AI handle your appointment scheduling, reducing back-and-forth emails and ensuring you never miss a potential client meeting.</p>
              </div>
            </div>
            
            <h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">Advanced AI Tools for Growth</h2>
            
            <div class="space-y-6">
              <div class="border-l-4 border-blue-500 pl-6">
                <h3 class="text-xl font-bold text-gray-900 mb-2">5. HubSpot's AI Tools</h3>
                <p class="text-gray-700">Use AI-powered CRM features to score leads, predict customer behavior, and automate follow-up sequences.</p>
              </div>
              
              <div class="border-l-4 border-green-500 pl-6">
                <h3 class="text-xl font-bold text-gray-900 mb-2">6. Jasper AI for Marketing Copy</h3>
                <p class="text-gray-700">Generate high-converting marketing copy, product descriptions, and ad content in minutes instead of hours.</p>
              </div>
              
              <div class="border-l-4 border-purple-500 pl-6">
                <h3 class="text-xl font-bold text-gray-900 mb-2">7. Zapier for Automation</h3>
                <p class="text-gray-700">Connect your apps and automate workflows without coding. Save hours of manual work every week.</p>
              </div>
            </div>
            
            <div class="bg-yellow-50 border border-yellow-200 rounded-xl p-8 my-12">
              <h3 class="text-2xl font-bold text-yellow-900 mb-4">⚡ Pro Tip</h3>
              <p class="text-yellow-800">The key is to start small and gradually integrate these tools into your workflow. Don't try to implement everything at once - choose one or two tools that address your biggest pain points first.</p>
            </div>
          </div>
        `,
        author: "Marketing Team",
        date: "Jan 12, 2025",
        readTime: "5 min read",
        category: "AI Tools"
      },
      'whatsapp-marketing-secret-weapon': {
        id: 'whatsapp-marketing-secret-weapon',
        title: "WhatsApp Marketing: The Secret Weapon for Local Businesses",
        content: `
          <div class="prose prose-lg max-w-none">
            <p class="text-xl text-gray-700 mb-8 leading-relaxed">With over 2 billion users worldwide, WhatsApp has become the ultimate marketing channel for local businesses. Learn how smart business owners are using WhatsApp to build relationships, nurture leads, and close more sales than ever before.</p>
            
            <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 my-8 border border-green-200">
              <h3 class="text-2xl font-bold text-green-900 mb-4">📱 Why WhatsApp Works</h3>
              <ul class="space-y-3 text-green-800">
                <li class="flex items-center"><span class="text-2xl mr-3">✅</span>98% open rate (vs 20% for email)</li>
                <li class="flex items-center"><span class="text-2xl mr-3">✅</span>Personal, intimate communication</li>
                <li class="flex items-center"><span class="text-2xl mr-3">✅</span>Instant customer support</li>
                <li class="flex items-center"><span class="text-2xl mr-3">✅</span>Rich media sharing capabilities</li>
              </ul>
            </div>
            
            <h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">Setting Up WhatsApp Business</h2>
            <p class="text-gray-700 mb-6 leading-relaxed">WhatsApp Business is free and provides essential features like business profiles, automated messages, and customer labels. Here's how to set it up for maximum impact.</p>
            
            <div class="grid md:grid-cols-3 gap-6 my-10">
              <div class="text-center p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
                <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span class="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h4 class="font-bold text-gray-900 mb-2">Download & Setup</h4>
                <p class="text-gray-600 text-sm">Install WhatsApp Business and create your business profile with logo, description, and contact info.</p>
              </div>
              
              <div class="text-center p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
                <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span class="text-2xl font-bold text-purple-600">2</span>
                </div>
                <h4 class="font-bold text-gray-900 mb-2">Configure Automation</h4>
                <p class="text-gray-600 text-sm">Set up welcome messages, away messages, and quick replies for common questions.</p>
              </div>
              
              <div class="text-center p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
                <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span class="text-2xl font-bold text-green-600">3</span>
                </div>
                <h4 class="font-bold text-gray-900 mb-2">Start Engaging</h4>
                <p class="text-gray-600 text-sm">Begin conversations with your customers and provide value through helpful content.</p>
              </div>
            </div>
            
            <h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">Advanced WhatsApp Strategies</h2>
            
            <div class="space-y-8">
              <div class="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
                <h3 class="text-xl font-bold text-gray-900 mb-4">🎯 Broadcast Lists for Promotions</h3>
                <p class="text-gray-700 mb-4">Create targeted broadcast lists to send personalized promotions to different customer segments without creating group chats.</p>
                <div class="bg-gray-50 rounded-lg p-4">
                  <p class="text-sm text-gray-600 italic">"Hey Sarah! 🌟 As one of our VIP customers, you get early access to our new product launch. Check it out: [link]"</p>
                </div>
              </div>
              
              <div class="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
                <h3 class="text-xl font-bold text-gray-900 mb-4">📸 Rich Media Content</h3>
                <p class="text-gray-700 mb-4">Share product videos, behind-the-scenes content, customer testimonials, and tutorial content to build trust and engagement.</p>
              </div>
              
              <div class="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
                <h3 class="text-xl font-bold text-gray-900 mb-4">🤖 Chatbot Integration</h3>
                <p class="text-gray-700 mb-4">Use WhatsApp Business API with chatbots to handle common inquiries, book appointments, and qualify leads automatically.</p>
              </div>
            </div>
            
            <div class="bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl p-8 text-white my-12">
              <h3 class="text-2xl font-bold mb-4">🚀 Ready to Scale Your WhatsApp Marketing?</h3>
              <p class="text-purple-100 mb-6">LeadMasters.ai can help you automate and scale your WhatsApp marketing efforts. Get started today!</p>
              <button class="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">Start Your Free Trial</button>
            </div>
          </div>
        `,
        author: "Growth Team",
        date: "Jan 18, 2025",
        readTime: "7 min read",
        category: "WhatsApp Marketing"
      }
    };

    // Get the post data or create a default post
    const postData = blogPosts[slug] || {
      id: slug,
      title: `Blog Post: ${slug?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`,
      content: `
        <div class="prose prose-lg max-w-none">
          <p class="text-xl text-gray-700 mb-8 leading-relaxed">This is a sample blog post about ${slug?.replace(/-/g, ' ')}. In a real application, this content would be fetched from your content management system or database.</p>
          
          <h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">Introduction</h2>
          <p class="text-gray-700 mb-6 leading-relaxed">Welcome to this comprehensive guide where we explore the topic in detail and provide actionable insights for your business.</p>
          
          <div class="bg-blue-50 rounded-xl p-8 my-8 border border-blue-200">
            <h3 class="text-2xl font-bold text-blue-900 mb-4">Key Takeaways</h3>
            <ul class="space-y-3 text-blue-800">
              <li class="flex items-center"><span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>Practical strategies you can implement immediately</li>
              <li class="flex items-center"><span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>Real-world examples and case studies</li>
              <li class="flex items-center"><span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>Step-by-step implementation guide</li>
            </ul>
          </div>
          
          <h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">Conclusion</h2>
          <p class="text-gray-700 mb-8 leading-relaxed">We hope you found this article helpful. For more insights and strategies, explore our other blog posts or contact our team.</p>
        </div>
      `,
      author: "LeadMasters Team",
      date: "Jan 1, 2025",
      readTime: "5 min read",
      category: "Business Growth"
    };

    setPost(postData);
  }, [slug]);

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
            <Button variant="ghost" onClick={() => navigate('/blog')} className="text-purple-600 hover:text-purple-700 hover:bg-purple-50">
              <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
              Back to Blog
            </Button>
          </div>

          <header className="mb-12">
            <div className="mb-6">
              <span className="inline-block bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-sm font-semibold px-4 py-2 rounded-full border border-purple-200">
                {post.category}
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center space-x-6 text-gray-500 pb-8 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </header>

          <article className="mb-16">
            <div 
              className="text-gray-700 leading-relaxed blog-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          {/* Related Articles */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">Continue Reading</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div 
                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 cursor-pointer hover:shadow-lg transition-all duration-300 border border-purple-100"
                onClick={() => navigate('/blog/ai-tools-small-business-2024')}
              >
                <div className="mb-4">
                  <span className="inline-block bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    AI Tools
                  </span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">10 AI Tools Every Small Business Should Use</h4>
                <p className="text-gray-600 text-sm mb-4">Discover the essential AI tools that are transforming how small businesses operate and grow.</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>5 min read</span>
                </div>
              </div>
              <div 
                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 cursor-pointer hover:shadow-lg transition-all duration-300 border border-green-100"
                onClick={() => navigate('/blog/whatsapp-marketing-secret-weapon')}
              >
                <div className="mb-4">
                  <span className="inline-block bg-gradient-to-r from-green-600 to-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    WhatsApp Marketing
                  </span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">WhatsApp Marketing Guide</h4>
                <p className="text-gray-600 text-sm mb-4">Learn how to leverage WhatsApp Business to connect with customers and drive sales.</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>7 min read</span>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter CTA */}
          <div className="mt-16 bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl p-8 lg:p-12 text-white text-center">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">Never Miss a Growth Opportunity</h3>
            <p className="text-purple-100 mb-8 text-lg max-w-2xl mx-auto">
              Get our latest insights, strategies, and case studies delivered straight to your inbox. Join 1,000+ business owners who rely on our weekly newsletter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border-0 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 font-semibold">
                Subscribe Free
              </Button>
            </div>
            <p className="text-xs text-purple-200 mt-4">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
