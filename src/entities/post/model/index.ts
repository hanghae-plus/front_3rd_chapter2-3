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
