import { Post } from "../model/types"

export const postApi = {
  // 게시물 목록 조회
  getPosts: async (limit: number, skip: number): Promise<Post[]> => {
    const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)
    const data = await response.json()
    return data.posts
  },

  // 게시물 생성
  createPost: async (post: { title: string; body: string; userId: number }): Promise<Post> => {
    const response = await fetch("/api/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    })
    return response.json()
  },

  // 게시물 수정
  updatePost: async (id: number, post: Post): Promise<Post> => {
    const response = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    })
    return response.json()
  },

  // 게시물 삭제
  deletePost: async (id: number): Promise<void> => {
    await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    })
  },

  // 게시물 검색
  searchPost: async (query: string) => {
    const response = await fetch(`/api/posts/search?q=${query}`)
    const data = await response.json()
    return data
  },
}
