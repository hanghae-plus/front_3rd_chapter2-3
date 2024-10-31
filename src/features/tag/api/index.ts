import { fetchTagsApi } from "../../../entities/tag/api"
import { Tag } from "../../../entities/tag/model/types"

export interface TagsResponse {
  tags: Tag[]
  total: number
}

export const tagsApi = {
  fetchAll: async (): Promise<TagsResponse> => {
    const tags = await fetchTagsApi()
    return {
      tags,
      total: tags.length
    }
  }
}