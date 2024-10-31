import { Tag } from "../../tag/model"

export interface Reaction {
  dislikes: number
  likes: number
}

export interface Post {
  id: number
  userId: number
  views: number
  title: string
  body: string
  reactions: Reaction
  tags: Tag[]
}

export interface GetPostsParams {
  limit: number
  skip: number
}

export interface AddPostBody {
  title: string
  body: string
  userId: number
}

export interface UpdatePostParams {
  id: number
  post: Post
}

export interface DeletePostParams {
  id: number
}
