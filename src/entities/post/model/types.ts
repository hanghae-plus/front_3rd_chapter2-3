import { User } from "../../user/model/types.ts"

export interface NewPost {
  title: string
  body: string
  userId: number
}

export interface Post {
  id: number
  title: string
  body: string
  tags: string[]
  reactions: {
    likes: number
    dislikes: number
  }
  views: number
  userId: number
  author?: User
}

export interface PostDto {
  posts: Post[]
  total: number
  skip: number
  limit: number
}
