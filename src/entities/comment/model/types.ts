import { User } from "../../user/model/types"

// Entities

export interface Comment {
  id: number
  body: string
  postId: number
  likes: number
  user: Pick<User, "id" | "username" | "fullName">
}

// API

export interface GetCommentParams {
  postId: number
}

export interface AddCommentBody {
  postId: number | null
  userId: number
  body: string
}

export interface UpdateCommentBody {
  comment: Comment
}

export interface DeleteCommentParams {
  id: number
  postId: number
}
