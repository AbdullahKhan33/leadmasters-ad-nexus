
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
  Linkedin
} from "lucide-react";

type Platform = 'all' | 'facebook' | 'instagram' | 'threads' | 'twitter' | 'linkedin';
type PostType = 'post' | 'reel' | 'story';

export function PostBuilder() {
  const location = useLocation();
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('facebook');
  const [selectedPostType, setSelectedPostType] = useState<PostType>('post');
  const [postContent, setPostContent] = useState('');
  const [selectedTone, setSelectedTone] = useState('');
  const [selectedAudience, setSelectedAudience] = useState('');
  const [uploadedMedia, setUploadedMedia] = useState<File | null>(null);

  // Handle pre-filled content from inspiration
  useEffect(() => {
    if (location.state) {
      const { prefilledContent, tone, platform } = location.state;
      if (prefilledContent) {
        setPostContent(prefilledContent);
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
              Create and customize posts for multiple social media platforms simultaneously
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

              {/* Post Content Creation */}
              <Card className="border border-gray-200 shadow-sm bg-white">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-gray-900">Post Content</CardTitle>
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

                  <div>
                    <Label htmlFor="content" className="text-sm font-medium text-gray-700">Base Content</Label>
                    <Textarea
                      id="content"
                      placeholder="Write your base content here. This will be adapted for each platform..."
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      className="mt-1 min-h-[100px] resize-none"
                    />
                    {location.state?.prefilledContent && (
                      <p className="text-xs text-purple-600 mt-1">
                        ✨ Content pre-filled from inspiration
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
                    className="w-full bg-gradient-to-r from-[#7C3AED] to-[#D946EF] hover:from-purple-700 hover:to-pink-600 text-white transition-all duration-200 shadow-lg hover:shadow-xl"
                    size="lg"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Publish to All Platforms
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                    size="lg"
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
                  >
                    <Zap className="w-4 h-4 mr-3 text-purple-500 shrink-0" />
                    <span className="text-sm">Generate platform-specific content</span>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-left h-auto py-3 px-3 hover:bg-purple-50 transition-colors duration-200"
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
