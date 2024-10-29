import { CommentResponse } from "../type"

export const fetchComments = async (postId: number): Promise<void> => {
  if (comments[postId]) return
  try {
    const response = await fetch(`/api/comments/post/${postId}`)
    const data: CommentResponse = await response.json()
    setComments((prev) => ({ ...prev, [postId]: data.comments }))
  } catch (error) {
    console.error("댓글 가져오기 오류:", error)
  }
}
