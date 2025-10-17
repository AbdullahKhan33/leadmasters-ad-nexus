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
        <RadioGroup
          value={formData.type}
          onValueChange={(value: CampaignType) => setFormData({ ...formData, type: value })}
          className="grid grid-cols-2 gap-4"
        >
          <div>
            <RadioGroupItem value="email" id="email" className="peer sr-only" />
            <Label
              htmlFor="email"
              className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-white/60 p-6 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
            >
              <Mail className="mb-3 h-8 w-8 text-purple-600" />
              <div className="text-center">
                <div className="font-semibold">Email Campaign</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Track opens, clicks & schedule delivery
                </div>
              </div>
            </Label>
          </div>

          <div>
            <RadioGroupItem value="whatsapp" id="whatsapp" className="peer sr-only" />
            <Label
              htmlFor="whatsapp"
              className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-white/60 p-6 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
            >
              <MessageSquare className="mb-3 h-8 w-8 text-purple-600" />
              <div className="text-center">
                <div className="font-semibold">WhatsApp Campaign</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Instant delivery to your contacts
                </div>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
