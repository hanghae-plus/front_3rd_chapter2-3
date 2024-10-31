import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query"
import { AxiosError } from "axios"

export const useCommonQuery = <T, P = unknown>({
  queryKey,
  queryFn,
  params,
  options,
}: {
  queryKey: QueryKey
  queryFn: (params: P) => Promise<T>
  params?: P
  options?: Omit<UseQueryOptions<T, AxiosError>, "queryKey" | "queryFn">
}) => {
  return useQuery({
    queryKey: [...queryKey, params],
    queryFn: () => queryFn(params as P),
    ...options,
  })
}
