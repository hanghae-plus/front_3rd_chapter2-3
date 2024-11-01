"use client";

import React, { useState } from "react";

import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

type Props = {
  children: React.ReactNode;
};

export function QueryProvider({ children }: Props) {
  const queryCache = new QueryCache({});

  const mutationCache = new MutationCache({});

  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache,
        mutationCache,
        defaultOptions: {
          queries: {
            retry: 0,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
