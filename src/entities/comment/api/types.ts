export interface Comment {
  id: number
  body: string
  postId: number
  likes: number
  user: CommentsUser
}

export interface CommentsUser {
  id: number
  username: string
  fullName: string
}
