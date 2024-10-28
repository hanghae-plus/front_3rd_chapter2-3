import { PostId } from "../../post/model/type"
import { User } from "../../user/model/type"

export type Comment = {
  id: number
  body: string
  postId: PostId
  likes: number
  user: User
}
export type CommentsMap = {
  [postId: PostId]: Comment[]
}
