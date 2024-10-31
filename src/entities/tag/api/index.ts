export const fetchTagsApi = async () => {
  try {
    const response = await fetch("/api/posts/tags")
    const data = await response.json()
    return data
  } catch (error) {
    console.error("태그 가져오기 오류:", error)
    throw new Error(`태그 가져오기 오류: ${error}`)
  }
}

export const fetchPostsByTagApi = async (tag: string) => {
  try {
    const response = await fetch(`/api/posts/tag/${tag}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.log(`태그 가져오기 오류: ${error}`)
    throw new Error(`태그 가져오기 오류: ${error}`)
  }
}
