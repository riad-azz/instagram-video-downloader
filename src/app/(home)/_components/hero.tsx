import React from "react";

import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";

import { homeLinks, homeSections } from "@/lib/constants";
import { InstagramForm } from "@/components/instagram-form";

export function Hero() {
  const t = useTranslations("pages.home.hero");

  return (
    <section
      id={homeSections.hero}
      className="relative flex min-h-screen scroll-mt-16 flex-col items-center justify-center overflow-hidden bg-[#0B0F19] px-4 py-24 md:py-32"
    >
      {/* Ambient glow effects */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-[400px] w-[600px] rounded-full bg-indigo-600/8 blur-[100px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center space-y-8 text-center">
        {/* Trust badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400" />
          Free · Fast · No Signup Required
        </div>

        {/* Headline */}
        <h1 className="text-4xl leading-tight font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          {t("title.prefix")}{" "}
          <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            {t("title.highlight")}
          </span>
        </h1>

        {/* Subheadline */}
        <p className="max-w-xl text-lg leading-relaxed text-gray-400 md:text-xl">
          {t("description")}
        </p>

        {/* Downloader form */}
        <div className="w-full max-w-2xl">
          <InstagramForm />
        </div>

        {/* Supported formats note */}
        <p className="text-xs text-gray-600">{t("hint")}</p>
      </div>

      {/* Scroll indicator */}
      <a
        href={homeLinks.features}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-600 transition-colors hover:text-gray-400"
        aria-label="Scroll to features"
      >
        <ChevronDown className="h-6 w-6 animate-bounce" />
      </a>
    </section>
  );
}
