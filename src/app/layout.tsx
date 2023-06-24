import { DM_Sans as MainFont } from "next/font/google";
import Provider from "@/components/Provider";
import { mainMetadata } from "@/configs/seo";
import "@/styles/globals.css";

const mainFont = MainFont({
  weight: "400",
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
        className={`overflow-x-hidden bg-white text-gray-900 dark:bg-gray-800 dark:text-slate-100 ${mainFont.className}`}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
