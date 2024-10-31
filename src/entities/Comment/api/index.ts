import { apiCall } from "../../../shared/api"
import { NewCommentType } from "../model/types"

export const commentApi = {
  fetchComments: async (postId: number) => {
    const response = await apiCall.get<{ comments: Comment[] }>(`/comments/post/${postId}`)
    return response
  },

  createComment: async (comment: Omit<NewCommentType, "id">) => {
    const response = await apiCall.post<Comment>("/comments/add", comment)
    return response
  },

  updateComment: async ({ id, body }: { id: number; body: string }) => {
    const response = await apiCall.put<Comment>(`/comments/${id}`, { body })
    return response
  },

  deleteComment: async (id: number) => {
    await apiCall.delete(`/comments/${id}`)
    return id
  },

  likeComment: async ({ id, likes }: { id: number; likes: number }) => {
    const response = await apiCall.patch<Comment>(`/comments/${id}`, { likes })
    return response
  },
}
