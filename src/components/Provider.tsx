"use client";

import { ThemeProvider } from "next-themes";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute={"class"}>
      <div className="flex min-h-screen flex-col justify-between ">
        <Navbar />
        {children}
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default Provider;
