import { QueryClient, QueryClientConfig, QueryClientProvider } from "@tanstack/react-query"
import { PropsWithChildren } from "react"

const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    mutations: {
      onSuccess: (data: unknown) => {
        console.log("Mutation Success:", data)
      },
      onError: (error: unknown) => {
        console.error("Mutation Error:", error)
      },
    },
  },
}

const queryClient = new QueryClient(queryClientConfig)

const QueryProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default QueryProvider
