
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
  Repeat2,
  AtSign
} from "lucide-react";

export function ThreadsPostBuilder() {
  const [selectedAudience, setSelectedAudience] = useState('');
  const [selectedPage, setSelectedPage] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [prompt, setPrompt] = useState('');
  const [generatedPost, setGeneratedPost] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResponse, setShowResponse] = useState(false);

  const audiences = [
    'Gen Z (18-24)',
    'Millennials (25-40)',
    'Creative Professionals',
    'Tech Enthusiasts',
    'Social Media Influencers',
    'General Community'
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
      const mockPost = `🧵 Let's talk about the future of AI in our daily lives!

${prompt}

I've been exploring this space for a while now, and honestly, the possibilities are endless. The key is finding the right balance between innovation and practicality.

What's your take? Are you already using AI tools in your workflow?

Drop your thoughts below 👇 Would love to hear your experiences!

#AI #TechTalk #Innovation #FutureOfWork #ThreadsConversation`;

      setGeneratedPost(mockPost);
      setShowResponse(true);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="flex-1 min-h-screen bg-gray-50 overflow-y-auto">
      <div className="max-w-5xl mx-auto p-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200">
            <Zap className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-800">Powered by AI</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Threads AI Post Generator
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Create authentic, conversation-starting posts for Threads community
          </p>
        </div>

        {/* AI Configuration Card */}
        <Card className="relative overflow-hidden bg-white border border-gray-200 shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-50/50 to-pink-50/50" />
          <CardHeader className="relative pb-6">
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
              <div className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                <AtSign className="w-6 h-6 text-white" />
              </div>
              <span>AI Post Configuration</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="relative space-y-8">
            {/* Configuration Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Target Audience</span>
                </Label>
                <Select value={selectedAudience} onValueChange={setSelectedAudience}>
                  <SelectTrigger className="h-12 bg-white border-gray-200 text-gray-900 shadow-sm hover:shadow-md transition-all duration-300 focus:ring-2 focus:ring-purple-500/20">
                    <SelectValue placeholder="Select your audience" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200 shadow-xl">
                    {audiences.map((audience) => (
                      <SelectItem key={audience} value={audience} className="hover:bg-gray-50 text-gray-900 focus:bg-gray-50">
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
                  <SelectTrigger className="h-12 bg-white border-gray-200 text-gray-900 shadow-sm hover:shadow-md transition-all duration-300 focus:ring-2 focus:ring-purple-500/20">
                    <SelectValue placeholder="Choose your page" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200 shadow-xl">
                    {pages.map((page) => (
                      <SelectItem key={page} value={page} className="hover:bg-gray-50 text-gray-900 focus:bg-gray-50">
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
                  <SelectTrigger className="h-12 bg-white border-gray-200 text-gray-900 shadow-sm hover:shadow-md transition-all duration-300 focus:ring-2 focus:ring-purple-500/20">
                    <SelectValue placeholder="Select AI model" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200 shadow-xl">
                    {aiModels.map((model) => (
                      <SelectItem key={model} value={model} className="hover:bg-gray-50 text-gray-900 focus:bg-gray-50">
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
                <span>Describe your post idea</span>
              </Label>
              <div className="relative">
                <Textarea
                  placeholder="e.g., Start a conversation about AI productivity tools and their impact on remote work..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[120px] bg-white border-gray-200 text-gray-900 placeholder:text-gray-500 shadow-sm hover:shadow-md transition-all duration-300 focus:ring-2 focus:ring-purple-500/20 resize-none text-base"
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
                className="relative group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-purple-500/25 transition-all duration-500 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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
                    <span>Generate AI Post</span>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Generated Post</h2>
              <p className="text-gray-600">AI-powered content ready for your Threads profile</p>
            </div>

            {/* Loading State or Generated Post Card */}
            {isGenerating ? (
              <Card className="max-w-2xl mx-auto bg-white border border-gray-200 shadow-lg">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="flex items-center space-x-3 mb-4">
                    <Sparkles className="w-6 h-6 text-purple-600 animate-spin" />
                    <span className="text-lg font-medium text-gray-700">Generating post...</span>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="max-w-2xl mx-auto relative overflow-hidden bg-white border border-gray-200 shadow-xl animate-in fade-in duration-700 slide-in-from-bottom-8">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
                <CardContent className="p-8">
                  {/* Mock Threads Post Preview */}
                  <div className="relative p-6 rounded-2xl bg-gray-900 border border-gray-800 shadow-lg">
                    {/* Post Header */}
                    <div className="flex items-start space-x-4 mb-6">
                      <Avatar className="w-12 h-12 shadow-md">
                        <AvatarImage src="/lovable-uploads/e3966193-4894-406f-af40-baf88594caa3.png" />
                        <AvatarFallback className="bg-gradient-to-br from-purple-100 to-pink-100 text-purple-600 font-semibold">
                          {selectedPage?.split(' ').map(word => word[0]).join('') || 'LM'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <p className="font-bold text-white text-base">{selectedPage || 'Your Page'}</p>
                          <span className="text-gray-400 text-sm">@{(selectedPage || 'yourpage').toLowerCase().replace(/\s+/g, '')}</span>
                        </div>
                        <p className="text-sm text-gray-400">Just now</p>
                      </div>
                      <MoreHorizontal className="w-5 h-5 text-gray-400" />
                    </div>
                    
                    {/* Post Content */}
                    <div className="space-y-4 mb-6">
                      <p className="text-gray-100 whitespace-pre-line leading-relaxed text-base">
                        {generatedPost}
                      </p>
                    </div>
                    
                    {/* Threads Engagement Buttons */}
                    <div className="flex items-center justify-between border-t border-gray-700 pt-4">
                      <div className="flex space-x-6">
                        <button className="flex items-center space-x-2 text-gray-400 hover:text-red-400 cursor-pointer transition-colors">
                          <Heart className="w-5 h-5" />
                          <span className="text-sm">24</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors">
                          <MessageCircle className="w-5 h-5" />
                          <span className="text-sm">8</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-400 hover:text-green-400 cursor-pointer transition-colors">
                          <Repeat2 className="w-5 h-5" />
                          <span className="text-sm">12</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-400 hover:text-purple-400 cursor-pointer transition-colors">
                          <Share className="w-5 h-5" />
                          <span className="text-sm">3</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                    <Button className="group relative h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105">
                      <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                      <span className="font-semibold">Post Now</span>
                    </Button>
                    <Button variant="outline" className="h-12 bg-white border-gray-300 hover:bg-gray-50 hover:shadow-lg rounded-xl transition-all duration-300 hover:scale-105 text-gray-700">
                      <Save className="w-4 h-4 mr-2" />
                      <span className="font-semibold">Save Draft</span>
                    </Button>
                    <Button variant="outline" className="h-12 bg-white border-gray-300 hover:bg-gray-50 hover:shadow-lg rounded-xl transition-all duration-300 hover:scale-105 text-gray-700">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="font-semibold">Schedule</span>
                    </Button>
                    <Button variant="outline" className="h-12 bg-white border-gray-300 hover:bg-gray-50 hover:shadow-lg rounded-xl transition-all duration-300 hover:scale-105 text-gray-700">
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
