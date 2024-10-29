import { safeFetch } from "../../../shared/lib"
import {
  NewPost,
  Post,
  PostsResponse,
  Tag,
  UsersResponse,
} from "../model/types"

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

  /** 태그별 게시물 가져오기 */
  fetchPostsByTag: async (tag: string) => {
    try {
      const [postsData, usersData] = await Promise.all([
        safeFetch<PostsResponse>(`/api/posts/tag/${tag}`),
        safeFetch<UsersResponse>("/api/users?limit=0&select=username,image"),
      ])

      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: usersData.users.find((user) => user.id === post.userId),
      }))

      return { posts: postsWithUsers, total: postsData.total }
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error)
      throw error
    }
  },

  /** 태그 가져오기 */
  fetchTags: async () => {
    try {
      const response = await safeFetch<Tag[]>("/api/posts/tags")
      return response
    } catch (error) {
      console.error("태그 가져오기 오류:", error)
      throw error
    }
  },

  /** 게시물 추가 */
  addPost: async (newPost: NewPost) => {
    try {
      /**
       * TODO: Post 타입이 아님
       {
            "id": number;
            "title": string;
            "body": string;
            "userId": number;
        }
       */
      const response = await safeFetch.post<Post>("/api/posts/add", newPost)

      return response
    } catch (error) {
      console.error("게시물 추가 오류:", error)
      throw error
    }
  },

  /** 게시물 업데이트 */
  updatePost: async (selectedPost: Post) => {
    try {
      const response = await safeFetch.put<Post>(
        `/api/posts/${selectedPost.id}`,
        selectedPost,
      )
      return response
    } catch (error) {
      console.error("게시물 업데이트 오류:", error)
      throw error
    }
  },

  deletePost: async (id: number) => {
    try {
      const response = await safeFetch.delete<Post>(`/api/posts/${id}`)
      return response
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
    }
  },
}
