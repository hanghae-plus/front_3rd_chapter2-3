import { User } from "../../user/model/types"

export interface Post {
  id: number
  title: string
  body: string
  userId: number
  tags: string[]
  author: User
  reactions: Reactions
}

interface Reactions {
  likes: number
  dislikes: number
}

export type PostPayload = Omit<Post, "id">
