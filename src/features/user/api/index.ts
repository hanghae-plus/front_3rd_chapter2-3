import { api } from '@app/api'
import type { User } from '@entities/comment/model/types'

export interface UsersResponse {
  users: User[]
}

export const userApi = {
  fetchUsers: (limit: number, select: string) => {
    return api.get<UsersResponse>(`/users?limit=${limit}&select=${select}`)
  },

  fetchUser: (id: number) => api.get<User>(`/users/${id}`),
}
