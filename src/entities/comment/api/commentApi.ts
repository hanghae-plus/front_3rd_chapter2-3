import { safeFetch } from "../../../shared/lib"
import { FetchCommentResponse } from "../model/types"

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
}
