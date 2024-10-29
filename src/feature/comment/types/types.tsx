import { User } from "../../../shared/model/Types"

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
