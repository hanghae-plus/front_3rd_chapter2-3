export interface Comment_i {
  id: number
  body: string
  postId: number | null
  likes: number
  user: CommentUser_i
}

export interface Comments_i {
  [postId: string]: Comment_i[]
}

export interface NewComment_i {
  body: string
  postId: number | null
  userId: number
}

interface CommentUser_i {
  id: number
  username: string
  fullName: string
}
