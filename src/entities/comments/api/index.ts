import { Comment, NewComment } from "../model"

export async function postComment(newComment: NewComment) {
  const response = await fetch("/api/comments/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newComment),
  })
  return await response.json()
}

interface IPatchComment {
  commentId: number
  comments: Comment[]
}
export async function patchCommentLike({ commentId, comments }: IPatchComment) {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ likes: comments.find((c) => c.id === commentId)?.likes || 0 + 1 }),
  })
  return await response.json()
}

export async function deleteComment(commentId: number) {
  await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  })
  return commentId
}

export async function getComments(postId: number) {
  const response = await fetch(`/api/comments/post/${postId}`)
  return await response.json()
}
