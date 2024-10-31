import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1분
      cacheTime: 1000 * 60 * 5, // 5분
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
})