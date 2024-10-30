export interface NewCommentType {
  body: string
  postId: number | null
  userId: number
}

export interface CommentType {
  body: string
  id: number
  likes?: number
  postId?: number
}
