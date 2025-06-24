import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowRight,
  Calendar,
  Save,
  Send,
  Sparkles,
  User,
  Zap,
  Heart,
  MessageCircle,
  Share,
  MoreHorizontal,
  Wand2,
  Edit,
  FileText,
  Video
} from "lucide-react";

type PostType = 'post' | 'reel';

export function FacebookPostBuilder() {
  const [selectedPostType, setSelectedPostType] = useState<PostType>('post');
  const [selectedAudience, setSelectedAudience] = useState('');
  const [selectedPage, setSelectedPage] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [prompt, setPrompt] = useState('');
  const [generatedPost, setGeneratedPost] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResponse, setShowResponse] = useState(false);

  const postTypes = [
    { id: 'post', name: 'Post', icon: FileText },
    { id: 'reel', name: 'Reel', icon: Video }
  ];

  const audiences = [
    'Students',
    'Business Owners',
    'Job Seekers',
    'Entrepreneurs',
    'Marketing Professionals',
    'Small Business Owners'
  ];

  const pages = [
    'LeadMasters AI',
    'BotCampus AI',
    'Digital Marketing Hub',
    'AI Learning Center'
  ];

  const aiModels = [
    'GPT-4',
    'Claude',
    'Gemini Pro',
    'Custom Model'
  ];

  const handleGeneratePost = async () => {
    if (!selectedAudience || !selectedPage || !selectedModel || !prompt) {
      return;
    }

    setIsGenerating(true);
    setShowResponse(false);
    
    // Simulate AI generation
    setTimeout(() => {
      const contentType = selectedPostType === 'reel' ? 'Facebook Reel' : 'Facebook post';
      const mockPost = `🚀 Exciting ${contentType.toLowerCase()} for ${selectedAudience.toLowerCase()}! 

${prompt}

Join thousands of professionals who are already transforming their careers with AI-powered solutions. Don't miss out on this opportunity to level up your skills! 

✨ What you'll get:
• Expert-led training sessions
• Hands-on practical experience  
• Industry-recognized certification
• Networking opportunities

Ready to take the next step? Comment below or DM us! 

#LeadMastersAI #CareerGrowth #ProfessionalDevelopment #AI #SkillBuilding${selectedPostType === 'reel' ? ' #Reels #FacebookReels' : ''}`;

      setGeneratedPost(mockPost);
      setShowResponse(true);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/20 overflow-y-auto">
      <div className="max-w-5xl mx-auto p-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/20 shadow-lg">
            <Zap className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">Powered by AI</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#D946EF] bg-clip-text text-transparent">
            Facebook AI {selectedPostType === 'reel' ? 'Reel' : 'Post'} Generator
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Create engaging, AI-powered Facebook {selectedPostType === 'reel' ? 'reels' : 'posts'} that resonate with your audience
          </p>
        </div>

        {/* AI Configuration Card */}
        <Card className="relative overflow-hidden bg-white/70 backdrop-blur-xl border border-white/30 shadow-2xl shadow-purple-500/10">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5" />
          <CardHeader className="relative pb-6">
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
              <div className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span>AI {selectedPostType === 'reel' ? 'Reel' : 'Post'} Configuration</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="relative space-y-8">
            {/* Configuration Grid */}
            <div className="grid md:grid-cols-4 gap-8">
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>Content Type</span>
                </Label>
                <Select value={selectedPostType} onValueChange={(value) => setSelectedPostType(value as PostType)}>
                  <SelectTrigger className="h-8 bg-white/80 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 focus:ring-2 focus:ring-purple-500/20">
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-xl border-white/30 shadow-2xl">
                    {postTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id} className="hover:bg-purple-50/80 flex items-center">
                        <div className="flex items-center space-x-2">
                          <type.icon className="w-4 h-4" />
                          <span>{type.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Target Audience</span>
                </Label>
                <Select value={selectedAudience} onValueChange={setSelectedAudience}>
                  <SelectTrigger className="h-8 bg-white/80 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 focus:ring-2 focus:ring-purple-500/20">
                    <SelectValue placeholder="Select your audience" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-xl border-white/30 shadow-2xl">
                    {audiences.map((audience) => (
                      <SelectItem key={audience} value={audience} className="hover:bg-purple-50/80">
                        {audience}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                  <Wand2 className="w-4 h-4" />
                  <span>Page Selection</span>
                </Label>
                <Select value={selectedPage} onValueChange={setSelectedPage}>
                  <SelectTrigger className="h-8 bg-white/80 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 focus:ring-2 focus:ring-purple-500/20">
                    <SelectValue placeholder="Choose your page" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-xl border-white/30 shadow-2xl">
                    {pages.map((page) => (
                      <SelectItem key={page} value={page} className="hover:bg-purple-50/80">
                        {page}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                  <Zap className="w-4 h-4" />
                  <span>AI Model</span>
                </Label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger className="h-8 bg-white/80 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 focus:ring-2 focus:ring-purple-500/20">
                    <SelectValue placeholder="Select AI model" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-xl border-white/30 shadow-2xl">
                    {aiModels.map((model) => (
                      <SelectItem key={model} value={model} className="hover:bg-purple-50/80">
                        {model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Prompt Input */}
            <div className="space-y-4">
              <Label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>Describe your {selectedPostType} idea</span>
              </Label>
              <div className="relative">
                <Textarea
                  placeholder={`e.g., Create an engaging ${selectedPostType} announcement for AI and career development...`}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[120px] bg-white/80 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 focus:ring-2 focus:ring-purple-500/20 resize-none text-base"
                />
                {prompt && (
                  <div className="absolute top-3 right-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  </div>
                )}
              </div>
            </div>

            {/* Generate Button */}
            <div className="flex justify-center pt-6">
              <Button
                onClick={handleGeneratePost}
                disabled={!selectedAudience || !selectedPage || !selectedModel || !prompt || isGenerating}
                className="relative group bg-gradient-to-r from-[#7C3AED] to-[#D946EF] hover:from-purple-700 hover:to-pink-600 text-white px-12 py-4 text-lg font-semibold rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <div className="flex items-center space-x-3">
                      <Sparkles className="w-5 h-5 animate-spin" />
                      <span>Generating...</span>
                      <div className="flex space-x-1">
                        <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
                        <div className="w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                        <div className="w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <ArrowRight className="w-5 h-5 mr-3 group-hover:translate-x-1 transition-transform duration-300" />
                    <span>Generate AI {selectedPostType === 'reel' ? 'Reel' : 'Post'}</span>
                  </>
                )}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Generated Post Results Section */}
        {(isGenerating || showResponse) && (
          <div className="space-y-6">
            {/* Section Header */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Generated {selectedPostType === 'reel' ? 'Reel' : 'Post'}</h2>
              <p className="text-gray-600">AI-powered content ready for your Facebook page</p>
            </div>

            {/* Loading State or Generated Post Card */}
            {isGenerating ? (
              <Card className="max-w-2xl mx-auto bg-white/60 backdrop-blur-xl border border-white/30 shadow-xl">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="flex items-center space-x-3 mb-4">
                    <Sparkles className="w-6 h-6 text-purple-600 animate-spin" />
                    <span className="text-lg font-medium text-gray-700">Generating {selectedPostType}...</span>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="max-w-2xl mx-auto relative overflow-hidden bg-white/90 backdrop-blur-xl border border-white/40 shadow-2xl shadow-purple-500/10 animate-in fade-in duration-700 slide-in-from-bottom-8">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
                <CardContent className="p-8">
                  {/* Mock Facebook Post Preview */}
                  <div className="relative p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200/50 shadow-lg">
                    {/* Post Header */}
                    <div className="flex items-center space-x-4 mb-6">
                      <Avatar className="w-12 h-12 shadow-md">
                        <AvatarImage src="/lovable-uploads/e3966193-4894-406f-af40-baf88594caa3.png" />
                        <AvatarFallback className="bg-gradient-to-br from-purple-100 to-pink-100 text-purple-600 font-semibold">
                          {selectedPage?.split(' ').map(word => word[0]).join('') || 'LM'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-bold text-gray-900 text-base">{selectedPage || 'Your Page'}</p>
                        <p className="text-sm text-gray-500 flex items-center space-x-2">
                          <span>Just now</span>
                          <span>•</span>
                          <span>🌍</span>
                        </p>
                      </div>
                      <MoreHorizontal className="w-5 h-5 text-gray-400" />
                    </div>
                    
                    {/* Post Content */}
                    <div className="space-y-6">
                      <p className="text-gray-800 whitespace-pre-line leading-relaxed text-base">
                        {generatedPost}
                      </p>
                      
                      {/* Mock engagement section */}
                      <div className="border-t pt-4">
                        <div className="flex items-center justify-between text-gray-500 mb-3">
                          <div className="flex items-center space-x-2">
                            <div className="flex -space-x-1">
                              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center shadow-sm">
                                <span className="text-white text-xs">👍</span>
                              </div>
                              <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center shadow-sm">
                                <span className="text-white text-xs">❤️</span>
                              </div>
                            </div>
                            <span className="text-sm">24 reactions</span>
                          </div>
                          <div className="flex space-x-4 text-sm">
                            <span>8 comments</span>
                            <span>3 shares</span>
                          </div>
                        </div>
                        
                        <Separator className="mb-3" />
                        
                        <div className="grid grid-cols-3 gap-1">
                          <button className="flex items-center justify-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors py-2 rounded-lg hover:bg-blue-50/80">
                            <Heart className="w-4 h-4" />
                            <span className="text-sm font-medium">Like</span>
                          </button>
                          <button className="flex items-center justify-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors py-2 rounded-lg hover:bg-blue-50/80">
                            <MessageCircle className="w-4 h-4" />
                            <span className="text-sm font-medium">Comment</span>
                          </button>
                          <button className="flex items-center justify-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors py-2 rounded-lg hover:bg-blue-50/80">
                            <Share className="w-4 h-4" />
                            <span className="text-sm font-medium">Share</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                    <Button className="group relative h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105">
                      <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                      <span className="font-semibold">Post Now</span>
                    </Button>
                    <Button variant="outline" className="h-12 bg-white/80 backdrop-blur-sm border-purple-200 hover:bg-purple-50 hover:shadow-lg rounded-xl transition-all duration-300 hover:scale-105 text-purple-700">
                      <Save className="w-4 h-4 mr-2" />
                      <span className="font-semibold">Save to Draft</span>
                    </Button>
                    <Button variant="outline" className="h-12 bg-white/80 backdrop-blur-sm border-purple-200 hover:bg-purple-50 hover:shadow-lg rounded-xl transition-all duration-300 hover:scale-105 text-purple-700">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="font-semibold">Schedule</span>
                    </Button>
                    <Button variant="outline" className="h-12 bg-white/80 backdrop-blur-sm border-purple-200 hover:bg-purple-50 hover:shadow-lg rounded-xl transition-all duration-300 hover:scale-105 text-purple-700">
                      <Edit className="w-4 h-4 mr-2" />
                      <span className="font-semibold">Edit Post</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
