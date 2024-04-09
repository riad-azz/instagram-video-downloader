import { useMutation } from "@tanstack/react-query";

import { AsyncReturnType } from "@/types";

import { getVideoInfo } from "./requests";

export function useVideoInfo() {
  return useMutation<
    AsyncReturnType<typeof getVideoInfo>,
    Error,
    Parameters<typeof getVideoInfo>[0]
  >({
    mutationFn: getVideoInfo,
  });
}
