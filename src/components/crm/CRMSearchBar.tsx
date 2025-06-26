
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";

interface CRMSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function CRMSearchBar({ searchQuery, onSearchChange }: CRMSearchBarProps) {
  return (
    <div className="flex items-center space-x-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search leads..."
          className="pl-10 w-64"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Button variant="outline" size="sm">
        <Filter className="w-4 h-4 mr-2" />
        Filter
      </Button>
    </div>
  );
}
