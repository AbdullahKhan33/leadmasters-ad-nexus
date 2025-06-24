
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
  Image as ImageIcon,
  Heart,
  MessageCircle,
  Share,
  MoreHorizontal
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
    "Provide me a post idea for Instagram",
    "Suggest a poster idea for digital marketing",
    "Create an engaging workshop announcement",
    "Generate a motivational business post"
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
    <div className="flex-1 p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#7C3AED] to-[#D946EF] bg-clip-text text-transparent mb-2">
            Facebook Post Builder
          </h1>
          <p className="text-gray-600">
            Create AI-powered Facebook posts tailored to your audience and objectives
          </p>
        </div>

        {/* User Input Section */}
        <Card className="border border-gray-200 shadow-sm bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold text-gray-900 flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
              AI Post Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="audience" className="text-sm font-medium text-gray-700">
                  Select Audience/Profession
                </Label>
                <Select value={selectedAudience} onValueChange={setSelectedAudience}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Choose target audience" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 shadow-lg">
                    {audiences.map((audience) => (
                      <SelectItem key={audience} value={audience}>
                        {audience}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="page" className="text-sm font-medium text-gray-700">
                  Select Page
                </Label>
                <Select value={selectedPage} onValueChange={setSelectedPage}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Choose page to post from" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 shadow-lg">
                    {pages.map((page) => (
                      <SelectItem key={page} value={page}>
                        {page}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="model" className="text-sm font-medium text-gray-700">
                  Select AI Model
                </Label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Choose AI model" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 shadow-lg">
                    {aiModels.map((model) => (
                      <SelectItem key={model} value={model}>
                        {model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="prompt" className="text-sm font-medium text-gray-700">
                What should the post be about?
              </Label>
              <Textarea
                id="prompt"
                placeholder="e.g., Ad for a student workshop on AI and career development"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[100px] resize-none"
              />
            </div>

            <div className="flex justify-center pt-4">
              <Button
                onClick={handleGeneratePost}
                disabled={!selectedAudience || !selectedPage || !selectedModel || !prompt || isGenerating}
                className="bg-gradient-to-r from-[#7C3AED] to-[#D946EF] hover:from-purple-700 hover:to-pink-600 text-white transition-all duration-200 shadow-lg hover:shadow-xl px-8 py-3 text-base font-medium"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Generate Post
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* AI Response Display Area */}
        {showResponse && (
          <Card className="border border-gray-200 shadow-lg bg-white animate-in fade-in duration-500">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold text-gray-900 flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-green-600" />
                AI Generated Post
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Mock Facebook Post Preview */}
              <div className="border rounded-lg p-6 bg-gray-50">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{selectedPage}</p>
                    <p className="text-sm text-gray-500">Just now • 🌍</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <p className="text-gray-800 whitespace-pre-line leading-relaxed">
                    {generatedPost}
                  </p>
                  
                  {/* Mock engagement section */}
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between text-gray-500 mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="flex -space-x-1">
                          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">👍</span>
                          </div>
                          <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
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
                    
                    <div className="flex items-center justify-between">
                      <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors px-4 py-2 rounded hover:bg-blue-50">
                        <Heart className="w-5 h-5" />
                        <span className="font-medium">Like</span>
                      </button>
                      <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors px-4 py-2 rounded hover:bg-blue-50">
                        <MessageCircle className="w-5 h-5" />
                        <span className="font-medium">Comment</span>
                      </button>
                      <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors px-4 py-2 rounded hover:bg-blue-50">
                        <Share className="w-5 h-5" />
                        <span className="font-medium">Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  className="bg-gradient-to-r from-[#7C3AED] to-[#D946EF] hover:from-purple-700 hover:to-pink-600 text-white transition-all duration-200 shadow-lg hover:shadow-xl flex-1"
                  size="lg"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Post Now
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 flex-1"
                  size="lg"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save to Draft
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 flex-1"
                  size="lg"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule for Later
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Optional Additional AI Prompts */}
        <Card className="border border-gray-200 shadow-sm bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900">Quick AI Prompts</CardTitle>
            <p className="text-sm text-gray-600">Get inspiration with these pre-built prompt suggestions</p>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-3">
              {quickPrompts.map((promptText, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="justify-start text-left h-auto py-4 px-4 hover:bg-purple-50 hover:border-purple-300 border border-gray-200 transition-all duration-200"
                  onClick={() => handleQuickPrompt(promptText)}
                >
                  <Sparkles className="w-4 h-4 mr-3 text-purple-500 shrink-0" />
                  <span className="text-sm text-gray-700">{promptText}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
