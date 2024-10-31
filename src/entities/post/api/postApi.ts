import { PostSearchParams } from "../../../features/postSearch/model/searchTypes"
import { axiosInstance } from "../../../shared/api/axiosInstance"
import { PostRequests } from "../model/postTypes"

export const postApi = {
  getPosts: async (params: PostSearchParams) => {
    const { data: res } = await axiosInstance.get(`/posts`, { params })
    return res
  },
  getPostsByTag: async (tag: string) => {
    const { data: res } = await axiosInstance.get(`/posts/${tag}`)
    return res
  },
  searchPosts: async (query: string) => {
    const { data: res } = await axiosInstance.get(`/posts/search`, { params: { q: query } })
    return res
  },
  createPost: async (post: PostRequests["Create"]) => {
    const { data: res } = await axiosInstance.post(`/posts/add`, post)
    return res
  },
  updatePost: async (id: number, post: PostRequests["Update"]) => {
    const { data: res } = await axiosInstance.put(`/posts/${id}`, post)
    return res
  },
  deletePost: async (id: number) => {
    const { data: res } = await axiosInstance.delete(`/posts/${id}`)
    return res
  },
  getTags: async () => {
    const { data: res } = await axiosInstance.get(`/posts/tags`)
    return res || []
  },
}
