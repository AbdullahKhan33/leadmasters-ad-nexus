import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

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

interface ChangeStatusModalProps {
  lead: Lead;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (leadId: string, updates: Partial<Lead>) => void;
}

const statusOptions = [
  { value: 'New', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  { value: 'Active', color: 'bg-green-100 text-green-800 border-green-200' },
  { value: 'Awaiting Reply', color: 'bg-orange-100 text-orange-800 border-orange-200' },
  { value: 'Subscribed', color: 'bg-purple-100 text-purple-800 border-purple-200' },
  { value: 'Closed', color: 'bg-gray-100 text-gray-800 border-gray-200' },
  { value: 'Lost', color: 'bg-red-100 text-red-800 border-red-200' }
];

export function ChangeStatusModal({ lead, isOpen, onClose, onUpdate }: ChangeStatusModalProps) {
  const [newStatus, setNewStatus] = useState(lead.status);
  const [statusNote, setStatusNote] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newStatus === lead.status) {
      toast({
        title: "No Changes",
        description: "Please select a different status to update",
        variant: "destructive",
      });
      return;
    }

    onUpdate(lead.id, { 
      status: newStatus,
      ...(statusNote && { notes: lead.notes ? `${lead.notes}\n\nStatus Change: ${statusNote}` : `Status Change: ${statusNote}` })
    });
    
    toast({
      title: "Status Updated",
      description: `${lead.name}'s status changed from ${lead.status} to ${newStatus}`,
      variant: "default",
    });
    
    onClose();
  };

  const getCurrentStatusColor = (status: string) => {
    return statusOptions.find(option => option.value === status)?.color || 'bg-gray-100 text-gray-800';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Change Status - {lead.name}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Current Status:</p>
            <Badge className={getCurrentStatusColor(lead.status)}>
              {lead.status}
            </Badge>
          </div>

          <div className="space-y-2">
            <Label htmlFor="newStatus">New Status</Label>
            <Select value={newStatus} onValueChange={setNewStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${option.color.split(' ')[0]}`}></div>
                      <span>{option.value}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="statusNote">Status Change Note (Optional)</Label>
            <Textarea
              id="statusNote"
              value={statusNote}
              onChange={(e) => setStatusNote(e.target.value)}
              placeholder="Add a note about why the status is changing..."
              rows={3}
              className="resize-none"
            />
          </div>

          {newStatus !== lead.status && (
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-600">
                <strong>Status will change from:</strong> {lead.status} → {newStatus}
              </p>
            </div>
          )}

          <div className="flex space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1"
              disabled={newStatus === lead.status}
            >
              Update Status
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}