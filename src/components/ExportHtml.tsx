import { FC } from "react";

interface ExportHtmlProps {
  getHtmlContent: () => string | undefined;
}

const ExportHtml: FC<ExportHtmlProps> = ({ getHtmlContent }) => {
  const exportHtml = () => {
    const htmlContent = getHtmlContent();
    if (htmlContent) {
      const blob = new Blob(
        [
          `<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body>${htmlContent}</body></html>`,
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
  };

  return (
    <button
      onClick={exportHtml}
      aria-label="Export the HTML preview"
      className="p-2 border rounded bg-white dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
    >
      Export HTML
    </button>
  );
};

export default ExportHtml;
