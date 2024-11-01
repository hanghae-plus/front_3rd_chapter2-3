import { User } from "@/entities/user"
import { Post, PostReactions } from "@/entities/post"

export type PostWithUsers = {
  id: number
  title: string
  body: string
  tags: string[]
  views: number
  userId: number
  reactions: PostReactions
  author: User
}

export const attachUsersToPosts = (posts: Post[], users: User[]): PostWithUsers[] => {
  return posts.map((post) => ({
    ...post,
    author: users.find((user) => user.id === post.userId) as User,
  }))
}
