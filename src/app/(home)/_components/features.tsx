import React from "react";

import { useTranslations } from "next-intl";
import { Zap, Film, UserX, Smartphone } from "lucide-react";

import { homeSections } from "@/lib/constants";

const featureIcons = [Zap, Film, UserX, Smartphone];

export function Features() {
  const t = useTranslations("pages.home.features");

  const cards = [
    { key: "fast", Icon: featureIcons[0] },
    { key: "reels", Icon: featureIcons[1] },
    { key: "noSignup", Icon: featureIcons[2] },
    { key: "mobile", Icon: featureIcons[3] },
  ] as const;

  return (
    <section
      id={homeSections.features}
      className="w-full scroll-mt-16 bg-[#0D1120] py-20 md:py-28"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400">
            {t("badge")}
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto max-w-lg text-gray-400 md:text-lg">
            {t("description")}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map(({ key, Icon }) => (
            <div
              key={key}
              className="group flex flex-col items-start space-y-4 rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/20 hover:bg-white/6"
            >
              <div className="rounded-xl bg-gradient-to-br from-blue-600/20 to-indigo-600/20 p-3">
                <Icon className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">
                {t(`cards.${key}.title` as any)}
              </h3>
              <p className="text-sm leading-relaxed text-gray-400">
                {t(`cards.${key}.description` as any)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
