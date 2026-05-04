import { Metadata } from "next";

export const siteConfig = {
  name: "SnapSave",
  domain: "snapssave.com",
  shortName: "SnapSave",
  creator: "SnapSave",
  description:
    "Download Instagram videos, reels, and stories in seconds. Free, fast, and no signup required.",
  ogDescription:
    "Download Instagram videos, reels, and stories in seconds. Free, fast, and no signup required.",
  url: "https://snapssave.com",
};

export const siteMetadata: Metadata = {
  title: {
    default: "SnapSave — Instagram Video Downloader",
    template: "%s | SnapSave",
  },
  description: siteConfig.description,
  creator: siteConfig.creator,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "SnapSave — Instagram Video Downloader",
    description: siteConfig.ogDescription,
    url: siteConfig.url,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "SnapSave — Instagram Video Downloader",
    description: siteConfig.ogDescription,
    creator: "@snapssave",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/web.manifest.json",
};
