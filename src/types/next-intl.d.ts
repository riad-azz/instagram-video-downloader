import { Locale } from "@/features/i18n/types";

declare module "next-intl" {
  function useLocale(): Locale;
}
