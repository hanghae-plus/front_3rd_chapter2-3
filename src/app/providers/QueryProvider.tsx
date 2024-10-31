import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FC } from 'react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1분
      gcTime: 1000 * 60 * 5, // 5분
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

interface QueryProviderProps {
  children: React.ReactNode
}

export const QueryProvider: FC<QueryProviderProps> = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
