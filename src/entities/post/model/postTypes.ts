import { User } from "../../user/model/userTypes"

export interface Post {
  id: number
  title: string
  body: string
  userId: number
  author?: User
  tags?: string[]
  createdAt: string
  updatedAt: string
}

export interface PostRequests {
  Create: {
    title: string
    body: string
    userId: number
    tags?: string[]
  }
  Update: {
    title?: string
    body?: string
    tags?: string[]
  }
}

export interface PostsResponse {
  posts: Post[]
  total: number
  limit: number
  skip: number
}
