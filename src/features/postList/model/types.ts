import { Post } from "../../../entities/post"
import { User } from "../../../entities/user"

export interface PostsListState {
  posts: Post[]
  total: number
  isLoading: boolean
  searchQuery: string
  skip: number
  limit: number
  selectedTag: string
  sortBy: string
  sortOrder: "asc" | "desc"
}

export interface PostWithUserInfo extends Post {
  userInfo?: User
}
