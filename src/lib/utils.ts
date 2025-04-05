import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isShortcodePresent(url: string) {
  const regex = /\/(p|reel)\/([a-zA-Z0-9_-]+)\/?/;
  const match = url.match(regex);

  if (match && match[2]) {
    return true;
  }

  return false;
}

export function getPostShortcode(url: string): string | null {
  const regex = /\/(p|reel)\/([a-zA-Z0-9_-]+)\/?/;
  const match = url.match(regex);

  if (match && match[2]) {
    const shortcode = match[2];
    return shortcode;
  } else {
    return null;
  }
}
