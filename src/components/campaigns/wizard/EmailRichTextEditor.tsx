import { useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface EmailRichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function EmailRichTextEditor({ value, onChange }: EmailRichTextEditorProps) {
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ header: [1, 2, 3, false] }],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "header",
    "link",
  ];

  return (
    <div className="email-editor">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder="Write your email content here..."
        className="bg-background"
        style={{ height: "300px", marginBottom: "50px" }}
      />
    </div>
  );
}
