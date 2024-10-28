export interface Comment {
  id: number
  body: string
  postId: number
  userId: number
  user: {
    username: string
    image: string
  }
  likes: number
}

export interface CommentResponse {
  comments: Comment[]
  total: number
}

export interface CreateCommentRequest {
  body: string
  postId: number | null
  userId: number
}

export interface UpdateCommentRequest {
  id: number
  body: string
}

export interface CommentWithUser extends Comment {
  user: {
    id: number
    username: string
    image: string
  }
}
