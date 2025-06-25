
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
  Upload,
  X,
  Image as ImageIcon,
  Video
} from "lucide-react";

export function TwitterPostBuilder() {
  const [selectedAudience, setSelectedAudience] = useState('');
  const [selectedPage, setSelectedPage] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [prompt, setPrompt] = useState('');
  const [generatedPost, setGeneratedPost] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [uploadedMedia, setUploadedMedia] = useState<File | null>(null);
  const [mediaPreviewUrl, setMediaPreviewUrl] = useState<string | null>(null);

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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedMedia(file);
      
      // Create preview URL for the uploaded file
      const url = URL.createObjectURL(file);
      setMediaPreviewUrl(url);
    }
  };

  const removeUploadedMedia = () => {
    if (mediaPreviewUrl) {
      URL.revokeObjectURL(mediaPreviewUrl);
    }
    setUploadedMedia(null);
    setMediaPreviewUrl(null);
  };

  const handleGeneratePost = async () => {
    if (!selectedAudience || !selectedPage || !selectedModel || !prompt) {
      return;
    }

    setIsGenerating(true);
    setShowResponse(false);
    
    // Simulate AI generation
    setTimeout(() => {
      const mockPost = `🚀 Game-changer for ${selectedAudience.toLowerCase()}! 

${prompt}

Join thousands leveling up their careers with AI! 🔥

✨ You get:
• Expert training
• Hands-on experience  
• Certification
• Network access

Ready to transform? Drop a 💯 below or DM us!

#LeadMastersAI #CareerGrowth #AI #SkillBuilding #TwitterLearning`;

      setGeneratedPost(mockPost);
      setShowResponse(true);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50/30 to-sky-50/20 overflow-y-auto">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-white/20 shadow-lg">
            <Zap className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Powered by AI</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#1DA1F2] via-[#0084B4] to-[#00ACED] bg-clip-text text-transparent">
            Twitter AI Post Generator
          </h1>
          <p className="text-gray-600 text-base max-w-2xl mx-auto">
            Create viral, AI-powered Twitter posts that spark conversations
          </p>
        </div>

        {/* Media Upload Section */}
        <Card className="relative overflow-hidden bg-white/70 backdrop-blur-xl border border-white/30 shadow-xl shadow-blue-500/10">
          <CardHeader className="relative pb-3">
            <CardTitle className="text-lg font-bold text-gray-900 flex items-center space-x-3">
              <div className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500">
                <Upload className="w-4 h-4 text-white" />
              </div>
              <span>Upload Media</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            {!uploadedMedia ? (
              <div className="border-2 border-dashed border-blue-200 rounded-xl p-6 text-center hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-200">
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="twitter-media-upload"
                />
                <label htmlFor="twitter-media-upload" className="cursor-pointer">
                  <Upload className="w-10 h-10 text-blue-400 mx-auto mb-3" />
                  <p className="text-base font-medium text-gray-700 mb-1">
                    Drop your files here, or browse
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports: JPG, PNG, MP4, MOV (max 50MB)
                  </p>
                </label>
              </div>
            ) : (
              <div className="border border-blue-200 rounded-xl p-4 bg-blue-50/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {uploadedMedia.type.startsWith('image/') ? (
                      <ImageIcon className="w-6 h-6 text-blue-600" />
                    ) : (
                      <Video className="w-6 h-6 text-blue-600" />
                    )}
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{uploadedMedia.name}</p>
                      <p className="text-sm text-gray-500">
                        {(uploadedMedia.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={removeUploadedMedia}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* AI Configuration Card */}
        <Card className="relative overflow-hidden bg-white/70 backdrop-blur-xl border border-white/30 shadow-2xl shadow-blue-500/10">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5" />
          <CardHeader className="relative pb-4">
            <CardTitle className="text-xl font-bold text-gray-900 flex items-center space-x-3">
              <div className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span>AI Post Configuration</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="relative space-y-6">
            {/* Configuration Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Target Audience</span>
                </Label>
                <Select value={selectedAudience} onValueChange={setSelectedAudience}>
                  <SelectTrigger className="h-10 bg-white/80 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 focus:ring-2 focus:ring-blue-500/20">
                    <SelectValue placeholder="Select your audience" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-xl border-white/30 shadow-2xl">
                    {audiences.map((audience) => (
                      <SelectItem key={audience} value={audience} className="hover:bg-blue-50/80">
                        {audience}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                  <Wand2 className="w-4 h-4" />
                  <span>Account Selection</span>
                </Label>
                <Select value={selectedPage} onValueChange={setSelectedPage}>
                  <SelectTrigger className="h-10 bg-white/80 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 focus:ring-2 focus:ring-blue-500/20">
                    <SelectValue placeholder="Choose your account" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-xl border-white/30 shadow-2xl">
                    {pages.map((page) => (
                      <SelectItem key={page} value={page} className="hover:bg-blue-50/80">
                        {page}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                  <Zap className="w-4 h-4" />
                  <span>AI Model</span>
                </Label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger className="h-10 bg-white/80 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 focus:ring-2 focus:ring-blue-500/20">
                    <SelectValue placeholder="Select AI model" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-xl border-white/30 shadow-2xl">
                    {aiModels.map((model) => (
                      <SelectItem key={model} value={model} className="hover:bg-blue-50/80">
                        {model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Prompt Input */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>Describe your tweet idea</span>
              </Label>
              <div className="relative">
                <Textarea
                  placeholder="e.g., Create a viral tweet about AI transforming career opportunities..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[100px] bg-white/80 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 focus:ring-2 focus:ring-blue-500/20 resize-none"
                />
                {prompt && (
                  <div className="absolute top-3 right-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  </div>
                )}
              </div>
            </div>

            {/* Generate Button */}
            <div className="flex justify-center pt-4">
              <Button
                onClick={handleGeneratePost}
                disabled={!selectedAudience || !selectedPage || !selectedModel || !prompt || isGenerating}
                className="relative group bg-gradient-to-r from-[#1DA1F2] to-[#0084B4] hover:from-blue-600 hover:to-blue-700 text-white px-10 py-3 font-semibold rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <div className="flex items-center space-x-3">
                      <Sparkles className="w-4 h-4 animate-spin" />
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
                    <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                    <span>Generate AI Tweet</span>
                  </>
                )}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Generated Post Results Section */}
        {(isGenerating || showResponse) && (
          <div className="space-y-4">
            {/* Section Header */}
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-900 mb-1">Generated Tweet</h2>
              <p className="text-gray-600 text-sm">AI-powered content ready for your Twitter account</p>
            </div>

            {/* Loading State or Generated Post Card */}
            {isGenerating ? (
              <Card className="max-w-2xl mx-auto bg-white/60 backdrop-blur-xl border border-white/30 shadow-xl">
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <div className="flex items-center space-x-3 mb-3">
                    <Sparkles className="w-5 h-5 text-blue-600 animate-spin" />
                    <span className="font-medium text-gray-700">Generating tweet...</span>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="max-w-2xl mx-auto relative overflow-hidden bg-white/90 backdrop-blur-xl border border-white/40 shadow-2xl shadow-blue-500/10 animate-in fade-in duration-700 slide-in-from-bottom-8">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
                <CardContent className="p-6">
                  {/* Mock Twitter Post Preview */}
                  <div className="relative p-5 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-200/50 shadow-lg">
                    {/* Post Header */}
                    <div className="flex items-start space-x-3 mb-3">
                      <Avatar className="w-10 h-10 shadow-md">
                        <AvatarImage src="/lovable-uploads/e3966193-4894-406f-af40-baf88594caa3.png" />
                        <AvatarFallback className="bg-gradient-to-br from-blue-100 to-cyan-100 text-blue-600 font-semibold">
                          {selectedPage?.split(' ').map(word => word[0]).join('') || 'LM'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <p className="font-bold text-gray-900 text-sm">{selectedPage || 'Your Account'}</p>
                          <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                          <p className="text-gray-500 text-sm">@{selectedPage?.toLowerCase().replace(/\s/g, '') || 'yourhandle'}</p>
                          <span className="text-gray-500">·</span>
                          <span className="text-gray-500 text-sm">now</span>
                        </div>
                      </div>
                      <MoreHorizontal className="w-4 h-4 text-gray-400" />
                    </div>
                    
                    {/* Tweet Content */}
                    <div className="space-y-3">
                      <p className="text-gray-800 whitespace-pre-line leading-relaxed text-sm">
                        {generatedPost}
                      </p>
                      
                      {/* Media Section */}
                      {uploadedMedia && mediaPreviewUrl && (
                        <div className="w-full rounded-lg overflow-hidden shadow-lg border border-gray-200">
                          {uploadedMedia.type.startsWith('image/') ? (
                            <img 
                              src={mediaPreviewUrl} 
                              alt="Uploaded preview" 
                              className="w-full h-auto object-cover max-h-80"
                            />
                          ) : (
                            <video 
                              src={mediaPreviewUrl} 
                              className="w-full h-auto object-cover max-h-80"
                              controls
                            />
                          )}
                        </div>
                      )}
                      
                      {/* Mock engagement section */}
                      <div className="text-gray-500 text-sm pt-2">
                        <span>1:23 PM · {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        <span className="ml-2">· <strong>1.2K</strong> Views</span>
                      </div>
                      
                      <Separator className="my-2" />
                      
                      <div className="flex items-center justify-between text-gray-500 max-w-md">
                        <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors group">
                          <div className="p-2 rounded-full group-hover:bg-blue-50 transition-colors">
                            <MessageCircle className="w-4 h-4" />
                          </div>
                          <span className="text-sm">12</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-green-500 transition-colors group">
                          <div className="p-2 rounded-full group-hover:bg-green-50 transition-colors">
                            <Repeat2 className="w-4 h-4" />
                          </div>
                          <span className="text-sm">24</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-red-500 transition-colors group">
                          <div className="p-2 rounded-full group-hover:bg-red-50 transition-colors">
                            <Heart className="w-4 h-4" />
                          </div>
                          <span className="text-sm">87</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors group">
                          <div className="p-2 rounded-full group-hover:bg-blue-50 transition-colors">
                            <Share className="w-4 h-4" />
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
                    <Button className="group relative h-10 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 text-sm">
                      <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                      <span className="font-semibold">Tweet Now</span>
                    </Button>
                    <Button variant="outline" className="h-10 bg-white/80 backdrop-blur-sm border-blue-200 hover:bg-blue-50 hover:shadow-lg rounded-lg transition-all duration-300 hover:scale-105 text-blue-700 text-sm">
                      <Save className="w-4 h-4 mr-2" />
                      <span className="font-semibold">Save Draft</span>
                    </Button>
                    <Button variant="outline" className="h-10 bg-white/80 backdrop-blur-sm border-blue-200 hover:bg-blue-50 hover:shadow-lg rounded-lg transition-all duration-300 hover:scale-105 text-blue-700 text-sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="font-semibold">Schedule</span>
                    </Button>
                    <Button variant="outline" className="h-10 bg-white/80 backdrop-blur-sm border-blue-200 hover:bg-blue-50 hover:shadow-lg rounded-lg transition-all duration-300 hover:scale-105 text-blue-700 text-sm">
                      <Edit className="w-4 h-4 mr-2" />
                      <span className="font-semibold">Edit Tweet</span>
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
