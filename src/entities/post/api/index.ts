import { Post, PostsResponse, UserResponse } from "../model/types.ts"
import axiosClient from "../../../app/axios/axiosClient.ts"

export const getPostsAndUsers = async (
  limit: number,
  skip: number,
): Promise<{ postsData: PostsResponse; usersData: UserResponse }> => {
  const [postsResponse, usersResponse] = await Promise.all([
    axiosClient.get(`/posts`, { params: { limit, skip } }),
    axiosClient.get("/users", { params: { limit: 0, select: "username,image" } }),
  ])

  return {
    postsData: postsResponse.data,
    usersData: usersResponse.data,
  }
}

export const getPostsByTagAndUsers = async (
  tag: string,
): Promise<{ postsData: PostsResponse; usersData: UserResponse }> => {
  const [postsResponse, usersResponse] = await Promise.all([
    axiosClient.get(`/posts/tag/${tag}`),
    axiosClient.get("/users", { params: { limit: 0, select: "username,image" } }),
  ])

  return {
    postsData: postsResponse.data,
    usersData: usersResponse.data,
  }
}

export const addPost = async (newPost: { title: string; body: string; userId: number }) => {
  const response = await axiosClient.post("/posts/add", newPost)
  return response.data
}

export const editPost = async (postId: number, updatedPost: { title: string; body: string }): Promise<Post> => {
  const response = await axiosClient.put(`/posts/${postId}`, updatedPost)
  return response.data
}

export const deletePost = async (postId: number) => {
  await axiosClient.delete(`/posts/${postId}`)
}

export const searchPost = async (query: string): Promise<PostsResponse> => {
  const response = await axiosClient.get(`/posts/search?q=${query}`)
  return response.data
}
