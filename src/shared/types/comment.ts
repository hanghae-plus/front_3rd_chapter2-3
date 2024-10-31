import type { User } from "./user"

interface Comment {
  id: number
  body: string
  postId: number
  userId: number
  likes: number
  user: User
}

interface NewComment {
  body: string
  postId: number | null | undefined
  userId: number
}

export type { Comment, NewComment }
