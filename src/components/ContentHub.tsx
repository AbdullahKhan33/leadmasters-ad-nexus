
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Youtube
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Post {
  id: string;
  title: string;
  content: string;
  platform: string;
  status: 'published' | 'draft';
  createdAt: string;
  publishedAt?: string;
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
  const [posts] = useState<Post[]>([
    {
      id: "1",
      title: "New Product Launch Announcement",
      content: "We're excited to announce our latest AI-powered marketing tool that will revolutionize how you create content...",
      platform: "Facebook",
      status: 'published',
      createdAt: "2024-01-15T10:30:00Z",
      publishedAt: "2024-01-15T14:00:00Z",
      engagement: { views: 2547, likes: 89, shares: 23, comments: 12 },
      platformIcon: Facebook,
      platformColor: "text-blue-600"
    },
    {
      id: "2", 
      title: "Instagram Story - Behind the Scenes",
      content: "Take a look behind the scenes at our latest photoshoot for the upcoming campaign...",
      platform: "Instagram",
      status: 'published',
      createdAt: "2024-01-14T09:15:00Z",
      publishedAt: "2024-01-14T12:30:00Z",
      engagement: { views: 1892, likes: 156, shares: 45, comments: 8 },
      platformIcon: Instagram,
      platformColor: "text-pink-600"
    },
    {
      id: "3",
      title: "Industry Insights: Marketing Trends 2024",
      content: "The marketing landscape is evolving rapidly. Here are the top 5 trends every marketer should watch...",
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
      title: "Quick Marketing Tip",
      content: "Pro tip: Always A/B test your headlines. A simple change can increase your CTR by 40%...",
      platform: "Twitter",
      status: 'draft',
      createdAt: "2024-01-16T11:20:00Z",
      platformIcon: Twitter,
      platformColor: "text-gray-800"
    },
    {
      id: "5",
      title: "Customer Success Story",
      content: "Meet Sarah, who increased her lead generation by 300% using our platform. Here's her story...",
      platform: "Facebook",
      status: 'draft',
      createdAt: "2024-01-16T15:30:00Z",
      platformIcon: Facebook,
      platformColor: "text-blue-600"
    },
    {
      id: "6",
      title: "Weekly Tutorial Video",
      content: "[Video] How to create engaging social media content in 5 minutes using AI...",
      platform: "YouTube",
      status: 'draft',
      createdAt: "2024-01-15T13:45:00Z",
      platformIcon: Youtube,
      platformColor: "text-red-600"
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

  const PostCard = ({ post }: { post: Post }) => {
    const IconComponent = post.platformIcon;
    
    return (
      <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
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
                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
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
          <p className="text-gray-600 text-sm line-clamp-3 mb-4">
            {post.content}
          </p>
          
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
