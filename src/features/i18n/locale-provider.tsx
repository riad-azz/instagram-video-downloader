"use client";

import React from "react";

import { NextIntlClientProvider } from "next-intl";

const timeZone = "Europe/Vienna";

export function LocaleProvider(
  props: React.ComponentProps<typeof NextIntlClientProvider>
) {
  return (
    <NextIntlClientProvider
      timeZone={timeZone}
      getMessageFallback={() => "????"}
      {...props}
    />
  );
}
