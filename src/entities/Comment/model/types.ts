import { UserType } from "../../User/model/types"

export interface NewCommentType {
  body: string
  postId: number | null
  userId: number
}

export interface CommentType {
  body: string
  id: number
  likes: number
  postId: number
  user: UserType
}

export interface CommentMutationState {
  isPending: boolean
  isError: boolean
  error: Error | null
}
