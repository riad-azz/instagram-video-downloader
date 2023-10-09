import { siteConfig } from "@/configs/site";
import { Metadata } from "next";

export const mainMetadata: Metadata = {
  metadataBase: new URL("https://download-ig-videos.vercel.app"),
  title: "Free Instagram Video Downloader - Save IG Videos Easily",
  description: siteConfig.description,
  keywords: [
    "Instagram video download",
    "IG video downloader",
    "Save Instagram videos",
    "Download IG videos",
    "Instagram video saver",
    "Online Instagram downloader",
    "Reels downloader",
  ],
  authors: [
    {
      name: "riad-azz",
      url: "https://github.com/riad-azz",
    },
  ],
  creator: "riad-azz",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#ffffff" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: "Instagram Video Downloader - Download Instagram Videos Online",
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImageUrl,
        width: 1250,
        height: 945,
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
    apple: "/apple-touch-icon.png",
  },
  manifest: "/webmanifest.json",
};
