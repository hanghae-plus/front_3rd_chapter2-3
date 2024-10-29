import { baseApi } from "../../../shared/api/base"

export const tagApi = {
  get: {
    tags: async () => {
      const response = await baseApi.get("/posts/tags")
      return response.data
    },
  },
}
