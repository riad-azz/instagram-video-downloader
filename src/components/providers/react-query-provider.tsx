"use client";

import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { isNotFoundError } from "@/lib/http";

const DEFAULT_STALE_TIME = 1000 * 60 * 5; // 5 minutes

export function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const clientRef = React.useRef<QueryClient>();

  if (!clientRef.current) {
    clientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: DEFAULT_STALE_TIME,
          retry: (failureCount, error) => {
            const isNotFound = isNotFoundError(error);
            if (isNotFound) {
              return false;
            }

            return failureCount < 3;
          },
        },
      },
    });
  }

  return (
    <QueryClientProvider client={clientRef.current}>
      {children}
    </QueryClientProvider>
  );
}
