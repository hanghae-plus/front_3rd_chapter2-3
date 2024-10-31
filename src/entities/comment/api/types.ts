export interface CommentList {
  comments: Comment[]
  limit: number
  skip: number
  total:number
}

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
