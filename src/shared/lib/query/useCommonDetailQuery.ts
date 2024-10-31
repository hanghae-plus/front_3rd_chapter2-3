import { AxiosError } from 'axios';

import {
  QueryKey,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';

interface CommonDetailQueryOptions<TData, TError = AxiosError> {
  queryKey: QueryKey
  queryFn: (id: string | number) => Promise<TData>
  id: string | number
  select?: (data: TData) => TData
  options?: Omit<UseQueryOptions<TData, TError, TData>, "queryKey" | "queryFn">
}

export function useCommonDetailQuery<TData, TError = AxiosError>({
  queryKey,
  queryFn,
  id,
  select,
  options,
}: CommonDetailQueryOptions<TData, TError>) {
  return useQuery<TData, TError>({
    queryKey,
    queryFn: () => queryFn(id),
    select,
    ...options,
  })
}
