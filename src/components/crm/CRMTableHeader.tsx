
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Lock } from "lucide-react";

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

interface CRMTableHeaderProps {
  canShowAIScore: boolean;
  canShowAIActions: boolean;
  visibleColumns: ColumnVisibility;
}

export function CRMTableHeader({ canShowAIScore, canShowAIActions, visibleColumns }: CRMTableHeaderProps) {
  return (
    <TableHeader className="sticky top-0 bg-white z-10 border-b">
      <TableRow className="hover:bg-transparent">
        {visibleColumns.lead && <TableHead className="w-[250px] px-6 py-4">Lead</TableHead>}
        {visibleColumns.contact && <TableHead className="w-[180px] px-4 py-4">Contact</TableHead>}
        {visibleColumns.source && <TableHead className="w-[120px] px-4 py-4">Source</TableHead>}
        {visibleColumns.status && <TableHead className="w-[140px] px-4 py-4">Status</TableHead>}
        {visibleColumns.lastMessage && <TableHead className="w-[250px] px-4 py-4">Last Message</TableHead>}
        {visibleColumns.aiScore && (
          <TableHead className="w-[180px] px-4 py-4">
            <div className="flex items-center space-x-2">
              <span className="whitespace-nowrap">AI Score</span>
              {!canShowAIScore && <Lock className="w-3 h-3 text-gray-400 flex-shrink-0" />}
            </div>
          </TableHead>
        )}
        {visibleColumns.aiNextAction && (
          <TableHead className="w-[220px] px-4 py-4">
            <div className="flex items-center space-x-2">
              <span className="whitespace-nowrap">AI Next Action</span>
              {!canShowAIActions && <Lock className="w-3 h-3 text-gray-400 flex-shrink-0" />}
            </div>
          </TableHead>
        )}
        {visibleColumns.actions && <TableHead className="w-[140px] px-4 py-4">Actions</TableHead>}
      </TableRow>
    </TableHeader>
  );
}
