import { baseApi } from "../../../shared/api/base"

export const userApi = {
  get: {
    users: async ({ limit = 0, select = "username,image" }: { limit?: number; select?: string } = {}) => {
      const response = await baseApi.get("/users", {
        params: {
          limit,
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
