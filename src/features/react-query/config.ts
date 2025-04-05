import { DefaultOptions } from "@tanstack/react-query";

export const GC_TIME = 1000 * 60 * 1; // 1 minute
export const STALE_TIME = 1000 * 60 * 1; // 1 minute

export const queriesConfig: DefaultOptions["queries"] = {
  staleTime: STALE_TIME,
  networkMode: "online",
  gcTime: GC_TIME,
  refetchOnReconnect: false,
  refetchOnWindowFocus: false,
};
