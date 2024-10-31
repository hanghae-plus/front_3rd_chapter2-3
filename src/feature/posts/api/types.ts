import { Comment } from "../../comments/model/types"
import { Post } from "../model/types"

export interface PostsResponse {
  posts: Post[]
  total: number
}

export interface PostsSearchResponse {
  posts: Post[]
  total: number
}

export interface TagsResponse {
  name: string
  slug: string
  url: string
}

export interface CommentsResponse {
  comments: Comment[]
}

export interface AddPostRequest {
  title: string
  body: string
  userId: number
}

export interface AddPostResponse {
  id: number
  title: string
  body: string
  userId: number
}
