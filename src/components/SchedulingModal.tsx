
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { CustomSelect } from "@/components/ui/custom-select";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  X,
  Calendar as CalendarIcon,
  Clock,
  Upload,
  Sparkles,
  Bot,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  MessageCircle
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface SchedulingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSchedulePost: (postData: any) => void;
}

const platformOptions = [
  { value: 'facebook', label: 'Facebook', icon: Facebook },
  { value: 'instagram', label: 'Instagram', icon: Instagram },
  { value: 'linkedin', label: 'LinkedIn', icon: Linkedin },
  { value: 'twitter', label: 'Twitter', icon: Twitter },
  { value: 'threads', label: 'Threads', icon: MessageCircle }
];

const postTypeOptions = [
  { value: 'post', label: 'Post' },
  { value: 'reel', label: 'Reel' },
  { value: 'story', label: 'Story' }
];

const audienceOptions = [
  { value: 'general', label: 'General Audience' },
  { value: 'students', label: 'Students' },
  { value: 'business-owners', label: 'Business Owners' },
  { value: 'professionals', label: 'Professionals' },
  { value: 'tech-enthusiasts', label: 'Tech Enthusiasts' },
  { value: 'creative-professionals', label: 'Creative Professionals' }
];

const aiModelOptions = [
  { value: 'gpt-4', label: 'GPT-4' },
  { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
  { value: 'claude-3', label: 'Claude-3' }
];

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
  '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'
];

export function SchedulingModal({ isOpen, onClose, onSchedulePost }: SchedulingModalProps) {
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [selectedPostType, setSelectedPostType] = useState('');
  const [selectedAudience, setSelectedAudience] = useState('');
  const [selectedAiModel, setSelectedAiModel] = useState('gpt-4');
  const [postTopic, setPostTopic] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState('');
  const [uploadedMedia, setUploadedMedia] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedMedia(file);
    }
  };

  const handleGenerateContent = async () => {
    if (!postTopic.trim()) return;
    
    setIsGenerating(true);
    // Simulate AI content generation
    setTimeout(() => {
      setGeneratedContent(`🚀 Transform your business with AI-powered lead generation! Discover how LeadMasters AI can boost your conversion rates by 300%. Our cutting-edge technology identifies, engages, and converts high-quality leads automatically. 

Ready to revolutionize your sales process? Let AI do the heavy lifting while you focus on what matters most - growing your business! 

#AI #LeadGeneration #BusinessGrowth #Automation #Sales`);
      setIsGenerating(false);
    }, 2000);
  };

  const handleSchedulePost = () => {
    if (!selectedPlatform || !selectedDate || !selectedTime || !generatedContent) {
      return;
    }

    const scheduledDateTime = new Date(selectedDate);
    const [time, period] = selectedTime.split(' ');
    const [hours, minutes] = time.split(':');
    let hour24 = parseInt(hours);
    
    if (period === 'PM' && hour24 !== 12) {
      hour24 += 12;
    } else if (period === 'AM' && hour24 === 12) {
      hour24 = 0;
    }
    
    scheduledDateTime.setHours(hour24, parseInt(minutes || '0'), 0, 0);

    const postData = {
      id: Date.now(),
      platform: selectedPlatform,
      type: selectedPostType || 'post',
      content: generatedContent,
      scheduledDate: scheduledDateTime,
      isAIGenerated: true,
      status: 'scheduled',
      audience: selectedAudience,
      aiModel: selectedAiModel,
      media: uploadedMedia
    };

    onSchedulePost(postData);
    
    // Reset form
    setSelectedPlatform('');
    setSelectedPostType('');
    setSelectedAudience('');
    setPostTopic('');
    setGeneratedContent('');
    setSelectedDate(undefined);
    setSelectedTime('');
    setUploadedMedia(null);
    
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side="right" 
        className="w-full sm:max-w-lg bg-white/95 backdrop-blur-xl border-l border-purple-200/50 shadow-2xl overflow-y-auto"
      >
        <SheetHeader className="pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 rounded-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <SheetTitle className="text-xl font-bold text-gray-900">
                  Schedule a New Post
                </SheetTitle>
                <SheetDescription className="text-gray-600 mt-1">
                  Plan your post for the perfect time
                </SheetDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="hover:bg-purple-100"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </SheetHeader>

        <div className="space-y-6">
          {/* Platform & Content Details Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
              <h3 className="text-lg font-semibold text-gray-900">Platform & Content Details</h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Platform</Label>
                <CustomSelect
                  options={platformOptions}
                  value={selectedPlatform}
                  onValueChange={setSelectedPlatform}
                  placeholder="Select platform"
                  className="w-full"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Post Type</Label>
                <Select value={selectedPostType} onValueChange={setSelectedPostType}>
                  <SelectTrigger className="bg-white/80 backdrop-blur-sm border-purple-200/60">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {postTypeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Target Audience</Label>
                <Select value={selectedAudience} onValueChange={setSelectedAudience}>
                  <SelectTrigger className="bg-white/80 backdrop-blur-sm border-purple-200/60">
                    <SelectValue placeholder="Select audience" />
                  </SelectTrigger>
                  <SelectContent>
                    {audienceOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">AI Model</Label>
                <Select value={selectedAiModel} onValueChange={setSelectedAiModel}>
                  <SelectTrigger className="bg-white/80 backdrop-blur-sm border-purple-200/60">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {aiModelOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">What should the post be about?</Label>
              <div className="space-y-3">
                <Textarea
                  placeholder="Describe your post topic, key message, or goals..."
                  value={postTopic}
                  onChange={(e) => setPostTopic(e.target.value)}
                  className="min-h-[80px] bg-white/80 backdrop-blur-sm border-purple-200/60 resize-none"
                />
                <Button
                  onClick={handleGenerateContent}
                  disabled={!postTopic.trim() || isGenerating}
                  className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {isGenerating ? (
                    <>
                      <Bot className="w-4 h-4 mr-2 animate-spin" />
                      Generating with AI...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate with AI
                    </>
                  )}
                </Button>
              </div>
            </div>

            {generatedContent && (
              <div className="p-4 bg-purple-50/80 backdrop-blur-sm rounded-lg border border-purple-200/50">
                <div className="flex items-center space-x-2 mb-2">
                  <Bot className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-800">AI Generated Content</span>
                </div>
                <div className="text-sm text-gray-800 whitespace-pre-wrap">
                  {generatedContent}
                </div>
              </div>
            )}

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Upload Media (Optional)</Label>
              <div className="border-2 border-dashed border-purple-300/50 rounded-lg p-4 text-center hover:border-purple-400/70 hover:bg-purple-50/30 transition-all duration-200">
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="media-upload-modal"
                />
                <label htmlFor="media-upload-modal" className="cursor-pointer">
                  <Upload className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700">
                    {uploadedMedia ? uploadedMedia.name : 'Drop files here or browse'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    JPG, PNG, MP4, MOV (max 50MB)
                  </p>
                </label>
              </div>
            </div>
          </div>

          {/* Scheduling Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
              <h3 className="text-lg font-semibold text-gray-900">Scheduling</h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal bg-white/80 backdrop-blur-sm border-purple-200/60",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Time</Label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger className="bg-white/80 backdrop-blur-sm border-purple-200/60">
                    <Clock className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Pick time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Actions Section */}
          <div className="space-y-3 pt-4 border-t border-purple-200/50">
            <Button
              onClick={handleSchedulePost}
              disabled={!selectedPlatform || !selectedDate || !selectedTime || !generatedContent}
              className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              size="lg"
            >
              <CalendarIcon className="w-4 h-4 mr-2" />
              Schedule Post
            </Button>
            <Button
              variant="outline"
              className="w-full border-purple-300 text-purple-700 hover:bg-purple-50"
              size="lg"
            >
              Save as Draft
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
