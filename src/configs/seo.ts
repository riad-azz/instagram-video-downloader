import { siteConfig } from "@/configs/site";
import { Metadata } from "next";

export const mainMetadata: Metadata = {
  metadataBase: new URL("https://insta-video-saver.vercel.app"),
  title: siteConfig.name,
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
        width: 1240,
        height: 620,
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
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/images/favicon-32x32.png",
    apple: "/images/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};
