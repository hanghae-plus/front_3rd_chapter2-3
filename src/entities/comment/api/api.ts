import { Comment, NewComment, PostId } from "@/shared/types"

// 댓글 가져오기
export const fetchComments = async (postId: PostId) => {
  const response = await fetch(`/api/comments/post/${postId}`)
  const data = await response.json()

  return data
}

// 댓글 추가
export const fetchCommentAdd = async (newComment: NewComment) => {
  const response = await fetch("/api/comments/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newComment),
  })
  const data = await response.json()

  return data
}

// 댓글 업데이트
export const fetchCommentUpdate = async (updatedComment: Comment) => {
  const response = await fetch(`/api/comments/${updatedComment.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ body: updatedComment.body }),
  })
  const data = await response.json()

  return data
}

// 댓글 삭제
export const fetchCommentDelete = async (commentId: number) => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  })
  const data = await response.json()

  return data
}

// 댓글 좋아요
export const fetchCommentIncreaseLikes = async (commentId: number, likes: number) => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ likes: likes + 1 }),
  })
  const data = await response.json()

  return data
}
