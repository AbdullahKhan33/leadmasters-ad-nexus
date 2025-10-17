import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ContentEditorStepProps {
  formData: any;
  setFormData: (data: any) => void;
}

export function ContentEditorStep({ formData, setFormData }: ContentEditorStepProps) {
  return (
    <div className="space-y-6">
      {formData.type === "email" && (
        <div className="space-y-2">
          <Label htmlFor="subject">Email Subject</Label>
          <Input
            id="subject"
            placeholder="e.g., Exclusive Offer Just For You!"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="bg-white/80"
          />
          <p className="text-xs text-muted-foreground">
            Keep it under 50 characters for best results
          </p>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="content">
          {formData.type === "email" ? "Email Content" : "Message Content"}
        </Label>
        <Textarea
          id="content"
          placeholder={
            formData.type === "email"
              ? "Write your email content here..."
              : "Write your WhatsApp message here..."
          }
          value={formData.message_content}
          onChange={(e) => setFormData({ ...formData, message_content: e.target.value })}
          className="bg-white/80 min-h-[300px]"
        />
        <p className="text-xs text-muted-foreground">
          You can use variables like {"{{name}}"}, {"{{email}}"}, {"{{phone}}"} for personalization
        </p>
      </div>

      {/* Preview */}
      <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4">
        <Label className="text-xs text-muted-foreground mb-2 block">Preview</Label>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          {formData.type === "email" && formData.subject && (
            <div className="font-semibold mb-3 pb-3 border-b">
              {formData.subject}
            </div>
          )}
          <div className="text-sm whitespace-pre-wrap">
            {formData.message_content || "Your message will appear here..."}
          </div>
        </div>
      </div>
    </div>
  );
}
