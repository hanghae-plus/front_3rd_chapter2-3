import { Comment, Post } from "../model/types"

export interface PostsResponse {
  posts: Post[]
  total: number
}

export interface PostsSearchResponse {
  posts: Post[]
  total: number
}

export interface TagsResponse {
  tags: Array<{
    url: string
    slug: string
  }>
}

export interface CommentsResponse {
  comments: Comment[]
}
