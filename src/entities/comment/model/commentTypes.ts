export interface CommentUser {
  id: number
  username: string
  fullName: string
}

export interface Comment {
  id: number
  body: string
  postId: number
  likes: number
  user: CommentUser
}

export interface NewComment {
  body: string
  postId: number | null
  userId: number
}

export interface CommentRequests {
  Create: {
    body: string
    postId: number
    userId: number
  }
  Update: {
    body: string
  }
  UpdateLikes: {
    likes: number
  }
}

export interface CommentResponse {
  comments: Comment[]
  limit: number
  skip: number
  total: number
}

export interface CommentState {
  comments: Comment[] // postId를 key로 사용
  selectedComment: Comment | null
  newComment: {
    body: string
    postId: number | null
    userId: number
  }
  setComments: (comments: Comment[]) => void
  setSelectedComment: (comment: Comment | null) => void
  setNewComment: (comment: Partial<NewComment>) => void
  resetNewComment: () => void
}
