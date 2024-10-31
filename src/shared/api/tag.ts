export const fetchTags = async () => {
  try {
    const response = await fetch("/api/posts/tags")
    return await response.json()
  } catch (error) {
    console.error("태그 가져오기 오류:", error)
  }
}
