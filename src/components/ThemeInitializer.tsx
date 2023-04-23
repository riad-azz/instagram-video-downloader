"use client";

import { useRef } from "react";
import { useStore } from "@/stores/themeStore";

const ThemeInitializer = ({ theme }: { theme: string }) => {
  const initialized = useRef(false);

  if (!initialized.current) {
    useStore.setState({ theme: theme });
    initialized.current = true;
  }
  return null;
};

export default ThemeInitializer;
