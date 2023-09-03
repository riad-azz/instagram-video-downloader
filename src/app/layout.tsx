import { Inter as MainFont } from "next/font/google";

import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { mainMetadata } from "@/configs/seo";
import AnimatedBackground from "@/components/AnimatedBackground";

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
          "overflow-x-hidden bg-zinc-950 text-slate-100",
          mainFont.className
        )}
      >
        <AnimatedBackground />
        {children}
      </body>
    </html>
  );
}
