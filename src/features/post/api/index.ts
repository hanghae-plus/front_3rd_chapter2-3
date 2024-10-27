export const fetchPostsByTagApi = async (tag: string) => {
  try {
    const response = await fetch(`/api/posts/tag/${tag}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.log(`태그별 게시물 가져오기 오류: ${error}`)
    throw new Error(`태그별 게시물 가져오기 오류: ${error}`)
  }
}
