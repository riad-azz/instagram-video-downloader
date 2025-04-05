"use client";

import React from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { queryClient } from "./query-client";

const isDevEnvironment = process.env.NODE_ENV === "development";

export function ReactQueryProvider({
  children,
  enabledDevTools,
}: {
  enabledDevTools?: boolean;
  children: React.ReactNode;
}) {
  const clientRef = React.useRef<typeof queryClient>(null);
  const isDevToolsEnabled = enabledDevTools && isDevEnvironment;

  if (!clientRef.current) {
    clientRef.current = queryClient;
  }

  return (
    <QueryClientProvider client={clientRef.current}>
      {children}
      {isDevToolsEnabled && (
        <React.Suspense fallback={null}>
          <ReactQueryDevtools initialIsOpen={false} />
        </React.Suspense>
      )}
    </QueryClientProvider>
  );
}
