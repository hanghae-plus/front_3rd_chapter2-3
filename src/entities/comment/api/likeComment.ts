import { Comment } from "@entities/comment/model"

export const likeCommentApi = async (comment: Comment): Promise<Comment> => {
  try {
    const { id, likes } = comment
    const response = await fetch(`/api/comments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes }),
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("댓글 좋아요 오류:", error)
    throw new Error(`댓글 좋아요 오류: ${error}`)
  }
} 