import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

const useCustomQuery = <TData, TError = unknown>(
  key: (string | number)[],
  queryFn: () => Promise<TData>,
  options?: UseQueryOptions<TData, TError>,
): UseQueryResult<TData, TError> => {
  return useQuery<TData, TError>({
    queryKey: [key],
    queryFn,
    ...options,
  });
};

export default useCustomQuery;
