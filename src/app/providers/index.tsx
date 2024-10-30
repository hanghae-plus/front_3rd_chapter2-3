import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/react";

const AppQueryClientProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

const providers = [AppQueryClientProvider, NuqsAdapter];

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return providers.reduceRight((acc, Provider) => <Provider>{acc}</Provider>, children);
};
