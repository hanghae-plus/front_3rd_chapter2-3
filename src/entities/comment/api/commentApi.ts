import axiosClient from "../../../app/axios/axiosClient.ts"
import { Comment } from "../model/types.ts"

export const getComments = async (postId: number): Promise<Comment[]> => {
  const response = await axiosClient.get(`/comments/post/${postId}`)
  return response.data.comments
}

export const addComment = async (newComment: { body: string; postId: number; userId: number }) => {
  const response = await axiosClient.post("/comments/add", newComment)
  return response.data
}

export const editComment = async (commentId: number, updatedComment: { body: string }) => {
  const response = await axiosClient.put(`/comments/${commentId}`, updatedComment)
  return response.data
}

export const deleteComment = async (commentId: number) => {
  await axiosClient.delete(`/comments/${commentId}`)
}

export const likeComment = async (commentId: number, likes: number): Promise<Comment> => {
  const response = await axiosClient.patch(`/comments/${commentId}`, { likes })
  return response.data
}
