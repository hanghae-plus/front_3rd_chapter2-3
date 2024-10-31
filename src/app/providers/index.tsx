import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/react";

const AppQueryClientProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    // 세팅은 서비스의 유형에 따라 다르게 설정
    defaultOptions: {
      queries: {
        gcTime: 1000 * 60 * 5, // 5분
        staleTime: 1000 * 60 * 1, // 1분
        refetchOnWindowFocus: true, // 윈도우 포커스 시 리프레시
        refetchOnReconnect: true, // 재연결 시 리프레시
        refetchInterval: 30000, // 30초마다 리프레시
      },
    },
  });
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

const providers = [AppQueryClientProvider, NuqsAdapter];

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return providers.reduceRight((acc, Provider) => <Provider>{acc}</Provider>, children);
};
