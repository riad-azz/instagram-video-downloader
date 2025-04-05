export const locales = {
  EN: "en-US",
  ES: "es-ES",
  RU: "ru-RU",
  DE: "de-DE",
  FR: "fr-FR",
} as const;

export const DEFAULT_LOCALE = locales.EN;

export const localesList = [
  locales.EN,
  locales.ES,
  locales.RU,
  locales.DE,
  locales.FR,
] as const;

export const localeOptionsList = [
  { value: locales.EN, label: "English" },
  { value: locales.ES, label: "Español" },
  { value: locales.RU, label: "Русский" },
  { value: locales.DE, label: "Deutsch" },
  { value: locales.FR, label: "Français" },
] as const;
