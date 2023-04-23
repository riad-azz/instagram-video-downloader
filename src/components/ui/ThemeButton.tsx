"use client";

import { useStore } from "@/stores/themeStore";
import { Icons } from "@/components/Icons";

const ThemeButton = () => {
  const { theme } = useStore();

  function toggleTheme() {
    const isDarkMode = document.documentElement.classList.contains("dark");
    const newTheme = isDarkMode ? "light" : "dark";
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
    document.cookie = `theme=${newTheme}; expires=Tue, 19 Jan 9999 03:14:07 GMT; path=/`;
    useStore.setState({ theme: newTheme });
  }

  return (
    <button
      title="Toggle Theme"
      onClick={() => toggleTheme()}
      className="flex items-center justify-between rounded-lg border border-gray-300 bg-transparent p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:border-0"
    >
      {theme === "dark" && <Icons.lightMode />}
      {theme === "light" && <Icons.darkMode />}
    </button>
  );
};

export default ThemeButton;
