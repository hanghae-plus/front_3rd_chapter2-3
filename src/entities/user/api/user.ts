import { baseApi } from "../../../shared/api/baseApi"
import { API_ENDPOINTS } from "../../../shared/config/constants"
import type { User, UsersResponse } from "../model/user"

export const userService = {
  getUsers: () =>
    baseApi.get<UsersResponse>(`${API_ENDPOINTS.USERS}?select=username,image`),

  getUser: (id: number) => baseApi.get<User>(`${API_ENDPOINTS.USERS}/${id}`),
}
