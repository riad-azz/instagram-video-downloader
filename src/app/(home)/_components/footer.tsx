import React from "react";

import { LogoImage, LogoText } from "@/components/logo";
import { footerLinks } from "@/lib/constants";

const toolLinks = [
  { href: footerLinks.home, label: "Home" },
  { href: footerLinks.videoDownloader, label: "Instagram Video Downloader" },
  { href: footerLinks.reelsDownloader, label: "Instagram Reels Downloader" },
  { href: footerLinks.storyDownloader, label: "Instagram Story Downloader" },
];

const legalLinks = [
  { href: footerLinks.privacyPolicy, label: "Privacy Policy" },
  { href: footerLinks.termsOfService, label: "Terms of Service" },
  { href: footerLinks.dmca, label: "DMCA" },
  { href: footerLinks.contact, label: "Contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/8 bg-[#0D1120] py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <LogoImage className="h-6 w-6 text-blue-500" />
              <LogoText />
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-gray-500">
              Download Instagram videos, reels, and stories instantly. Free,
              fast, and no signup required.
            </p>
            <p className="text-xs text-gray-600">
              Not affiliated with Instagram or Meta.
            </p>
          </div>

          {/* Tools */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              Tools
            </h3>
            <ul className="space-y-3">
              {toolLinks.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-sm text-gray-500 transition-colors hover:text-white"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              Legal
            </h3>
            <ul className="space-y-3">
              {legalLinks.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-sm text-gray-500 transition-colors hover:text-white"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-8 sm:flex-row">
          <p className="text-xs text-gray-600">
            © {year} SnapSave. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Only download content you own or have permission to save.
          </p>
        </div>
      </div>
    </footer>
  );
}
