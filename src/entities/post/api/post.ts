import { baseApi } from "../../../shared/api/baseApi"
import { API_ENDPOINTS } from "../../../shared/config/constants"
import type { Post, PostsResponse, Tag } from "../model/post"

export const postService = {
  getPosts: (limit: number, skip: number) =>
    baseApi.get<PostsResponse>(
      `${API_ENDPOINTS.POSTS}?limit=${limit}&skip=${skip}`,
    ),

  searchPosts: (query: string) =>
    baseApi.get<PostsResponse>(`${API_ENDPOINTS.POSTS}/search?q=${query}`),

  getPostsByTag: (tag: string) =>
    baseApi.get<PostsResponse>(`${API_ENDPOINTS.POSTS}/tag/${tag}`),

  createPost: (post: Omit<Post, "id">) =>
    baseApi.post<Post>(API_ENDPOINTS.POSTS, post),

  updatePost: (id: number, post: Partial<Post>) =>
    baseApi.put<Post>(`${API_ENDPOINTS.POSTS}/${id}`, post),

  deletePost: (id: number) =>
    baseApi.delete<void>(`${API_ENDPOINTS.POSTS}/${id}`),

  getTags: () => baseApi.get<Tag[]>(API_ENDPOINTS.TAGS),
}
