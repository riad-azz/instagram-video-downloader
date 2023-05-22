"use client";
import { ThemeProvider } from "next-themes";

export function Provider({ children }: { children: React.ReactNode }) {
  return <ThemeProvider attribute={"class"}>{children}</ThemeProvider>;
}

export default Provider;
