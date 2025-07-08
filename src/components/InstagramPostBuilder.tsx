import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { InstagramIntegrationDialog } from "./InstagramIntegrationDialog";
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
  Bookmark,
  Upload,
  X,
  Image as ImageIcon
} from "lucide-react";

type PostType = 'post' | 'reel' | 'carousel';

export function InstagramPostBuilder() {
  const { isInstagramConnected } = useSocialIntegration();
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
  const [carouselImages, setCarouselImages] = useState<File[]>([]);
  const [carouselPreviewUrls, setCarouselPreviewUrls] = useState<string[]>([]);
  const [showIntegrationDialog, setShowIntegrationDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');

  const postTypes = [
    { value: 'post', label: 'Post', icon: FileText, emoji: '📝' },
    { value: 'reel', label: 'Reel', icon: Video, emoji: '🎬' },
    { value: 'carousel', label: 'Carousel', icon: ImageIcon, emoji: '🎠' }
  ];

  const audiences = [
    'Gen Z (18-24)',
    'Millennials (25-40)',
    'Creative Professionals',
    'Entrepreneurs',
    'Lifestyle Enthusiasts',
    'Tech Enthusiasts'
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
    const files = event.target.files;
    if (!files) return;

    if (selectedPostType === 'carousel') {
      // Handle multiple files for carousel
      const newFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
      if (newFiles.length > 0) {
        setCarouselImages(prev => [...prev, ...newFiles]);
        
        // Create preview URLs for carousel images
        const newUrls = newFiles.map(file => URL.createObjectURL(file));
        setCarouselPreviewUrls(prev => [...prev, ...newUrls]);
      }
    } else {
      // Handle single file for post/reel
      const file = files[0];
      if (file) {
        setUploadedMedia(file);
        
        // Create preview URL for the uploaded file
        const url = URL.createObjectURL(file);
        setMediaPreviewUrl(url);
      }
    }
  };

  const removeUploadedMedia = () => {
    if (mediaPreviewUrl) {
      URL.revokeObjectURL(mediaPreviewUrl);
    }
    setUploadedMedia(null);
    setMediaPreviewUrl(null);
  };

  const removeCarouselImage = (index: number) => {
    // Revoke the URL to prevent memory leaks
    if (carouselPreviewUrls[index]) {
      URL.revokeObjectURL(carouselPreviewUrls[index]);
    }
    
    setCarouselImages(prev => prev.filter((_, i) => i !== index));
    setCarouselPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleGeneratePost = async () => {
    if (!selectedAudience || !selectedPage || !selectedModel || !prompt) {
      return;
    }

    setIsGenerating(true);
    setShowResponse(false);
    
    // Simulate AI generation
    setTimeout(() => {
      const contentType = selectedPostType === 'reel' ? 'Instagram Reel' : selectedPostType === 'carousel' ? 'Instagram Carousel' : 'Instagram post';
      const mockPost = `✨ Amazing ${contentType.toLowerCase()} for ${selectedAudience.toLowerCase()}! 

${prompt}

Transform your career with AI-powered solutions! 🚀

💫 What's included:
• Expert guidance
• Hands-on learning
• Industry certification
• Community support

Ready to level up? Drop a 🔥 in the comments!

#LeadMastersAI #CareerGrowth #AI #Innovation #SkillBuilding #ProfessionalDevelopment${selectedPostType === 'reel' ? ' #Reels #InstagramReels #Trending' : selectedPostType === 'carousel' ? ' #Carousel #MultiplePhotos #Swipe' : ' #InstaPost'}`;

      setGeneratedPost(mockPost);
      setShowResponse(true);
      setIsGenerating(false);
    }, 2000);
  };

  const handlePostNow = () => {
    if (!isInstagramConnected()) {
      setShowIntegrationDialog(true);
      return;
    }

    // Instagram is connected, proceed with posting
    toast({
      title: "Posting to Instagram",
      description: `Your ${selectedPostType} is being published to Instagram.`,
    });
    
    console.log("Publishing to Instagram:", { content: generatedPost, postType: selectedPostType });
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
    <div className="flex-1 min-h-screen bg-gradient-to-br from-pink-50 via-purple-50/30 to-orange-50/20 overflow-y-auto">
      <div className="max-w-5xl mx-auto p-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/20 shadow-lg">
            <Zap className="w-4 h-4 text-pink-600" />
            <span className="text-sm font-medium text-gray-700">Powered by AI</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#E91E63] via-[#9C27B0] to-[#FF9800] bg-clip-text text-transparent">
            Instagram AI {selectedPostType === 'reel' ? 'Reel' : selectedPostType === 'carousel' ? 'Carousel' : 'Post'} Generator
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Create stunning, AI-powered Instagram {selectedPostType === 'reel' ? 'reels' : selectedPostType === 'carousel' ? 'carousels' : 'posts'} that captivate your audience
          </p>
        </div>

        {/* Media Upload Section */}
        <Card className="relative overflow-hidden bg-white/70 backdrop-blur-xl border border-white/30 shadow-xl shadow-pink-500/10">
          <CardHeader className="relative pb-4">
            <CardTitle className="text-xl font-bold text-gray-900 flex items-center space-x-3">
              <div className="p-2 rounded-full bg-gradient-to-r from-pink-500 to-orange-500">
                <Upload className="w-5 h-5 text-white" />
              </div>
              <span>Upload Media</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            {selectedPostType === 'carousel' ? (
              /* Carousel Upload Section */
              <div className="space-y-4">
                <div className="border-2 border-dashed border-pink-200 rounded-xl p-8 text-center hover:border-pink-300 hover:bg-pink-50/50 transition-all duration-200">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="instagram-carousel-upload"
                  />
                  <label htmlFor="instagram-carousel-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-pink-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-700 mb-2">
                      Upload multiple images for carousel
                    </p>
                    <p className="text-sm text-gray-500">
                      Supports: JPG, PNG (max 10 images, 50MB each)
                    </p>
                  </label>
                </div>
                
                {/* Carousel Images Preview */}
                {carouselImages.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {carouselImages.map((file, index) => (
                      <div key={index} className="relative border border-pink-200 rounded-lg p-3 bg-pink-50/50">
                        <div className="flex items-center space-x-2">
                          <ImageIcon className="w-6 h-6 text-pink-600 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 text-sm truncate">{file.name}</p>
                            <p className="text-xs text-gray-500">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeCarouselImage(index)}
                            className="text-gray-500 hover:text-red-500 h-6 w-6 p-0"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                        {carouselPreviewUrls[index] && (
                          <img 
                            src={carouselPreviewUrls[index]} 
                            alt={`Preview ${index + 1}`}
                            className="mt-2 w-full h-20 object-cover rounded"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : !uploadedMedia ? (
              <div className="border-2 border-dashed border-pink-200 rounded-xl p-8 text-center hover:border-pink-300 hover:bg-pink-50/50 transition-all duration-200">
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="instagram-media-upload"
                />
                <label htmlFor="instagram-media-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-pink-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-700 mb-2">
                    Drop your files here, or browse
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports: JPG, PNG, MP4, MOV (max 50MB)
                  </p>
                </label>
              </div>
            ) : (
              <div className="border border-pink-200 rounded-xl p-6 bg-pink-50/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {uploadedMedia.type.startsWith('image/') ? (
                      <ImageIcon className="w-8 h-8 text-pink-600" />
                    ) : (
                      <Video className="w-8 h-8 text-pink-600" />
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

        {/* AI Configuration Card */}
        <Card className="relative overflow-hidden bg-white/70 backdrop-blur-xl border border-white/30 shadow-2xl shadow-pink-500/10">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-orange-500/5" />
          <CardHeader className="relative pb-6">
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
              <div className="p-2 rounded-full bg-gradient-to-r from-pink-500 to-orange-500">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span>AI {selectedPostType === 'reel' ? 'Reel' : selectedPostType === 'carousel' ? 'Carousel' : 'Post'} Configuration</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="relative space-y-8">
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
                          ? 'bg-gradient-to-r from-[#E91E63] to-[#FF9800] text-white font-semibold shadow-lg hover:from-pink-700 hover:to-orange-600 hover:text-white border-transparent' 
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
            <div className="grid md:grid-cols-4 gap-8">
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Target Audience</span>
                </Label>
                <Select value={selectedAudience} onValueChange={setSelectedAudience}>
                  <SelectTrigger className="h-8 bg-white/80 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 focus:ring-2 focus:ring-pink-500/20">
                    <SelectValue placeholder="Select your audience" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-xl border-white/30 shadow-2xl">
                    {audiences.map((audience) => (
                      <SelectItem key={audience} value={audience} className="hover:bg-pink-50/80">
                        {audience}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                  <Wand2 className="w-4 h-4" />
                  <span>Account Selection</span>
                </Label>
                <Select value={selectedPage} onValueChange={setSelectedPage}>
                  <SelectTrigger className="h-8 bg-white/80 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 focus:ring-2 focus:ring-pink-500/20">
                    <SelectValue placeholder="Choose your account" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-xl border-white/30 shadow-2xl">
                    {pages.map((page) => (
                      <SelectItem key={page} value={page} className="hover:bg-pink-50/80">
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
                  <SelectTrigger className="h-8 bg-white/80 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 focus:ring-2 focus:ring-pink-500/20">
                    <SelectValue placeholder="Select AI model" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-xl border-white/30 shadow-2xl">
                    {aiModels.map((model) => (
                      <SelectItem key={model} value={model} className="hover:bg-pink-50/80">
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
                  placeholder={`e.g., Create a trendy ${selectedPostType} about AI tools for creative professionals...`}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[120px] bg-white/80 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 focus:ring-2 focus:ring-pink-500/20 resize-none text-base"
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
                className="relative group bg-gradient-to-r from-[#E91E63] to-[#FF9800] hover:from-pink-700 hover:to-orange-600 text-white px-12 py-4 text-lg font-semibold rounded-2xl shadow-2xl hover:shadow-pink-500/25 transition-all duration-500 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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
                    <span>Generate AI {selectedPostType === 'reel' ? 'Reel' : selectedPostType === 'carousel' ? 'Carousel' : 'Post'}</span>
                  </>
                )}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Generated Post Results Section */}
        {(isGenerating || showResponse) && (
          <div className="space-y-6">
            {/* Section Header */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Generated {selectedPostType === 'reel' ? 'Reel' : selectedPostType === 'carousel' ? 'Carousel' : 'Post'}</h2>
              <p className="text-gray-600">AI-powered content ready for your Instagram account</p>
            </div>

            {/* Loading State or Generated Post Card */}
            {isGenerating ? (
              <Card className="max-w-4xl mx-auto bg-white/60 backdrop-blur-xl border border-white/30 shadow-xl">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="flex items-center space-x-3 mb-4">
                    <Sparkles className="w-6 h-6 text-pink-600 animate-spin" />
                    <span className="text-lg font-medium text-gray-700">Generating {selectedPostType}...</span>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="max-w-4xl mx-auto relative overflow-hidden bg-white/90 backdrop-blur-xl border border-white/40 shadow-2xl shadow-pink-500/10 animate-in fade-in duration-700 slide-in-from-bottom-8">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-orange-500" />
                <CardContent className="p-8">
                  {/* Mock Instagram Post Preview */}
                  <div className="relative p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200/50 shadow-lg">
                    {/* Post Header */}
                    <div className="flex items-center space-x-4 mb-6">
                      <Avatar className="w-12 h-12 shadow-md">
                        <AvatarImage src="/lovable-uploads/e3966193-4894-406f-af40-baf88594caa3.png" />
                        <AvatarFallback className="bg-gradient-to-br from-pink-100 to-orange-100 text-pink-600 font-semibold">
                          {selectedPage?.split(' ').map(word => word[0]).join('') || 'LM'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-bold text-gray-900 text-base">{selectedPage || 'Your Account'}</p>
                        <p className="text-sm text-gray-500">Sponsored</p>
                      </div>
                      <MoreHorizontal className="w-5 h-5 text-gray-400" />
                    </div>
                    
                    {/* Media Section */}
                    {selectedPostType === 'carousel' && carouselImages.length > 0 ? (
                      <div className="w-full rounded-lg overflow-hidden shadow-lg border border-gray-200 mb-4 relative">
                        <Carousel className="w-full">
                          <CarouselContent>
                            {carouselPreviewUrls.map((url, index) => (
                              <CarouselItem key={index}>
                                <img 
                                  src={url} 
                                  alt={`Carousel image ${index + 1}`}
                                  className="w-full h-96 object-cover"
                                />
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <CarouselPrevious className="left-2" />
                          <CarouselNext className="right-2" />
                        </Carousel>
                        {/* Carousel indicator dots */}
                        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
                          {carouselPreviewUrls.map((_, index) => (
                            <div key={index} className="w-1.5 h-1.5 bg-white/70 rounded-full" />
                          ))}
                        </div>
                        <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                          {carouselImages.length}/10
                        </div>
                      </div>
                    ) : uploadedMedia && mediaPreviewUrl ? (
                      <div className="w-full rounded-lg overflow-hidden shadow-lg border border-gray-200 mb-4">
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
                    ) : selectedPostType === 'reel' ? (
                      <div className="w-full h-96 bg-gradient-to-br from-pink-100 to-orange-100 rounded-lg mb-4 flex items-center justify-center relative">
                        <Video className="w-16 h-16 text-pink-400" />
                        <div className="absolute top-4 left-4 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                          REEL
                        </div>
                      </div>
                    ) : selectedPostType === 'carousel' && (
                      <div className="w-full h-96 bg-gradient-to-br from-pink-100 to-orange-100 rounded-lg mb-4 flex items-center justify-center relative">
                        <ImageIcon className="w-16 h-16 text-pink-400" />
                        <div className="absolute top-4 left-4 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                          CAROUSEL
                        </div>
                      </div>
                    )}
                    
                    {/* Post Content */}
                    <div className="space-y-4">
                      {/* Engagement buttons */}
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-4">
                          <button className="text-gray-600 hover:text-red-500 transition-colors">
                            <Heart className="w-6 h-6" />
                          </button>
                          <button className="text-gray-600 hover:text-blue-500 transition-colors">
                            <MessageCircle className="w-6 h-6" />
                          </button>
                          <button className="text-gray-600 hover:text-green-500 transition-colors">
                            <Send className="w-6 h-6" />
                          </button>
                        </div>
                        <button className="text-gray-600 hover:text-yellow-500 transition-colors">
                          <Bookmark className="w-6 h-6" />
                        </button>
                      </div>
                      
                        <div className="space-y-2">
                          <p className="text-sm font-semibold">247 likes</p>
                          {isEditing ? (
                            <div className="space-y-3">
                              <Textarea
                                value={editedContent}
                                onChange={(e) => setEditedContent(e.target.value)}
                                className="min-h-[200px] text-sm"
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
                            <p className="text-sm text-gray-800">
                              <span className="font-semibold">{selectedPage?.toLowerCase().replace(/\s+/g, "") || "leadmastersai"}</span>{" "}
                              {generatedPost}
                            </p>
                          )}
                        <p className="text-sm text-gray-500">View all 12 comments</p>
                        <p className="text-xs text-gray-400 uppercase tracking-wide">2 hours ago</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                    <Button 
                      onClick={handlePostNow}
                      className="group relative h-12 bg-gradient-to-r from-pink-600 to-orange-600 hover:from-pink-700 hover:to-orange-700 text-white rounded-xl shadow-lg hover:shadow-pink-500/25 transition-all duration-300 hover:scale-105"
                    >
                      <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                      <span className="font-semibold">Post Now</span>
                    </Button>
                    <Button variant="outline" className="h-12 bg-white/80 backdrop-blur-sm border-pink-200 hover:bg-pink-50 hover:shadow-lg rounded-xl transition-all duration-300 hover:scale-105 text-pink-700">
                      <Save className="w-4 h-4 mr-2" />
                      <span className="font-semibold">Save to Draft</span>
                    </Button>
                    <Button variant="outline" className="h-12 bg-white/80 backdrop-blur-sm border-pink-200 hover:bg-pink-50 hover:shadow-lg rounded-xl transition-all duration-300 hover:scale-105 text-pink-700">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="font-semibold">Schedule</span>
                    </Button>
                    <Button variant="outline" className="h-12 bg-white/80 backdrop-blur-sm border-pink-200 hover:bg-pink-50 hover:shadow-lg rounded-xl transition-all duration-300 hover:scale-105 text-pink-700">
                      <Edit className="w-4 h-4 mr-2" />
                      <span className="font-semibold" onClick={handleEditPost}>Edit Post</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
      
      {/* Instagram Integration Dialog */}
      <InstagramIntegrationDialog 
        open={showIntegrationDialog}
        onOpenChange={setShowIntegrationDialog}
      />
    </div>
  );
}
