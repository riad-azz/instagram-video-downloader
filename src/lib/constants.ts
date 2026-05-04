export const homeSections = {
  hero: "hero",
  features: "features",
  howItWorks: "how-it-works",
  supportedContent: "supported-content",
  whySnapSave: "why-snapsave",
  stats: "stats",
  frequentlyAsked: "faq",
} as const;

export const homeLinks = {
  hero: "#" + homeSections.hero,
  features: "#" + homeSections.features,
  howItWorks: "#" + homeSections.howItWorks,
  supportedContent: "#" + homeSections.supportedContent,
  whySnapSave: "#" + homeSections.whySnapSave,
  frequentlyAsked: "#" + homeSections.frequentlyAsked,
} as const;

export const footerLinks = {
  home: "/",
  videoDownloader: "/instagram-video-downloader",
  reelsDownloader: "/instagram-reels-downloader",
  storyDownloader: "/instagram-story-downloader",
  privacyPolicy: "/privacy-policy",
  termsOfService: "/terms-of-service",
  dmca: "/dmca",
  contact: "/contact",
} as const;
