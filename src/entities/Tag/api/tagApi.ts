import { Tag } from "../model/types"

export const tagApi = {
  // 태그 목록 조회
  getTags: async (): Promise<Tag[]> => {
    const response = await fetch("/api/posts/tags")
    const data = await response.json()
    return data
  },
}
