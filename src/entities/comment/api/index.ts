import { Comment, NewComment } from "../model/types"

export interface CommentsData {
  comments: Comment[]
  total: number
  limit: number
  skip: number
}

// TODO feature
// 댓글 가져오기
export const fetchCommentsApi = async (postId: number): Promise<CommentsData> => {
  try {
    const response = await fetch(`/api/comments/post/${postId}`)
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(`댓글 가져오기 오류: ${error}`)
  }
}

// TODO feature
// 댓글 추가
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
    throw new Error(`댓글 추가 오류: ${error}`)
  }
}

// TODO feature
// 댓글 업데이트
export const updateCommentApi = async (updatingComment: Comment): Promise<Comment> => {
  try {
    const response = await fetch(`/api/comments/${updatingComment.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: updatingComment.body }),
    })
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(`댓글 업데이트 오류: ${error}`)
  }
}

// TODO feature
// 댓글 삭제
export const deleteCommentApi = async (commentId: number): Promise<void> => {
  try {
    await fetch(`/api/comments/${commentId}`, {
      method: "DELETE",
    })
  } catch (error) {
    throw new Error(`댓글 삭제 오류: ${error}`)
  }
}

// 댓글 좋아요
export const likeCommentApi = async(commentId: number, likes: number): Promise<Comment> => {
  try {
    const response = await fetch(`/api/comments/${commentId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes }),
    })
    const data = await response.json()
    return data;
  } catch (error) {
    throw new Error(`댓글 좋아요 오류: ${error}`)
  }
};