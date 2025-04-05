import Cookies from "js-cookie";

import { CookieOptions } from "./types";

function setClientCookie(
  name: string,
  value: string,
  options?: CookieOptions
): void {
  Cookies.set(name, value, options);
}

function getClientCookie(name: string): string | null {
  const value = Cookies.get(name);

  if (value) {
    return value;
  }

  return null;
}

function deleteClientCookie(name: string): void {
  Cookies.remove(name);
}

export const clientCookie = {
  get: getClientCookie,
  set: setClientCookie,
  delete: deleteClientCookie,
};
