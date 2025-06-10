import { useEffect } from "react";
import { db } from "../hooks/useIndexedDB";

interface ShortcutOptions {
  markdown: string;
  selectedFile: string | null;
  setSelectedFile: (file: string) => void;
  setMarkdown: (content: string) => void;
  getHtmlContent: () => string | undefined;
}

export const useKeyboardShortcuts = ({
  markdown,
  selectedFile,
  setSelectedFile,
  setMarkdown,
  getHtmlContent,
}: ShortcutOptions) => {
  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();

        if (selectedFile) {
          await db.documents.put({ id: selectedFile, content: markdown });
        }

        const htmlContent = getHtmlContent();
        if (htmlContent) {
          const blob = new Blob(
            [
              `<!DOCTYPE html><html><head><meta charset=\"UTF-8\"></head><body>${htmlContent}</body></html>`,
            ],
            { type: "text/html" }
          );
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "markdown-preview.html";
          a.click();
          URL.revokeObjectURL(url);
        }
      }

      const map: Record<string, string> = {
        "1": "intro.md",
        "2": "features.md",
        "3": "usage.md",
      };

      if (e.ctrlKey && map[e.key]) {
        e.preventDefault();
        const file = map[e.key];
        try {
          const res = await fetch(`/samples/${file}`);
          const text = await res.text();
          setSelectedFile(file);
          setMarkdown(text);
        } catch (err) {
          console.error(err);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [markdown, selectedFile, getHtmlContent]);
};
