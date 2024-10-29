import { safeFetch } from "../../../shared/lib"
import { Comment, FetchCommentResponse, NewComment } from "../model/types"

export const commentApi = {
  /* 댓글 가져오기 **/
  fetchComments: async (postId: number) => {
    try {
      const response = await safeFetch<FetchCommentResponse>(`/api/comments/post/${postId}`)

      console.log(response)

      return response
    } catch (error) {
      console.error("댓글 가져오기 오류:", error)
    }
  },

  /** 댓글 추가 */
  addComment: async (newComment: NewComment) => {
    try {
      const response = await safeFetch.post<Comment>("/api/comments/add", newComment)
      return response
    } catch (error) {
      console.error("댓글 추가 오류:", error)
    }
  },

  /* 댓글 업데이트 **/
  updateComment: async (selectedComment: Comment) => {
    try {
      const response = await safeFetch.put<Comment>(`/api/comments/${selectedComment?.id}`, {
        body: selectedComment?.body,
      })
      return response
    } catch (error) {
      console.error("댓글 업데이트 오류:", error)
    }
  },
}
