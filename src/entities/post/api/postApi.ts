import { baseApi } from "../../../shared/api/base"

export const postApi = {
  get: {
    posts: async ({ limit, skip }: { limit: number; skip: number }) => {
      const response = await baseApi.get("/posts", {
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

      const response = await baseApi.get(`/posts/tag/${tag}`, {
        params: {
          limit,
          skip,
        },
      })
      return response.data
    },
  },
  post: {
    addPost: async (newPost: { title: string; body: string; userId: number }) => {
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
