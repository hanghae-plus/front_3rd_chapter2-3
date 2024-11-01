import { User } from "@/entities/user/model/types"

export interface Post {
  id: number
  title: string
  body: string
  userId: number
  author: User
  tags: string[]
  reactions?: {
    likes: number
    dislikes: number
  }
}
