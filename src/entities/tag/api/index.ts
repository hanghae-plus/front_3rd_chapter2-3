import { Tag } from "../model/types.ts"

export const fetchTagsApi = async () => {
  try {
    const response = await fetch("/api/posts/tags")
    const data: Tag[] = await response.json()

    return data
  } catch (error) {
    throw new Error(`태그 가져오기 오류: ${error}`)
  }
}
