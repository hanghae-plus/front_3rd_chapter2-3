export interface Comment {
  id: number
  body: string
  postId: number
  userId: number
  user?: {
    username: string
    image: string
  }
}

export interface CommentsResponse {
  comments: Comment[]
  total: number
}