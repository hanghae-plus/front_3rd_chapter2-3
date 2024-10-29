export interface NewComment {
  body: string
  postId: number | null
  userId: number
}

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
