import { baseApi } from "../../../shared/api/baseApi"
import { API_ENDPOINTS } from "../../../shared/config/constants"
import type { Comment, CommentResponse } from "../model/comment"

export const commentService = {
  getComments: (postId: number) =>
    baseApi.get<CommentResponse>(`${API_ENDPOINTS.COMMENTS}/post/${postId}`),

  createComment: (comment: Omit<Comment, "id">) =>
    baseApi.post<Comment>(API_ENDPOINTS.COMMENTS, comment),

  updateComment: (id: number, body: string) =>
    baseApi.put<Comment>(`${API_ENDPOINTS.COMMENTS}/${id}`, { body }),

  deleteComment: (id: number) =>
    baseApi.delete<void>(`${API_ENDPOINTS.COMMENTS}/${id}`),
}
