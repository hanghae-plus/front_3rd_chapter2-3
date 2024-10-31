import { PostType } from "../../post/api/types"
import { UserType } from "../../user/api/types"

export interface CommentType {
  body: string
  id: number
  likes: number
  postId: number
  user: Pick<UserType, "fullname" | "id" | "username">
}

export interface AddCommentParam {
  body: string
  postId: PostType["id"]
  userId: number
}

export interface GetCommentReturnType {
  comments: CommentType[]
  limit: number
  skip: number
  total: number
}
