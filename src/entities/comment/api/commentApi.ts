import { safeFetch } from "../../../shared/api"
import {
  Comment,
  DeletedComment,
  FetchCommentResponse,
  NewComment,
} from "../model/types"

export const commentApi = {
  /* 댓글 가져오기 **/
  fetchComments: async (postId: number) => {
    try {
      const response = await safeFetch<FetchCommentResponse>(
        `/api/comments/post/${postId}`,
      )
      return response
    } catch (error) {
      console.error("댓글 가져오기 오류:", error)
      throw error
    }
  },

  /** 댓글 추가 */
  addComment: async (newComment: NewComment) => {
    try {
      const response = await safeFetch.post<Comment>(
        "/api/comments/add",
        newComment,
      )
      return response
    } catch (error) {
      console.error("댓글 추가 오류:", error)
      throw error
    }
  },

  /* 댓글 업데이트 **/
  updateComment: async (selectedComment: Comment) => {
    try {
      const response = await safeFetch.put<Comment>(
        `/api/comments/${selectedComment?.id}`,
        {
          body: selectedComment?.body,
        },
      )
      return response
    } catch (error) {
      console.error("댓글 업데이트 오류:", error)
      throw error
    }
  },

  /** 댓글 삭제 */
  deleteComment: async (id: Comment["id"]) => {
    try {
      const response = await safeFetch.delete<DeletedComment>(
        `/api/comments/${id}`,
      )
      return response
    } catch (error) {
      console.error("댓글 삭제 오류:", error)
      throw error
    }
  },

  /** 댓글 좋아요 */
  likeComment: async (id: Comment["id"], likes: Comment["likes"] = 0) => {
    try {
      const response = await safeFetch.patch<Comment>(`/api/comments/${id}`, {
        likes: likes + 1,
      })
      return response
    } catch (error) {
      console.error("댓글 좋아요 오류:", error)
      throw error
    }
  },
}
