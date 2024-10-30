import { apiCall } from "../../../shared/api"

export const fetchPostByTags = async () => {
  const response = await apiCall.get(`/posts/tags`)
  return response.data
}
