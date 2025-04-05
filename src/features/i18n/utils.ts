import { Locale } from "./types";

import { localesList } from "./config";

export function isLocaleAvailable(locale?: string): locale is Locale {
  if (!locale) {
    return false;
  }

  const isAvailable = localesList.some((l) => l === locale);
  if (isAvailable) {
    return true;
  }

  return false;
}
