import axiosInstance from "@/shared/api/axiosInstance"
import { Post } from "../model/types"

const POST_ENDPOINT = "/posts"

export const getPosts = async (limit: number, skip: number) => {
  const res = await axiosInstance.get(`${POST_ENDPOINT}`, { params: { limit, skip } })
  return res.data
}

export const getPostsByTag = async (tag: string) => {
  const res = await axiosInstance.get(`${POST_ENDPOINT}/tag/${tag}`)
  return res.data
}

export const getPostTags = async () => {
  const res = await axiosInstance.get(`${POST_ENDPOINT}/tags`)
  return res.data
}

export const searchPosts = async (searchQuery: string) => {
  const res = await axiosInstance.get(`${POST_ENDPOINT}/search`, { params: { q: searchQuery } })
  return res.data
}

export const createPost = async (post: Omit<Post, "id">) => {
  const res = await axiosInstance.post(`${POST_ENDPOINT}/add`, post)
  return res.data
}

export const updatePost = async (id: number, post: Partial<Post>) => {
  const res = await axiosInstance.put(`${POST_ENDPOINT}/${id}`, post)
  return res.data
}

export const deletePost = async (id: number) => {
  return await axiosInstance.delete(`${POST_ENDPOINT}/${id}`)
}
