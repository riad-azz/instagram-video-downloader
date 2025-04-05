export const themes = {
  DARK: "dark",
  LIGHT: "light",
} as const;

export const DEFAULT_THEME = themes.LIGHT;

export const themesList = [themes.DARK, themes.LIGHT] as const;
