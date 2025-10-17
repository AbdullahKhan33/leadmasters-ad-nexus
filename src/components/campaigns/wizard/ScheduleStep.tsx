import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Zap } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ScheduleStepProps {
  formData: any;
  setFormData: (data: any) => void;
}

export function ScheduleStep({ formData, setFormData }: ScheduleStepProps) {
  const [sendOption, setSendOption] = useState<"now" | "schedule">("now");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState("09:00");

  const handleSendOptionChange = (value: "now" | "schedule") => {
    setSendOption(value);
    if (value === "now") {
      setFormData({ ...formData, scheduled_at: null });
    } else if (selectedDate) {
      const dateTime = new Date(selectedDate);
      const [hours, minutes] = selectedTime.split(":");
      dateTime.setHours(parseInt(hours), parseInt(minutes));
      setFormData({ ...formData, scheduled_at: dateTime.toISOString() });
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      const dateTime = new Date(date);
      const [hours, minutes] = selectedTime.split(":");
      dateTime.setHours(parseInt(hours), parseInt(minutes));
      setFormData({ ...formData, scheduled_at: dateTime.toISOString() });
    }
  };

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
    if (selectedDate) {
      const dateTime = new Date(selectedDate);
      const [hours, minutes] = time.split(":");
      dateTime.setHours(parseInt(hours), parseInt(minutes));
      setFormData({ ...formData, scheduled_at: dateTime.toISOString() });
    }
  };

  return (
    <div className="space-y-6">
      <RadioGroup value={sendOption} onValueChange={handleSendOptionChange} className="space-y-4">
        <div>
          <RadioGroupItem value="now" id="now" className="peer sr-only" />
          <Label
            htmlFor="now"
            className="flex items-start gap-3 rounded-lg border-2 border-muted bg-white/60 p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
          >
            <Zap className="w-5 h-5 mt-0.5 text-purple-600" />
            <div>
              <div className="font-semibold">Send Now</div>
              <div className="text-xs text-muted-foreground mt-1">
                Campaign will be saved as draft and can be sent manually
              </div>
            </div>
          </Label>
        </div>

        <div>
          <RadioGroupItem value="schedule" id="schedule" className="peer sr-only" />
          <Label
            htmlFor="schedule"
            className="flex items-start gap-3 rounded-lg border-2 border-muted bg-white/60 p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
          >
            <CalendarIcon className="w-5 h-5 mt-0.5 text-purple-600" />
            <div className="flex-1">
              <div className="font-semibold">Schedule for Later</div>
              <div className="text-xs text-muted-foreground mt-1 mb-3">
                Choose a specific date and time to send
              </div>

              {sendOption === "schedule" && (
                <div className="space-y-3 mt-4">
                  <div>
                    <Label className="text-xs mb-2 block">Select Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal bg-white/80",
                            !selectedDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={handleDateSelect}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label htmlFor="time" className="text-xs mb-2 block">
                      Select Time
                    </Label>
                    <input
                      type="time"
                      id="time"
                      value={selectedTime}
                      onChange={(e) => handleTimeChange(e.target.value)}
                      className="w-full px-3 py-2 border border-input rounded-md bg-white/80 text-sm"
                    />
                  </div>

                  {selectedDate && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-md border border-blue-200">
                      <p className="text-xs text-blue-900">
                        <strong>Scheduled for:</strong>{" "}
                        {format(selectedDate, "PPP")} at {selectedTime}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}
