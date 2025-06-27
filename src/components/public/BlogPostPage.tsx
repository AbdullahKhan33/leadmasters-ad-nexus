
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PublicHeader } from './PublicHeader';
import { PublicFooter } from './PublicFooter';
import { ArrowLeft, Calendar, User, Clock, Share2, BookOpen, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function BlogPostPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Mock blog data - in a real app, this would come from an API
  const blogPosts = {
    'generate-100-leads-30-days': {
      title: "How to Generate 100 Leads in 30 Days (Without Spending a Fortune)",
      excerpt: "The exact step-by-step blueprint we use to help small businesses consistently generate qualified leads using AI-powered marketing strategies.",
      author: "LeadMasters Team",
      date: "Dec 20, 2024",
      readTime: "8 min read",
      category: "Lead Generation",
      content: `
        <p>Lead generation doesn't have to break the bank. In fact, some of the most effective lead generation strategies cost very little to implement. The key is knowing exactly what to do and when to do it.</p>
        
        <h2>The 30-Day Lead Generation Blueprint</h2>
        
        <p>Over the past year, we've helped hundreds of small businesses implement this exact system. The results? An average of 127 new leads per month, with some businesses seeing over 300 leads in their first 30 days.</p>
        
        <h3>Week 1: Foundation Setting</h3>
        <p>Before diving into tactics, you need a solid foundation. This means:</p>
        <ul>
          <li>Defining your ideal customer profile</li>
          <li>Creating compelling lead magnets</li>
          <li>Setting up your capture systems</li>
          <li>Establishing your follow-up sequences</li>
        </ul>
        
        <h3>Week 2: Content & Social Media</h3>
        <p>Content marketing remains one of the most cost-effective ways to generate leads. Here's what works:</p>
        <ul>
          <li>Daily valuable posts on LinkedIn and Facebook</li>
          <li>Weekly blog posts addressing customer pain points</li>
          <li>Video content showing your expertise</li>
          <li>Engaging with your audience consistently</li>
        </ul>
        
        <h3>Week 3: Paid Advertising (Smart Spending)</h3>
        <p>You don't need a huge budget for effective paid advertising. Start with:</p>
        <ul>
          <li>$10/day Facebook ads targeting warm audiences</li>
          <li>Google Ads for high-intent keywords</li>
          <li>LinkedIn ads for B2B businesses</li>
          <li>Retargeting campaigns for website visitors</li>
        </ul>
        
        <h3>Week 4: Optimization & Scaling</h3>
        <p>The final week is all about doubling down on what works:</p>
        <ul>
          <li>Analyze your best-performing content</li>
          <li>Increase budget on profitable ad campaigns</li>
          <li>Refine your targeting based on data</li>
          <li>Implement automated follow-up sequences</li>
        </ul>
        
        <h2>Real Results from Real Businesses</h2>
        <p>Sarah from Golden Dragon Cuisine followed this blueprint and generated 89 leads in her first month, leading to a 340% increase in takeout orders. Marcus, a fitness coach, went from 12 leads per month to 156 leads, directly resulting in 23 new clients.</p>
        
        <h2>Your Next Steps</h2>
        <p>The blueprint works, but only if you implement it consistently. Start with Week 1 today, and by this time next month, you'll have a steady stream of qualified leads flowing into your business.</p>
        
        <p>Remember: lead generation is a marathon, not a sprint. Focus on building systems that work long-term, not quick fixes that disappear.</p>
      `
    },
    'ai-tools-small-business-2024': {
      title: "5 AI Tools Every Small Business Should Use in 2024",
      excerpt: "Discover the essential AI tools that are transforming how small businesses operate, compete, and grow in today's digital landscape.",
      author: "Marketing Team",
      date: "Dec 18, 2024",
      readTime: "5 min read",
      category: "AI Tools",
      content: `
        <p>Artificial Intelligence isn't just for tech giants anymore. Small businesses are leveraging AI to compete with larger companies and streamline their operations like never before.</p>
        
        <h2>1. ChatGPT for Content Creation</h2>
        <p>Every small business needs content, but not every business owner has time to write. ChatGPT can help you:</p>
        <ul>
          <li>Write engaging social media posts</li>
          <li>Create email marketing campaigns</li>
          <li>Generate blog post ideas and outlines</li>
          <li>Craft compelling product descriptions</li>
        </ul>
        
        <h2>2. Canva's AI Design Tools</h2>
        <p>Professional design without a professional designer. Canva's AI features include:</p>
        <ul>
          <li>Magic Resize for multiple platform formats</li>
          <li>Background Remover for product photos</li>
          <li>Text-to-Image generation for unique visuals</li>
          <li>Brand Kit suggestions based on your industry</li>
        </ul>
        
        <h2>3. Zapier for Automation</h2>
        <p>Connect your apps and automate repetitive tasks:</p>
        <ul>
          <li>Automatically add new leads to your CRM</li>
          <li>Send welcome emails to new subscribers</li>
          <li>Create calendar events from form submissions</li>
          <li>Post content across multiple social platforms</li>
        </ul>
        
        <h2>4. Grammarly Business</h2>
        <p>Professional communication makes a difference:</p>
        <ul>
          <li>Error-free emails and documents</li>
          <li>Tone suggestions for different audiences</li>
          <li>Brand voice consistency across team</li>
          <li>Plagiarism detection for content</li>
        </ul>
        
        <h2>5. LeadMasters.ai (We Had To!)</h2>
        <p>Purpose-built for small business marketing:</p>
        <ul>
          <li>AI-powered ad creation in minutes</li>
          <li>Automated lead follow-up sequences</li>
          <li>Smart audience targeting suggestions</li>
          <li>Performance analytics and optimization</li>
        </ul>
        
        <h2>Getting Started</h2>
        <p>Don't try to implement all tools at once. Start with one that addresses your biggest pain point, master it, then gradually add others to your toolkit.</p>
        
        <p>The businesses that thrive in 2024 will be those that embrace AI not as a replacement for human creativity, but as an amplifier of it.</p>
      `
    }
  };

  const currentPost = blogPosts[slug as keyof typeof blogPosts];

  if (!currentPost) {
    return (
      <div className="min-h-screen bg-white">
        <PublicHeader />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/blog')} className="bg-purple-600 hover:bg-purple-700 text-white">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Blog
          </Button>
        </div>
        <PublicFooter />
      </div>
    );
  }

  const relatedPosts = [
    {
      id: 'whatsapp-marketing-secret-weapon',
      title: "WhatsApp Marketing: The Secret Weapon for Local Businesses",
      category: "WhatsApp Marketing",
      readTime: "7 min read"
    },
    {
      id: 'facebook-ads-optimization-guide',
      title: "Facebook Ads Optimization: 7 Tactics That Actually Work",
      category: "Marketing Automation",
      readTime: "9 min read"
    },
    {
      id: 'marketing-automation-beginners',
      title: "Marketing Automation for Beginners: Start Here",
      category: "Marketing Automation",
      readTime: "6 min read"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/blog')}
              className="mb-8 text-purple-600 hover:text-purple-700 hover:bg-purple-50"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Blog
            </Button>
            
            <div className="mb-6">
              <span className="inline-block bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-semibold px-4 py-2 rounded-full mb-4">
                {currentPost.category}
              </span>
            </div>
            
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {currentPost.title}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {currentPost.excerpt}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>{currentPost.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{currentPost.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{currentPost.readTime}</span>
              </div>
              <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <div 
                dangerouslySetInnerHTML={{ __html: currentPost.content }}
                className="text-gray-700 leading-relaxed [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-gray-900 [&>h2]:mt-8 [&>h2]:mb-4 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-gray-900 [&>h3]:mt-6 [&>h3]:mb-3 [&>p]:mb-4 [&>ul]:mb-4 [&>ul]:pl-6 [&>li]:mb-2 [&>li]:list-disc"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-gradient-to-r from-purple-600 to-pink-500">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Put This Into Action?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Stop reading about growth and start experiencing it. Our AI-powered platform makes it easy to implement everything you just learned.
            </p>
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-3">
              Start Your Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </section>

        {/* Related Posts */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full mb-4">
                <TrendingUp className="w-4 h-4 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-blue-700">Keep Learning</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Related Articles</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((post) => (
                <article 
                  key={post.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
                  onClick={() => navigate(`/blog/${post.id}`)}
                >
                  <div className="p-6">
                    <span className="inline-block bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                      {post.category}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                      {post.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 group-hover:text-purple-600 transition-colors" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <PublicFooter />
    </div>
  );
}
