import { ABeeZee as MainFont } from "next/font/google";

import "@/styles/globals.css";
import { instagramMetadata } from "@/configs/seo";

import Provider from "@/components/Provider";

const mainFont = MainFont({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = instagramMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`overflow-x-hidden bg-white text-gray-900 dark:bg-gray-800 dark:text-slate-100 ${mainFont.className}`}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
