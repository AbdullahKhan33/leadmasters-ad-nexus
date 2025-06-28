
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from 'lucide-react';

interface WorkspaceFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterActive: 'all' | 'active' | 'inactive';
  onFilterChange: (filter: 'all' | 'active' | 'inactive') => void;
}

export function WorkspaceFilters({ 
  searchTerm, 
  onSearchChange, 
  filterActive, 
  onFilterChange 
}: WorkspaceFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Search workspaces..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-300 transition-all duration-200"
        />
      </div>
      <div className="flex gap-2">
        <Button
          variant={filterActive === 'all' ? 'default' : 'outline'}
          onClick={() => onFilterChange('all')}
          className="px-4 py-3 rounded-xl"
        >
          <Filter className="w-4 h-4 mr-2" />
          All
        </Button>
        <Button
          variant={filterActive === 'active' ? 'default' : 'outline'}
          onClick={() => onFilterChange('active')}
          className="px-4 py-3 rounded-xl"
        >
          Active
        </Button>
        <Button
          variant={filterActive === 'inactive' ? 'default' : 'outline'}
          onClick={() => onFilterChange('inactive')}
          className="px-4 py-3 rounded-xl"
        >
          Inactive
        </Button>
      </div>
    </div>
  );
}
