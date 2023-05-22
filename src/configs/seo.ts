import { siteConfig } from "@/configs/site";
import { Metadata } from "next";

export const instagramMetadata: Metadata = {
  title: "Download Instagram videos and reels for free",
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
    "Free Instagram saver",
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
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImageUrl],
    creator: "@riadazz",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/images/favicon-32x32.png",
    apple: "/images/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};
