import { Post, NewPost } from '@entities/post/model/post.types'
import { Tag } from '@entities/tag/model/tag.types'
import { User } from '@entities/user/model/user.types'
import { api } from '@app/api'

export interface PostsResponse {
  posts: Post[]
  total: number
  skip: number
  users: User[]
}

export const postApi = {
  fetchPosts: async ({ limit, skip }: { limit: number; skip: number }) => {
    return await api.get<PostsResponse>(`/posts?limit=${limit}&skip=${skip}`)
  },

  fetchPostsByTag: async (tag: string) => {
    return await api.get<PostsResponse>(`/posts/tag/${tag}`)
  },

  searchPosts: async (query: string) => {
    return await api.get<PostsResponse>(`/posts/search?q=${query}`)
  },

  createPost: async (post: NewPost) => {
    return await api.post<Post>('/posts/add', post)
  },

  updatePost: async (post: Post) => {
    return await api.put<Post>(`/posts/${post?.id}`, post)
  },

  deletePost: async (id: number) => {
    await api.delete(`/posts/${id}`)
    return id
  },

  getTags: async () => {
    return await api.get<Tag[]>('/posts/tags')
  },
}
