import React from "react";

import { useTranslations } from "next-intl";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

import { homeSections } from "@/lib/constants";

export function FrequentlyAsked() {
  const t = useTranslations("pages.home.frequentlyAsked");

  const items = [
    { id: "q1", key: "q1" },
    { id: "q2", key: "q2" },
    { id: "q3", key: "q3" },
    { id: "q4", key: "q4" },
    { id: "q5", key: "q5" },
    { id: "q6", key: "q6" },
  ] as const;

  return (
    <section
      id={homeSections.frequentlyAsked}
      className="w-full scroll-mt-16 bg-[#0B0F19] py-20 md:py-28"
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

        <div className="mx-auto mt-12 max-w-3xl">
          <div className="rounded-2xl border border-white/8 bg-white/4 p-2 backdrop-blur-sm">
            <Accordion type="single" collapsible className="w-full">
              {items.map(({ id, key }, index) => (
                <AccordionItem
                  key={id}
                  value={id}
                  className={
                    index < items.length - 1 ? "border-b border-white/6" : "border-0"
                  }
                >
                  <AccordionTrigger className="px-4 py-5 text-left text-base font-medium text-white hover:text-blue-400 hover:no-underline">
                    {t(`items.${key}.trigger` as any)}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-5 text-left text-sm leading-relaxed text-gray-400">
                    {t(`items.${key}.content` as any)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
