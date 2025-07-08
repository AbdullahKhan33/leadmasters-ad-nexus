import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LinkedInIntegrationDialog } from "./LinkedInIntegrationDialog";
import { useSocialIntegration } from "@/hooks/useSocialIntegration";
import { useToast } from "@/hooks/use-toast";
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
  Bookmark,
  Linkedin,
  ThumbsUp,
  Repeat2,
  Upload,
  X,
  Image as ImageIcon,
  Video
} from "lucide-react";

export function LinkedInPostBuilder() {
  const { isLinkedInConnected } = useSocialIntegration();
  const { toast } = useToast();
  const [selectedAudience, setSelectedAudience] = useState('');
  const [selectedPage, setSelectedPage] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [prompt, setPrompt] = useState('');
  const [generatedPost, setGeneratedPost] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [uploadedMedia, setUploadedMedia] = useState<File | null>(null);
  const [mediaPreviewUrl, setMediaPreviewUrl] = useState<string | null>(null);
  const [showIntegrationDialog, setShowIntegrationDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');

  const audiences = [
    'Business Professionals',
    'C-Level Executives',
    'Entrepreneurs',
    'Job Seekers',
    'Industry Leaders',
    'Sales Professionals',
    'HR Professionals',
    'Marketing Professionals'
  ];

  const pages = [
    'LeadMasters AI',
    'BotCampus AI',
    'Professional Services Hub',
    'Business Growth Center'
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
      const mockPost = `🚀 Accelerate Your Professional Growth with AI! 💼

${prompt}

In today's competitive landscape, professionals who leverage AI are setting themselves apart. Our comprehensive training program has already helped 5,000+ professionals advance their careers.

🎯 What sets our program apart:
• Industry-leading curriculum designed by experts
• Hands-on projects with real-world applications
• Personalized mentorship and career guidance
• Access to exclusive networking opportunities
• Certification recognized by top employers

Ready to transform your career trajectory? 

👉 Comment "READY" below or send me a DM to learn more about our upcoming cohort.

#ProfessionalDevelopment #CareerGrowth #AI #LinkedIn #Leadership #Skills`;

      setGeneratedPost(mockPost);
      setShowResponse(true);
      setIsGenerating(false);
    }, 2000);
  };

  const handlePostNow = () => {
    if (!isLinkedInConnected()) {
      setShowIntegrationDialog(true);
      return;
    }

    // LinkedIn is connected, proceed with posting
    toast({
      title: "Posting to LinkedIn",
      description: "Your post is being published to LinkedIn.",
    });
    
    console.log('Publishing to LinkedIn:', { content: generatedPost });
  };

  const handleEditPost = () => {
    setEditedContent(generatedPost);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    setGeneratedPost(editedContent);
    setIsEditing(false);
    toast({
      title: "Post Updated",
      description: "Your post content has been updated successfully.",
    });
  };

  const handleCancelEdit = () => {
    setEditedContent("");
    setIsEditing(false);
  };

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-br from-blue-50 via-slate-50/30 to-indigo-50/20 overflow-y-auto">
      <div className="max-w-5xl mx-auto p-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/20 shadow-lg">
            <Linkedin className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Powered by AI</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#0077B5] via-[#00A0DC] to-[#0E76A8] bg-clip-text text-transparent">
            LinkedIn AI Post Generator
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Create professional, engaging LinkedIn posts that drive meaningful business connections
          </p>
        </div>

        {/* Media Upload Section */}
        <Card className="relative overflow-hidden bg-white/70 backdrop-blur-xl border border-white/30 shadow-xl shadow-blue-500/10">
          <CardHeader className="relative pb-4">
            <CardTitle className="text-xl font-bold text-gray-900 flex items-center space-x-3">
              <div className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500">
                <Upload className="w-5 h-5 text-white" />
              </div>
              <span>Upload Media</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            {!uploadedMedia ? (
              <div className="border-2 border-dashed border-blue-200 rounded-xl p-8 text-center hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-200">
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="linkedin-media-upload"
                />
                <label htmlFor="linkedin-media-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-700 mb-2">
                    Drop your files here, or browse
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports: JPG, PNG, MP4, MOV (max 50MB)
                  </p>
                </label>
              </div>
            ) : (
              <div className="border border-blue-200 rounded-xl p-6 bg-blue-50/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {uploadedMedia.type.startsWith('image/') ? (
                      <ImageIcon className="w-8 h-8 text-blue-600" />
                    ) : (
                      <Video className="w-8 h-8 text-blue-600" />
                    )}
                    <div>
                      <p className="font-medium text-gray-900">{uploadedMedia.name}</p>
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

        {/* Image Preview Section */}
        {uploadedMedia && mediaPreviewUrl && (
          <Card className="relative overflow-hidden bg-white border border-gray-200 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold text-gray-900 flex items-center space-x-3">
                <div className="p-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700">
                  <ImageIcon className="w-4 h-4 text-white" />
                </div>
                <span>Media Preview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full rounded-lg overflow-hidden shadow-lg border border-gray-200">
                {uploadedMedia.type.startsWith('image/') ? (
                  <img 
                    src={mediaPreviewUrl} 
                    alt="Uploaded preview" 
                    className="w-full h-auto object-cover max-h-96"
                  />
                ) : (
                  <video 
                    src={mediaPreviewUrl} 
                    className="w-full h-auto object-cover max-h-96"
                    controls
                  />
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* AI Configuration Card */}
        <Card className="relative overflow-hidden bg-white/70 backdrop-blur-xl border border-white/30 shadow-2xl shadow-blue-500/10">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5" />
          <CardHeader className="relative pb-6">
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
              <div className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500">
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
                  <SelectTrigger className="h-12 bg-white/80 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 focus:ring-2 focus:ring-blue-500/20">
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

              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                  <Wand2 className="w-4 h-4" />
                  <span>Page Selection</span>
                </Label>
                <Select value={selectedPage} onValueChange={setSelectedPage}>
                  <SelectTrigger className="h-12 bg-white/80 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 focus:ring-2 focus:ring-blue-500/20">
                    <SelectValue placeholder="Choose your page" />
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

              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                  <Zap className="w-4 h-4" />
                  <span>AI Model</span>
                </Label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger className="h-12 bg-white/80 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 focus:ring-2 focus:ring-blue-500/20">
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
            <div className="space-y-4">
              <Label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>Describe your professional post idea</span>
              </Label>
              <div className="relative">
                <Textarea
                  placeholder="e.g., Create a thought leadership post about AI transformation in business..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[120px] bg-white/80 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 focus:ring-2 focus:ring-blue-500/20 resize-none text-base"
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
                className="relative group bg-gradient-to-r from-[#0077B5] to-[#00A0DC] hover:from-blue-700 hover:to-blue-600 text-white px-12 py-4 text-lg font-semibold rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/20 to-indigo-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {(isGenerating || showResponse) && (
          <div className="space-y-6">
            {/* Section Header */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Generated Post</h2>
              <p className="text-gray-600">AI-powered content ready for your LinkedIn page</p>
            </div>

            {/* Loading State or Generated Post Card */}
            {isGenerating ? (
              <Card className="max-w-2xl mx-auto bg-white/60 backdrop-blur-xl border border-white/30 shadow-xl">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="flex items-center space-x-3 mb-4">
                    <Sparkles className="w-6 h-6 text-blue-600 animate-spin" />
                    <span className="text-lg font-medium text-gray-700">Generating post...</span>
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
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
                <CardContent className="p-8">
                  {/* Mock LinkedIn Post Preview */}
                  <div className="relative p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200/50 shadow-lg">
                    {/* Post Header */}
                    <div className="flex items-center space-x-4 mb-6">
                      <Avatar className="w-12 h-12 shadow-md">
                        <AvatarImage src="/lovable-uploads/e3966193-4894-406f-af40-baf88594caa3.png" />
                        <AvatarFallback className="bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600 font-semibold">
                          {selectedPage?.split(' ').map(word => word[0]).join('') || 'LM'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-bold text-gray-900 text-base">{selectedPage || 'Your Page'}</p>
                        <p className="text-sm text-gray-500">1st • Promoted</p>
                        <p className="text-xs text-gray-400">Just now</p>
                      </div>
                      <MoreHorizontal className="w-5 h-5 text-gray-400" />
                    </div>
                    
                    {/* Post Content */}
                    <div className="space-y-4">
                      {isEditing ? (
                        <div className="space-y-3">
                          <Textarea
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            className="min-h-[200px] text-sm whitespace-pre-wrap resize-none border-2 border-blue-200 focus:border-blue-400 transition-colors"
                            placeholder="Edit your LinkedIn post..."
                            maxLength={3000}
                          />
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">{editedContent.length}/3000 characters</span>
                            <div className="flex space-x-2">
                              <Button 
                                onClick={handleCancelEdit}
                                variant="outline" 
                                size="sm"
                                className="text-gray-600 hover:text-gray-800"
                              >
                                Cancel
                              </Button>
                              <Button 
                                onClick={handleSaveEdit}
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                              >
                                Save Changes
                              </Button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-800 whitespace-pre-line leading-relaxed text-sm">
                          {generatedPost}
                        </p>
                      )}
                    </div>

                    {/* Show uploaded media preview if available */}
                    {uploadedMedia && mediaPreviewUrl && (
                      <div className="w-full rounded-lg overflow-hidden shadow-lg border border-gray-200 my-4">
                        {uploadedMedia.type.startsWith('image/') ? (
                          <img 
                            src={mediaPreviewUrl} 
                            alt="Uploaded preview" 
                            className="w-full h-auto object-cover max-h-96"
                          />
                        ) : (
                          <video 
                            src={mediaPreviewUrl} 
                            className="w-full h-auto object-cover max-h-96"
                            controls
                          />
                        )}
                      </div>
                    )}
                    
                    {/* LinkedIn Engagement Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-1 text-gray-500 text-sm">
                        <ThumbsUp className="w-4 h-4 text-blue-600" />
                        <span>142 reactions</span>
                      </div>
                      <div className="flex space-x-4 text-sm text-gray-500">
                        <span>23 comments</span>
                        <span>15 reposts</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-3">
                      <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 p-2 rounded hover:bg-blue-50 transition-colors">
                        <ThumbsUp className="w-5 h-5" />
                        <span className="text-sm font-medium">Like</span>
                      </button>
                      <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 p-2 rounded hover:bg-blue-50 transition-colors">
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-sm font-medium">Comment</span>
                      </button>
                      <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 p-2 rounded hover:bg-blue-50 transition-colors">
                        <Repeat2 className="w-5 h-5" />
                        <span className="text-sm font-medium">Repost</span>
                      </button>
                      <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 p-2 rounded hover:bg-blue-50 transition-colors">
                        <Send className="w-5 h-5" />
                        <span className="text-sm font-medium">Send</span>
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                    <Button 
                      onClick={handlePostNow}
                      className="group relative h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
                    >
                      <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                      <span className="font-semibold">Post Now</span>
                    </Button>
                    <Button variant="outline" className="h-12 bg-white/80 backdrop-blur-sm border-blue-200 hover:bg-blue-50 hover:shadow-lg rounded-xl transition-all duration-300 hover:scale-105 text-blue-700">
                      <Save className="w-4 h-4 mr-2" />
                      <span className="font-semibold">Save to Draft</span>
                    </Button>
                    <Button variant="outline" className="h-12 bg-white/80 backdrop-blur-sm border-blue-200 hover:bg-blue-50 hover:shadow-lg rounded-xl transition-all duration-300 hover:scale-105 text-blue-700">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="font-semibold">Schedule</span>
                    </Button>
                     <Button 
                       onClick={handleEditPost}
                       variant="outline" 
                       className="h-12 bg-white/80 backdrop-blur-sm border-blue-200 hover:bg-blue-50 hover:shadow-lg rounded-xl transition-all duration-300 hover:scale-105 text-blue-700"
                     >
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
      
      {/* LinkedIn Integration Dialog */}
      <LinkedInIntegrationDialog 
        open={showIntegrationDialog}
        onOpenChange={setShowIntegrationDialog}
      />
    </div>
  );
}
