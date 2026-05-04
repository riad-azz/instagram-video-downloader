import React from "react";

import { useTranslations } from "next-intl";

import { homeSections } from "@/lib/constants";

export function Testimonials() {
  const t = useTranslations("pages.home.testimonials");

  const stats = [
    { value: "50K+", key: "downloads" as const },
    { value: "100K+", key: "users" as const },
    { value: "4.9/5", key: "rating" as const },
  ];

  return (
    <section
      id={homeSections.stats}
      className="w-full bg-[#0D1120] py-16 md:py-20"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
            {t("title")}
          </h2>
          <p className="max-w-lg text-gray-400">{t("description")}</p>
        </div>

        <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map(({ value, key }) => (
            <div
              key={key}
              className="flex flex-col items-center rounded-2xl border border-white/8 bg-white/4 px-6 py-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/20"
            >
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
                {value}
              </span>
              <span className="mt-2 text-sm text-gray-400">
                {t(`stats.${key}`)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
