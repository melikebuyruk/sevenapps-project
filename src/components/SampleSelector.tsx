import { FC } from "react";
import { db } from "../hooks/useIndexedDB";

interface SampleSelectorProps {
  onLoad: (content: string) => void;
  selectedFile: string;
  setSelectedFile: (file: string) => void;
}

const samples = [
  { label: "Intro", file: "intro.md" },
  { label: "Features", file: "features.md" },
  { label: "Usage", file: "usage.md" },
];

const SampleSelector: FC<SampleSelectorProps> = ({
  onLoad,
  selectedFile,
  setSelectedFile,
}) => {
  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const file = e.target.value;
    setSelectedFile(file);

    await db.settings.put({ key: "selectedSample", value: file });

    if (file === "empty.md") {
      onLoad("");
      return;
    }

    const res = await fetch(`/samples/${file}`);
    const text = await res.text();
    onLoad(text);
  };

  return (
    <div className="p-0">
      <label htmlFor="sampleSelect" className="sr-only">
        Load sample markdown file
      </label>
      <select
        id="sampleSelect"
        onChange={handleChange}
        value={selectedFile}
        className="p-2 border rounded bg-white dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
      >
        <option value="empty.md">No Sample</option>
        {samples.map((s) => (
          <option key={s.file} value={s.file}>
            {s.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SampleSelector;
