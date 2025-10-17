import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RichTextToolbar } from "./RichTextToolbar";
import { insertFormatting, parseFormattedText } from "@/utils/textFormatting";
import { useRef } from "react";

interface ContentEditorStepProps {
  formData: any;
  setFormData: (data: any) => void;
}

export function ContentEditorStep({ formData, setFormData }: ContentEditorStepProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleFormat = (formatType: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const selectionStart = textarea.selectionStart;
    const selectionEnd = textarea.selectionEnd;
    const currentText = formData.message_content || "";

    const { newText, newCursorPos } = insertFormatting(
      currentText,
      selectionStart,
      selectionEnd,
      formatType
    );

    setFormData({ ...formData, message_content: newText });

    // Set cursor position after state update
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

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
        
        <RichTextToolbar onFormat={handleFormat} type={formData.type} />
        
        <Textarea
          ref={textareaRef}
          id="content"
          placeholder={
            formData.type === "email"
              ? "Write your email content here... Use the toolbar above to format text."
              : "Write your WhatsApp message here... Use *bold*, _italic_, ~strikethrough~"
          }
          value={formData.message_content}
          onChange={(e) => setFormData({ ...formData, message_content: e.target.value })}
          className="bg-white/80 min-h-[300px] font-mono text-sm"
        />
        <p className="text-xs text-muted-foreground">
          You can use variables like {"{{name}}"}, {"{{email}}"}, {"{{phone}}"} for personalization
        </p>
      </div>

      {/* Preview */}
      <div className="rounded-lg border border-border bg-muted/50 p-4">
        <Label className="text-xs text-muted-foreground mb-2 block">Preview</Label>
        <div className="bg-background rounded-lg p-4 border border-border">
          {formData.type === "email" && formData.subject && (
            <div className="font-semibold mb-3 pb-3 border-b">
              {formData.subject}
            </div>
          )}
          <div 
            className="text-sm preview-content"
            dangerouslySetInnerHTML={{ 
              __html: parseFormattedText(formData.message_content) || "Your message will appear here..." 
            }}
          />
        </div>
      </div>
    </div>
  );
}
