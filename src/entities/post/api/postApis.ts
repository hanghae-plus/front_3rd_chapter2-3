import { UserResponse_t } from "../../user/model/types"
import { NewPost_i, Post_i, PostResponse_t } from "../model/types"

export const postApi = {
  addPost: async (newPost: NewPost_i): Promise<Post_i> => {
    const response = await fetch("/api/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    })

    if (!response.ok) {
      throw new Error("게시물 추가 실패")
    }

    return response.json()
  },

  deletePost: async (id: number) => {
    await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    })
  },

  editPost: async (selectedPost: Post_i): Promise<Post_i> => {
    const response = await fetch(`/api/posts/${selectedPost.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedPost),
    })

    if (!response.ok) {
      throw new Error("게시물 업데이트 실패")
    }

    return response.json()
  },

  fetchPosts: async ({ limit = 10, skip = 0 }: { limit?: number; skip?: number }) => {
    const [postsResponse, usersResponse] = await Promise.all([
      fetch(`/api/posts?limit=${limit}&skip=${skip}`),
      fetch("/api/users?limit=0&select=username,image"),
    ])
    const postsData = (await postsResponse.json()) as PostResponse_t
    const usersData = (await usersResponse.json()) as UserResponse_t

    return {
      posts: postsData.posts.map((post) => ({
        ...post,
        author: usersData.users.find((user) => user.id === post.userId),
      })),
      total: postsData.total,
    }
  },

  searchPosts: async (query: string) => {
    const response = await fetch(`/api/posts/search?q=${query}`)
    return response.json()
  },

  fetchPostsByTag: async (tag: string) => {
    const [postsResponse, usersResponse] = await Promise.all([
      fetch(`/api/posts/tag/${tag}`),
      fetch("/api/users?limit=0&select=username,image"),
    ])
    const postsData = (await postsResponse.json()) as PostResponse_t
    const usersData = (await usersResponse.json()) as UserResponse_t

    return {
      posts: postsData.posts.map((post) => ({
        ...post,
        author: usersData.users.find((user) => user.id === post.userId),
      })),
      total: postsData.total,
    }
  },

  getTags: async () => {
    const response = await fetch("/api/posts/tags")
    return response.json()
  },
}
