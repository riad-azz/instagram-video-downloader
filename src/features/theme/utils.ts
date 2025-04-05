import { Theme } from "./types";

import { themesList } from "./config";

export function isThemeAvailable(theme?: string): theme is Theme {
  if (!theme) {
    return false;
  }

  const isAvailable = themesList.some((l) => l === theme);
  if (isAvailable) {
    return true;
  }

  return false;
}
