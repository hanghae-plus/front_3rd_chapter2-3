import { User } from "../user/model"

export interface Comment {
  id: number
  body: string
  postId: number
  userId: number
  likes: number
  user: User
}

export interface NewComment {
  body: string
  postId: number | null
  userId: number
}
