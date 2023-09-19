import { siteConfig } from "@/configs/site";
import { Metadata } from "next";

const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION ?? "";

export const mainMetadata: Metadata = {
  metadataBase: new URL("https://download-ig-videos.vercel.app"),
  title: "Instagram Video Downloader - Download Instagram Videos Online",
  description: siteConfig.description,
  keywords: [
    "Instagram downloader",
    "Reels downloader",
    "Instagram reel saver",
    "Instagram reel video downloader",
    "Reels video saver",
    "Free Instagram saver",
    "Instagram video download app",
    "Free Instagram downloader",
    "Instagram video downloader",
    "download Instagram videos",
    "Instagram download tool",
    "Instagram video saver",
    "online video downloader",
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
    { media: "(prefers-color-scheme: dark)", color: "white" },
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
    apple: "/images/apple-touch-icon.png",
  },
  manifest: "/webmanifest.json",
  other: {
    "google-site-verification": googleSiteVerification,
  },
};
