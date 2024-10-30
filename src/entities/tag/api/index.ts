import { Tag } from "../model/types"

// 태그 가져오기
export const fetchTagsApi = async (): Promise<Tag[]> => {
  try {
    const response = await fetch("/api/posts/tags")
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(`태그 가져오기 오류: ${error}`)
  }
}
