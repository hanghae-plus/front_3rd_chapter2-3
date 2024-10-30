import { User } from "../../user/model/user"

export interface Comment {
  id: number
  body: string
  postId: number
  userId: number
  likes: number
  user: User
}

export interface CommentResponse {
  comments: Comment[]
}