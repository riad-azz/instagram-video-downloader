import React from "react";

import { useTranslations } from "next-intl";

import { homeSections } from "@/lib/constants";

export function Testimonials() {
  const t = useTranslations("pages.home.testimonials");

  return (
    <section
      id={homeSections.testimonials}
      className="w-full bg-gradient-to-t from-white to-gray-50 py-12 md:py-24 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              {t("title")}
            </h2>
            <p className="text-muted-foreground mx-auto max-w-[700px] md:text-xl">
              {t("description")}
            </p>
          </div>
          <div className="mt-8 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-8">
            <div className="flex flex-col items-center rounded-xl border bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md sm:p-6 dark:border-gray-700 dark:bg-gray-800">
              <span className="text-3xl font-bold text-teal-500 sm:text-4xl">
                50K+
              </span>
              <span className="text-muted-foreground text-sm sm:text-base">
                {t("stats.downloads")}
              </span>
            </div>
            <div className="flex flex-col items-center rounded-xl border bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md sm:p-6 dark:border-gray-700 dark:bg-gray-800">
              <span className="text-3xl font-bold text-teal-500 sm:text-4xl">
                100K+
              </span>
              <span className="text-muted-foreground text-sm sm:text-base">
                {t("stats.users")}
              </span>
            </div>
            <div className="flex flex-col items-center rounded-xl border bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md sm:p-6 dark:border-gray-700 dark:bg-gray-800">
              <span className="text-3xl font-bold text-teal-500 sm:text-4xl">
                4.9/5
              </span>
              <span className="text-muted-foreground text-sm sm:text-base">
                {t("stats.rating")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
