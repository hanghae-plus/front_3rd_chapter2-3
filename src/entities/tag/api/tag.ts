import { getResponseData } from "../../lib/service"

// 태그 가져오기
export const fetchTags = async () =>{
  const response = await fetch("/api/posts/tags")
  return getResponseData(response)
}