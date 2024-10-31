import { apiCall } from "../../../shared/api"
import { UsersResponseType, UserType } from "../model/types"

export const userApi = {
  fetchUsers: (limit: number, select: string) => {
    return apiCall.get<UsersResponseType>(`/users?limit=${limit}&select=${select}`)
  },

  fetchUser: (id: number) => apiCall.get<UserType>(`/users/${id}`),
}
