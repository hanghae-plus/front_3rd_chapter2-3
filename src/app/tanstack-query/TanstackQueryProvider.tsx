import { ReactNode, useState } from "react"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { initializeQueryClient } from "./initializeQueryClient.ts"

interface Props {
  children: ReactNode
}
const TanstackQueryProvider = ({ children }: Props) => {
  const [queryClient] = useState(() => initializeQueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  )
}

export default TanstackQueryProvider
