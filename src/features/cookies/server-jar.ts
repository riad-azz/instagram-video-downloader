import { localeCookieServer } from "./i18n/server";
import { themeCookieServer } from "./theme/server-locale";

export const serverJar = {
  theme: themeCookieServer,
  locale: localeCookieServer,
};
