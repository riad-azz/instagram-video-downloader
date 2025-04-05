import { Locale } from "@/features/i18n/types";

export interface ILocaleCookie {
  get: (() => Promise<Locale>) | (() => Locale);
  set: ((locale: Locale) => Promise<void>) | ((locale: Locale) => void);
}
