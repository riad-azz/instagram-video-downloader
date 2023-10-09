import { Inter as MainFont } from "next/font/google";

import "@/styles/globals.css";
import { cn } from "@/utils";
import { mainMetadata } from "@/configs/seo";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollUpButton from "@/components/ScrollUpButton";

const mainFont = MainFont({
  subsets: ["latin"],
});

export const metadata = mainMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "overflow-x-hidden bg-stone-50 text-black",
          "flex min-h-screen w-full flex-col justify-between",
          "scroll-smooth",
          mainFont.className
        )}
      >
        <Navbar />
        <ScrollUpButton />
        {children}
        <Footer />
      </body>
    </html>
  );
}
