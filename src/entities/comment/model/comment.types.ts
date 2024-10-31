import { User } from '../../user/model/user.types'

export interface Comment {
  body: string
  id: number
  likes: number
  postId: number
  user: User
}

export interface CommentsState {
  [key: number]: Comment[]
}

export interface NewComment {
  body: string
  postId: number | null
  userId: number
}
