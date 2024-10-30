import { PostId } from "../../post/model/type"
import { User } from "../../user/model/type"

export type Comment = {
  id: number
  body: string
  postId: number
  likes: number
  user: {
    id: number
    username: string
    fullName: string
  }
}
export type NewComment = {
  body: string
  postId: number | null
  userId: number
}

export type Comments = {
  [postId: PostId]: Comment[]
}
