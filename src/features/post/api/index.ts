import {
  createPostApi,
  deletePostApi,
  fecthPostsByTagApi,
  fetchPostApi,
  fetchPostsApi,
  searchPostsApi,
  updatePostApi,
} from "../../../entities/post/api"
import { NewPost, Post } from "../../../entities/post/model/types"
import { attachAuthorFromUser, attachAuthorsFromUsers } from "../../../entities/post/model/utils"
import { fetchUserApi, fetchUsersApi } from "../../../entities/user/api"

export interface PostsResponse {
  posts: Post[]
  total: number
}

export const postsApi = {
  fetchAll: async ({ limit = 10, skip = 0, sortBy = "", sortOrder = "asc" }) => {
    const [postsData, usersData] = await Promise.all([
      fetchPostsApi({ limit, skip, sortBy, sortOrder }),
      fetchUsersApi(),
    ])
    return {
      posts: attachAuthorsFromUsers(postsData.posts, usersData.users),
      total: postsData.total,
    }
  },

  fetchOne: async (id: number) => {
    const [postData] = await Promise.all([fetchPostApi(id)])
    return postData
  },

  search: async (query: string): Promise<PostsResponse> => {
    const [postsData, usersData] = await Promise.all([searchPostsApi(query), fetchUsersApi()])
    return {
      posts: attachAuthorsFromUsers(postsData.posts, usersData.users),
      total: postsData.total,
    }
  },

  fetchByTag: async (tag: string): Promise<PostsResponse> => {
    const [postsData, usersData] = await Promise.all([fecthPostsByTagApi(tag), fetchUsersApi()])
    return {
      posts: attachAuthorsFromUsers(postsData.posts, usersData.users),
      total: postsData.total,
    }
  },

  create: async (newPost: NewPost): Promise<Post> => {
    const postData = await createPostApi(newPost)
    const userData = await fetchUserApi(postData.userId)
    return attachAuthorFromUser(postData, userData)
  },

  update: async (post: Post): Promise<Post> => {
    const postData = await updatePostApi(post)
    const userData = await fetchUserApi(postData.userId)
    return attachAuthorFromUser(postData, userData)
  },

  delete: (id: number) => deletePostApi(id),
}
