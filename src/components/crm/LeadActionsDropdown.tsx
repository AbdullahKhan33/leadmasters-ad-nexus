import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, MessageSquare, Bell, CheckCircle } from "lucide-react";
import { EditLeadModal } from "./EditLeadModal";
import { AddNotesModal } from "./AddNotesModal";
import { SetReminderModal } from "./SetReminderModal";
import { ChangeStatusModal } from "./ChangeStatusModal";

interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  source: string;
  status: string;
  list?: string;
  category?: string;
  lastMessage: string;
  timestamp: string;
  notes?: string;
  aiScore?: number;
  aiNextAction?: string;
}

interface LeadActionsDropdownProps {
  lead: Lead;
  onLeadUpdate: (leadId: string, updates: Partial<Lead>) => void;
}

export function LeadActionsDropdown({ lead, onLeadUpdate }: LeadActionsDropdownProps) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [notesModalOpen, setNotesModalOpen] = useState(false);
  const [reminderModalOpen, setReminderModalOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 bg-white border border-gray-200 shadow-lg z-50">
          <DropdownMenuItem 
            onClick={() => setEditModalOpen(true)}
            className="flex items-center space-x-2 hover:bg-gray-50 cursor-pointer"
          >
            <Edit className="w-4 h-4" />
            <span>Edit Lead</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setNotesModalOpen(true)}
            className="flex items-center space-x-2 hover:bg-gray-50 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Add Notes</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setReminderModalOpen(true)}
            className="flex items-center space-x-2 hover:bg-gray-50 cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            <span>Set Reminder</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={() => setStatusModalOpen(true)}
            className="flex items-center space-x-2 hover:bg-gray-50 cursor-pointer"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Change Status</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditLeadModal
        lead={lead}
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onUpdate={onLeadUpdate}
      />

      <AddNotesModal
        lead={lead}
        isOpen={notesModalOpen}
        onClose={() => setNotesModalOpen(false)}
        onUpdate={onLeadUpdate}
      />

      <SetReminderModal
        lead={lead}
        isOpen={reminderModalOpen}
        onClose={() => setReminderModalOpen(false)}
        onUpdate={onLeadUpdate}
      />

      <ChangeStatusModal
        lead={lead}
        isOpen={statusModalOpen}
        onClose={() => setStatusModalOpen(false)}
        onUpdate={onLeadUpdate}
      />
    </>
  );
}