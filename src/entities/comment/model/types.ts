export interface Comment {
  id: number
  body: string
  postId: number
  likes: number
  user: User
}

interface User {
  id: number
  username: string
  fullName: string
}

export interface CommentsResponse {
  comments: Comment[]
  total: number
  skip: number
  limit: number
}
