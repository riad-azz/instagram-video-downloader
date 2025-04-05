import { Locale } from "@/features/i18n/types";
import { ILocaleCookie } from "@/features/cookies/i18n/interface";

import { isLocaleAvailable } from "@/features/i18n/utils";

import { cookiesKeys } from "../config";
import { clientCookie } from "../client-cookie";
import { DEFAULT_LOCALE } from "@/features/i18n/config";

function getLocale(): Locale {
  const locale = clientCookie.get(cookiesKeys.LOCALE);

  if (locale && isLocaleAvailable(locale)) {
    return locale;
  }

  return DEFAULT_LOCALE;
}

function setLocale(locale: Locale) {
  if (!isLocaleAvailable(locale)) return;

  clientCookie.set(cookiesKeys.LOCALE, locale, { expires: 365 });
}

export const localeCookieClient: ILocaleCookie = {
  get: getLocale,
  set: setLocale,
};
