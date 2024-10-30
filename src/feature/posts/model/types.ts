import { User } from "../../users/model/types"

export interface Post {
  id: number
  title: string
  body: string
  userId: number
  tags: string[]
  reactions: {
    likes: number
    dislikes: number
  }
  author?: User
}

export interface UpdatePostData {
  id: number
  data: Partial<Post>
}
