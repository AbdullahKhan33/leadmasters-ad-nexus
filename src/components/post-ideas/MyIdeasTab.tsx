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
import { Lightbulb, CheckSquare, Square } from "lucide-react";
import { Button } from "@/components/ui/button";

export const MyIdeasTab = () => {
  const { ideas, ideasLoading, deleteIdea, updateIdeaStatus } = usePostIdeas();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

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

  // Group ideas by date
  const groupedIdeas = useMemo(() => {
    const groups: Record<string, typeof filteredIdeas> = {
      Today: [],
      Yesterday: [],
      "This Week": [],
      "This Month": [],
      Older: [],
    };

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterdayStart = new Date(todayStart);
    yesterdayStart.setDate(yesterdayStart.getDate() - 1);
    const weekStart = new Date(todayStart);
    weekStart.setDate(weekStart.getDate() - 7);
    const monthStart = new Date(todayStart);
    monthStart.setDate(monthStart.getDate() - 30);

    filteredIdeas.forEach((idea) => {
      const ideaDate = new Date(idea.created_at);

      if (ideaDate >= todayStart) {
        groups.Today.push(idea);
      } else if (ideaDate >= yesterdayStart) {
        groups.Yesterday.push(idea);
      } else if (ideaDate >= weekStart) {
        groups["This Week"].push(idea);
      } else if (ideaDate >= monthStart) {
        groups["This Month"].push(idea);
      } else {
        groups.Older.push(idea);
      }
    });

    return groups;
  }, [filteredIdeas]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedIds(filteredIdeas.map((idea) => idea.id));
  };

  const handleDeselectAll = () => {
    setSelectedIds([]);
  };

  const handlePublishSelected = () => {
    console.log("Publishing posts:", selectedIds);
    // TODO: Implement publish logic
  };

  const handleScheduleSelected = () => {
    console.log("Scheduling posts:", selectedIds);
    // TODO: Implement schedule logic
  };

  if (ideasLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary & Bulk Actions */}
      {filteredIdeas.length > 0 && (
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredIdeas.length} of {ideas?.length || 0} ideas
            </p>
            {selectedIds.length > 0 && (
              <>
                <div className="h-4 w-px bg-border" />
                <p className="text-sm font-medium">
                  {selectedIds.length} selected
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDeselectAll}
                  className="h-7"
                >
                  Clear Selection
                </Button>
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            {selectedIds.length === filteredIdeas.length ? (
              <Button
                variant="outline"
                size="sm"
                onClick={handleDeselectAll}
                className="gap-2"
              >
                <CheckSquare className="w-4 h-4" />
                Deselect All
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={handleSelectAll}
                className="gap-2"
              >
                <Square className="w-4 h-4" />
                Select All
              </Button>
            )}
          </div>
        </div>
      )}

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
        <div className="flex flex-col items-center justify-center py-16 space-y-4">
          <div className="p-6 bg-purple-50 rounded-full">
            <Lightbulb className="w-16 h-16 text-purple-600" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-semibold text-gray-900">
              No ideas found
            </h3>
            <p className="text-base text-gray-600 max-w-md">
              {searchQuery || statusFilter !== "all" || platformFilter !== "all"
                ? "Try adjusting your filters to see more ideas"
                : "Generate your first post ideas to get started"}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedIdeas).map(
            ([groupName, groupIdeas]) =>
              groupIdeas.length > 0 && (
                <div key={groupName} className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    {groupName}
                  </h3>
                  <div className="space-y-4">
                    {groupIdeas.map((idea) => (
                      <IdeaCard
                        key={idea.id}
                        idea={idea}
                        isSelected={selectedIds.includes(idea.id)}
                        onToggleSelect={() => toggleSelect(idea.id)}
                        onDelete={(id) => deleteIdea.mutate(id)}
                      />
                    ))}
                  </div>
                </div>
              )
          )}
        </div>
      )}

      {/* Action Buttons - Fixed at bottom when posts are selected */}
      {selectedIds.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 shadow-lg z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <p className="text-sm font-medium">
              {selectedIds.length} post{selectedIds.length > 1 ? "s" : ""}{" "}
              selected
            </p>
            <div className="flex gap-3">
              <Button
                onClick={handlePublishSelected}
                className="gap-2"
                size="lg"
              >
                Publish Selected Posts
              </Button>
              <Button
                onClick={handleScheduleSelected}
                variant="outline"
                className="gap-2"
                size="lg"
              >
                Schedule Selected Posts
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
