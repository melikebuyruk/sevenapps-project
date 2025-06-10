import { useEffect, useState } from "react";
import { db, Setting } from "../hooks/useIndexedDB";

const ThemeToggle = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    db.settings.get("theme").then((entry: Setting | undefined) => {
      if (entry?.value === "dark") {
        document.documentElement.classList.add("dark");
        setDark(true);
      }
    });
  }, []);

  const toggleTheme = async () => {
    const isDark = !dark;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
    await db.settings.put({ key: "theme", value: isDark ? "dark" : "light" });
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 border rounded bg-white dark:bg-slate-800 dark:text-white"
    >
      {dark ? "Dark" : "Light"}
    </button>
  );
};

export default ThemeToggle;
