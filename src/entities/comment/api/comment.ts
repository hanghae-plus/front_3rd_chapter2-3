import { BaseApi } from "@/shared/api"
import { ResponseFetchComments } from "@/entities/comment"

const commentApi = new BaseApi("comments/post")

export const fetchComments = async (id: number): Promise<ResponseFetchComments> => {
  const param = `/${id}`
  return await commentApi.get(param)
}

export const putComment = async (id: number, likes: number): Promise<ResponseFetchComments> => {
  const param = `/${id}`
  return await commentApi.put(param, { likes: likes + 1 })
}

export const deleteComment = async (id: number): Promise<ResponseFetchComments> => {
  const param = `/${id}`
  return await commentApi.delete(param)
}

export const createComment = async (comment: string): Promise<ResponseFetchComments> => {
  return await commentApi.post("/add", { comment })
}
