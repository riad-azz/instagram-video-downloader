import { Theme } from "@/features/theme/types";
import { IThemeCookie } from "@/features/cookies/theme/interface";

import { isThemeAvailable } from "@/features/theme/utils";

import { cookiesKeys } from "../config";
import { clientCookie } from "../client-cookie";
import { DEFAULT_THEME } from "@/features/theme/config";

function getTheme(): Theme {
  const theme = clientCookie.get(cookiesKeys.THEME);

  if (theme && isThemeAvailable(theme)) {
    return theme;
  }

  return DEFAULT_THEME;
}

function setTheme(theme: Theme) {
  if (!isThemeAvailable(theme)) return;

  clientCookie.set(cookiesKeys.THEME, theme, { expires: 365 });
}

export const themeCookieClient: IThemeCookie = {
  get: getTheme,
  set: setTheme,
};
