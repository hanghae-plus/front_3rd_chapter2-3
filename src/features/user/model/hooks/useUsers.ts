import { useCallback } from 'react'
import { userStore } from '../stores'
import { UsersQueryProps, useUsersQuery } from '@entities/user/api'
import { User } from '@entities/user/model/user.types'
import { useQueryClient } from '@tanstack/react-query'
import { userApi } from '@entities/user/api'

export function useUsers({ limit = 0, select = 'username,image' }: UsersQueryProps) {
  const queryClient = useQueryClient()
  const { data, isLoading, error, isError } = useUsersQuery({ limit, select })
  const { setSelectedUser, setShowUserModal } = userStore()

  const openUserModal = useCallback(
    async (user: User) => {
      const userData = await queryClient.fetchQuery({
        queryKey: ['user', { id: user.id }],
        queryFn: () => userApi.fetchUser(user.id),
      })
      setSelectedUser(userData)
      setShowUserModal(true)
    },
    [queryClient, setSelectedUser, setShowUserModal],
  )
  return {
    users: data?.users ?? [],
    isLoading,
    isError,
    error,
    openUserModal,
  }
}
