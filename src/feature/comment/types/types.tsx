import { User } from "../../../shared/types/Types"

export interface Comment {
  id: number
  body: string
  postId: number | null
  likes: number
  user: User
}

export interface CommentsResponse {
  comments: Comment[]
  limit: number
  skip: number
  total: number
}
