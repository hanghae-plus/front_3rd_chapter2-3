import { Comment } from "../types"

export const calcLikeCount = (
  comments: Comment[],
  id: number,
  delta: number,
): number => {
  const comment = comments.find((c) => c.id === id)
  return comment ? comment.likes + delta : 0
}

export const hasCommentByPostId = (
  comments: { [key: number]: Comment[] },
  postId: number,
): boolean => {
  return Boolean(comments[postId])
}
