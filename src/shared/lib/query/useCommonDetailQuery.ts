import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { AxiosError } from "axios"

export const useCommonDetailQuery = <T>({
  queryKey,
  queryFn,
  id,
  options,
}: {
  queryKey: string[]
  queryFn: (id: string | number) => Promise<T>
  id: string | number
  options?: Omit<UseQueryOptions<T, AxiosError>, "queryKey" | "queryFn">
}) => {
  return useQuery({
    queryKey: [...queryKey, id],
    queryFn: () => queryFn(id),
    enabled: !!id,
    ...options,
  })
}
