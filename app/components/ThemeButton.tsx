"use client";

import { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";

const ThemeButton = ({ animation = "" }: { animation?: string }) => {
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
      className={`${animation} flex items-center justify-between border border-gray-400 bg-white p-2 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 md:rounded-full`}
    >
      <span className="md:hidden">Change theme</span>
      <span className={theme ? "hidden" : "block"}>
        <LoadingSpinner size={20} />
      </span>
      <span className={theme === "light" ? "block" : "hidden"}>
        <svg
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
        </svg>
      </span>
      <span className={theme === "dark" ? "block" : "hidden"}>
        <svg
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </span>
    </button>
  );
};

export default ThemeButton;
