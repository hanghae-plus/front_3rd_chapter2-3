import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "./query-keys"
import type { Post, PostsResponse } from "@/entities/post/model/types"

interface PostsParams {
  skip?: number
  limit?: number
  search?: string
  tag?: string
  sortBy?: string
  sortOrder?: "asc" | "desc"
}

export const usePosts = (params: PostsParams) => {
  return useQuery({
    queryKey: queryKeys.posts.list(params),
    queryFn: async () => {
      const searchParams = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        if (value) searchParams.set(key, value.toString())
      })

      const response = await fetch(`/api/posts?${searchParams.toString()}`)
      if (!response.ok) throw new Error("Failed to fetch posts")

      const postsData = (await response.json()) as PostsResponse
      const usersResponse = await fetch("/api/users?limit=0&select=username,image")
      const usersData = await usersResponse.json()

      return {
        ...postsData,
        posts: postsData.posts.map((post) => ({
          ...post,
          author: usersData.users.find((user: any) => user.id === post.userId),
        })),
      }
    },
  })
}

export const usePost = (id: number) => {
  return useQuery({
    queryKey: queryKeys.posts.detail(id),
    queryFn: async () => {
      const response = await fetch(`/api/posts/${id}`)
      if (!response.ok) throw new Error("Failed to fetch post")
      return response.json() as Promise<Post>
    },
    enabled: !!id,
  })
}

interface Tag {
  name: string
  slug: string
  url: string
}

export const useTags = () => {
  return useQuery({
    queryKey: queryKeys.posts.tags(),
    queryFn: async () => {
      const response = await fetch("/api/posts/tags")
      if (!response.ok) throw new Error("Failed to fetch tags")
      return response.json() as Promise<Tag[]>  // 태그 객체 배열 그대로 반환
    }
  })
}