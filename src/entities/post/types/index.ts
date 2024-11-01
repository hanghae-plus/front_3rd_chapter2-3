import { User } from "../../user/types"

export interface Post {
  id: number
  body: string
  reactions: { likes: number; dislikes: number }
  tags: string[]
  title: string
  userId: number
  views: number
}

export interface PostForm {
  body: string
  title: string
  userId: number
}

export interface PostWithUser extends Post {
  author: User
}

export interface PostQueryResult {
  limit: number
  skip: number
  total: number
  posts: Post[]
}
