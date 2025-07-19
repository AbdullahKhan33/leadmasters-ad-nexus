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
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleOpenModal = (modalType: 'edit' | 'notes' | 'reminder' | 'status') => {
    setDropdownOpen(false); // Close dropdown first
    
    // Small delay to ensure dropdown closes before modal opens
    setTimeout(() => {
      switch (modalType) {
        case 'edit':
          setEditModalOpen(true);
          break;
        case 'notes':
          setNotesModalOpen(true);
          break;
        case 'reminder':
          setReminderModalOpen(true);
          break;
        case 'status':
          setStatusModalOpen(true);
          break;
      }
    }, 100);
  };

  const closeAllModals = () => {
    setEditModalOpen(false);
    setNotesModalOpen(false);
    setReminderModalOpen(false);
    setStatusModalOpen(false);
  };

  return (
    <>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 bg-white border border-gray-200 shadow-lg z-50">
          <DropdownMenuItem 
            onClick={() => handleOpenModal('edit')}
            className="flex items-center space-x-2 hover:bg-gray-50 cursor-pointer"
          >
            <Edit className="w-4 h-4" />
            <span>Edit Lead</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => handleOpenModal('notes')}
            className="flex items-center space-x-2 hover:bg-gray-50 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Add Notes</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => handleOpenModal('reminder')}
            className="flex items-center space-x-2 hover:bg-gray-50 cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            <span>Set Reminder</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={() => handleOpenModal('status')}
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
        onClose={() => {
          setEditModalOpen(false);
          closeAllModals();
        }}
        onUpdate={onLeadUpdate}
      />

      <AddNotesModal
        lead={lead}
        isOpen={notesModalOpen}
        onClose={() => {
          setNotesModalOpen(false);
          closeAllModals();
        }}
        onUpdate={onLeadUpdate}
      />

      <SetReminderModal
        lead={lead}
        isOpen={reminderModalOpen}
        onClose={() => {
          setReminderModalOpen(false);
          closeAllModals();
        }}
        onUpdate={onLeadUpdate}
      />

      <ChangeStatusModal
        lead={lead}
        isOpen={statusModalOpen}
        onClose={() => {
          setStatusModalOpen(false);
          closeAllModals();
        }}
        onUpdate={onLeadUpdate}
      />
    </>
  );
}