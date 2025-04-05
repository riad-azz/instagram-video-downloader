import { Theme } from "@/features/theme/types";
import { IThemeCookie } from "@/features/cookies/theme/interface";

import { isThemeAvailable } from "@/features/theme/utils";

import { cookiesKeys } from "../config";
import { serverCookie } from "../server-cookie";
import { DEFAULT_THEME } from "@/features/theme/config";

async function getThemeServer(): Promise<Theme> {
  const theme = await serverCookie.get(cookiesKeys.THEME);

  if (theme && isThemeAvailable(theme)) {
    return theme;
  }

  return DEFAULT_THEME;
}

async function setThemeServer(theme: Theme) {
  if (!isThemeAvailable(theme)) return;

  await serverCookie.set(cookiesKeys.THEME, theme, { expires: 365 });
}

export const themeCookieServer: IThemeCookie = {
  get: getThemeServer,
  set: setThemeServer,
};
