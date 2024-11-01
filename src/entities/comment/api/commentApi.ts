import axiosInstance from "@/shared/api/axiosInstance"
import { Comment } from "../model/types"

const COMMENTS_ENDPOINT = "/comments"

export const getCommentsByPostId = async (postId: number) => {
  const res = await axiosInstance.get(`${COMMENTS_ENDPOINT}/post/${postId}`)
  return res.data
}

export const createComment = async (comment: Omit<Comment, "id">) => {
  const res = await axiosInstance.post(`${COMMENTS_ENDPOINT}/add`, comment)
  return res.data
}

export const updateComment = async (id: number, comment: Partial<Comment>) => {
  const res = await axiosInstance.put(`${COMMENTS_ENDPOINT}/${id}`, comment)
  return res.data
}

export const updateCommentLikes = async (id: number, likes: number) => {
  const res = await axiosInstance.put(`${COMMENTS_ENDPOINT}/${id}`, { likes })
  return res.data
}

export const deleteComment = async (id: number) => {
  return await axiosInstance.delete(`${COMMENTS_ENDPOINT}/${id}`)
}
