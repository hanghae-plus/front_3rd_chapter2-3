import { baseApi } from "../../../shared/api/base"
import { calculateNewLikes, findCommentById } from "../model/likes"

export const commentApi = {
  get: {
    comments: async (postId: number) => {
      const response = await baseApi.get(`/comments/post/${postId}`)
      return response.data
    },
  },
  post: {
    addComment: async (comment: Comment) => {
      const response = await baseApi.post("/comments/add", comment)
      return response.data
    },
  },
  delete: {
    comment: async (id: number) => {
      await baseApi.delete(`/comments/${id}`)
    },
  },
  patch: {
    likeComment: async (id: number, postId: number, comments: Comment[]) => {
      const currentComment = findCommentById(comments, postId)
      const newLikes = calculateNewLikes(currentComment.likes)

      const response = await baseApi.patch(`/comments/${id}`, {
        likes: newLikes,
      })
      return response.data
    },
  },
  put: {
    updateComment: async (id: number, body: string) => {
      const response = await baseApi.put(`/comments/${id}`, {
        body,
      })
      return response.data
    },
  },
}
