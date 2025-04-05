import { cookies } from "next/headers";

import { CookieOptions } from "./types";

async function setServerCookie(
  name: string,
  value: string,
  options?: CookieOptions
): Promise<void> {
  const cookiesJar = await cookies();

  cookiesJar.set(name, value, options);
}

async function getServerCookie(name: string): Promise<string | null> {
  const cookiesJar = await cookies();
  const cookie = cookiesJar.get(name);
  const value = cookie?.value;

  if (!value) {
    return null;
  }

  return value;
}

async function deleteServerCookie(name: string): Promise<void> {
  const cookiesJar = await cookies();
  cookiesJar.delete(name);
}

export const serverCookie = {
  get: getServerCookie,
  set: setServerCookie,
  delete: deleteServerCookie,
};
