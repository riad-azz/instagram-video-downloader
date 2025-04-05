import { locales } from "./config";

export type Locale = (typeof locales)[keyof typeof locales];
