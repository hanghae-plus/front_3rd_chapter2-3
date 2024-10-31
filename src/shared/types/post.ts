import type { User } from "./user"

interface PostsData {
  posts: Post[]
  total: number
  skip: number
  limit: number
}

interface Post {
  id: number
  title: string
  body: string
  tags: string[]
  reactions: Reactions
  views: number
  userId: number
  author?: User
}

interface Reactions {
  likes: number
  dislikes: number
}

interface NewPost {
  title: string
  body: string
  userId: number
}

export type { PostsData, Post, Reactions, NewPost }
