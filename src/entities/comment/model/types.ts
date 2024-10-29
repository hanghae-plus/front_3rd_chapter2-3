type CommentUser = {
  id: number
  username: string
  fullName: string
}

export type Comment = {
  id: number
  body: string
  postId: number
  likes: number
  user: CommentUser
}

export type NewComment = Pick<Comment, "body"> & {
  postId: Comment["postId"] | null
  userId: number
}

export type DeletedComment = Comment & {
  isDeleted: boolean
  deletedOn: string
}

export type FetchCommentResponse = {
  comments: Comment[]
  limit: number
  skip: number
  total: number
}
