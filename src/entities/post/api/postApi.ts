import { safeFetch } from "../../../shared/lib"
import { PostsResponse, Tag, UsersResponse } from "../model/types"

type FetchPostsPayload = {
  limit: number
  skip: number
}

export const postApi = {
  /** 게시물 가져오기 */
  fetchPosts: async ({ limit, skip }: FetchPostsPayload) => {
    try {
      const [postsData, usersData] = await Promise.all([
        safeFetch<PostsResponse>(`/api/posts?limit=${limit}&skip=${skip}`),
        safeFetch<UsersResponse>("/api/users?limit=0&select=username,image"),
      ])

      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: usersData.users.find((user) => user.id === post.userId),
      }))

      return {
        posts: postsWithUsers,
        total: postsData.total,
      }
    } catch (error) {
      console.error("게시물 가져오기 오류:", error)
      throw error
    }
  },

  /** 게시물 검색 */
  searchPosts: async (searchQuery: string) => {
    try {
      const [postsData, usersData] = await Promise.all([
        safeFetch<PostsResponse>(`/api/posts/search?q=${searchQuery}`),
        safeFetch<UsersResponse>("/api/users?limit=0&select=username,image"),
      ])

      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: usersData.users.find((user) => user.id === post.userId),
      }))

      return { posts: postsWithUsers, total: postsData.total }
    } catch (error) {
      console.error("게시물 검색 오류:", error)
      throw error
    }
  },

  /** 태그 가져오기 */
  fetchTags: async () => {
    try {
      const response = await safeFetch<Tag[]>("/api/posts/tags")
      console.log(response)

      return response
    } catch (error) {
      console.error("태그 가져오기 오류:", error)
      throw error
    }
  },
}
