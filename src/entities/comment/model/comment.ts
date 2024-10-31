import { User } from "../../user/model/user"

export interface Comment {
  id: number
  body: string
  postId: number
  likes: number
  user: User
}

export interface NewComment {
  body: string
  postId: number | null
  userId: number
}

export interface CommentsByPost {
  [postId: string]: Comment[]
}
