
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Filter } from "lucide-react";

interface ColumnVisibility {
  lead: boolean;
  contact: boolean;
  source: boolean;
  status: boolean;
  lastMessage: boolean;
  aiScore: boolean;
  aiNextAction: boolean;
  actions: boolean;
}

interface CRMSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  visibleColumns: ColumnVisibility;
  onColumnVisibilityChange: (columns: ColumnVisibility) => void;
}

export function CRMSearchBar({ searchQuery, onSearchChange, visibleColumns, onColumnVisibilityChange }: CRMSearchBarProps) {
  const columnLabels = {
    lead: "Lead",
    contact: "Contact",
    source: "Source", 
    status: "Status",
    lastMessage: "Last Message",
    aiScore: "AI Score",
    aiNextAction: "AI Next Action",
    actions: "Actions"
  };

  const handleColumnToggle = (column: keyof ColumnVisibility) => {
    onColumnVisibilityChange({
      ...visibleColumns,
      [column]: !visibleColumns[column]
    });
  };
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
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Columns
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56">
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Show/Hide Columns</h4>
            {Object.entries(columnLabels).map(([key, label]) => (
              <div key={key} className="flex items-center space-x-2">
                <Checkbox
                  id={key}
                  checked={visibleColumns[key as keyof ColumnVisibility]}
                  onCheckedChange={() => handleColumnToggle(key as keyof ColumnVisibility)}
                />
                <label htmlFor={key} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {label}
                </label>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
