import { DEFAULT_STALE_TIME } from '@entities/common/constants'
import { userApi, UsersResponse } from '@entities/user/ui/api'
import { useQuery } from '@tanstack/react-query'

export interface UsersQueryProps {
  limit?: number
  select?: string
}

export function useUsersQuery({ limit = 0, select = 'username,image' }: UsersQueryProps) {
  return useQuery<UsersResponse, Error>({
    queryKey: ['users', { limit, select }],
    queryFn: () => userApi.fetchUsers(limit, select),
    staleTime: DEFAULT_STALE_TIME,
  })
}
