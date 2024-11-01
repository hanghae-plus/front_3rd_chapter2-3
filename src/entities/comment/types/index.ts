import { User } from "@entities/user/types"

export interface CommentsFetchResult {
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

export interface CommentForm {
  body: string
  postId: number
  userId: number
}
