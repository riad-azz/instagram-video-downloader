import { Inter as MainFont } from "next/font/google";

import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { mainMetadata } from "@/configs/seo";

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
          "overflow-x-hidden bg-stone-100 text-black",
          mainFont.className
        )}
      >
        {children}
      </body>
    </html>
  );
}
