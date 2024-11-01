import { Post } from "@/entities/post"

export type ResponseFetchPosts = {
  limit: number
  skip: number
  total: number
  posts: Post[]
}
