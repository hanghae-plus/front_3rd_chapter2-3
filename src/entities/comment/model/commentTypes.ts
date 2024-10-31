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

export interface CommentState {
  byPostId: Record<number, Comment[]> // 게시물 ID별 댓글 목록
  totalByPostId: Record<number, number> // 게시물 ID별 전체 댓글 수
  selected: Comment | null // 선택된 댓글
  loading: boolean
  error: string | null
}
