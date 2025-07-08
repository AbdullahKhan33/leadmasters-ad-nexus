
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThreadsIntegrationDialog } from "./ThreadsIntegrationDialog";
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
  Repeat2,
  AtSign,
  Upload,
  X,
  Image as ImageIcon,
  Video
} from "lucide-react";

export function ThreadsPostBuilder() {
  const { isThreadsConnected } = useSocialIntegration();
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

  console.log('ThreadsPostBuilder component rendered');

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
      console.log('Missing required fields for post generation');
      return;
    }

    console.log('Starting post generation...');
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

      console.log('Post generation completed');
      setGeneratedPost(mockPost);
      setShowResponse(true);
      setIsGenerating(false);
    }, 2000);
  };

  const handlePostNow = () => {
    if (!isThreadsConnected()) {
      setShowIntegrationDialog(true);
      return;
    }

    toast({
      title: "Posting to Threads",
      description: "Your post is being published to Threads.",
    });
    
    console.log('Publishing to Threads:', { content: generatedPost });
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
    <div className="flex-1 min-h-screen bg-gray-50 overflow-y-auto">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200">
            <Zap className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-800">Powered by AI</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Threads AI Post Generator
          </h1>
          <p className="text-gray-600 text-base max-w-2xl mx-auto">
            Create authentic, conversation-starting posts for Threads community
          </p>
        </div>

        {/* Media Upload Section */}
        <Card className="relative overflow-hidden bg-white border border-gray-200 shadow-lg">
          <CardHeader className="relative pb-3">
            <CardTitle className="text-lg font-bold text-gray-900 flex items-center space-x-3">
              <div className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                <Upload className="w-4 h-4 text-white" />
              </div>
              <span>Upload Media</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            {!uploadedMedia ? (
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-purple-300 hover:bg-purple-50/50 transition-all duration-200">
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="threads-media-upload"
                />
                <label htmlFor="threads-media-upload" className="cursor-pointer">
                  <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                  <p className="text-base font-medium text-gray-700 mb-1">
                    Drop your files here, or browse
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports: JPG, PNG, MP4, MOV (max 50MB)
                  </p>
                </label>
              </div>
            ) : (
              <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                <div className="flex items-center space-x-4">
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
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={removeUploadedMedia}
                    className="text-gray-500 hover:text-red-500 hover:bg-red-50"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* AI Configuration Card */}
        <Card className="relative overflow-hidden bg-white border border-gray-200 shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-50/50 to-pink-50/50" />
          <CardHeader className="relative pb-4">
            <CardTitle className="text-xl font-bold text-gray-900 flex items-center space-x-3">
              <div className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                <AtSign className="w-5 h-5 text-white" />
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
                  <SelectTrigger className="h-10 bg-white border-gray-200 text-gray-900 shadow-sm hover:shadow-md transition-all duration-300 focus:ring-2 focus:ring-purple-500/20">
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

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                  <Wand2 className="w-4 h-4" />
                  <span>Page Selection</span>
                </Label>
                <Select value={selectedPage} onValueChange={setSelectedPage}>
                  <SelectTrigger className="h-10 bg-white border-gray-200 text-gray-900 shadow-sm hover:shadow-md transition-all duration-300 focus:ring-2 focus:ring-purple-500/20">
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

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                  <Zap className="w-4 h-4" />
                  <span>AI Model</span>
                </Label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger className="h-10 bg-white border-gray-200 text-gray-900 shadow-sm hover:shadow-md transition-all duration-300 focus:ring-2 focus:ring-purple-500/20">
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
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>Describe your post idea</span>
              </Label>
              <div className="relative">
                <Textarea
                  placeholder="e.g., Start a conversation about AI productivity tools and their impact on remote work..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[100px] bg-white border-gray-200 text-gray-900 placeholder:text-gray-500 shadow-sm hover:shadow-md transition-all duration-300 focus:ring-2 focus:ring-purple-500/20 resize-none"
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
                className="relative group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-3 font-semibold rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-500 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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
                    <span>Generate AI Post</span>
                  </>
                )}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Generated Post Results Section */}
        {(isGenerating || showResponse) && (
          <div className="space-y-4">
            {/* Section Header */}
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-900 mb-1">Generated Post</h2>
              <p className="text-gray-600 text-sm">AI-powered content ready for your Threads profile</p>
            </div>

            {/* Loading State or Generated Post Card */}
            {isGenerating ? (
              <Card className="max-w-2xl mx-auto bg-white border border-gray-200 shadow-lg">
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <div className="flex items-center space-x-3 mb-3">
                    <Sparkles className="w-5 h-5 text-purple-600 animate-spin" />
                    <span className="font-medium text-gray-700">Generating post...</span>
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
                <CardContent className="p-6">
                  {/* Mock Threads Post Preview */}
                  <div className="relative p-5 rounded-xl bg-gray-900 border border-gray-800 shadow-lg">
                    {/* Post Header */}
                    <div className="flex items-start space-x-3 mb-4">
                      <Avatar className="w-10 h-10 shadow-md">
                        <AvatarImage src="/lovable-uploads/e3966193-4894-406f-af40-baf88594caa3.png" />
                        <AvatarFallback className="bg-gradient-to-br from-purple-100 to-pink-100 text-purple-600 font-semibold">
                          {selectedPage?.split(' ').map(word => word[0]).join('') || 'LM'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <p className="font-bold text-white text-sm">{selectedPage || 'Your Page'}</p>
                          <span className="text-gray-400 text-sm">@{(selectedPage || 'yourpage').toLowerCase().replace(/\s+/g, '')}</span>
                        </div>
                        <p className="text-sm text-gray-400">Just now</p>
                      </div>
                      <MoreHorizontal className="w-4 h-4 text-gray-400" />
                    </div>
                    
                    {/* Post Content */}
                    <div className="space-y-3 mb-4">
                      {isEditing ? (
                        <div className="space-y-3">
                          <Textarea
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            className="min-h-[200px] text-sm whitespace-pre-wrap resize-none bg-gray-800 border-2 border-gray-600 focus:border-purple-400 text-gray-100 placeholder:text-gray-400 transition-colors"
                            placeholder="Edit your Threads post..."
                            maxLength={500}
                          />
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-400">{editedContent.length}/500 characters</span>
                            <div className="flex space-x-2">
                              <Button 
                                onClick={handleCancelEdit}
                                variant="outline" 
                                size="sm"
                                className="text-gray-300 hover:text-gray-100 border-gray-600 hover:border-gray-400"
                              >
                                Cancel
                              </Button>
                              <Button 
                                onClick={handleSaveEdit}
                                size="sm"
                                className="bg-purple-600 hover:bg-purple-700 text-white"
                              >
                                Save Changes
                              </Button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-100 whitespace-pre-line leading-relaxed text-sm">
                          {generatedPost}
                        </p>
                      )}

                       {/* Show uploaded media preview if available */}
                       {uploadedMedia && mediaPreviewUrl && (
                         <div className="w-full rounded-lg overflow-hidden shadow-lg border border-gray-700 mb-4">
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
                    </div>
                    
                    {/* Threads Engagement Buttons */}
                    <div className="flex items-center justify-between border-t border-gray-700 pt-3">
                      <div className="flex space-x-4">
                        <button className="flex items-center space-x-1 text-gray-400 hover:text-red-400 cursor-pointer transition-colors">
                          <Heart className="w-4 h-4" />
                          <span className="text-sm">24</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-sm">8</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-400 hover:text-green-400 cursor-pointer transition-colors">
                          <Repeat2 className="w-4 h-4" />
                          <span className="text-sm">12</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-400 hover:text-purple-400 cursor-pointer transition-colors">
                          <Share className="w-4 h-4" />
                          <span className="text-sm">3</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
                    <Button 
                      onClick={handlePostNow}
                      className="group relative h-10 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 text-sm"
                    >
                      <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                      <span className="font-semibold">Post Now</span>
                    </Button>
                    <Button variant="outline" className="h-10 bg-white border-gray-300 hover:bg-gray-50 hover:shadow-lg rounded-lg transition-all duration-300 hover:scale-105 text-gray-700 text-sm">
                      <Save className="w-4 h-4 mr-2" />
                      <span className="font-semibold">Save Draft</span>
                    </Button>
                    <Button variant="outline" className="h-10 bg-white border-gray-300 hover:bg-gray-50 hover:shadow-lg rounded-lg transition-all duration-300 hover:scale-105 text-gray-700 text-sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="font-semibold">Schedule</span>
                    </Button>
                     <Button 
                       onClick={handleEditPost}
                       variant="outline" 
                       className="h-10 bg-white border-gray-300 hover:bg-gray-50 hover:shadow-lg rounded-lg transition-all duration-300 hover:scale-105 text-gray-700 text-sm"
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
      
      {/* Threads Integration Dialog */}
      <ThreadsIntegrationDialog 
        open={showIntegrationDialog}
        onOpenChange={setShowIntegrationDialog}
      />
    </div>
  );
}
