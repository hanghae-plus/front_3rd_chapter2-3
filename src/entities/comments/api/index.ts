import { instance } from "../../../shared/api"
import { ListResponse } from "../../../shared/model/types"
import { Comment, CommentLikeUpdate, CommentPayload } from "../model/types"

export const fetchComments = async (postId: number): Promise<ListResponse<Comment, "comments">> => {
  const response = await instance.get(`/comments/post/${postId}`)
  return response.data
}

export const addComment = async (comment: CommentPayload) => {
  const response = await instance.post("/comments/add", comment)
  return response.data
}

export const updateComment = async (comment: Comment) => {
  const response = await instance.put(`/comments/${comment.id}`, comment)
  return response.data
}

export const deleteComment = async (id: number) => {
  const response = await instance.delete(`/comments/${id}`)
  return response.data
}

export const likeComment = async (payload: CommentLikeUpdate) => {
  const response = await instance.patch(`/comments/${payload.id}`, payload)
  return response.data
}
