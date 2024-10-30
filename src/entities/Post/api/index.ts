import { apiCall } from "../../../shared/api"
import { author, NewPostType, PostType } from "../model/types"

export const fetchPostList = async (limit: number, skip: number) => {
  const postList = await apiCall.get(`/posts?limit=${limit}&skip=${skip}`)
  const postListData = postList.data

  const userList = await apiCall.get(`/users?limit=0&select=username,image`, postListData)
  const userListData = userList.data

  const postsWithUsers = postListData.posts.map((post: PostType) => ({
    ...post,
    author: userListData.find((user: author) => user.id === post.userId),
  }))

  return postsWithUsers
}

export const searchPosts = async (query: string) => {
  const response = await apiCall.get(`/posts/search?q=${query}`)
  return response.data
}

export const addPost = async (newPost: NewPostType): Promise<NewPostType> => {
  const response = await apiCall.post(`/posts/add`, newPost)
  return response.data
}

export const updatePost = async (post: PostType) => {
  const response = await apiCall.put(`/posts/${post.id}`, post)
  return response.data
}

export const deletePost = async (id: number) => {
  const response = await apiCall.delete(`/posts/${id}`)
  return response.data
}
