
import React, { useState } from "react";
import { ArrowLeft, Search, X, CheckCircle, Play, Sparkles, TrendingUp, Bookmark } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface SavedInspiration {
  id: string;
  platform: string;
  platformLogo: string;
  image: string;
  caption: string;
  brand: string;
  isVerified: boolean;
  isAiRecommended: boolean;
  isVideo?: boolean;
  contentType: string;
  trending?: boolean;
  savedCount?: number;
  savedAt: string;
}

const mockSavedAds: SavedInspiration[] = [
  {
    id: "2",
    platform: "Instagram",
    platformLogo: "📷",
    image: "/placeholder.svg",
    caption: "Sustainable fashion meets modern style. Shop our eco-friendly collection...",
    brand: "@ecofashion",
    isVerified: true,
    isAiRecommended: false,
    isVideo: true,
    contentType: "Video",
    trending: false,
    savedCount: 189,
    savedAt: "2024-01-20",
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
    isVideo: true,
    contentType: "Video",
    trending: false,
    savedCount: 267,
    savedAt: "2024-01-18",
  },
];

export function MyInspirations() {
  const [searchQuery, setSearchQuery] = useState("");
  const [savedAds, setSavedAds] = useState<SavedInspiration[]>(mockSavedAds);
  const navigate = useNavigate();

  const handleRemoveInspiration = (adId: string) => {
    setSavedAds(prev => prev.filter(ad => ad.id !== adId));
  };

  const handleBackToHub = () => {
    navigate('/');
  };

  const filteredSavedAds = savedAds.filter(ad => 
    ad.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ad.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={handleBackToHub}
            className="mr-4 hover:bg-white/50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Hub
          </Button>
          
          <div className="flex-1 text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
              My Inspirations
            </h1>
            <p className="text-gray-600 text-lg">
              {savedAds.length} saved inspiration{savedAds.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg border border-white/20">
          <div className="relative max-w-2xl mx-auto w-full">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search your saved inspirations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 h-12 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-400 text-lg"
            />
          </div>
        </div>

        {/* Saved Inspirations Grid */}
        {filteredSavedAds.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSavedAds.map((ad) => (
              <Card
                key={ad.id}
                className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:scale-105 cursor-pointer bg-white/80 backdrop-blur-sm border-white/20"
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
                  
                  {/* Remove Button */}
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveInspiration(ad.id);
                    }}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-red-500/80 hover:bg-red-600/90 text-white"
                  >
                    <X className="w-4 h-4" />
                  </Button>

                  {/* Saved indicator */}
                  <div className="absolute bottom-2 left-2">
                    <Badge className="bg-blue-500 text-white px-2 py-1 text-xs">
                      <Bookmark className="w-3 h-3 mr-1 fill-current" />
                      Saved {new Date(ad.savedAt).toLocaleDateString()}
                    </Badge>
                  </div>
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
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Bookmark className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {searchQuery ? "No matching inspirations" : "No saved inspirations yet"}
            </h3>
            <p className="text-gray-500">
              {searchQuery 
                ? "Try adjusting your search to find saved inspirations" 
                : "Start saving inspirations from the Inspiration Hub to see them here"
              }
            </p>
            {!searchQuery && (
              <Button
                onClick={handleBackToHub}
                className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                Browse Inspirations
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
