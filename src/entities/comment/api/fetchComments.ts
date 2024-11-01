import { Comment } from "@entities/comment/model";

export const fetchComments = async (postId: number): Promise<Comment[]> => {
  try {
    const response = await fetch(`/api/comments/post/${postId}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error("댓글 조회 오류:", error)
    throw new Error(`댓글 조회 오류: ${error}`)
  }
}
