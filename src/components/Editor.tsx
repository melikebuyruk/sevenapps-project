import { FC } from "react";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

const Editor: FC<EditorProps> = ({ value, onChange }) => {
  return (
    <textarea
      aria-label="Markdown editor"
      className="w-full h-full p-4 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Start typing Markdown here..."
    />
  );
};

export default Editor;
