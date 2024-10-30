import { Post } from "../../../entities/post/model/type"

export type PostsData = {
  posts: Post[]
  total: number
  skip: number
  limit: number
}
