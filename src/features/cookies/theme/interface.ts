import { Theme } from "@/features/theme/types";

export interface IThemeCookie {
  get: (() => Promise<Theme>) | (() => Theme);
  set: ((theme: Theme) => Promise<void>) | ((theme: Theme) => void);
}
