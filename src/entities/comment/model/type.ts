import { PostId } from "../../post/model/type"
import { User } from "../../user/model/type"

export type Comment = {
  id: number
  user: User
  body: string
  likes: number
  postId: number
}
export type NewComment = {
  body: string
  postId: number | null
  userId: number
}

export type Comments = {
  [postId: PostId]: Comment[]
}
