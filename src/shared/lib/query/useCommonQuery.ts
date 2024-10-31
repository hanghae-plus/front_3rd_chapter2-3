import {
  QueryKey,
  useQuery,
} from '@tanstack/react-query';

interface CommonQueryOptions<TData, TParams> {
  queryKey: QueryKey
  queryFn: (params: TParams) => Promise<TData>
  params?: TParams
  select?: (data: TData) => TData
}

export function useCommonQuery<TData, TParams = void>({
  queryKey,
  queryFn,
  params,
  select,
  ...options
}: CommonQueryOptions<TData, TParams>) {
  return useQuery({
    queryKey,
    queryFn: () => queryFn(params as TParams),
    select,
    ...options,
  })
}
