import { localeCookieClient } from "./i18n/client";
import { themeCookieClient } from "./theme/client-theme";

export const clientJar = {
  theme: themeCookieClient,
  locale: localeCookieClient,
};
