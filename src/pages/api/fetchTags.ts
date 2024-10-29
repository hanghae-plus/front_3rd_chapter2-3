import { Tag } from "../../features/tags/model/types"

// 태그 가져오기
export const fetchTags = async (setTags: React.Dispatch<React.SetStateAction<Tag[]>>) => {
  try {
    const response = await fetch("/api/posts/tags")
    const data = await response.json()
    setTags(data)
  } catch (error) {
    console.error("태그 가져오기 오류:", error)
  }
}
