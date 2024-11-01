import { baseApi } from "../../../shared/api/base"
import { TagResponse } from "../model/type"

export const tagApi = {
  get: {
    tags: async () => {
      const response = await baseApi.get<TagResponse[]>("/posts/tags")
      return response.data
    },
  },
}
