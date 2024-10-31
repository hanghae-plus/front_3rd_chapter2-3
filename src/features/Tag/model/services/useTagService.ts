import { tagApi } from "../../../../entities/Tag/api/tagApi"
import { useTagStore } from "../stores/useTagStore"

export const useTagService = () => {
  const { setTags } = useTagStore()

  // 태그 조회
  const fetchTags = async () => {
    try {
      const data = await tagApi.getTags()
      setTags(data)
    } catch (error) {
      console.error("태그 조회 오류:", error)
    }
  }

  return {
    fetchTags,
  }
}
