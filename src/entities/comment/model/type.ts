export type CommentsResponse = {
  comments: Comment[]
  total: number
  skip: number
  limit: number
}

export type Comment = {
  id: number
  body: string
  postId: number
  likes: number
  user: User
}

export type NewCommentDto = {
  body: string
  postId: number
  userId: number
}

type User = {
  id: number
  username: string
  fullName: string
}
