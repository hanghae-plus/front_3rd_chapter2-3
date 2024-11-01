import { ResponseFetchPosts } from "@/entities/post"
import { BaseApi } from "@/shared/api"

const postApi = new BaseApi("posts")

export const fetchPosts = async (limit: string, skip: string): Promise<ResponseFetchPosts> => {
  const param = `?limit=${limit}&skip=${skip}`
  return await postApi.get(param)
}

export const deletePost = async (id: number) => {
  const param = `/${id}`
  return await postApi.delete(param)
}

export const putPost = async (id: number, body: { title: string; body: string }) => {
  const param = `/${id}`
  return await postApi.put(param, { data: body })
}
