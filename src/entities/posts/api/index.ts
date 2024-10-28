import { instance } from "../../../shared/api"
import { ListResponse } from "../../../shared/model/types"
import { Post, PostPayload } from "../model/types"

export const fetchPosts = async (limit: number, skip: number): Promise<ListResponse<Post, "posts">> => {
  const response = await instance.get(`/posts?limit=${limit}&skip=${skip}`)
  return response.data
}

export const searchPosts = async (keyword: string) => {
  const response = await instance.get(`/posts/search?q=${keyword}`)
  return response.data
}

export const fetchPostsByTag = async (tag: string) => {
  const response = await instance.get(`/posts/tag/${tag}`)
  return response.data
}

export const addPost = async (post: PostPayload) => {
  const response = await instance.post("/posts/add", post)
  return response.data
}

export const updatePost = async (post: Post) => {
  const response = await instance.put(`/posts/${post.id}`, post)
  return response.data
}

export const deletePost = async (id: number) => {
  const response = await instance.delete(`/posts/${id}`)
  return response.data
}
