import { User } from "../../user/model/user"

export interface Post {
  id: number
  title: string
  body: string
  userId: number
  tags: string[]
  reactions: {
    likes: number
    dislikes: number
  }
  author?: User
}

export interface PostsResponse {
  posts: Post[]
  total: number
}

export interface Tag {
  slug: string
  url: string
}