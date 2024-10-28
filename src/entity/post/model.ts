import { User } from"../user/model"

export interface Post {
  id: number
  title: string
  body: string
  userId: number
  tags: string[]
  reactions?: {
    likes: number
    dislikes: number
  }
  author?: User
}

export interface NewPost {
  title: string
  body: string
  userId: number
}
