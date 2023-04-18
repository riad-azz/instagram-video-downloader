import { cookies } from "next/headers";
import { siteConfig } from "@/config/site";
import "@/styles/globals.css";

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Instagram downloader",
    "Reels downloader",
    "Instagram video downloader",
    "Download Instagram videos",
    "Save Instagram videos",
    "Instagram reels downloader",
    "Download Instagram reels",
    "Save Instagram reels",
    "Video downloader for Instagram",
    "Instagram video saver",
    "Instagram reel saver",
    "Instagram reel video downloader",
    "Reels video saver",
    "Instagram video download app",
    "Free Instagram downloader",
  ],
  authors: [
    {
      name: "riad-azz",
      url: "https://github.com/riad-azz",
    },
  ],
  creator: "riad-azz",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#1f2937" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImageUrl,
        width: 1200,
        height: 400,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: siteConfig.ogImageUrl,
    creator: "@riadazz",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sessionCookies = cookies();
  const themeCookie = sessionCookies.get("theme");
  const currentTheme = themeCookie?.value ?? "light";
  return (
    <html lang="en" className={currentTheme}>
      <body className="overflow-x-hidden bg-white font-mono text-gray-900 dark:bg-gray-800 dark:text-slate-100">
        {children}
      </body>
    </html>
  );
}
