import { Post } from "../../entity/post/model";
import { PaginatedResponse } from "../../types";
import { User } from "../../entity/user/model";

export const postsApi = {
  fetchPosts: async (limit: number, skip: number): Promise<PaginatedResponse<Post>> => {
    let postsData: PaginatedResponse<Post>
    let usersData: User[]

    try {
      const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)
      postsData = await response.json()
      const usersResponse = await fetch("/api/users?limit=0&select=username,image")
      const usersResult = await usersResponse.json()
      usersData = usersResult.users

      const postsWithUsers = postsData.posts.map((post: Post) => ({
        ...post,
        author: usersData.find((user) => user.id === post.userId),
      }))

      return {
        posts: postsWithUsers,
        total: postsData.total
      }
    } catch (error) {
      console.error("게시물 가져오기 오류:", error)
      throw error
    }
  },
  searchPosts: async (query: string): Promise<PaginatedResponse<Post>> => {
    if (!query.trim()) {
      throw new Error("검색어가 필요합니다")
    }

    try {
      const response = await fetch(`/api/posts/search?q=${query}`)
      const data: PaginatedResponse<Post> = await response.json()
      
      const usersResponse = await fetch("/api/users?limit=0&select=username,image")
      const usersResult = await usersResponse.json()
      const usersData: User[] = usersResult.users

      const postsWithUsers = data.posts.map((post: Post) => ({
        ...post,
        author: usersData.find((user) => user.id === post.userId),
      }))

      return {
        posts: postsWithUsers,
        total: data.total
      }
    } catch (error) {
      console.error("게시물 검색 오류:", error)
      throw error
    }
  },
  fetchPostsByTag: async (tag: string): Promise<PaginatedResponse<Post>> => {
    if (!tag || tag === "all") {
      throw new Error("유효한 태그가 필요합니다")
    }

    try {
      const [postsResponse, usersResponse] = await Promise.all([
        fetch(`/api/posts/tag/${tag}`),
        fetch("/api/users?limit=0&select=username,image"),
      ])

      const postsData: PaginatedResponse<Post> = await postsResponse.json()
      const usersData: { users: User[] } = await usersResponse.json()

      const postsWithUsers = postsData.posts.map((post: Post) => ({
        ...post,
        author: usersData.users.find((user) => user.id === post.userId),
      }))

      return {
        posts: postsWithUsers,
        total: postsData.total
      }
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error)
      throw error
    }
  },
}
