import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})

export const withQuery = (component: () => React.ReactNode) => () => (
  <QueryClientProvider client={queryClient}>{component()}</QueryClientProvider>
)
