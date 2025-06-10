import { useEffect, useRef, useState } from "react";
import Editor from "./components/Editor";
import Preview from "./components/Preview";
import SampleSelector from "./components/SampleSelector";
import ThemeToggle from "./components/ThemeToggle";
import { db } from "./hooks/useIndexedDB";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts";
import ExportHtml from "./components/ExportHtml";

function App() {
  const [markdown, setMarkdown] = useState("");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fullscreen, setFullscreen] = useState<"editor" | "preview" | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadInitialData = async () => {
      const savedFile = await db.settings.get("selectedSample");
      const file = savedFile?.value || "empty.md";

      const savedDoc = await db.documents.get(file);
      if (savedDoc?.content) {
        setSelectedFile(file);
        setMarkdown(savedDoc.content);
      } else if (file !== "empty.md") {
        try {
          const res = await fetch(`/samples/${file}`);
          const text = await res.text();
          setSelectedFile(file);
          setMarkdown(text);
        } catch {
          setSelectedFile("empty.md");
          setMarkdown("");
        }
      } else {
        setSelectedFile("empty.md");
        setMarkdown("");
      }
    };

    loadInitialData();
  }, []);

  useEffect(() => {
    if (selectedFile) {
      const timeout = setTimeout(() => {
        db.documents.put({ id: selectedFile, content: markdown });
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [markdown, selectedFile]);

  useEffect(() => {
    if (selectedFile) {
      db.settings.put({ key: "selectedSample", value: selectedFile });
    }
  }, [selectedFile]);

  useKeyboardShortcuts({
  markdown,
  selectedFile,
  setMarkdown,
  setSelectedFile,
  getHtmlContent: () => previewRef.current?.innerHTML,
});


  return (
    <div className="h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="p-2 flex flex-wrap gap-4 items-center" role="banner">
        <SampleSelector
          onLoad={setMarkdown}
          selectedFile={selectedFile || "empty.md"}
          setSelectedFile={setSelectedFile}
        />
        <ThemeToggle />
     <ExportHtml getHtmlContent={() => previewRef.current?.innerHTML} />

      </header>

      <main className={`flex-1 ${fullscreen ? "" : "flex flex-col md:flex-row"}`} role="main">
        {fullscreen !== "preview" && (
          <section
            aria-label="Markdown Editor"
            className={`relative ${fullscreen ? "w-full h-full" : "md:w-1/2 h-1/2 md:h-full border-r dark:border-gray-700"}`}
          >
            <button
              className="absolute top-2 right-2 z-10 text-sm px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={() => setFullscreen(fullscreen === "editor" ? null : "editor")}
            >
              {fullscreen === "editor" ? "Exit Fullscreen" : "Fullscreen"}
            </button>
            <Editor value={markdown} onChange={setMarkdown} />
          </section>
        )}

        {fullscreen !== "editor" && (
          <section
            aria-label="HTML Preview"
            className={`relative ${fullscreen ? "w-full h-full" : "md:w-1/2 h-1/2 md:h-full"}`}
          >
            <button
              className="absolute top-2 right-2 z-10 text-sm px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={() => setFullscreen(fullscreen === "preview" ? null : "preview")}
            >
              {fullscreen === "preview" ? "Exit Fullscreen" : "Fullscreen"}
            </button>
            <Preview ref={previewRef} markdown={markdown} />
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
