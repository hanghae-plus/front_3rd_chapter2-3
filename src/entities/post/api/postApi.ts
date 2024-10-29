import { Post } from "../model/types.ts"
import axiosClient from "../../../app/axios/axiosClient.ts"
import { getPostsWithAuthors } from "../model/getPostsWithAuthors.ts"

export const getPosts = async (limit: number, skip: number): Promise<Post[]> => {
  const postsResponse = await axiosClient.get(`/api/posts`, {
    params: { limit, skip },
  })
  const usersResponse = await axiosClient.get("/api/users", {
    params: { limit: 0, select: "username,image" },
  })

  const postsData = postsResponse.data
  const usersData = usersResponse.data

  return getPostsWithAuthors(postsData.posts, usersData.users)
}

export const addPost = async (newPost: { title: string; body: string; userId: number }) => {
  const response = await axiosClient.post("/api/posts/add", newPost)
  return response.data
}

export const updatePost = async (postId: number, updatedPost: { title: string; body: string }) => {
  const response = await axiosClient.put(`/api/posts/${postId}`, updatedPost)
  return response.data
}

export const deletePost = async (postId: number) => {
  await axiosClient.delete(`/api/posts/${postId}`)
}

export const fetchUsers = async () => {
  const response = await axiosClient.get("/api/users", {
    params: { limit: 0, select: "username,image" },
  })
  if (response.status !== 200) {
    throw new Error("사용자 정보 가져오기 실패")
  }
  return response.data
}
