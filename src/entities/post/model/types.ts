import { Filter_i, Pagination_i } from "../../../shared/model/types"
import { User_i } from "../../user/model/types"

export interface Post_i {
  id: number
  title: string
  body: string
  tags: string[]
  reactions: { likes: number; dislikes: number }
  views: number
  userId: number
  author?: User_i
}

export interface NewPost_i {
  title: string
  body: string
  userId: number
}

export interface Tag_i {
  slug: string
  name: string
  url: string
}

export interface PostResponse_t extends Pagination_i, Filter_i {
  posts: Post_i[]
}

export interface TagResponse_t {
  tags: Tag_i[]
}
