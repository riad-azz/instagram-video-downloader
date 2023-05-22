"use client";
import { useTheme } from "next-themes";
import { Icons } from "@/components/Icons";

export const ThemeButton = () => {
  const { theme, setTheme } = useTheme();

  function toggleTheme() {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  }

  return (
    <button
      title="Toggle Theme"
      onClick={() => toggleTheme()}
      className="flex items-center justify-between rounded-lg border border-gray-300 bg-transparent p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:border-0"
    >
      <Icons.themeMode />
    </button>
  );
};
