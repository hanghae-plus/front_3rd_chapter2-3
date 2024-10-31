// 댓글 가져오기
export const commentFetch = async (postId: number): Promise<Comment[] | null> => {
  try {
    const response = await fetch(`/api/comments/post/${postId}`)
    const data = await response.json()
    return data.comments
  } catch (error) {
    console.error("댓글 가져오기 오류:", error)
    return null
  }
}
