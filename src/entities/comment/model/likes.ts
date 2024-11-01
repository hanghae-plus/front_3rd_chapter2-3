import { Comment } from "./type"

export const calculateNewLikes = (currentLikes: number): number => {
  return currentLikes + 1
}

export const findCommentById = (comments: Comment[], postId: number): Comment | undefined => {
  return comments.find((comment) => comment.id === postId)
}
