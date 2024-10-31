import { axiosInstance } from "../../../shared/api/axiosInstance"
import { CommentRequests } from "../model/commentTypes"

export const commentApi = {
  getCommentsByPost: async (postId: number) => {
    const { data: res } = await axiosInstance.get(`/comments/post/${postId}`)
    return res
  },
  addComment: async (comment: CommentRequests["Create"]) => {
    const { data: res } = await axiosInstance.post(`/comments/add`, comment)
    return res
  },
  updateComment: async (id: number, comment: CommentRequests["Update"]) => {
    const { data: res } = await axiosInstance.put(`/comments/${id}`, comment)
    return res
  },
  deleteComment: async (id: number) => {
    const { data: res } = await axiosInstance.delete(`/comments/${id}`)
    return res
  },
  likeComment: async (id: number, likes: number) => {
    const { data: res } = await axiosInstance.patch(`/comments/${id}`, {
      likes: likes + 1,
    })
    return res
  },
}
