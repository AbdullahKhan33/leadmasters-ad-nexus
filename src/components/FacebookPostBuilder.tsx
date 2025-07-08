import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FacebookIntegrationDialog } from "./FacebookIntegrationDialog";
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
  FileText,
  Video,
  Upload,
  X,
  Image as ImageIcon
} from "lucide-react";

type PostType = 'post' | 'reel';

export function FacebookPostBuilder() {
  const { isFacebookConnected } = useSocialIntegration();
  const { toast } = useToast();
  const [selectedPostType, setSelectedPostType] = useState<PostType>('post');
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

  const postTypes = [
    { value: 'post', label: 'Post', icon: FileText, emoji: '📝' },
    { value: 'reel', label: 'Reel', icon: Video, emoji: '🎬' }
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

  const getContentTypeLabel = () => {
    switch (selectedPostType) {
      case 'reel': return 'Reel';
      default: return 'Post';
    }
  };

  const handlePostNow = () => {
    if (!isFacebookConnected()) {
      setShowIntegrationDialog(true);
      return;
    }

    // Facebook is connected, proceed with posting
    toast({
      title: "Posting to Facebook",
      description: `Your ${selectedPostType} is being published to Facebook.`,
    });
    
    console.log("Publishing to Facebook:", { content: generatedPost, postType: selectedPostType });
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
    <div className="flex-1 min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/20 overflow-y-auto">
      <div className="max-w-5xl mx-auto p-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/20 shadow-lg">
            <Zap className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">Powered by AI</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#D946EF] bg-clip-text text-transparent">
            Facebook AI {getContentTypeLabel()} Generator
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Create engaging, AI-powered Facebook {selectedPostType === 'reel' ? 'reels' : 'posts'} that resonate with your audience
          </p>
        </div>

        {/* Media Upload Section */}
        <Card className="relative overflow-hidden bg-white/70 backdrop-blur-xl border border-white/30 shadow-xl shadow-purple-500/10 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500">
          <CardHeader className="relative pb-4">
            <CardTitle className="text-xl font-bold text-gray-900 flex items-center space-x-3">
              <div className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                <Upload className="w-5 h-5 text-white" />
              </div>
              <span>Upload Media</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            {!uploadedMedia ? (
              <div className="border-2 border-dashed border-purple-200 rounded-xl p-8 text-center hover:border-purple-300 hover:bg-purple-50/50 transition-all duration-200">
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="facebook-media-upload"
                />
                <label htmlFor="facebook-media-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-700 mb-2">
                    Drop your files here, or browse
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports: JPG, PNG, MP4, MOV (max 50MB)
                  </p>
                </label>
              </div>
            ) : (
              <div className="border border-purple-200 rounded-xl p-6 bg-purple-50/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {uploadedMedia.type.startsWith('image/') ? (
                      <ImageIcon className="w-8 h-8 text-purple-600" />
                    ) : (
                      <Video className="w-8 h-8 text-purple-600" />
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

        {/* Thumbnail Preview Section */}
        {uploadedMedia && mediaPreviewUrl && (
          <Card className="relative overflow-hidden bg-white border border-gray-200 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold text-gray-900 flex items-center space-x-3">
                <div className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500">
                  <ImageIcon className="w-4 h-4 text-white" />
                </div>
                <span>Media Preview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                  {uploadedMedia.type.startsWith('image/') ? (
                    <img 
                      src={mediaPreviewUrl} 
                      alt="Uploaded thumbnail" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-300">
                      <Video className="w-6 h-6 text-gray-600" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 truncate">{uploadedMedia.name}</p>
                  <p className="text-sm text-gray-500">
                    {(uploadedMedia.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* AI Configuration Card with Glassmorphism */}
        <Card className="relative overflow-hidden backdrop-blur-xl border border-white/40 shadow-2xl shadow-purple-500/20 hover:shadow-purple-500/30 transition-all duration-700">
          {/* Glassmorphism background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-purple-50/60 to-pink-50/40 backdrop-blur-xl" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-pink-500/10" />
          
          <CardContent className="relative space-y-8 pt-8">
            {/* Content Type Toggle Pills */}
            <div className="space-y-4">
              <Label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>Content Type</span>
              </Label>
              <div className="flex items-center space-x-2">
                {postTypes.map((type) => {
                  const isActive = selectedPostType === type.value;
                  
                  return (
                    <Button
                      key={type.value}
                      variant="ghost"
                      onClick={() => setSelectedPostType(type.value as PostType)}
                      className={`
                        px-5 py-2 rounded-full transition-all duration-200 ease-out flex items-center space-x-2.5 relative group cursor-pointer border
                        ${isActive 
                          ? 'bg-gradient-to-r from-[#7C3AED] to-[#D946EF] text-white font-semibold shadow-lg hover:from-purple-700 hover:to-pink-600 hover:text-white border-transparent' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-white/80 font-medium bg-white/50 border-gray-200 hover:border-gray-300 hover:shadow-md'
                        }
                      `}
                    >
                      <span className="text-lg">{type.emoji}</span>
                      <span className="font-semibold">{type.label}</span>
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Configuration Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Target Audience</span>
                </Label>
                <Select value={selectedAudience} onValueChange={setSelectedAudience}>
                  <SelectTrigger className="h-11 bg-white/90 backdrop-blur-sm border-purple-200/60 hover:bg-white hover:border-purple-300 focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400 transition-all duration-300 hover:shadow-lg">
                    <SelectValue placeholder="Select your audience" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-xl border-purple-200/60 shadow-xl shadow-purple-500/20">
                    {audiences.map((audience) => (
                      <SelectItem key={audience} value={audience} className="hover:bg-purple-50/80 focus:bg-purple-50">
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
                  <SelectTrigger className="h-11 bg-white/90 backdrop-blur-sm border-purple-200/60 hover:bg-white hover:border-purple-300 focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400 transition-all duration-300 hover:shadow-lg">
                    <SelectValue placeholder="Choose your page" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-xl border-purple-200/60 shadow-xl shadow-purple-500/20">
                    {pages.map((page) => (
                      <SelectItem key={page} value={page} className="hover:bg-purple-50/80 focus:bg-purple-50">
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
                  <SelectTrigger className="h-11 bg-white/90 backdrop-blur-sm border-purple-200/60 hover:bg-white hover:border-purple-300 focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400 transition-all duration-300 hover:shadow-lg">
                    <SelectValue placeholder="Select AI model" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-xl border-purple-200/60 shadow-xl shadow-purple-500/20">
                    {aiModels.map((model) => (
                      <SelectItem key={model} value={model} className="hover:bg-purple-50/80 focus:bg-purple-50">
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
                  className="min-h-[120px] bg-white/90 backdrop-blur-sm border-white/60 shadow-lg hover:shadow-xl transition-all duration-300 focus:ring-2 focus:ring-purple-500/30 focus:shadow-2xl resize-none text-base"
                />
                {prompt && (
                  <div className="absolute top-3 right-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  </div>
                )}
              </div>
            </div>

            {/* Generate Button with Enhanced Hover */}
            <div className="flex justify-center pt-6">
              <Button
                onClick={handleGeneratePost}
                disabled={!selectedAudience || !selectedPage || !selectedModel || !prompt || isGenerating}
                className="relative group bg-gradient-to-r from-[#7C3AED] to-[#D946EF] hover:from-purple-700 hover:to-pink-600 text-white px-12 py-4 text-lg font-semibold rounded-2xl shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 hover:scale-105 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0"
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
                    <span>Generate AI {getContentTypeLabel()}</span>
                  </>
                )}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Generated content section */}
        {(isGenerating || showResponse) && (
          <div className="space-y-6">
            {/* Section Header */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Generated {getContentTypeLabel()}</h2>
              <p className="text-gray-600">AI-powered content ready for your Facebook page</p>
            </div>

            {/* Loading State or Generated Post Card */}
            {isGenerating ? (
              <Card className="max-w-4xl mx-auto bg-white/60 backdrop-blur-xl border border-white/30 shadow-xl">
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
              <Card className="max-w-4xl mx-auto relative overflow-hidden bg-white/95 backdrop-blur-xl border border-white/50 shadow-2xl shadow-purple-500/20 animate-in fade-in duration-700 slide-in-from-bottom-8 hover:shadow-3xl hover:shadow-purple-500/30 transition-all duration-500">
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
                       {isEditing ? (
                         <div className="space-y-3">
                           <Textarea
                             value={editedContent}
                             onChange={(e) => setEditedContent(e.target.value)}
                             className="min-h-[200px] text-base whitespace-pre-wrap"
                             placeholder="Edit your post content..."
                           />
                           <div className="flex space-x-2">
                             <Button size="sm" onClick={handleSaveEdit} className="bg-green-600 hover:bg-green-700 text-white">
                               Save
                             </Button>
                             <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                               Cancel
                             </Button>
                           </div>
                         </div>
                       ) : (
                         <p className="text-gray-800 whitespace-pre-line leading-relaxed text-base">
                           {generatedPost}
                         </p>
                       )}

                      {/* Show actual image preview if available */}
                      {uploadedMedia && mediaPreviewUrl && (
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
                      )}
                      
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

                   {/* Action Buttons with Enhanced Hover */}
                   <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                     <Button 
                       onClick={handlePostNow}
                       className="group relative h-12 bg-gradient-to-r from-[#7C3AED] to-[#D946EF] hover:from-purple-700 hover:to-pink-600 text-white rounded-xl shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                     >
                       <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                       <span className="font-semibold">Post Now</span>
                     </Button>
                     <Button variant="outline" className="h-12 bg-white/90 backdrop-blur-sm border-purple-200 hover:bg-purple-50 hover:shadow-lg hover:border-purple-300 rounded-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 text-purple-700">
                       <Save className="w-4 h-4 mr-2" />
                       <span className="font-semibold">Save Draft</span>
                     </Button>
                     <Button variant="outline" className="h-12 bg-white/90 backdrop-blur-sm border-purple-200 hover:bg-purple-50 hover:shadow-lg hover:border-purple-300 rounded-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 text-purple-700">
                       <Calendar className="w-4 h-4 mr-2" />
                       <span className="font-semibold">Schedule</span>
                     </Button>
                     <Button 
                       onClick={handleEditPost}
                       variant="outline" 
                       className="h-12 bg-white/90 backdrop-blur-sm border-purple-200 hover:bg-purple-50 hover:shadow-lg hover:border-purple-300 rounded-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 text-purple-700"
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
      
      {/* Facebook Integration Dialog */}
      <FacebookIntegrationDialog 
        open={showIntegrationDialog}
        onOpenChange={setShowIntegrationDialog}
      />
    </div>
  );
}
