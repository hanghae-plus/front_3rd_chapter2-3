export interface Comment {
  id: number
  body: string
  postId: number
  likes: number
  user: {
    id: number
    username: string
    fullName: string
  }
}
export interface CommentDTO {
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
