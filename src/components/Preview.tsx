import {
  FC,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";

interface PreviewProps {
  markdown: string;
}

const Preview = forwardRef<HTMLDivElement, PreviewProps>(
  ({ markdown }, ref) => {
    const [html, setHtml] = useState("");
    const previewRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => previewRef.current as HTMLDivElement, []);

    useEffect(() => {
      const renderMarkdown = async () => {
        if (!markdown?.trim()) {
          setHtml("<p><em>empty index</em></p>");
          return;
        }

        try {
          const { unified } = await import("unified");
          const remarkParse = (await import("remark-parse")).default;
          const remarkGfm = (await import("remark-gfm")).default;
          const remarkHtml = (await import("remark-html")).default;

          const file = await unified()
            .use(remarkParse)
            .use(remarkGfm)
            .use(remarkHtml)
            .process(markdown);

          setHtml(String(file));
        } catch (error) {
          setHtml("<p><strong>Markdown error</strong></p>");
          console.error(error);
        }
      };

      renderMarkdown();
    }, [markdown]);

    return (
      <div
        ref={previewRef}
        role="region"
        aria-label="Preview of the rendered HTML"
        aria-live="polite"
        className="p-4 overflow-auto prose prose-ul:list-disc prose-li:pl-4 dark:prose-invert max-w-none bg-white dark:bg-gray-900"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }
);

export default Preview;
