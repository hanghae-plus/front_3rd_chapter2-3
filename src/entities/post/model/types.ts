import { User_i } from "../../user/model/types"

export interface Post_i {
  id: number
  title: string
  body: string
  tags: string[]
  reactions: { likes: number; dislikes: number }
  views: number
  userId: number
  author?: User_i
}

export interface NewPost_i {
  title: string
  body: string
  userId: number
}
