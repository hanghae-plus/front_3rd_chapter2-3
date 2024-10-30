import { User } from "../user/model"

export interface Comment {
  id: number
  body: string
  postId: number
  likes: number
  user: User
}

export interface CommentResponse {
  comments: Comment[]
  limit: number
  skip: number
  total: number
}

export interface NewComment {
  body: string
  postId: number | null
  userId: number
}

export interface NewCommentResponse {
  id: number
  body: string
  postId: number
  user: User
}
