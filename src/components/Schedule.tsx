
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomSelect } from "@/components/ui/custom-select";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Plus,
  Calendar as CalendarIcon,
  List,
  Grid3x3,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  MessageCircle,
  Bot,
  Clock,
  Edit3,
  Trash2,
  RotateCcw,
  Sparkles,
  MoreHorizontal,
  X
} from "lucide-react";

// Enhanced mock data for scheduled posts including June 22, 2025 demo posts
const mockScheduledPosts = [
  // Original posts
  {
    id: 1,
    platform: 'facebook',
    type: 'post',
    content: 'Exciting news! Our AI technology is revolutionizing lead generation...',
    scheduledDate: new Date('2024-06-25T10:00:00'),
    isAIGenerated: true,
    status: 'scheduled'
  },
  {
    id: 2,
    platform: 'instagram',
    type: 'reel',
    content: 'Behind the scenes at LeadMasters AI - see how we create magic! ✨',
    scheduledDate: new Date('2024-06-25T14:30:00'),
    isAIGenerated: false,
    status: 'scheduled'
  },
  {
    id: 3,
    platform: 'linkedin',
    type: 'post',
    content: 'Professional insights on the future of AI in business automation...',
    scheduledDate: new Date('2024-06-26T09:15:00'),
    isAIGenerated: true,
    status: 'scheduled'
  },
  {
    id: 4,
    platform: 'twitter',
    type: 'post',
    content: 'Quick tip: Use AI to automate your social media strategy! 🚀',
    scheduledDate: new Date('2024-06-27T16:00:00'),
    isAIGenerated: true,
    status: 'scheduled'
  },
  // Demo posts for June 22, 2025
  {
    id: 5,
    platform: 'facebook',
    type: 'post',
    content: 'Transform your business with AI-powered lead generation! Discover how LeadMasters AI can boost your conversion rates by 300%. 📈',
    scheduledDate: new Date('2025-06-22T10:00:00'),
    isAIGenerated: true,
    status: 'scheduled'
  },
  {
    id: 6,
    platform: 'instagram',
    type: 'reel',
    content: 'Watch our AI in action! From lead capture to conversion - see the magic happen in real-time. ✨🎯',
    scheduledDate: new Date('2025-06-22T14:00:00'),
    isAIGenerated: false,
    status: 'scheduled'
  },
  {
    id: 7,
    platform: 'linkedin',
    type: 'post',
    content: 'The future of B2B sales is here. LeadMasters AI helps businesses identify, engage, and convert high-quality leads automatically.',
    scheduledDate: new Date('2025-06-22T16:00:00'),
    isAIGenerated: true,
    status: 'scheduled'
  },
  {
    id: 8,
    platform: 'facebook',
    type: 'story',
    content: 'Behind the scenes: Our team is working hard to bring you the best AI solutions! 🔥',
    scheduledDate: new Date('2025-06-22T19:00:00'),
    isAIGenerated: false,
    status: 'scheduled'
  }
];

const platformOptions = [
  { value: 'all', label: 'All Platforms', icon: Grid3x3 },
  { value: 'facebook', label: 'Facebook', icon: Facebook },
  { value: 'instagram', label: 'Instagram', icon: Instagram },
  { value: 'linkedin', label: 'LinkedIn', icon: Linkedin },
  { value: 'twitter', label: 'Twitter', icon: Twitter },
  { value: 'threads', label: 'Threads', icon: MessageCircle }
];

const postTypeOptions = [
  { value: 'all', label: 'All Types' },
  { value: 'post', label: 'Posts' },
  { value: 'reel', label: 'Reels' },
  { value: 'story', label: 'Stories' }
];

const viewModeOptions = [
  { value: 'month', label: 'Month View', icon: CalendarIcon },
  { value: 'week', label: 'Week View', icon: Grid3x3 },
  { value: 'list', label: 'List View', icon: List }
];

const getPlatformIcon = (platform: string) => {
  switch (platform) {
    case 'facebook': return Facebook;
    case 'instagram': return Instagram;
    case 'linkedin': return Linkedin;
    case 'twitter': return Twitter;
    case 'threads': return MessageCircle;
    default: return MessageCircle;
  }
};

const getPlatformColor = (platform: string) => {
  switch (platform) {
    case 'facebook': return 'bg-blue-500';
    case 'instagram': return 'bg-gradient-to-r from-purple-500 to-pink-500';
    case 'linkedin': return 'bg-blue-600';
    case 'twitter': return 'bg-sky-500';
    case 'threads': return 'bg-gray-800';
    default: return 'bg-gray-500';
  }
};

export function Schedule() {
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedPostType, setSelectedPostType] = useState('all');
  const [viewMode, setViewMode] = useState('month');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [dayViewOpen, setDayViewOpen] = useState(false);
  const [dayViewDate, setDayViewDate] = useState<Date | null>(null);

  const filteredPosts = mockScheduledPosts.filter(post => {
    const platformMatch = selectedPlatform === 'all' || post.platform === selectedPlatform;
    const typeMatch = selectedPostType === 'all' || post.type === selectedPostType;
    return platformMatch && typeMatch;
  });

  const getPostsForDate = (date: Date) => {
    return filteredPosts.filter(post => 
      post.scheduledDate.toDateString() === date.toDateString()
    );
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const handleDateClick = (date: Date) => {
    setDayViewDate(date);
    setDayViewOpen(true);
  };

  const PostPill = ({ post }: { post: any }) => {
    const PlatformIcon = getPlatformIcon(post.platform);
    
    return (
      <div
        onClick={() => setSelectedPost(post)}
        className={`
          relative cursor-pointer mb-1 p-2 rounded-lg text-xs text-white
          ${getPlatformColor(post.platform)}
          hover:shadow-lg hover:scale-105 transition-all duration-200
          backdrop-blur-sm border border-white/20
        `}
      >
        <div className="flex items-center space-x-1">
          <PlatformIcon className="w-3 h-3" />
          {post.isAIGenerated && <Bot className="w-3 h-3" />}
        </div>
        <div className="truncate mt-1 font-medium">
          {post.content.substring(0, 30)}...
        </div>
        <div className="text-xs opacity-80 mt-1">
          {formatTime(post.scheduledDate)}
        </div>
      </div>
    );
  };

  const DayViewPanel = () => {
    if (!dayViewDate) return null;
    
    const dayPosts = getPostsForDate(dayViewDate);
    
    return (
      <div className="fixed inset-y-0 right-0 w-96 bg-white/95 backdrop-blur-xl border-l border-purple-200/50 shadow-2xl z-50 transform transition-transform duration-300">
        <div className="flex items-center justify-between p-6 border-b border-purple-200/50">
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              {dayViewDate.toLocaleDateString('en-US', { 
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {dayPosts.length} scheduled {dayPosts.length === 1 ? 'post' : 'posts'}
            </p>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setDayViewOpen(false)}
            className="hover:bg-purple-100"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          {dayPosts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                <CalendarIcon className="w-10 h-10 text-purple-400" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                No posts scheduled
              </h4>
              <p className="text-gray-600 text-sm mb-6">
                No posts match your current filters for this date.
              </p>
              <Button 
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                size="sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Schedule a Post
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {dayPosts.map(post => {
                const PlatformIcon = getPlatformIcon(post.platform);
                return (
                  <div
                    key={post.id}
                    className="p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-purple-200/50 hover:shadow-lg transition-all duration-200 cursor-pointer group"
                    onClick={() => setSelectedPost(post)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className={`p-2 rounded-lg ${getPlatformColor(post.platform)}`}>
                          <PlatformIcon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900 capitalize">
                            {post.platform} {post.type}
                          </h5>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>{formatTime(post.scheduledDate)}</span>
                          </div>
                        </div>
                      </div>
                      {post.isAIGenerated && (
                        <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                          <Bot className="w-3 h-3 mr-1" />
                          AI
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                      {post.content}
                    </p>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit3 className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <RotateCcw className="w-3 h-3 mr-1" />
                        Reschedule
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  };

  const EmptyState = () => (
    <div className="text-center py-16">
      <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
        <CalendarIcon className="w-16 h-16 text-purple-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        No scheduled posts yet
      </h3>
      <p className="text-gray-600 mb-6">
        Get started by creating your first scheduled post!
      </p>
      <Button 
        className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-200"
        size="lg"
      >
        <Plus className="w-5 h-5 mr-2" />
        Schedule a Post
      </Button>
    </div>
  );

  const PostDetailModal = ({ post }: { post: any }) => {
    const PlatformIcon = getPlatformIcon(post.platform);
    
    return (
      <DialogContent className="max-w-lg bg-white/95 backdrop-blur-xl border border-purple-200/50 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-gray-900">
            <PlatformIcon className="w-5 h-5 text-purple-600" />
            <span>Scheduled Post</span>
            {post.isAIGenerated && (
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                <Bot className="w-3 h-3 mr-1" />
                AI Generated
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-800">{post.content}</p>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{post.scheduledDate.toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>{formatTime(post.scheduledDate)}</span>
            </div>
          </div>
          
          <div className="flex space-x-2 pt-4">
            <Button variant="outline" className="flex-1" size="sm">
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Post
            </Button>
            <Button variant="outline" className="flex-1" size="sm">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reschedule
            </Button>
            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    );
  };

  return (
    <div className="flex-1 p-4 lg:p-6 bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              Schedule & Calendar
            </h1>
            <p className="text-gray-600 mt-2">
              View, manage, and edit all your scheduled posts in one place
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <CustomSelect
              options={platformOptions}
              value={selectedPlatform}
              onValueChange={setSelectedPlatform}
              placeholder="All Platforms"
              className="min-w-[140px]"
            />
            <CustomSelect
              options={postTypeOptions}
              value={selectedPostType}
              onValueChange={setSelectedPostType}
              placeholder="All Types"
              className="min-w-[120px]"
            />
            <Button 
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              size="lg"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create New Post
            </Button>
          </div>
        </div>

        {/* View Mode Toggle */}
        <Card className="border border-purple-200/50 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
                Calendar View
              </CardTitle>
              <CustomSelect
                options={viewModeOptions}
                value={viewMode}
                onValueChange={setViewMode}
                placeholder="Month View"
                className="min-w-[140px]"
              />
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            {filteredPosts.length === 0 ? (
              <div className="p-6">
                <EmptyState />
              </div>
            ) : viewMode === 'month' ? (
              <div className="w-full h-full">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="w-full h-full rounded-none border-0"
                  classNames={{
                    months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 w-full",
                    month: "space-y-4 w-full",
                    caption: "flex justify-center pt-1 relative items-center mb-4",
                    caption_label: "text-lg font-semibold",
                    table: "w-full border-collapse",
                    head_row: "flex w-full",
                    head_cell: "text-muted-foreground rounded-md flex-1 font-normal text-sm py-2 text-center",
                    row: "flex w-full",
                    cell: "flex-1 p-0 relative min-h-[120px] border border-gray-100",
                    day: "w-full h-full p-2 font-normal hover:bg-purple-50/50 transition-colors cursor-pointer flex flex-col items-start justify-start",
                    day_selected: "bg-purple-100 text-purple-900 hover:bg-purple-100 hover:text-purple-900",
                    day_today: "bg-blue-50 text-blue-900 font-semibold",
                    day_outside: "text-muted-foreground opacity-50",
                    day_disabled: "text-muted-foreground opacity-50",
                  }}
                  components={{
                    Day: ({ date, ...props }) => {
                      const posts = getPostsForDate(date);
                      return (
                        <div 
                          className="w-full h-full p-2 min-h-[120px] border border-gray-100 hover:bg-purple-50/50 transition-colors cursor-pointer flex flex-col"
                          onClick={() => handleDateClick(date)}
                        >
                          <div className="text-sm font-medium text-gray-900 mb-2">
                            {date.getDate()}
                          </div>
                          <div className="flex-1 space-y-1 overflow-hidden">
                            {posts.slice(0, 3).map(post => (
                              <PostPill key={post.id} post={post} />
                            ))}
                            {posts.length > 3 && (
                              <div className="text-xs text-purple-600 font-medium px-2 py-1 bg-purple-50 rounded">
                                +{posts.length - 3} more
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    }
                  }}
                />
              </div>
            ) : viewMode === 'list' ? (
              <div className="space-y-3 p-6">
                {filteredPosts.map(post => {
                  const PlatformIcon = getPlatformIcon(post.platform);
                  return (
                    <div
                      key={post.id}
                      onClick={() => setSelectedPost(post)}
                      className="p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-purple-200/50 hover:shadow-lg transition-all duration-200 cursor-pointer group"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <div className={`p-2 rounded-lg ${getPlatformColor(post.platform)}`}>
                            <PlatformIcon className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-medium text-gray-900 capitalize">
                                {post.platform} {post.type}
                              </h4>
                              {post.isAIGenerated && (
                                <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                                  <Bot className="w-3 h-3 mr-1" />
                                  AI
                                </Badge>
                              )}
                            </div>
                            <p className="text-gray-600 text-sm line-clamp-2">
                              {post.content}
                            </p>
                            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                              <span>{post.scheduledDate.toLocaleDateString()}</span>
                              <span>{formatTime(post.scheduledDate)}</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 p-6">
                Week view coming soon...
              </div>
            )}
          </CardContent>
        </Card>

        {/* Post Detail Modal */}
        <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
          {selectedPost && <PostDetailModal post={selectedPost} />}
        </Dialog>

        {/* Day View Panel */}
        {dayViewOpen && <DayViewPanel />}
      </div>
    </div>
  );
}
