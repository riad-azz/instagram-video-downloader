import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const fakeDelay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getStrTimestamp = () => Math.floor(Date.now() / 1000).toString();

export const getTimedFilename = (name: string, ext: string) => {
  return `${name}-${getStrTimestamp()}.${ext}`;
};

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
