export interface CommentRequest {
  body: string
  postId: number | null
  userId: number
}

export interface UpdateCommentRequest {
  id: number
  body: string
}