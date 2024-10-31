import { Post, PostsResponse, Tag } from "../model/types"

const BASE_URL = "/api/posts"

export const postsAPI = {
  getPosts: async (limit: number, skip: number): Promise<PostsResponse> => {
    const response = await fetch(`${BASE_URL}?limit=${limit}&skip=${skip}`)
    return response.json()
  },

  searchPosts: async (query: string): Promise<PostsResponse> => {
    const response = await fetch(`${BASE_URL}/search?q=${query}`)
    return response.json()
  },

  addPost: async (post: Omit<Post, "id">): Promise<Post> => {
    const response = await fetch(`${BASE_URL}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    })
    return response.json()
  },

  updatePost: async (post: Post): Promise<Post> => {
    const response = await fetch(`${BASE_URL}/${post.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    })
    return response.json()
  },

  deletePost: async (id: number): Promise<void> => {
    await fetch(`${BASE_URL}/${id}`, { method: "DELETE" })
  },

  getTags: async (): Promise<Tag[]> => {
    const response = await fetch(`${BASE_URL}/tags`)
    return response.json()
  },

  getPostsByTag: async (tag: string): Promise<PostsResponse> => {
    const response = await fetch(`${BASE_URL}/tag/${tag}`)
    return response.json()
  },
}
