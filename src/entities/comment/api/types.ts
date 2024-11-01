import { Comment } from "@/entities/comment"

export type ResponseFetchComments = {
  comments: Comment[]
  limit: number
  skip: number
  total: number
}
