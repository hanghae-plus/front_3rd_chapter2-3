import { baseApi } from "../../../shared/api/baseApi"
import { Tag } from "../../post/model/type"

// 태그 가져오기
export const fetchTags = async () => {
  const response = await baseApi.get<Tag[]>("/api/posts/tags")
  return response
}
