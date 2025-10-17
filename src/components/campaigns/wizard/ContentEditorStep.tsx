import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { EmailRichTextEditor } from "./EmailRichTextEditor";
import { WhatsAppTextEditor } from "./WhatsAppTextEditor";
import { parseFormattedText } from "@/utils/textFormatting";

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor Section */}
        <div className="space-y-2">
          <Label htmlFor="content">
            {formData.type === "email" ? "Email Content" : "Message Content"}
          </Label>
          
          {formData.type === "email" ? (
            <EmailRichTextEditor
              value={formData.message_content || ""}
              onChange={(value) => setFormData({ ...formData, message_content: value })}
            />
          ) : (
            <WhatsAppTextEditor
              value={formData.message_content || ""}
              onChange={(value) => setFormData({ ...formData, message_content: value })}
            />
          )}
          
          <p className="text-xs text-muted-foreground">
            You can use variables like {"{{name}}"}, {"{{email}}"}, {"{{phone}}"} for personalization
          </p>
        </div>

        {/* Preview Section */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Preview</Label>
          <div className="rounded-lg border border-border bg-muted/50 p-4 min-h-[300px]">
            <div className="bg-background rounded-lg p-4 border border-border h-full">
              {formData.type === "email" && formData.subject && (
                <div className="font-semibold mb-3 pb-3 border-b">
                  {formData.subject}
                </div>
              )}
              {formData.type === "email" ? (
                <div 
                  className="text-sm preview-content"
                  dangerouslySetInnerHTML={{ 
                    __html: formData.message_content || "Your message will appear here..." 
                  }}
                />
              ) : (
                <div 
                  className="text-sm preview-content whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ 
                    __html: parseFormattedText(formData.message_content) || "Your message will appear here..." 
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
