import { User } from "../../user/model/types"
import { Post, PostDto } from "./types"

export const createPosts = (postsData: Post[], usersData: User[]) => {
  return postsData.map((post) => ({
    ...post,
    author: usersData?.find((user) => user.id === post.userId),
  }))
}

export const updatePost = (prevData: PostDto, updatedPost: Post) => ({
  ...prevData,
  posts: prevData.posts.map((post) => (post.id === updatedPost.id ? updatedPost : post)),
})

export const deletePost = (prevData: PostDto, postId: number) => ({
  ...prevData,
  posts: prevData.posts.filter((post) => post.id !== postId),
  total: prevData.total - 1,
})

export const addPost = (prevData: PostDto, newPost: Post) => ({
  ...prevData,
  posts: [newPost, ...prevData.posts],
  total: prevData.total + 1,
})
