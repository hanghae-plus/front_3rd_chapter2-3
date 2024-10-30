import { User } from "../../user/model/types"

export interface Comment {
  id: number
  body: string
  postId: number
  userId: number
  likes: number
  user?: User
}

export type CommentPayload = Omit<Comment, "id">

export type CommentLikeUpdate = Pick<Comment, "id"> & { likes: number }
