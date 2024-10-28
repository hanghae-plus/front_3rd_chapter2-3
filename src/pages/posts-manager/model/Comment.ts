import { User } from "./User"

export interface Comments {
  [postId: number]: Comment[]
}

export interface Comment {
  id: number
  user: User
  body: string
  likes: number
  postId: number
}
