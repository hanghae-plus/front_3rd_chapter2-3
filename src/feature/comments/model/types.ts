import { User } from "../../users/model/types"

export interface Comment {
  id: number
  body: string
  postId: number
  userId: number
  likes: number
  user: User
}
