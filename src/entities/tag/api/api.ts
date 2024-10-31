// 태그 가져오기
export const fetchTags = async () => {
  const response = await fetch("/api/posts/tags")
  const data = await response.json()

  return data
}
