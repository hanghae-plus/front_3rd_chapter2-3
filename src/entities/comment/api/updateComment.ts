import { Comment } from "@entities/comment/model"

export const updateCommentApi = async (comment: Comment): Promise<Comment> => {
  try {
    const response = await fetch(`/api/comments/${comment.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: comment.body, likes: comment.likes }),
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("댓글 수정 오류:", error)
    throw new Error(`댓글 수정 오류: ${error}`)
  }
}
