import { QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { queryClient } from "../../shared/api/query-client";

export const QueryProvider = ({ children }: PropsWithChildren) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}; 