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

export interface CommentsRes {
  comments: Comment[]
  total: number
  skip: number
  limit: number
}
