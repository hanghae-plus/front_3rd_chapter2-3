import { Post } from "../model/types.ts"

export const getPostsWithAuthors = (posts: Post[], users: Post["author"][]): Post[] => {
  return posts.map((post) => ({
    ...post,
    author: users && users.find((user) => user?.id === post.userId),
  }))
}
