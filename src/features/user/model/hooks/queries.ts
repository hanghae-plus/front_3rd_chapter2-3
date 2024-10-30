import { userApi, UsersResponse } from '@features/user/api'
import { useQuery } from '@tanstack/react-query'

export interface UsersQueryProps {
  limit: number
  select: string
}

export function useUsersQuery({ limit, select }: UsersQueryProps) {
  return useQuery<UsersResponse, Error>({
    queryKey: ['users', { limit, select }],
    queryFn: () => userApi.fetchUsers(limit, select),
  })
}
