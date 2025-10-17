import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Bold, Italic, Strikethrough } from "lucide-react";
import { useRef } from "react";
import { insertFormatting } from "@/utils/textFormatting";

interface WhatsAppTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function WhatsAppTextEditor({ value, onChange }: WhatsAppTextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleFormat = (formatType: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const selectionStart = textarea.selectionStart;
    const selectionEnd = textarea.selectionEnd;
    const currentText = value || "";

    const { newText, newCursorPos } = insertFormatting(
      currentText,
      selectionStart,
      selectionEnd,
      formatType
    );

    onChange(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1 p-2 border border-input rounded-md bg-background">
        <div className="text-xs text-muted-foreground mr-2 px-2">Format:</div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleFormat("bold")}
          title="Bold (*text*)"
          className="h-8 w-8 p-0"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleFormat("italic")}
          title="Italic (_text_)"
          className="h-8 w-8 p-0"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleFormat("strikethrough")}
          title="Strikethrough (~text~)"
          className="h-8 w-8 p-0"
        >
          <Strikethrough className="h-4 w-4" />
        </Button>
        <div className="text-xs text-muted-foreground ml-auto px-2">
          WhatsApp formatting
        </div>
      </div>
      
      <Textarea
        ref={textareaRef}
        placeholder="Write your WhatsApp message here... Use *bold*, _italic_, ~strikethrough~"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-white/80 min-h-[300px]"
      />
    </div>
  );
}
