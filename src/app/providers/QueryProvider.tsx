import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

interface QueryProviderProps {
  children?: React.ReactNode
}

const QueryProvider = ({ children }: QueryProviderProps) => {
  const queryClient = new QueryClient()

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default QueryProvider
