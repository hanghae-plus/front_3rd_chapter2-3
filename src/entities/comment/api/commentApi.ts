import axios from "axios"

import { Comment, CommentsResponse } from "../model/types"

type CreateCommentPayload = Partial<Comment>

interface UpdateCommentProps {
  id: number
  payload: Partial<Comment>
}

interface LikeCommentProps {
  id: number
  payload: { likes: number }
}

export const commentApi = {
  fetchComments: async (id: number): Promise<CommentsResponse> => {
    const response = await axios.get(`/api/comments/post/${id}`)
    return response.data
  },
  createComment: async (payload: CreateCommentPayload) => {
    const response = await axios.post("/api/comments/add", payload, {
      headers: { "Content-Type": "application/json" },
    })
    return response.data
  },
  updateComment: async ({ id, payload }: UpdateCommentProps) => {
    const response = await axios.put(`/api/comments/${id}`, payload, {
      headers: { "Content-Type": "application/json" },
    })
    return response.data
  },
  deleteComment: async (id: number) => {
    const response = await axios.delete(`/api/comments/${id}`)
    return response.data
  },
  likeComment: async ({ id, payload }: LikeCommentProps) => {
    const response = await axios.patch(`/api/comments/${id}`, payload, {
      headers: { "Content-Type": "application/json" },
    })
    return response.data
  },
}
