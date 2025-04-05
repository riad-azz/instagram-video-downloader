"use client";

import React from "react";

import { ThemeProvider as NextThemesProvider } from "next-themes";

import { DEFAULT_THEME } from "./config";

export function ThemeProvider(
  props: React.ComponentProps<typeof NextThemesProvider>
) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={DEFAULT_THEME}
      enableSystem={false}
      disableTransitionOnChange
      {...props}
    />
  );
}
