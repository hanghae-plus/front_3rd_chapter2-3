import { User } from "../../user/model/types"
import { Post } from "./types"

export const getPostsWithUsers = (postsData: Post[], usersData: User[]) => {
  return postsData.map((post) => ({
    ...post,
    author: usersData.find((user) => user.id === post.userId),
  }))
}
