import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSegmentsData } from "@/hooks/useSegmentsData";
import { Users, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SegmentSelectionStepProps {
  formData: any;
  setFormData: (data: any) => void;
}

export function SegmentSelectionStep({ formData, setFormData }: SegmentSelectionStepProps) {
  const { segments, isLoading } = useSegmentsData();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  if (segments.length === 0) {
    return (
      <div className="text-center py-12">
        <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-semibold mb-2">No Segments Available</h3>
        <p className="text-sm text-muted-foreground">
          Create a segment first to target specific groups of contacts.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Label>Select Target Segment</Label>
      <RadioGroup
        value={formData.segment_id || ""}
        onValueChange={(value) => setFormData({ ...formData, segment_id: value })}
        className="space-y-3"
      >
        {segments.map((segment) => (
          <div key={segment.id}>
            <RadioGroupItem value={segment.id} id={segment.id} className="peer sr-only" />
            <Label
              htmlFor={segment.id}
              className="flex items-center justify-between rounded-lg border-2 border-muted bg-white/60 p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: segment.color }}
                />
                <div>
                  <div className="font-semibold">{segment.name}</div>
                  {segment.description && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {segment.description}
                    </div>
                  )}
                </div>
              </div>
              <Badge variant="secondary" className="ml-auto">
                <Users className="w-3 h-3 mr-1" />
                {segment.lead_count} leads
              </Badge>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
