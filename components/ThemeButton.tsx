"use client";

import { useState, useEffect } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Icons } from "@/components/Icons";

const ThemeButton = () => {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    const currentTheme = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
    setTheme(currentTheme);
  }, []);

  function toggleTheme() {
    const isDarkMode = document.documentElement.classList.contains("dark");
    const newTheme = isDarkMode ? "light" : "dark";
    document.cookie = `theme=${newTheme}; expires=Tue, 19 Jan 9999 03:14:07 GMT; path=/`;
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
    setTheme(newTheme);
  }

  return (
    <button
      onClick={() => toggleTheme()}
      className="flex items-center justify-between rounded-lg border border-gray-300 bg-transparent p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:border-0 md:p-2"
    >
      <span className={theme ? "hidden" : "block"}>
        <LoadingSpinner size={20} />
      </span>
      <span className={theme === "light" ? "block" : "hidden"}>
        <Icons.darkMode />
      </span>
      <span className={theme === "dark" ? "block" : "hidden"}>
        <Icons.lightMode />
      </span>
    </button>
  );
};

export default ThemeButton;
