import { instance } from "../../../shared/api"

export const fetchTags = async () => {
  const response = await instance.get("/posts/tags")
  return response.data
}
