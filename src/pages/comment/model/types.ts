import { User } from "../../user/model/types"

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

export interface NewComment {
  body: string
  postId: number | null
  userId: number
}
