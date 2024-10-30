export const tagFetch = async (tag: string) => {
  const response = await fetch(`/api/posts/tag/${tag}`)
  if (!response.ok) {
    throw new Error("게시물 데이터를 가져오는 데 실패했습니다.")
  }
  return response.json()
}
