import React from "react";

import { useTranslations } from "next-intl";
import { Copy, Clipboard, Download } from "lucide-react";

import { homeLinks, homeSections } from "@/lib/constants";

const stepIcons = [Copy, Clipboard, Download];

export function HowItWorks() {
  const t = useTranslations("pages.home.howItWorks");

  const steps = [
    { key: "copy", Icon: stepIcons[0] },
    { key: "paste", Icon: stepIcons[1] },
    { key: "download", Icon: stepIcons[2] },
  ] as const;

  return (
    <section
      id={homeSections.howItWorks}
      className="w-full scroll-mt-16 bg-[#0B0F19] py-20 md:py-28"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-400">
            {t("badge")}
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto max-w-lg text-gray-400 md:text-lg">
            {t("description")}
          </p>
        </div>

        <div className="relative mx-auto mt-16 max-w-4xl">
          {/* Connector line (desktop) */}
          <div className="absolute top-8 right-[16.5%] left-[16.5%] hidden h-px bg-gradient-to-r from-blue-600/40 via-indigo-600/40 to-blue-600/40 md:block" />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {steps.map(({ key, Icon }, index) => (
              <div
                key={key}
                className="flex flex-col items-center space-y-4 text-center"
              >
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-xl font-bold text-white shadow-lg shadow-blue-500/20">
                  {index + 1}
                </div>
                <div className="w-full rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-sm">
                  <div className="mb-3 flex justify-center">
                    <Icon className="h-7 w-7 text-blue-400" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-white">
                    {t(`steps.${key}.title` as any)}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-400">
                    {t(`steps.${key}.description` as any)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href={homeLinks.hero}
            className="inline-flex h-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 font-semibold text-white transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:shadow-blue-500/25"
          >
            {t("ctaButton")}
          </a>
        </div>
      </div>
    </section>
  );
}
