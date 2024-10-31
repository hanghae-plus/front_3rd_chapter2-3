import { User } from "../../user/model/types"
import { Post, PostDto } from "./types"

export const createPosts = (postsData: Post[], usersData: User[]) => {
  return postsData.map((post) => ({
    ...post,
    author: usersData?.find((user) => user.id === post.userId),
  }))
}
