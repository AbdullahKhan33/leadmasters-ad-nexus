import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Mail, MessageSquare } from "lucide-react";
import { CampaignType } from "@/types/campaigns";

interface CampaignTypeStepProps {
  formData: any;
  setFormData: (data: any) => void;
}

export function CampaignTypeStep({ formData, setFormData }: CampaignTypeStepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Campaign Name</Label>
        <Input
          id="name"
          placeholder="e.g., Summer Sale Announcement"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="bg-white/80"
        />
      </div>

      <div className="space-y-3">
        <Label>Campaign Type</Label>
        <div className="rounded-lg border-2 border-primary bg-primary/5 p-6">
          <div className="flex items-center gap-3">
            <Mail className="h-8 w-8 text-purple-600" />
            <div>
              <div className="font-semibold">Email Campaign</div>
              <div className="text-xs text-muted-foreground mt-1">
                Track opens, clicks & schedule delivery
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3 p-2 bg-blue-50 rounded border border-blue-200">
            <MessageSquare className="inline w-3 h-3 mr-1" />
            Looking for WhatsApp campaigns? Visit <span className="font-semibold">Campaign Hub</span> for WhatsApp messaging.
          </p>
        </div>
      </div>
    </div>
  );
}
