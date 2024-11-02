import { ApiWithPagination } from "../../../shared/model/types"
import { Tag } from "../../tag/model"

// Types
export interface Reaction {
  dislikes: number
  likes: number
}

export interface Author {
  username: string
  image: string
}

export interface Post {
  id: number
  userId: number
  views: number
  title: string
  body: string
  reactions: Reaction
  author: Author | undefined
  tags: Tag[]
}

// APIs

export interface PostsResponse extends ApiWithPagination {
  posts: Post[]
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
