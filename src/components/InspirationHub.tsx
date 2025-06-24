
import React, { useState } from "react";
import { Search, Filter, Sparkles, Bookmark, BookmarkPlus, X, Play, CheckCircle, Zap, TrendingUp, Clock, Brain } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

interface AdInspiration {
  id: string;
  platform: string;
  platformLogo: string;
  image: string;
  caption: string;
  brand: string;
  isVerified: boolean;
  isAiRecommended: boolean;
  isSaved: boolean;
  isVideo?: boolean;
  contentType: string;
  trending?: boolean;
  savedCount?: number;
  createdAt?: string;
}

const mockAds: AdInspiration[] = [
  {
    id: "1",
    platform: "Facebook",
    platformLogo: "📘",
    image: "/placeholder.svg",
    caption: "Transform your morning routine with our AI-powered coffee maker...",
    brand: "@techbrew",
    isVerified: true,
    isAiRecommended: true,
    isSaved: false,
    isVideo: false,
    contentType: "Image",
    trending: true,
    savedCount: 245,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    platform: "Instagram",
    platformLogo: "📷",
    image: "/placeholder.svg",
    caption: "Sustainable fashion meets modern style. Shop our eco-friendly collection...",
    brand: "@ecofashion",
    isVerified: true,
    isAiRecommended: false,
    isSaved: true,
    isVideo: true,
    contentType: "Video",
    trending: false,
    savedCount: 189,
    createdAt: "2024-01-14",
  },
  {
    id: "3",
    platform: "Google Ads",
    platformLogo: "🔍",
    image: "/placeholder.svg",
    caption: "Boost your productivity with our all-in-one workspace solution...",
    brand: "@workspaceapp",
    isVerified: false,
    isAiRecommended: true,
    isSaved: false,
    isVideo: false,
    contentType: "Carousel",
    trending: true,
    savedCount: 312,
    createdAt: "2024-01-16",
  },
  {
    id: "4",
    platform: "LinkedIn",
    platformLogo: "💼",
    image: "/placeholder.svg",
    caption: "Professional development courses that actually work. Join 50k+ learners...",
    brand: "@learnpro",
    isVerified: true,
    isAiRecommended: false,
    isSaved: false,
    isVideo: false,
    contentType: "Image",
    trending: false,
    savedCount: 156,
    createdAt: "2024-01-13",
  },
  {
    id: "5",
    platform: "TikTok",
    platformLogo: "🎵",
    image: "/placeholder.svg",
    caption: "The viral fitness trend everyone's talking about. Try it now!",
    brand: "@fitnessrevolution",
    isVerified: true,
    isAiRecommended: true,
    isSaved: false,
    isVideo: true,
    contentType: "Story",
    trending: true,
    savedCount: 428,
    createdAt: "2024-01-17",
  },
  {
    id: "6",
    platform: "YouTube",
    platformLogo: "📺",
    image: "/placeholder.svg",
    caption: "Master the art of cooking with our comprehensive online masterclass...",
    brand: "@chefmasterclass",
    isVerified: true,
    isAiRecommended: false,
    isSaved: true,
    isVideo: true,
    contentType: "Video",
    trending: false,
    savedCount: 267,
    createdAt: "2024-01-12",
  },
];

const channels = ["All Channels", "Facebook", "Instagram", "Google Ads", "LinkedIn", "TikTok", "YouTube"];
const industries = ["All Industries", "Technology", "Fashion", "Food & Beverage", "Fitness", "Education", "Finance"];
const formats = ["All Formats", "Image", "Video", "Carousel", "Story", "Reel"];
const sortOptions = [
  { value: "latest", label: "Latest", icon: Clock },
  { value: "trending", label: "Trending", icon: TrendingUp },
  { value: "most-saved", label: "Most Saved", icon: Bookmark },
  { value: "ai-suggested", label: "AI Suggested", icon: Brain },
];

export function InspirationHub() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChannel, setSelectedChannel] = useState("All Channels");
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [selectedFormat, setSelectedFormat] = useState("All Formats");
  const [showAiRecommended, setShowAiRecommended] = useState(false);
  const [sortBy, setSortBy] = useState("latest");
  const [ads, setAds] = useState<AdInspiration[]>(mockAds);
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredAd, setHoveredAd] = useState<string | null>(null);
  const navigate = useNavigate();

  const activeFilters = [
    selectedChannel !== "All Channels" && selectedChannel,
    selectedIndustry !== "All Industries" && selectedIndustry,
    selectedFormat !== "All Formats" && selectedFormat,
  ].filter(Boolean);

  const clearFilter = (filter: string) => {
    if (channels.includes(filter)) setSelectedChannel("All Channels");
    if (industries.includes(filter)) setSelectedIndustry("All Industries");
    if (formats.includes(filter)) setSelectedFormat("All Formats");
  };

  const toggleSaveAd = (adId: string) => {
    setAds(prev => prev.map(ad => 
      ad.id === adId ? { ...ad, isSaved: !ad.isSaved } : ad
    ));
  };

  const handleGenerateSimilar = (ad: AdInspiration) => {
    // Navigate to home with state to trigger PostBuilder view
    const tone = ad.isAiRecommended ? "inspirational" : "professional";
    navigate('/', { 
      state: { 
        view: 'post-builder',
        prefilledContent: ad.caption, 
        tone: tone, 
        platform: ad.platform.toLowerCase() 
      } 
    });
  };

  const handleMyInspirations = () => {
    navigate('/my-inspirations');
  };

  const sortedAds = () => {
    let sorted = [...filteredAds];
    switch (sortBy) {
      case "trending":
        return sorted.sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0));
      case "most-saved":
        return sorted.sort((a, b) => (b.savedCount || 0) - (a.savedCount || 0));
      case "ai-suggested":
        return sorted.sort((a, b) => (b.isAiRecommended ? 1 : 0) - (a.isAiRecommended ? 1 : 0));
      case "latest":
      default:
        return sorted.sort((a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime());
    }
  };

  const filteredAds = ads.filter(ad => {
    const matchesSearch = ad.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ad.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesChannel = selectedChannel === "All Channels" || ad.platform === selectedChannel;
    const matchesAi = !showAiRecommended || ad.isAiRecommended;
    
    return matchesSearch && matchesChannel && matchesAi;
  });

  const getContentTypeIcon = (contentType: string) => {
    switch (contentType.toLowerCase()) {
      case "video":
        return "🎥";
      case "image":
        return "🖼️";
      case "carousel":
        return "📱";
      case "story":
        return "📲";
      default:
        return "📄";
    }
  };

  const SkeletonCard = () => (
    <Card className="overflow-hidden animate-pulse">
      <div className="aspect-video bg-gray-200 rounded-t-lg"></div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="w-6 h-6 bg-gray-200 rounded"></div>
          <div className="w-4 h-4 bg-gray-200 rounded"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
            <div className="flex space-x-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                ></div>
              ))}
            </div>
          </div>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
            Inspiration Hub
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Explore AI-powered ad inspirations from across the globe
          </p>
          
          <Button 
            onClick={handleMyInspirations}
            className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
          >
            <Bookmark className="w-4 h-4 mr-2" />
            My Inspirations
          </Button>
        </div>

        {/* Search & Filters Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg border border-white/20">
          <div className="flex flex-col space-y-4">
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for ad inspirations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 h-12 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-400 text-lg"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="rounded-full px-6 py-2 h-10">
                    <Filter className="w-4 h-4 mr-2" />
                    {selectedChannel}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {channels.map((channel) => (
                    <DropdownMenuItem
                      key={channel}
                      onClick={() => setSelectedChannel(channel)}
                    >
                      {channel}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="rounded-full px-6 py-2 h-10">
                    <Filter className="w-4 h-4 mr-2" />
                    {selectedIndustry}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {industries.map((industry) => (
                    <DropdownMenuItem
                      key={industry}
                      onClick={() => setSelectedIndustry(industry)}
                    >
                      {industry}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="rounded-full px-6 py-2 h-10">
                    <Filter className="w-4 h-4 mr-2" />
                    {selectedFormat}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {formats.map((format) => (
                    <DropdownMenuItem
                      key={format}
                      onClick={() => setSelectedFormat(format)}
                    >
                      {format}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* AI Recommended Toggle */}
              <Button
                variant={showAiRecommended ? "default" : "outline"}
                onClick={() => setShowAiRecommended(!showAiRecommended)}
                className={`rounded-full px-6 py-2 h-10 transition-all duration-200 ${
                  showAiRecommended 
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg" 
                    : ""
                }`}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                AI Recommended
              </Button>
            </div>

            {/* Sort By Dropdown */}
            <div className="flex justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="rounded-full px-6 py-2 h-10">
                    {sortOptions.find(option => option.value === sortBy)?.icon && 
                      React.createElement(sortOptions.find(option => option.value === sortBy)!.icon, { className: "w-4 h-4 mr-2" })
                    }
                    Sort by: {sortOptions.find(option => option.value === sortBy)?.label}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {sortOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => setSortBy(option.value)}
                      className="flex items-center"
                    >
                      <option.icon className="w-4 h-4 mr-2" />
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Active Filters */}
            {activeFilters.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center">
                {activeFilters.map((filter) => (
                  <Badge
                    key={filter}
                    variant="secondary"
                    className="px-3 py-1 rounded-full flex items-center gap-2"
                  >
                    {filter}
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-red-500"
                      onClick={() => clearFilter(filter as string)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Ad Inspiration Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            [...Array(8)].map((_, i) => <SkeletonCard key={i} />)
          ) : (
            sortedAds().map((ad) => (
              <Card
                key={ad.id}
                className={`group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:scale-105 cursor-pointer bg-white/80 backdrop-blur-sm border-white/20 ${
                  ad.isAiRecommended && showAiRecommended 
                    ? "ring-2 ring-purple-200 shadow-purple-100/50" 
                    : ""
                } ${hoveredAd === ad.id ? "shadow-2xl glow-effect" : ""}`}
                onMouseEnter={() => setHoveredAd(ad.id)}
                onMouseLeave={() => setHoveredAd(null)}
              >
                <div className="relative aspect-video bg-gray-100 overflow-hidden">
                  <img
                    src={ad.image}
                    alt={ad.caption}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  
                  {/* Content Type Badge */}
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-black/70 text-white px-2 py-1 text-xs">
                      {getContentTypeIcon(ad.contentType)} {ad.contentType}
                    </Badge>
                  </div>

                  {ad.isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                        <Play className="w-6 h-6 text-gray-800 ml-1" />
                      </div>
                    </div>
                  )}
                  
                  {ad.isAiRecommended && (
                    <div className="absolute top-2 right-16">
                      <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-2 py-1 text-xs">
                        <Sparkles className="w-3 h-3 mr-1" />
                        AI Pick
                      </Badge>
                    </div>
                  )}
                  
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaveAd(ad.id);
                    }}
                    className={`absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
                      ad.isSaved ? "opacity-100" : ""
                    }`}
                  >
                    {ad.isSaved ? (
                      <Bookmark className="w-4 h-4 text-blue-600 fill-current" />
                    ) : (
                      <BookmarkPlus className="w-4 h-4 text-white drop-shadow-lg" />
                    )}
                  </Button>

                  {/* Generate Similar Button */}
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleGenerateSimilar(ad);
                    }}
                    className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white text-xs px-3 py-1 h-7"
                  >
                    <Zap className="w-3 h-3 mr-1" />
                    Generate Similar
                  </Button>
                </div>
                
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{ad.platformLogo}</span>
                      <span className="text-sm font-medium text-gray-600">{ad.platform}</span>
                    </div>
                    {ad.trending && (
                      <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-600">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-3 line-clamp-2 leading-relaxed">
                    {ad.caption}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <span className="text-sm font-medium text-gray-800">{ad.brand}</span>
                      {ad.isVerified && (
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                      )}
                    </div>
                    <span className="text-xs text-gray-500">{ad.savedCount} saves</span>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {filteredAds.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No inspirations found</h3>
            <p className="text-gray-500">Try adjusting your search or filters to discover more ads</p>
          </div>
        )}
      </div>
    </div>
  );
}
