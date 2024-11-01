import axios from "axios"

import { Post, PostsResponse, Tag } from "../model/types"

interface FetchPostsParams {
  limit: number
  skip: number
}

interface SearchPostsParams {
  q: string
}

interface FetchPostsByTagPathParams {
  tag: string
}

type CreatePostPayload = Partial<Post>

interface UpdatePostProps {
  id: number
  payload: Partial<Post>
}

export const postApi = {
  fetchPosts: async (params: FetchPostsParams): Promise<PostsResponse> => {
    const response = await axios.get(`/api/posts`, { params })
    return response.data
  },
  fetchTags: async (): Promise<Tag[]> => {
    const response = await axios.get("/api/posts/tags")
    return response.data
  },
  searchPosts: async (params: SearchPostsParams): Promise<PostsResponse> => {
    const response = await axios.get(`/api/posts/search`, { params })
    return response.data
  },
  fetchPostsByTag: async (params: FetchPostsByTagPathParams): Promise<PostsResponse> => {
    const response = await axios.get(`/api/posts/tag/${params.tag}`)
    return response.data
  },
  createPost: async (payload: CreatePostPayload) => {
    const response = await axios.post("/api/posts/add", payload, {
      headers: { "Content-Type": "application/json" },
    })
    return response.data
  },
  updatePost: async ({ id, payload }: UpdatePostProps) => {
    const response = await axios.put(`/api/posts/${id}`, payload, {
      headers: { "Content-Type": "application/json" },
    })
    return response.data
  },
  deletePost: async (id: number) => {
    const response = await axios.delete(`/api/posts/${id}`)
    return response.data
  },
}
