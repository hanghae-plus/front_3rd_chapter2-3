import { apiCall } from "../../../shared/api"
import { TagType } from "../model/types"

export const tagApi = {
  fetchTags: async () => {
    return await apiCall.get<TagType[]>("/posts/tags")
  },
}
