import { themes } from "./config";

export type Theme = (typeof themes)[keyof typeof themes];
