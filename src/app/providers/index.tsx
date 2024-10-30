import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const AppQueryClientProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export const providers = [AppQueryClientProvider];

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return providers.reduceRight((acc, Provider) => <Provider>{acc}</Provider>, children);
};
