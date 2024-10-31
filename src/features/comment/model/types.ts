import { User } from "../../../entities/user/model/types"

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
