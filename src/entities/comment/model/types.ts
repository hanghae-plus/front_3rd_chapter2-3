import { User } from "@entities/user/model"

export interface CommentResponse {
  comments: Comment[]
  limit: number
  skip: number
  total: number
}

export interface Comment {
  id: number
  body: string
  likes: number
  postId: number
  user: User
}

export interface NewComment {
  body: string
  postId: number
  userId: number
}
