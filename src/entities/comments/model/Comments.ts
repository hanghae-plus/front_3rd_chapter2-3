export interface Comments {
  id: number
  body: string
  likes: number
  postId: number
  user: User
}
export interface CommentsState {
  [postId: number]: Comments[]
}

export interface NewComment {
  body: string
  postId: number | null
  userId: number
}

export interface User {
  id: number
  image: string
  username?: string
  fullName?: string
}
