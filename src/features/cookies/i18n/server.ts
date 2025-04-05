import { Locale } from "@/features/i18n/types";
import { ILocaleCookie } from "@/features/cookies/i18n/interface";

import { isLocaleAvailable } from "@/features/i18n/utils";

import { cookiesKeys } from "../config";
import { serverCookie } from "../server-cookie";
import { DEFAULT_LOCALE } from "@/features/i18n/config";

async function getLocale(): Promise<Locale> {
  const locale = await serverCookie.get(cookiesKeys.LOCALE);

  if (locale && isLocaleAvailable(locale)) {
    return locale;
  }

  return DEFAULT_LOCALE;
}

async function setLocale(locale: Locale) {
  if (!isLocaleAvailable(locale)) return;

  await serverCookie.set(cookiesKeys.LOCALE, locale, { expires: 365 });
}

export const localeCookieServer: ILocaleCookie = {
  get: getLocale,
  set: setLocale,
};
