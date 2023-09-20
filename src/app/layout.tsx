import { Inter as MainFont } from "next/font/google";

import "@/styles/globals.css";
import { cn } from "@/utils";
import { mainMetadata } from "@/configs/seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4566256673310688"
        crossOrigin="anonymous"
      ></script>
      <body
        className={cn(
          "overflow-x-hidden bg-stone-100 text-black",
          "flex min-h-screen w-full flex-col justify-between",
          "pt-20", // Spacing For Navbar
          mainFont.className
        )}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
