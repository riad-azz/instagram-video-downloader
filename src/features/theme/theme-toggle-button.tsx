"use client";

import { useTheme } from "next-themes";

import { Moon, Sun } from "lucide-react";

import { Button, ButtonProps } from "@/components/ui/button";

import { themes } from "./config";
import { clientJar } from "@/features/cookies/client-jar";

export function ThemeToggleButton(
  props: Omit<ButtonProps, "onClick" | "children">
) {
  const { theme, setTheme } = useTheme();

  const handleChange = () => {
    const isDark = theme === themes.DARK;
    const newTheme = isDark ? themes.LIGHT : themes.DARK;

    setTheme(newTheme);
    clientJar.theme.set(newTheme);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      title="Toggle theme"
      aria-label="Toggle theme"
      onClick={handleChange}
      {...props}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
    </Button>
  );
}
