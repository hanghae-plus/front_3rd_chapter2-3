export interface Comment {
  id: number
  body: string
  postId: number
  userId: number
}

export type CommentPayload = Omit<Comment, "id">

export type CommentLikeUpdate = Pick<Comment, "id"> & { likes: number }
