import { UserData } from "./types"

export interface Comment {
  id: number
  body: string
  postId: number | null
  likes: number
  user: UserData
}

export interface AddComment {
  [id: number]: Comment[]
}

export interface CommentsResponse {
  comments: Comment[]
  limit: number
  skip: number
  total: number
}

export interface ApiResponse<T> {
  data: T // API로부터 받은 데이터
  error?: string // 오류 메시지
}

export interface CommentResponse extends Comment {
  likes: number
}
