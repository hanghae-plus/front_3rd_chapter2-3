import { safeFetch } from "../../../shared/api"
import {
  AuthorsResponse,
  FetchPostsPayload,
  FetchPostsResponse,
  NewPost,
  Post,
  PostDTO,
  Tag,
} from "../model/types"

export const postApi = {
  /** 글쓴이 가져오기 */
  fetchAuthors: async () => {
    try {
      const response = safeFetch<AuthorsResponse>(
        "/api/users?limit=0&select=username,image",
      )
      return response
    } catch (error) {
      console.error("글쓴이 목록 가져오기 오류:", error)
      throw error
    }
  },

  /** 게시물 가져오기 */
  fetchPosts: async ({ limit, skip }: FetchPostsPayload) => {
    try {
      const response = await safeFetch<FetchPostsResponse>(
        `/api/posts?limit=${limit}&skip=${skip}`,
      )
      return response
    } catch (error) {
      console.error("게시물 가져오기 오류:", error)
      throw error
    }
  },

  /** 게시물 검색 */
  searchPosts: async (searchQuery: string) => {
    try {
      const response = await safeFetch<FetchPostsResponse>(
        `/api/posts/search?q=${searchQuery}`,
      )
      return response
    } catch (error) {
      console.error("게시물 검색 오류:", error)
      throw error
    }
  },

  /** 태그별 게시물 가져오기 */
  fetchPostsByTag: async (tag: string) => {
    try {
      const response = await safeFetch<FetchPostsResponse>(
        `/api/posts/tag/${tag}`,
      )
      return response
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
      const response = await safeFetch.post<PostDTO>("/api/posts/add", newPost)

      return response
    } catch (error) {
      console.error("게시물 추가 오류:", error)
      throw error
    }
  },

  /** 게시물 업데이트 */
  updatePost: async (selectedPost: Post) => {
    try {
      const response = await safeFetch.put<PostDTO>(
        `/api/posts/${selectedPost.id}`,
        selectedPost,
      )
      return response
    } catch (error) {
      console.error("게시물 업데이트 오류:", error)
      throw error
    }
  },

  /** 게시물 삭제 */
  deletePost: async (id: number) => {
    try {
      const response = await safeFetch.delete<PostDTO>(`/api/posts/${id}`)
      return response
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
      throw error
    }
  },
}
