import { TagName } from "../../tag/model/type"
import { User } from "../../user/model/type"

export type Post = {
  id: number
  title: string
  body: string
  tags: TagName[]
  author: User | null
  reactions: Reactions
  views: number
  userId: User["id"]
}
export type PostId = Post["id"]

type Reactions = {
  likes: number
  dislikes: number
}

export type NewPost = {
  title: string
  body: string
  userId: number
}
