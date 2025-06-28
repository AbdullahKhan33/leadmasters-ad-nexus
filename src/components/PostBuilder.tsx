
import { useState, useEffect } from "react";
import { PostPlatformMenu } from "@/components/PostPlatformMenu";
import { FacebookPostBuilder } from "./FacebookPostBuilder";
import { InstagramPostBuilder } from "./InstagramPostBuilder";
import { TwitterPostBuilder } from "./TwitterPostBuilder";
import { LinkedInPostBuilder } from "./LinkedInPostBuilder";
import { ThreadsPostBuilder } from "./ThreadsPostBuilder";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  Upload,
  Image as ImageIcon,
  Video,
  FileText,
  Zap,
  Calendar,
  Send,
  Sparkles,
  Target,
  MessageCircle,
  Heart,
  Share,
  MoreHorizontal,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Bot,
  Loader2
} from "lucide-react";

type Platform = 'all' | 'facebook' | 'instagram' | 'threads' | 'twitter' | 'linkedin';
type PostType = 'post' | 'reel' | 'story';

export function PostBuilder() {
  const location = useLocation();
  const { toast } = useToast();
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('facebook');
  const [selectedPostType, setSelectedPostType] = useState<PostType>('post');
  const [postContent, setPostContent] = useState('');
  const [selectedTone, setSelectedTone] = useState('');
  const [selectedAudience, setSelectedAudience] = useState('');
  const [uploadedMedia, setUploadedMedia] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGeneratedContent, setHasGeneratedContent] = useState(false);

  // Handle pre-filled content from inspiration
  useEffect(() => {
    if (location.state) {
      const { prefilledContent, tone, platform } = location.state;
      if (prefilledContent) {
        setPostContent(prefilledContent);
        setHasGeneratedContent(true);
      }
      if (tone) {
        setSelectedTone(tone);
      }
      if (platform && platform !== 'google ads') {
        setSelectedPlatform(platform as Platform);
      }
    }
  }, [location.state]);

  console.log('PostBuilder rendered with platform:', selectedPlatform);

  // If specific platform is selected, show dedicated builder
  if (selectedPlatform === 'facebook') {
    console.log('Rendering FacebookPostBuilder');
    return (
      <div className="flex-1 flex flex-col min-h-screen">
        <PostPlatformMenu 
          activePlatform={selectedPlatform}
          onPlatformChange={(platformId) => setSelectedPlatform(platformId as Platform)}
        />
        <FacebookPostBuilder />
      </div>
    );
  }

  if (selectedPlatform === 'instagram') {
    console.log('Rendering InstagramPostBuilder');
    return (
      <div className="flex-1 flex flex-col min-h-screen">
        <PostPlatformMenu 
          activePlatform={selectedPlatform}
          onPlatformChange={(platformId) => setSelectedPlatform(platformId as Platform)}
        />
        <InstagramPostBuilder />
      </div>
    );
  }

  if (selectedPlatform === 'threads') {
    console.log('Rendering ThreadsPostBuilder');
    return (
      <div className="flex-1 flex flex-col min-h-screen">
        <PostPlatformMenu 
          activePlatform={selectedPlatform}
          onPlatformChange={(platformId) => setSelectedPlatform(platformId as Platform)}
        />
        <ThreadsPostBuilder />
      </div>
    );
  }

  if (selectedPlatform === 'twitter') {
    console.log('Rendering TwitterPostBuilder');
    return (
      <div className="flex-1 flex flex-col min-h-screen">
        <PostPlatformMenu 
          activePlatform={selectedPlatform}
          onPlatformChange={(platformId) => setSelectedPlatform(platformId as Platform)}
        />
        <TwitterPostBuilder />
      </div>
    );
  }

  if (selectedPlatform === 'linkedin') {
    console.log('Rendering LinkedInPostBuilder');
    return (
      <div className="flex-1 flex flex-col min-h-screen">
        <PostPlatformMenu 
          activePlatform={selectedPlatform}
          onPlatformChange={(platformId) => setSelectedPlatform(platformId as Platform)}
        />
        <LinkedInPostBuilder />
      </div>
    );
  }

  // All Platforms view - organized with tabs
  const platforms = [
    { id: 'facebook', name: 'Facebook', icon: Facebook },
    { id: 'instagram', name: 'Instagram', icon: Instagram },
    { id: 'twitter', name: 'Twitter', icon: Twitter },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin }
  ];

  const tones = [
    'Professional',
    'Casual',
    'Humorous',
    'Inspirational',
    'Educational',
    'Promotional'
  ];

  const audiences = [
    'General Audience',
    'Young Adults (18-25)',
    'Professionals (25-45)',
    'Business Owners',
    'Tech Enthusiasts',
    'Creative Professionals'
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedMedia(file);
    }
  };

  const handleGenerateAIPost = async () => {
    if (!selectedTone || !selectedAudience) {
      toast({
        title: "Missing Information",
        description: "Please select both tone and target audience to generate AI content.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    console.log('Generating AI post with:', { tone: selectedTone, audience: selectedAudience });

    try {
      // Simulate AI generation delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate sample content based on tone and audience
      const generateContent = () => {
        const baseContent = {
          professional: {
            'general audience': "Discover how cutting-edge technology is transforming the way we approach business challenges. Our latest insights reveal key strategies that successful companies are implementing to stay ahead in today's competitive landscape.",
            'business owners': "As a business owner, staying ahead of market trends is crucial for sustained growth. Here are three data-driven strategies that leading companies are using to increase their market share by 35% this quarter.",
            'professionals (25-45)': "Career advancement in today's digital age requires continuous learning and strategic networking. Here's how top professionals are leveraging AI tools to enhance their productivity and achieve their career goals."
          },
          casual: {
            'young adults (18-25)': "Hey everyone! 🌟 Just discovered this amazing new trend that's completely changing how we think about social media. You guys have to check this out - it's going to blow your mind!",
            'general audience': "Coffee thoughts ☕️ Sometimes the best ideas come when you're just relaxing and letting your mind wander. What's your favorite way to spark creativity?",
            'tech enthusiasts': "Okay tech fam, you need to see this! 🚀 The latest updates are absolutely game-changing. Who else is excited about what's coming next in the tech world?"
          },
          humorous: {
            'general audience': "Me: I'll just check social media for 5 minutes. Also me: *3 hours later still scrolling* 😅 Anyone else relate to this daily struggle? #SocialMediaLife",
            'professionals (25-45)': "When someone asks if you're familiar with the latest industry software: 'Oh yes, I'm an expert' *frantically googles it* 😂 #ProfessionalLife #Relatable",
            'young adults (18-25)': "POV: You're trying to adult but the wifi goes down and suddenly you don't know how to function 📶❌ Why is everything online now?! 😭"
          }
        };

        const toneKey = selectedTone.toLowerCase() as keyof typeof baseContent;
        const audienceKey = selectedAudience.toLowerCase() as keyof typeof baseContent[typeof toneKey];
        
        return baseContent[toneKey]?.[audienceKey] || baseContent.professional['general audience'];
      };

      const generatedContent = generateContent();
      setPostContent(generatedContent);
      setHasGeneratedContent(true);
      
      toast({
        title: "AI Content Generated!",
        description: "Your post content has been generated successfully. Review and customize it before publishing.",
      });
    } catch (error) {
      console.error('Error generating AI content:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate AI content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePublishToAllPlatforms = () => {
    if (!hasGeneratedContent || !postContent.trim()) {
      toast({
        title: "Generate Content First",
        description: "Please generate AI content before publishing to all platforms.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Publishing to All Platforms",
      description: "Your post is being published to Facebook, Instagram, Twitter, and LinkedIn.",
    });
    
    console.log('Publishing to all platforms:', { content: postContent, tone: selectedTone, audience: selectedAudience });
  };

  console.log('Rendering all platforms view');

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <PostPlatformMenu 
        activePlatform={selectedPlatform}
        onPlatformChange={(platformId) => setSelectedPlatform(platformId as Platform)}
      />

      <div className="flex-1 p-4 lg:p-6 bg-gray-50">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center lg:text-left">
            <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#7C3AED] to-[#D946EF] bg-clip-text text-transparent mb-2">
              Create Multi-Platform Posts
            </h1>
            <p className="text-gray-600 text-sm lg:text-base">
              Generate AI-powered content and publish to multiple social media platforms simultaneously
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Content Creation */}
            <div className="lg:col-span-2 space-y-6">
              {/* Upload Media */}
              <Card className="border border-gray-200 shadow-sm bg-white">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-gray-900">Upload Media</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 lg:p-8 text-center hover:border-purple-300 hover:bg-purple-50/50 transition-all duration-200">
                    <input
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="media-upload"
                    />
                    <label htmlFor="media-upload" className="cursor-pointer">
                      <Upload className="w-10 h-10 lg:w-12 lg:h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-base lg:text-lg font-medium text-gray-700 mb-2">
                        {uploadedMedia ? uploadedMedia.name : 'Drop your files here, or browse'}
                      </p>
                      <p className="text-xs lg:text-sm text-gray-500">
                        Supports: JPG, PNG, MP4, MOV (max 50MB)
                      </p>
                    </label>
                  </div>
                </CardContent>
              </Card>

              {/* AI Content Generation */}
              <Card className="border border-gray-200 shadow-sm bg-white">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                    <Bot className="w-5 h-5 mr-2 text-purple-600" />
                    AI Content Generation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="tone" className="text-sm font-medium text-gray-700">Tone</Label>
                      <Select value={selectedTone} onValueChange={setSelectedTone}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select tone" />
                        </SelectTrigger>
                        <SelectContent>
                          {tones.map((tone) => (
                            <SelectItem key={tone} value={tone.toLowerCase()}>
                              {tone}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="audience" className="text-sm font-medium text-gray-700">Target Audience</Label>
                      <Select value={selectedAudience} onValueChange={setSelectedAudience}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select audience" />
                        </SelectTrigger>
                        <SelectContent>
                          {audiences.map((audience) => (
                            <SelectItem key={audience} value={audience.toLowerCase()}>
                              {audience}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button
                    onClick={handleGenerateAIPost}
                    disabled={isGenerating || !selectedTone || !selectedAudience}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    size="lg"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Generating AI Content...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-2" />
                        Generate AI Post
                      </>
                    )}
                  </Button>

                  {hasGeneratedContent && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center space-x-2 text-green-800">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-sm font-medium">AI content generated successfully!</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Post Content */}
              <Card className="border border-gray-200 shadow-sm bg-white">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-gray-900">Post Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="content" className="text-sm font-medium text-gray-700">Content</Label>
                    <Textarea
                      id="content"
                      placeholder="Generate AI content above or write your content here..."
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      className="mt-1 min-h-[120px] resize-none"
                    />
                    {location.state?.prefilledContent && (
                      <p className="text-xs text-purple-600 mt-1">
                        ✨ Content pre-filled from inspiration
                      </p>
                    )}
                    {hasGeneratedContent && !location.state?.prefilledContent && (
                      <p className="text-xs text-purple-600 mt-1">
                        🤖 Content generated by AI - feel free to customize
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Platform-Specific Content */}
              <Card className="border border-gray-200 shadow-sm bg-white">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-gray-900">Platform-Specific Customization</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="facebook" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      {platforms.map((platform) => (
                        <TabsTrigger key={platform.id} value={platform.id} className="flex items-center space-x-2">
                          <platform.icon className="w-4 h-4" />
                          <span className="hidden md:inline">{platform.name}</span>
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    
                    {platforms.map((platform) => (
                      <TabsContent key={platform.id} value={platform.id} className="space-y-4 mt-4">
                        <div className="p-4 bg-gray-50 rounded-lg border">
                          <div className="flex items-center space-x-2 mb-3">
                            <platform.icon className="w-5 h-5 text-gray-600" />
                            <h4 className="font-medium text-gray-900">{platform.name} Version</h4>
                          </div>
                          <Textarea
                            placeholder={`Customize content for ${platform.name}...`}
                            className="min-h-[80px] resize-none"
                            defaultValue={postContent}
                          />
                          <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
                            <span>Character limit: {platform.id === 'twitter' ? '280' : '2,200'}</span>
                            <Button variant="ghost" size="sm">
                              <Sparkles className="w-4 h-4 mr-1" />
                              Optimize for {platform.name}
                            </Button>
                          </div>
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Preview and Actions */}
            <div className="space-y-6">
              {/* Multi-Platform Preview */}
              <Card className="border border-gray-200 shadow-sm bg-white">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-gray-900">Multi-Platform Preview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {platforms.slice(0, 2).map((platform) => (
                    <div key={platform.id} className="border rounded-lg p-3 bg-gray-50">
                      <div className="flex items-center space-x-2 mb-2">
                        <platform.icon className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">{platform.name}</span>
                      </div>
                      <div className="text-sm text-gray-800 mb-2">
                        {postContent || "Your content will appear here..."}
                      </div>
                      <div className="flex items-center space-x-3 text-xs text-gray-500">
                        <button className="flex items-center space-x-1 hover:text-red-500">
                          <Heart className="w-3 h-3" />
                          <span>Like</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-blue-500">
                          <MessageCircle className="w-3 h-3" />
                          <span>Comment</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-green-500">
                          <Share className="w-3 h-3" />
                          <span>Share</span>
                        </button>
                      </div>
                    </div>
                  ))}
                  <Button variant="ghost" className="w-full text-purple-600 hover:text-purple-700 hover:bg-purple-50">
                    View All Platform Previews
                  </Button>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <Card className="border border-gray-200 shadow-sm bg-white">
                <CardContent className="p-4 lg:p-6 space-y-4">
                  <Button 
                    onClick={handlePublishToAllPlatforms}
                    disabled={!hasGeneratedContent || !postContent.trim()}
                    className="w-full bg-gradient-to-r from-[#7C3AED] to-[#D946EF] hover:from-purple-700 hover:to-pink-600 text-white transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    size="lg"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {hasGeneratedContent ? 'Publish to All Platforms' : 'Generate Content First'}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                    size="lg"
                    disabled={!hasGeneratedContent || !postContent.trim()}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule for Later
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border border-gray-200 shadow-sm bg-white">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-purple-600" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-left h-auto py-3 px-3 hover:bg-purple-50 transition-colors duration-200"
                    disabled={!hasGeneratedContent}
                  >
                    <Zap className="w-4 h-4 mr-3 text-purple-500 shrink-0" />
                    <span className="text-sm">Generate platform-specific content</span>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-left h-auto py-3 px-3 hover:bg-purple-50 transition-colors duration-200"
                    disabled={!hasGeneratedContent}
                  >
                    <Sparkles className="w-4 h-4 mr-3 text-purple-500 shrink-0" />
                    <span className="text-sm">Optimize for engagement</span>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
