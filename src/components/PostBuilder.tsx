import { useState } from "react";
import { PostPlatformMenu } from "@/components/PostPlatformMenu";
import { FacebookPostBuilder } from "./FacebookPostBuilder";
import { InstagramPostBuilder } from "./InstagramPostBuilder";
import { TwitterPostBuilder } from "./TwitterPostBuilder";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
  MoreHorizontal
} from "lucide-react";

type Platform = 'all' | 'facebook' | 'instagram' | 'threads' | 'twitter' | 'linkedin';
type PostType = 'post' | 'reel' | 'story';

export function PostBuilder() {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('facebook');
  const [selectedPostType, setSelectedPostType] = useState<PostType>('post');
  const [postContent, setPostContent] = useState('');
  const [selectedTone, setSelectedTone] = useState('');
  const [selectedAudience, setSelectedAudience] = useState('');
  const [uploadedMedia, setUploadedMedia] = useState<File | null>(null);

  // If Facebook is selected, show the FacebookPostBuilder
  if (selectedPlatform === 'facebook') {
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

  // If Instagram is selected, show the InstagramPostBuilder
  if (selectedPlatform === 'instagram') {
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

  // If Twitter is selected, show the TwitterPostBuilder
  if (selectedPlatform === 'twitter') {
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

  const platforms = [
    { id: 'all', name: 'All Platforms' },
    { id: 'facebook', name: 'Facebook' },
    { id: 'instagram', name: 'Instagram' },
    { id: 'threads', name: 'Threads' },
    { id: 'twitter', name: 'Twitter' },
    { id: 'linkedin', name: 'LinkedIn' }
  ];

  const postTypes = [
    { id: 'post', name: 'Posts', icon: FileText },
    { id: 'reel', name: 'Reels', icon: Video },
    { id: 'story', name: 'Story', icon: ImageIcon }
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

  const aiSuggestions = [
    "Suggest a caption",
    "Generate trending post idea",
    "Suggest post idea for product launch",
    "Suggest post idea for festive campaign",
    "Create engagement-focused content",
    "Generate hashtag suggestions"
  ];

  const currentPlatform = platforms.find(p => p.id === selectedPlatform);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedMedia(file);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      {/* Platform Navigation */}
      <PostPlatformMenu 
        activePlatform={selectedPlatform}
        onPlatformChange={(platformId) => setSelectedPlatform(platformId as Platform)}
      />

      <div className="flex-1 p-4 lg:p-6 bg-gray-50">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center lg:text-left">
            <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#7C3AED] to-[#D946EF] bg-clip-text text-transparent mb-2">
              Create Posts for {currentPlatform?.name}
            </h1>
            <p className="text-gray-600 text-sm lg:text-base">
              Use AI to create engaging posts, reels, or image content for your audience.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Post Creation */}
            <div className="lg:col-span-2 space-y-6">
              {/* Post Type Selector */}
              <Card className="border border-gray-200 shadow-sm bg-white">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-gray-900">Post Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-3">
                    {postTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setSelectedPostType(type.id as PostType)}
                        className={`
                          p-3 lg:p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md
                          ${selectedPostType === type.id
                            ? 'border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                          }
                        `}
                      >
                        <type.icon className={`w-5 h-5 lg:w-6 lg:h-6 mx-auto mb-2 ${selectedPostType === type.id ? 'text-purple-600' : 'text-gray-500'}`} />
                        <p className={`text-xs lg:text-sm font-medium ${selectedPostType === type.id ? 'text-purple-700' : 'text-gray-700'}`}>
                          {type.name}
                        </p>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

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

              {/* Post Content */}
              <Card className="border border-gray-200 shadow-sm bg-white">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-gray-900">Post Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
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

                    <div className="space-y-4">
                      <Label className="text-sm font-medium text-gray-700">AI Suggestions</Label>
                      <div className="grid grid-cols-1 gap-2">
                        {aiSuggestions.slice(0, 4).map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="justify-start text-left h-auto py-2 px-3 text-xs hover:bg-purple-50 hover:border-purple-300"
                            onClick={() => {
                              setPostContent(`Generated content based on: ${suggestion}`);
                            }}
                          >
                            <Sparkles className="w-3 h-3 mr-2 text-purple-500 shrink-0" />
                            <span className="truncate">{suggestion}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="content" className="text-sm font-medium text-gray-700">Post Message</Label>
                    <Textarea
                      id="content"
                      placeholder="Write your post content here..."
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      className="mt-1 min-h-[120px] resize-none"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Preview and Actions */}
            <div className="space-y-6">
              {/* Post Preview */}
              <Card className="border border-gray-200 shadow-sm bg-white">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-gray-900">Post Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg p-4 bg-gray-50">
                    {/* Mock Social Media Post */}
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-purple-600">L</span>
                      </div>
                      <div>
                        <p className="font-semibold text-sm">LeadMasters AI</p>
                        <p className="text-xs text-gray-500">Just now</p>
                      </div>
                    </div>
                    
                    {uploadedMedia && (
                      <div className="w-full h-32 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                    
                    <p className="text-sm text-gray-800 mb-4">
                      {postContent || "Your post content will appear here..."}
                    </p>
                    
                    {/* Mock engagement buttons */}
                    <div className="flex items-center justify-between border-t pt-3">
                      <div className="flex space-x-4 lg:space-x-6">
                        <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500">
                          <Heart className="w-4 h-4" />
                          <span className="text-xs">Like</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-xs">Comment</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-500 hover:text-green-500">
                          <Share className="w-4 h-4" />
                          <span className="text-xs">Share</span>
                        </button>
                      </div>
                      <MoreHorizontal className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
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
                    Publish Now
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

              {/* AI Prompts Section */}
              <Card className="border border-gray-200 shadow-sm bg-white">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-purple-600" />
                    Quick AI Prompts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {aiSuggestions.slice(2, 4).map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start text-left h-auto py-3 px-3 hover:bg-purple-50 transition-colors duration-200"
                      onClick={() => {
                        setPostContent(`AI-generated content: ${suggestion}`);
                      }}
                    >
                      <Zap className="w-4 h-4 mr-3 text-purple-500 shrink-0" />
                      <span className="text-sm truncate">{suggestion}</span>
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
