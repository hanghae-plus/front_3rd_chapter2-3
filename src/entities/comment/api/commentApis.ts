import { PostType } from "../../post/api/types"
import { AddCommentParam, CommentType, GetCommentReturnType } from "./types"

export const fetchGetCommentByPostId = async (postId: PostType["id"]): Promise<GetCommentReturnType> => {
  try {
    const response = await fetch(`/api/comments/post/${postId}`)
    const data = await response.json()

    return data
  } catch (error) {
    console.error("댓글 가져오기 오류:", error)
    throw new Error(`댓글 가져오기 오류: ${error}`)
  }
}

export const fetchAddComment = async (newComment: AddCommentParam): Promise<CommentType> => {
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

export const fetchUpdateComment = async (
  commentId: Pick<CommentType, "id">,
  newBody: Pick<CommentType, "body">,
): Promise<CommentType> => {
  try {
    const response = await fetch(`/api/comments/${commentId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: newBody }),
    })

    const data = await response.json()

    return data
  } catch (error) {
    console.error("댓글 업데이트 오류:", error)
    throw new Error(`댓글 업데이트 오류: ${error}`)
  }
}

export const fetchDeleteComment = async (commentId: Pick<CommentType, "id">): Promise<string> => {
  try {
    const res = await fetch(`/api/comments/${commentId}`, {
      method: "DELETE",
    })
    const data = await res.json()

    return data
  } catch (error) {
    console.error("댓글 삭제 오류:", error)
    throw new Error(`댓글 삭제 오류: ${error}`)
  }
}

export const fetchLikeComment = async (
  commentId: CommentType["id"],
  currentLikes: CommentType["likes"],
): Promise<CommentType> => {
  const newLikes = currentLikes + 1

  try {
    const response = await fetch(`/api/comments/${commentId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: newLikes }),
    })
    const data = await response.json()

    return data
  } catch (error) {
    console.error("댓글 좋아요 오류:", error)
    throw new Error(`댓글 좋아요 오류: ${error}`)
  }
}
