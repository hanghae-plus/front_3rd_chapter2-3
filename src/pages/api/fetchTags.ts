import { fetchTagsFetch } from "../../entities/post/api"
import { Tag } from "../../features/tags/model/types"

// 태그 가져오기
export const fetchTags = async (setTags: React.Dispatch<React.SetStateAction<Tag[]>>) => {
  try {
    const data = await fetchTagsFetch()
    setTags(data)
  } catch (error) {
    console.error("태그 가져오기 오류:", error)
  }
}
