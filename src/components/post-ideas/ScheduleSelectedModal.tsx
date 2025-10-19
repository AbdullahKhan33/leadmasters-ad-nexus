import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Linkedin, Twitter, MessageCircle, Calendar as CalendarIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { GeneratedIdea } from "@/hooks/usePostIdeas";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ScheduleSelectedModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedIdeas: GeneratedIdea[];
  onScheduleComplete: () => void;
}

export const ScheduleSelectedModal = ({
  open,
  onOpenChange,
  selectedIdeas,
  onScheduleComplete,
}: ScheduleSelectedModalProps) => {
  const { toast } = useToast();
  
  // Extract locked platforms from selected ideas
  const lockedPlatforms = Array.from(
    new Set(selectedIdeas.map((idea) => idea.platform.toLowerCase()))
  );
  
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(lockedPlatforms);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("12:00");
  const [isScheduling, setIsScheduling] = useState(false);

  // Reset selected platforms when modal opens or locked platforms change
  useEffect(() => {
    if (open) {
      setSelectedPlatforms(lockedPlatforms);
    }
  }, [open, lockedPlatforms]);

  const platforms = [
    { id: "facebook", name: "Facebook", icon: Facebook, color: "text-blue-600" },
    { id: "instagram", name: "Instagram", icon: Instagram, color: "text-pink-600" },
    { id: "linkedin", name: "LinkedIn", icon: Linkedin, color: "text-blue-700" },
    { id: "twitter", name: "Twitter", icon: Twitter, color: "text-sky-500" },
    { id: "whatsapp", name: "WhatsApp", icon: MessageCircle, color: "text-green-600" },
  ];

  const togglePlatform = (platformId: string) => {
    // Prevent deselecting locked platforms
    if (lockedPlatforms.includes(platformId)) {
      return;
    }
    
    setSelectedPlatforms((prev) =>
      prev.includes(platformId)
        ? prev.filter((p) => p !== platformId)
        : [...prev, platformId]
    );
  };

  const handleSchedule = async () => {
    if (selectedPlatforms.length === 0) {
      toast({
        title: "No platforms selected",
        description: "Please select at least one platform to schedule to.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedDate) {
      toast({
        title: "No date selected",
        description: "Please select a date to schedule your posts.",
        variant: "destructive",
      });
      return;
    }

    setIsScheduling(true);

    try {
      // Simulate scheduling process
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const scheduledDateTime = format(selectedDate, "MMM dd, yyyy") + " at " + selectedTime;

      toast({
        title: "Posts Scheduled! 📅",
        description: `Successfully scheduled ${selectedIdeas.length} post${
          selectedIdeas.length > 1 ? "s" : ""
        } for ${scheduledDateTime}.`,
      });

      onScheduleComplete();
      onOpenChange(false);
      setSelectedDate(undefined);
      setSelectedTime("12:00");
    } catch (error) {
      toast({
        title: "Scheduling Failed",
        description: "There was an error scheduling your posts. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsScheduling(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Schedule Selected Posts</DialogTitle>
          <DialogDescription>
            Schedule {selectedIdeas.length} post{selectedIdeas.length > 1 ? "s" : ""} to
            be published at a specific date and time.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Platform Selection */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Select Platforms</Label>
            <div className="grid grid-cols-2 gap-4">
              {platforms.map((platform) => {
                const Icon = platform.icon;
                const isSelected = selectedPlatforms.includes(platform.id);
                const isLocked = lockedPlatforms.includes(platform.id);
                return (
                  <div
                    key={platform.id}
                    
                    className={`flex items-center space-x-3 p-4 border-2 rounded-lg transition-all ${
                      isLocked
                        ? "border-primary bg-primary/10 cursor-default"
                        : isSelected
                        ? "border-primary bg-primary/5 cursor-pointer"
                        : "border-border hover:border-primary/50 cursor-pointer"
                    }`}
                  >
                    <Checkbox
                      checked={isSelected}
                      disabled={isLocked}
                      onCheckedChange={() => togglePlatform(platform.id)}
                    />
                    <Icon className={`w-5 h-5 ${platform.color}`} />
                    <span className="font-medium">{platform.name}</span>
                    {isLocked && (
                      <span className="ml-auto text-xs text-muted-foreground">(Required)</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Date & Time Selection */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Select Date & Time</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>Time</Label>
                <Input
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Post Preview */}
          <div className="space-y-2">
            <Label className="text-base font-semibold">Posts to Schedule</Label>
            <div className="max-h-40 overflow-y-auto space-y-2">
              {selectedIdeas.map((idea, index) => (
                <div
                  key={idea.id}
                  className="p-3 bg-muted rounded-lg text-sm"
                >
                  <p className="font-medium">Post {index + 1}</p>
                  <p className="text-muted-foreground line-clamp-2">
                    {idea.post_caption}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isScheduling}
          >
            Cancel
          </Button>
          <Button onClick={handleSchedule} disabled={isScheduling}>
            {isScheduling ? "Scheduling..." : "Schedule Posts"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
