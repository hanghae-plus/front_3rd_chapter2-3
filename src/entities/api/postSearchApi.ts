export const postSearchApi = async (searchQuery: string) => {
  try {
    const response = await fetch(`/api/posts/search?q=${searchQuery}`)
    const data = await response.json()

    return data
  } catch (error) {
    throw new Error("게시글 조회 실패" + error)
  }
}
