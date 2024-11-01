import { UseQueryOptions } from '@tanstack/react-query';

export type QueryConfig<
  TData,
  TError = Error,
  TSelectData = TData,
  TQueryKey extends readonly unknown[] = unknown[]
> = Omit<
  UseQueryOptions<TData, TError, TSelectData, TQueryKey>,
  'queryKey' | 'queryFn'
>;
