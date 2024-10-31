import { QueryClient } from "@tanstack/react-query"

export const initializeQueryClient = (): QueryClient => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
        cacheTime: 1000 * 60 * 60,
      },
    },
  })
}
