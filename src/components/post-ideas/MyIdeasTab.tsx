import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePostIdeas } from "@/hooks/usePostIdeas";
import { IdeaCard } from "./IdeaCard";
import { Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

export const MyIdeasTab = () => {
  const { ideas, ideasLoading, deleteIdea, updateIdeaStatus } = usePostIdeas();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  const filteredIdeas = useMemo(() => {
    if (!ideas) return [];

    return ideas.filter((idea) => {
      // Search filter
      if (
        searchQuery &&
        !idea.post_caption.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Status filter
      if (statusFilter !== "all" && idea.status !== statusFilter) {
        return false;
      }

      // Platform filter
      if (
        platformFilter !== "all" &&
        idea.platform.toLowerCase() !== platformFilter
      ) {
        return false;
      }

      // Date filter
      if (dateFilter !== "all") {
        const ideaDate = new Date(idea.created_at);
        const now = new Date();
        const diffDays = Math.floor(
          (now.getTime() - ideaDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (dateFilter === "7" && diffDays > 7) return false;
        if (dateFilter === "30" && diffDays > 30) return false;
        if (dateFilter === "90" && diffDays > 90) return false;
      }

      return true;
    });
  }, [ideas, searchQuery, statusFilter, platformFilter, dateFilter]);

  if (ideasLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters & Search */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="search">Search</Label>
          <Input
            id="search"
            placeholder="Search by caption..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger id="status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="generated">Generated</SelectItem>
              <SelectItem value="saved">Saved</SelectItem>
              <SelectItem value="drafted">Drafted</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="platform">Platform</Label>
          <Select value={platformFilter} onValueChange={setPlatformFilter}>
            <SelectTrigger id="platform">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="facebook">Facebook</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
              <SelectItem value="twitter">Twitter</SelectItem>
              <SelectItem value="tiktok">TikTok</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Date Range</Label>
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger id="date">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All time</SelectItem>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Ideas Display */}
      {filteredIdeas.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="p-4 bg-purple-50 rounded-full">
            <Lightbulb className="w-12 h-12 text-purple-600" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">
              No ideas found
            </h3>
            <p className="text-sm text-gray-600 max-w-md">
              {searchQuery || statusFilter !== "all" || platformFilter !== "all"
                ? "Try adjusting your filters to see more ideas"
                : "Generate your first post ideas to get started"}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredIdeas.map((idea) => (
            <IdeaCard
              key={idea.id}
              idea={idea}
              onDelete={(id) => deleteIdea.mutate(id)}
              onStatusChange={(id, status) =>
                updateIdeaStatus.mutate({ id, status })
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};
