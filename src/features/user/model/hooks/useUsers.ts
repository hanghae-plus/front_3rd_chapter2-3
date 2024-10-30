import { UsersQueryProps, useUsersQuery } from './queries'

export function useUsers({ limit, select }: UsersQueryProps) {
  const { data, isLoading, error, isError } = useUsersQuery({ limit, select })

  return {
    users: data?.users ?? [],
    isLoading,
    isError,
    error,
  }
}
