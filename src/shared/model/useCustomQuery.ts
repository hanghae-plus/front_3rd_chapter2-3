import { useQuery, UseQueryOptions, QueryKey } from "@tanstack/react-query";

function useCustomQuery<TData = unknown, TError = unknown, TQueryFnData = TData>(
  queryKey: QueryKey,
  queryFn: () => Promise<TQueryFnData>,
  options?: UseQueryOptions<TQueryFnData, TError, TData>,
) {
  return useQuery<TQueryFnData, TError, TData>(queryKey, queryFn, options);
}

export default useCustomQuery;
