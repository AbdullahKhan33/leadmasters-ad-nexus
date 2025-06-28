
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  FileText, 
  Calendar, 
  Eye, 
  Edit3, 
  Share2, 
  MoreVertical,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Play,
  Send
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface Post {
  id: string;
  title: string;
  content: string;
  platform: string;
  status: 'published' | 'draft';
  createdAt: string;
  publishedAt?: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  engagement?: {
    views: number;
    likes: number;
    shares: number;
    comments: number;
  };
  platformIcon: any;
  platformColor: string;
}

export function ContentHub() {
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      title: "New Product Launch Announcement",
      content: "We're excited to announce our latest AI-powered marketing tool that will revolutionize how you create content. This innovative solution combines machine learning with intuitive design to help businesses of all sizes create compelling marketing materials in minutes, not hours.",
      platform: "Facebook",
      status: 'published',
      createdAt: "2024-01-15T10:30:00Z",
      publishedAt: "2024-01-15T14:00:00Z",
      mediaUrl: "/placeholder.svg",
      mediaType: "image",
      engagement: { views: 2547, likes: 89, shares: 23, comments: 12 },
      platformIcon: Facebook,
      platformColor: "text-blue-600"
    },
    {
      id: "2", 
      title: "Instagram Story - Behind the Scenes",
      content: "Take a look behind the scenes at our latest photoshoot for the upcoming campaign. Our creative team worked tirelessly to capture the perfect shots that tell our brand story.",
      platform: "Instagram",
      status: 'published',
      createdAt: "2024-01-14T09:15:00Z",
      publishedAt: "2024-01-14T12:30:00Z",
      mediaUrl: "/placeholder.svg",
      mediaType: "video",
      engagement: { views: 1892, likes: 156, shares: 45, comments: 8 },
      platformIcon: Instagram,
      platformColor: "text-pink-600"
    },
    {
      id: "3",
      title: "Industry Insights: Marketing Trends 2024",
      content: "The marketing landscape is evolving rapidly. Here are the top 5 trends every marketer should watch: 1) AI-powered personalization, 2) Voice search optimization, 3) Interactive content experiences, 4) Sustainability messaging, 5) Community-driven marketing approaches.",
      platform: "LinkedIn",
      status: 'published',
      createdAt: "2024-01-13T16:45:00Z",
      publishedAt: "2024-01-13T18:00:00Z",
      engagement: { views: 3421, likes: 234, shares: 67, comments: 28 },
      platformIcon: Linkedin,
      platformColor: "text-blue-700"
    },
    {
      id: "4",
      title: "Monday Motivation Quote",
      content: "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill. Start your week with determination and remember that every small step forward is progress. What's your goal for this week? #MondayMotivation #Success",
      platform: "Twitter",
      status: 'published',
      createdAt: "2024-01-12T08:00:00Z",
      publishedAt: "2024-01-12T09:00:00Z",
      engagement: { views: 1234, likes: 67, shares: 23, comments: 15 },
      platformIcon: Twitter,
      platformColor: "text-gray-800"
    },
    {
      id: "5",
      title: "Customer Testimonial Feature",
      content: "We're thrilled to share this amazing feedback from our client Sarah Johnson: 'Working with this team has transformed our marketing strategy. We've seen a 300% increase in engagement and our ROI has never been better!' Thank you Sarah for trusting us with your brand's growth! 🙌",
      platform: "Facebook",
      status: 'published',
      createdAt: "2024-01-11T15:20:00Z",
      publishedAt: "2024-01-11T16:00:00Z",
      engagement: { views: 2156, likes: 134, shares: 42, comments: 28 },
      platformIcon: Facebook,
      platformColor: "text-blue-600"
    },
    {
      id: "6",
      title: "How-to Tutorial: Social Media Analytics",
      content: "[Video] Learn how to interpret your social media analytics in just 10 minutes. This comprehensive guide covers key metrics, tracking tools, and actionable insights you can implement today.",
      platform: "YouTube",
      status: 'published',
      createdAt: "2024-01-10T11:30:00Z",
      publishedAt: "2024-01-10T14:00:00Z",
      mediaUrl: "/placeholder.svg",
      mediaType: "video",
      engagement: { views: 5432, likes: 289, shares: 78, comments: 45 },
      platformIcon: Youtube,
      platformColor: "text-red-600"
    },
    {
      id: "7",
      title: "Quick Marketing Tip",
      content: "Pro tip: Always A/B test your headlines. A simple change can increase your CTR by 40% or more. Try testing emotional vs logical appeals, questions vs statements, and different lengths to see what resonates with your audience.",
      platform: "Twitter",
      status: 'draft',
      createdAt: "2024-01-16T11:20:00Z",
      platformIcon: Twitter,
      platformColor: "text-gray-800"
    },
    {
      id: "8",
      title: "Customer Success Story",
      content: "Meet Sarah, who increased her lead generation by 300% using our platform. Here's her story and the exact strategies she used to transform her business in just 3 months.",
      platform: "Facebook",
      status: 'draft',
      createdAt: "2024-01-16T15:30:00Z",
      mediaUrl: "/placeholder.svg",
      mediaType: "video",
      platformIcon: Facebook,
      platformColor: "text-blue-600"
    },
    {
      id: "9",
      title: "Weekly Tutorial Video",
      content: "[Video] How to create engaging social media content in 5 minutes using AI. This step-by-step tutorial will show you the exact process our team uses daily.",
      platform: "YouTube",
      status: 'draft',
      createdAt: "2024-01-15T13:45:00Z",
      mediaUrl: "/placeholder.svg",
      mediaType: "video",
      platformIcon: Youtube,
      platformColor: "text-red-600"
    },
    {
      id: "10",
      title: "Team Spotlight: Meet Our Designers",
      content: "This week we're highlighting our amazing design team! From concept to creation, they bring every vision to life. Their creativity and attention to detail make all the difference in our client campaigns. #TeamSpotlight #Design #CreativeTeam",
      platform: "Instagram",
      status: 'draft',
      createdAt: "2024-01-16T10:15:00Z",
      mediaUrl: "/placeholder.svg",
      mediaType: "image",
      platformIcon: Instagram,
      platformColor: "text-pink-600"
    },
    {
      id: "11",
      title: "Industry Report: Digital Marketing ROI",
      content: "Our latest research reveals fascinating insights about digital marketing ROI across different industries. Manufacturing leads with 4.2x average return, while retail follows at 3.8x. Service-based businesses show the highest growth potential at 3.5x with room for improvement through better targeting strategies.",
      platform: "LinkedIn",
      status: 'draft',
      createdAt: "2024-01-16T14:00:00Z",
      platformIcon: Linkedin,
      platformColor: "text-blue-700"
    },
    {
      id: "12",
      title: "Friday Inspiration",
      content: "The best marketing doesn't feel like marketing. - Tom Fishburne. As we wrap up another productive week, remember that authentic connections with your audience matter more than perfect campaigns. What authentic story will you tell next week? #FridayInspiration #AuthenticMarketing",
      platform: "Twitter",
      status: 'draft',
      createdAt: "2024-01-16T16:45:00Z",
      platformIcon: Twitter,
      platformColor: "text-gray-800"
    }
  ]);

  const publishedPosts = posts.filter(post => post.status === 'published');
  const draftPosts = posts.filter(post => post.status === 'draft');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const handlePublishDraft = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            status: 'published' as const, 
            publishedAt: new Date().toISOString(),
            engagement: { views: 0, likes: 0, shares: 0, comments: 0 }
          }
        : post
    ));
    
    toast({
      title: "Post Published",
      description: "Your draft has been successfully published!",
    });
  };

  const PostCard = ({ post }: { post: Post }) => {
    const IconComponent = post.platformIcon;
    
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-gray-50 ${post.platformColor}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-1">
                      {post.title}
                    </CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {post.platform}
                      </Badge>
                      <Badge 
                        variant={post.status === 'published' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {post.status === 'published' ? 'Published' : 'Draft'}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit Post
                    </DropdownMenuItem>
                    {post.status === 'published' && (
                      <DropdownMenuItem>
                        <Share2 className="w-4 h-4 mr-2" />
                        Share Again
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              {/* Media Preview */}
              {post.mediaUrl && (
                <div className="relative mb-4">
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <img 
                      src={post.mediaUrl} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {post.mediaType === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                        <Play className="w-8 h-8 text-white" fill="white" />
                      </div>
                    )}
                  </div>
                  <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs">
                    {post.mediaType === 'video' ? 'Video' : 'Image'}
                  </div>
                </div>
              )}

              <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                {post.content}
              </p>
              
              {/* Draft Actions - moved to after content */}
              {post.status === 'draft' && (
                <div className="flex space-x-2 mb-4" onClick={(e) => e.stopPropagation()}>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-4 h-4 mr-1" />
                    Preview
                  </Button>
                  <Button 
                    onClick={() => handlePublishDraft(post.id)}
                    size="sm" 
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                  >
                    <Send className="w-4 h-4 mr-1" />
                    Publish
                  </Button>
                </div>
              )}
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>Created: {formatDate(post.createdAt)}</span>
                </div>
                {post.publishedAt && (
                  <div className="flex items-center space-x-1">
                    <Share2 className="w-3 h-3" />
                    <span>Published: {formatDate(post.publishedAt)}</span>
                  </div>
                )}
              </div>
              
              {post.engagement && (
                <div className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-100">
                  <div className="text-center">
                    <div className="text-sm font-semibold text-gray-900">
                      {formatNumber(post.engagement.views)}
                    </div>
                    <div className="text-xs text-gray-500">Views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold text-gray-900">
                      {formatNumber(post.engagement.likes)}
                    </div>
                    <div className="text-xs text-gray-500">Likes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold text-gray-900">
                      {formatNumber(post.engagement.shares)}
                    </div>
                    <div className="text-xs text-gray-500">Shares</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold text-gray-900">
                      {formatNumber(post.engagement.comments)}
                    </div>
                    <div className="text-xs text-gray-500">Comments</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{post.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Only show media if it exists and is not a text-only post */}
            {post.mediaUrl && post.mediaType && (
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                {post.mediaType === 'video' ? (
                  <video 
                    src={post.mediaUrl} 
                    controls 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img 
                    src={post.mediaUrl} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            )}
            
            {/* Always show the text content prominently */}
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{post.content}</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <IconComponent className={`w-4 h-4 ${post.platformColor}`} />
                  <span className="text-sm font-medium">{post.platform}</span>
                </div>
                <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                  {post.status === 'published' ? 'Published' : 'Draft'}
                </Badge>
              </div>
              
              {post.status === 'draft' && (
                <div className="flex space-x-2 pt-4">
                  <Button 
                    onClick={() => handlePublishDraft(post.id)}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Publish Now
                  </Button>
                  <Button variant="outline">
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Draft
                  </Button>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Content Hub
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            Manage your published posts and drafts across all connected platforms
          </p>
        </div>

        {/* Tabs for Published vs Draft */}
        <Tabs defaultValue="published" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="published" className="flex items-center space-x-2">
              <Share2 className="w-4 h-4" />
              <span>Published ({publishedPosts.length})</span>
            </TabsTrigger>
            <TabsTrigger value="drafts" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Drafts ({draftPosts.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="published" className="mt-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-gray-800">Published Posts</h2>
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  {publishedPosts.length} Published
                </Badge>
              </div>
              
              {publishedPosts.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {publishedPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <Card className="text-center py-12">
                  <CardContent>
                    <Share2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">No Published Posts</h3>
                    <p className="text-gray-500">Posts published through LeadMasters will appear here</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="drafts" className="mt-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-gray-800">Draft Posts</h2>
                <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                  {draftPosts.length} Drafts
                </Badge>
              </div>
              
              {draftPosts.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {draftPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <Card className="text-center py-12">
                  <CardContent>
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">No Draft Posts</h3>
                    <p className="text-gray-500">Saved drafts from all platforms will appear here</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
