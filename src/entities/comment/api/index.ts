import { Comments, NewComment, Comment } from "../model/type"

// 댓글 가져오기
export const fetchCommentsApi = async (postId: number) => {
  try {
    const response = await fetch(`/api/comments/post/${postId}`)
    const data: Comments = await response.json()
    return data
  } catch (error) {
    console.error("댓글 가져오기 오류:", error)
    throw new Error(`댓글 가져오기 오류: ${error}`)
  }
}

export const likeCommentApi = async (commentId: number, newLike: number) => {
  try {
    const response = await fetch(`/api/comments/${commentId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ like: newLike }),
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("댓글 좋아요 오류:", error)
  }
}

export const createCommentApi = async (newComment: NewComment) => {
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
  }
}
export const updateCommentApi = async (targetComment: Comment) => {
  try {
    const response = await fetch(`/api/comments/${targetComment.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: targetComment.body }),
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("댓글 업데이트 오류:", error)
    throw new Error(`댓글 업데이트 오류: ${error}`)
  }
}

export const deleteCommentApi = async (commentId: number) => {
  try {
    await fetch(`/api/comments/${commentId}`, {
      method: "DELETE",
    })
  } catch (error) {
    console.error("댓글 삭제 오류:", error)
    throw new Error(`댓글 삭제 오류: ${error}`)
  }
}
