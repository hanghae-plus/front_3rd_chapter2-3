import { Tag } from "../../feature/post/model/postType"

export const postFetchTags = async (): Promise<Tag[] | undefined> => {
  try {
    const response = await fetch("/api/posts/tags")
    const data = await response.json()

    return data
  } catch (error) {
    console.error("태그 가져오기 오류:", error)
  }
}
