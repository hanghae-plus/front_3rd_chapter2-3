import { baseApi } from "../../../shared/api/base"
import { NewPostDto, PostsResponse } from "../model/type"

export const postApi = {
  get: {
    posts: async ({ limit, skip }: { limit: number; skip: number }) => {
      const response = await baseApi.get<PostsResponse>("/posts", {
        params: {
          limit,
          skip,
        },
      })
      return response.data
    },
    postsByTag: async ({ tag, limit = 10, skip = 0 }: { tag: string; limit?: number; skip?: number }) => {
      if (!tag || tag === "all") {
        return postApi.get.posts({ limit, skip })
      }

      const response = await baseApi.get<PostsResponse>(`/posts/tag/${tag}`)
      return response.data
    },
    searchPosts: async (query: string) => {
      const response = await baseApi.get<PostsResponse>(`/posts/search?q=${query}`)
      return response.data
    },
  },
  post: {
    addPost: async (newPost: NewPostDto) => {
      const response = await baseApi.post("/posts/add", newPost)
      return response.data
    },
  },

  put: {},

  delete: {
    post: async (id: number): Promise<void> => {
      await baseApi.delete(`/posts/${id}`)
    },
  },
  patch: {},
}
