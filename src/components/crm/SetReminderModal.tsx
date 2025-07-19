import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

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
  reminderDate?: string;
  reminderNote?: string;
  aiScore?: number;
  aiNextAction?: string;
}

interface SetReminderModalProps {
  lead: Lead;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (leadId: string, updates: Partial<Lead>) => void;
}

export function SetReminderModal({ lead, isOpen, onClose, onUpdate }: SetReminderModalProps) {
  const [reminderDate, setReminderDate] = useState('');
  const [reminderTime, setReminderTime] = useState('');
  const [reminderNote, setReminderNote] = useState('');
  const { toast } = useToast();

  // Set default date to tomorrow
  useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setReminderDate(format(tomorrow, 'yyyy-MM-dd'));
    setReminderTime('09:00');
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reminderDate || !reminderTime) {
      toast({
        title: "Missing Information",
        description: "Please select both date and time for the reminder",
        variant: "destructive",
      });
      return;
    }

    const reminderDateTime = new Date(`${reminderDate}T${reminderTime}`);
    
    // Create updates object with proper type
    const updates: Partial<Lead> = { 
      reminderDate: reminderDateTime.toISOString(),
      reminderNote 
    };
    
    onUpdate(lead.id, updates);
    
    toast({
      title: "Reminder Set",
      description: `Reminder set for ${lead.name} on ${format(reminderDateTime, 'PPP')} at ${format(reminderDateTime, 'p')}`,
      variant: "default",
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Set Reminder - {lead.name}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reminderDate">Reminder Date</Label>
            <Input
              id="reminderDate"
              type="date"
              value={reminderDate}
              onChange={(e) => setReminderDate(e.target.value)}
              min={format(new Date(), 'yyyy-MM-dd')}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reminderTime">Reminder Time</Label>
            <Input
              id="reminderTime"
              type="time"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reminderNote">Reminder Note (Optional)</Label>
            <Textarea
              id="reminderNote"
              value={reminderNote}
              onChange={(e) => setReminderNote(e.target.value)}
              placeholder="What do you want to be reminded about?"
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-blue-600 mb-1"><strong>Quick Reminder Options:</strong></p>
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  const tomorrow = new Date();
                  tomorrow.setDate(tomorrow.getDate() + 1);
                  setReminderDate(format(tomorrow, 'yyyy-MM-dd'));
                  setReminderTime('09:00');
                }}
                className="text-xs"
              >
                Tomorrow 9 AM
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  const nextWeek = new Date();
                  nextWeek.setDate(nextWeek.getDate() + 7);
                  setReminderDate(format(nextWeek, 'yyyy-MM-dd'));
                  setReminderTime('10:00');
                }}
                className="text-xs"
              >
                Next Week
              </Button>
            </div>
          </div>

          <div className="flex space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Set Reminder
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}