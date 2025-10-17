// Insert formatting around selected text or at cursor position
export function insertFormatting(
  text: string,
  selectionStart: number,
  selectionEnd: number,
  formatType: string
): { newText: string; newCursorPos: number } {
  const selectedText = text.substring(selectionStart, selectionEnd);
  const beforeText = text.substring(0, selectionStart);
  const afterText = text.substring(selectionEnd);

  let formattedText = "";
  let cursorOffset = 0;

  switch (formatType) {
    case "bold":
      formattedText = selectedText ? `*${selectedText}*` : "*bold text*";
      cursorOffset = selectedText ? 1 : 1;
      break;
    case "italic":
      formattedText = selectedText ? `_${selectedText}_` : "_italic text_";
      cursorOffset = selectedText ? 1 : 1;
      break;
    case "strikethrough":
      formattedText = selectedText ? `~${selectedText}~` : "~strikethrough~";
      cursorOffset = selectedText ? 1 : 1;
      break;
    case "monospace":
      formattedText = selectedText ? `\`\`\`${selectedText}\`\`\`` : "```monospace```";
      cursorOffset = selectedText ? 3 : 3;
      break;
    case "orderedList":
      const orderedLines = selectedText
        ? selectedText.split("\n").map((line, i) => `${i + 1}. ${line}`)
        : ["1. First item", "2. Second item", "3. Third item"];
      formattedText = selectedText ? orderedLines.join("\n") : orderedLines.join("\n");
      cursorOffset = 0;
      break;
    case "unorderedList":
      const unorderedLines = selectedText
        ? selectedText.split("\n").map((line) => `• ${line}`)
        : ["• First item", "• Second item", "• Third item"];
      formattedText = selectedText ? unorderedLines.join("\n") : unorderedLines.join("\n");
      cursorOffset = 0;
      break;
    default:
      formattedText = selectedText;
  }

  const newText = beforeText + formattedText + afterText;
  const newCursorPos = selectionStart + cursorOffset + (selectedText ? selectedText.length : 0);

  return { newText, newCursorPos };
}

// Parse formatted text for preview display
export function parseFormattedText(text: string): string {
  if (!text) return "";

  // Convert markdown-style formatting to HTML
  let formattedText = text;

  // Bold: *text* -> <strong>text</strong>
  formattedText = formattedText.replace(/\*([^*]+)\*/g, "<strong>$1</strong>");

  // Italic: _text_ -> <em>text</em>
  formattedText = formattedText.replace(/_([^_]+)_/g, "<em>$1</em>");

  // Strikethrough: ~text~ -> <del>text</del>
  formattedText = formattedText.replace(/~([^~]+)~/g, "<del>$1</del>");

  // Monospace: ```text``` -> <code>text</code>
  formattedText = formattedText.replace(/```([^`]+)```/g, "<code>$1</code>");

  // Ordered lists: 1. text -> <ol><li>text</li></ol>
  formattedText = formattedText.replace(/^\d+\.\s+(.+)$/gm, "<li>$1</li>");
  formattedText = formattedText.replace(/(<li>.*<\/li>(\n|$))+/g, (match) => {
    return `<ol>${match}</ol>`;
  });

  // Unordered lists: • text -> <ul><li>text</li></ul>
  formattedText = formattedText.replace(/^•\s+(.+)$/gm, "<li>$1</li>");
  formattedText = formattedText.replace(/(<li>.*<\/li>(\n|$))+/g, (match) => {
    if (!match.includes("<ol>")) {
      return `<ul>${match}</ul>`;
    }
    return match;
  });

  // Convert newlines to <br> (but not within lists)
  formattedText = formattedText.replace(/\n(?![<ol>|<ul>|<li>])/g, "<br>");

  return formattedText;
}
