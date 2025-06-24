
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
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
  Rocket,
  Palette,
  Target
} from "lucide-react";

export function FacebookPostBuilder() {
  const [selectedAudience, setSelectedAudience] = useState('');
  const [selectedPage, setSelectedPage] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [prompt, setPrompt] = useState('');
  const [generatedPost, setGeneratedPost] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResponse, setShowResponse] = useState(false);

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

  const quickPrompts = [
    { text: "Instagram Post Idea", icon: Sparkles },
    { text: "Product Launch Caption", icon: Rocket },
    { text: "Poster Idea for Digital Marketing", icon: Palette },
    { text: "Engagement-Focused Content", icon: Target }
  ];

  const handleGeneratePost = async () => {
    if (!selectedAudience || !selectedPage || !selectedModel || !prompt) {
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const mockPost = `🚀 Exciting news for ${selectedAudience.toLowerCase()}! 

${prompt}

Join thousands of professionals who are already transforming their careers with AI-powered solutions. Don't miss out on this opportunity to level up your skills! 

✨ What you'll get:
• Expert-led training sessions
• Hands-on practical experience  
• Industry-recognized certification
• Networking opportunities

Ready to take the next step? Comment below or DM us! 

#LeadMastersAI #CareerGrowth #ProfessionalDevelopment #AI #SkillBuilding`;

      setGeneratedPost(mockPost);
      setShowResponse(true);
      setIsGenerating(false);
    }, 2000);
  };

  const handleQuickPrompt = (promptText: string) => {
    setPrompt(promptText);
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
            Facebook AI Post Generator
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Create engaging, AI-powered Facebook posts that resonate with your audience
          </p>
        </div>

        {/* Floating AI Configuration Card */}
        <Card className="relative overflow-hidden bg-white/70 backdrop-blur-xl border border-white/30 shadow-2xl shadow-purple-500/10">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5" />
          <CardHeader className="relative pb-6">
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
              <div className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                <Sparkles className="w-6 h-6 text-white" />
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
                  <SelectTrigger className="h-12 bg-white/80 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 focus:ring-2 focus:ring-purple-500/20">
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
                  <SelectTrigger className="h-12 bg-white/80 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 focus:ring-2 focus:ring-purple-500/20">
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
                  <SelectTrigger className="h-12 bg-white/80 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 focus:ring-2 focus:ring-purple-500/20">
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
                <span>Describe your post idea</span>
              </Label>
              <div className="relative">
                <Textarea
                  placeholder="e.g., Create an engaging workshop announcement for AI and career development..."
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
                    <span>Generate AI Post</span>
                  </>
                )}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick AI Prompts */}
        <Card className="bg-white/60 backdrop-blur-xl border border-white/30 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-gray-900 flex items-center space-x-2">
              <Wand2 className="w-5 h-5 text-purple-600" />
              <span>Quick AI Prompts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickPrompt(prompt.text)}
                  className="group relative p-4 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/40 shadow-lg hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:scale-105 hover:bg-white/80"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 group-hover:from-purple-500/20 group-hover:to-pink-500/20 transition-all duration-300">
                      <prompt.icon className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      {prompt.text}
                    </span>
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 transition-all duration-300" />
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Response Area */}
        {showResponse && (
          <Card className="relative overflow-hidden bg-white/80 backdrop-blur-xl border border-white/30 shadow-2xl shadow-purple-500/10 animate-in fade-in duration-700 slide-in-from-bottom-8">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
                <div className="p-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span>AI Generated Post</span>
                <div className="flex space-x-1 ml-auto">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Mock Facebook Post Preview */}
              <div className="relative p-8 rounded-3xl bg-gradient-to-br from-gray-50 to-white border border-gray-200/50 shadow-xl">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center shadow-lg">
                    <User className="w-7 h-7 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">{selectedPage}</p>
                    <p className="text-sm text-gray-500 flex items-center space-x-2">
                      <span>Just now</span>
                      <span>•</span>
                      <span>🌍</span>
                    </p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <p className="text-gray-800 whitespace-pre-line leading-relaxed text-lg">
                    {generatedPost}
                  </p>
                  
                  {/* Mock engagement section */}
                  <div className="border-t pt-6">
                    <div className="flex items-center justify-between text-gray-500 mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex -space-x-2">
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-md">
                            <span className="text-white text-xs">👍</span>
                          </div>
                          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-md">
                            <span className="text-white text-xs">❤️</span>
                          </div>
                        </div>
                        <span className="text-sm font-medium">24 reactions</span>
                      </div>
                      <div className="flex space-x-6 text-sm font-medium">
                        <span>8 comments</span>
                        <span>3 shares</span>
                      </div>
                    </div>
                    
                    <Separator className="mb-4" />
                    
                    <div className="grid grid-cols-3 gap-2">
                      <button className="flex items-center justify-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors py-3 rounded-xl hover:bg-blue-50/80">
                        <Heart className="w-5 h-5" />
                        <span className="font-medium">Like</span>
                      </button>
                      <button className="flex items-center justify-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors py-3 rounded-xl hover:bg-blue-50/80">
                        <MessageCircle className="w-5 h-5" />
                        <span className="font-medium">Comment</span>
                      </button>
                      <button className="flex items-center justify-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors py-3 rounded-xl hover:bg-blue-50/80">
                        <Share className="w-5 h-5" />
                        <span className="font-medium">Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Action Buttons */}
              <div className="grid sm:grid-cols-3 gap-4">
                <Button className="group relative h-14 bg-gradient-to-r from-[#7C3AED] to-[#D946EF] hover:from-purple-700 hover:to-pink-600 text-white rounded-2xl shadow-xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105">
                  <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                  <span className="font-semibold">Post Now</span>
                </Button>
                <Button variant="outline" className="h-14 bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white hover:shadow-lg rounded-2xl transition-all duration-300 hover:scale-105">
                  <Save className="w-5 h-5 mr-2" />
                  <span className="font-semibold">Save Draft</span>
                </Button>
                <Button variant="outline" className="h-14 bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white hover:shadow-lg rounded-2xl transition-all duration-300 hover:scale-105">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span className="font-semibold">Schedule</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
