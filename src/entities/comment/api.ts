import { CommentModel } from "./CommentModel"

export const fetchComments = async (postId: string): Promise<CommentModel[]> => {
  const response = await fetch(`/api/posts/${postId}/comments`)
  if (!response.ok) {
    throw new Error("Failed to fetch comments")
  }
  return response.json()
}
