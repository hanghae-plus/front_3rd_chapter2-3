import { apiCall } from "../../../shared/api"
import { TagType } from "../../Tag/model/types"
import { NewPostType, PostsResponseType, PostType } from "../model/types"

export const postApi = {
  fetchPosts: async ({ limit, skip }: { limit: number; skip: number }) => {
    return await apiCall.get<PostsResponseType>(`/posts?limit=${limit}&skip=${skip}`)
  },

  fetchPostsByTag: async (tag: string) => {
    return await apiCall.get<PostsResponseType>(`/posts/tag/${tag}`)
  },

  searchPosts: async (query: string) => {
    return await apiCall.get<PostsResponseType>(`/posts/search?q=${query}`)
  },

  createPost: async (post: NewPostType) => {
    return await apiCall.post<PostType>("/posts/add", post)
  },

  updatePost: async (post: PostType) => {
    return await apiCall.put<PostType>(`/posts/${post?.id}`, post)
  },

  deletePost: async (id: number) => {
    await apiCall.delete(`/posts/${id}`)
    return id
  },

  getTags: async () => {
    return await apiCall.get<TagType[]>("/posts/tags")
  },
}
