import { Comment, NewComment } from "@entities/comment/model"

export const createCommentApi = async (newComment: NewComment): Promise<Comment> => {
  try {
    const response = await fetch("/api/comments/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("댓글 추가 오류:", error)
    throw new Error(`댓글 추가 오류: ${error}`)
  }
}
