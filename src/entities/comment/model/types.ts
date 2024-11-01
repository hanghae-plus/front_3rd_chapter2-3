import { User } from "@/entities/user/model/types"

export interface Comment {
  id: number
  postId: number
  user: User
  likes: number
  body: string
}
