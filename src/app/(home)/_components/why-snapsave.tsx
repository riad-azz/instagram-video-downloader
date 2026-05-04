import React from "react";

import { Check } from "lucide-react";

import { homeSections } from "@/lib/constants";

const reasons = [
  {
    title: "Clean interface",
    description:
      "No popups, no ads cluttering the page, no confusing steps. Just paste a link and download.",
  },
  {
    title: "Built for speed",
    description:
      "Optimized to retrieve media as fast as possible. Most downloads begin within seconds.",
  },
  {
    title: "No account needed",
    description:
      "We never ask for your Instagram login or any personal information. Zero friction.",
  },
  {
    title: "Mobile-first design",
    description:
      "Works perfectly on iPhone, Android, and any modern browser. No app install required.",
  },
  {
    title: "Secure by default",
    description:
      "We do not store your URLs, downloads, or any browsing data. Your privacy is respected.",
  },
  {
    title: "Always improving",
    description:
      "We actively maintain SnapSave to keep up with Instagram's changes and ensure reliability.",
  },
];

export function WhySnapSave() {
  return (
    <section
      id={homeSections.whySnapSave}
      className="w-full scroll-mt-16 bg-[#0B0F19] py-20 md:py-28"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left: text */}
            <div className="space-y-6">
              <span className="inline-block rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400">
                Why SnapSave
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                A downloader you can{" "}
                <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  actually trust
                </span>
              </h2>
              <p className="text-gray-400 leading-relaxed">
                SnapSave is designed to be the most straightforward way to save
                Instagram videos. No misleading buttons, no fake download bars —
                just a simple tool that does exactly what it says.
              </p>
              <p className="text-sm text-gray-500">
                SnapSave is not affiliated with Instagram or Meta. Only use this
                tool for content you own or have permission to download.
              </p>
            </div>

            {/* Right: feature list */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {reasons.map(({ title, description }) => (
                <div
                  key={title}
                  className="rounded-xl border border-white/8 bg-white/4 p-4 backdrop-blur-sm"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/20">
                      <Check className="h-3 w-3 text-blue-400" />
                    </div>
                    <h3 className="text-sm font-semibold text-white">
                      {title}
                    </h3>
                  </div>
                  <p className="text-xs leading-relaxed text-gray-500">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
