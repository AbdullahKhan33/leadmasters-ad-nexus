import { Button } from "@/components/ui/button";
import { Bold, Italic, List, ListOrdered, Strikethrough, Code } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface RichTextToolbarProps {
  onFormat: (formatType: string) => void;
  type: "email" | "whatsapp";
}

export function RichTextToolbar({ onFormat, type }: RichTextToolbarProps) {
  const formatButtons = [
    { icon: Bold, action: "bold", label: "Bold (*text*)" },
    { icon: Italic, action: "italic", label: "Italic (_text_)" },
    { icon: Strikethrough, action: "strikethrough", label: "Strikethrough (~text~)" },
    { icon: Code, action: "monospace", label: "Monospace (```text```)" },
    { icon: ListOrdered, action: "orderedList", label: "Numbered List" },
    { icon: List, action: "unorderedList", label: "Bullet List" },
  ];

  return (
    <div className="flex items-center gap-1 p-2 border border-input rounded-md bg-background mb-2">
      <div className="text-xs text-muted-foreground mr-2 px-2">Format:</div>
      {formatButtons.map((button, index) => (
        <div key={button.action} className="flex items-center">
          {index === 4 && <Separator orientation="vertical" className="h-6 mx-1" />}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onFormat(button.action)}
            title={button.label}
            className="h-8 w-8 p-0"
          >
            <button.icon className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Separator orientation="vertical" className="h-6 mx-1" />
      <div className="text-xs text-muted-foreground ml-2">
        {type === "whatsapp" ? "WhatsApp" : "Email"} formatting
      </div>
    </div>
  );
}
