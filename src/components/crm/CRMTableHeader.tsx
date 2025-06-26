
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Lock } from "lucide-react";

interface CRMTableHeaderProps {
  canShowAIScore: boolean;
  canShowAIActions: boolean;
}

export function CRMTableHeader({ canShowAIScore, canShowAIActions }: CRMTableHeaderProps) {
  return (
    <TableHeader className="sticky top-0 bg-white z-10 border-b">
      <TableRow className="hover:bg-transparent">
        <TableHead className="w-[250px] px-6 py-4">Lead</TableHead>
        <TableHead className="w-[180px] px-4 py-4">Contact</TableHead>
        <TableHead className="w-[120px] px-4 py-4">Source</TableHead>
        <TableHead className="w-[140px] px-4 py-4">Status</TableHead>
        <TableHead className="w-[250px] px-4 py-4">Last Message</TableHead>
        <TableHead className="w-[180px] px-4 py-4">
          <div className="flex items-center space-x-2">
            <span className="whitespace-nowrap">AI Score</span>
            {!canShowAIScore && <Lock className="w-3 h-3 text-gray-400 flex-shrink-0" />}
          </div>
        </TableHead>
        <TableHead className="w-[220px] px-4 py-4">
          <div className="flex items-center space-x-2">
            <span className="whitespace-nowrap">AI Next Action</span>
            {!canShowAIActions && <Lock className="w-3 h-3 text-gray-400 flex-shrink-0" />}
          </div>
        </TableHead>
        <TableHead className="w-[140px] px-4 py-4">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
}
