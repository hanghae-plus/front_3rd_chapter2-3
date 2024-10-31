import { api } from '@app/api'
import { Tag } from '@entities/tag/model/tag.types'

export const tagApi = {
  fetchTags: async () => {
    return await api.get<Tag[]>('/posts/tags')
  },
}
