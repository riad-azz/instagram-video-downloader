"use client";

import React from "react";

import { useLocale } from "next-intl";
import { FetchInit, FetchInput } from "@/types/fetch-params";

export function useFetch() {
  const locale = useLocale();

  return React.useCallback(
    async (input: FetchInput, init?: FetchInit): Promise<Response> => {
      let headers: HeadersInit = {
        "x-custom-lang": locale,
      };

      if (!(init?.body instanceof FormData)) {
        headers = {
          ...headers,
          "Content-Type": "application/json",
        };
      }

      const combinedHeaders = new Headers({ ...headers, ...init?.headers });

      return fetch(input, {
        ...init,
        headers: combinedHeaders,
      });
    },
    [locale]
  );
}
