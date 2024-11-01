import { CommentForm } from "@entities/comment/types"

export const createCommentApi = async (comment: CommentForm) => {
  try {
    const response = await fetch("/api/comments/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment),
    })
    return await response.json()
  } catch (e) {
    throw new Error("Failed to create comment" + e)
  }
}
