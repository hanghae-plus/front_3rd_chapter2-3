import { baseApi } from "../../../shared/api/base"
import { UserDetail, UserParams, UserResponse } from "../model/types"

export const userApi = {
  get: {
    users: async ({ limit = 0, select = "username,image" }: UserParams) => {
      const response = await baseApi.get<UserResponse>("/users", {
        params: {
          limit,
          select,
        },
      })
      return response.data
    },
    userById: async ({ id, select }: UserParams & { id: number }) => {
      const response = await baseApi.get<UserDetail>(`/users/${id}`, {
        params: {
          select,
        },
      })
      return response.data
    },
  },
  post: {},
  put: {},
  delete: {},
  patch: {},
}
