import { Post } from "../../../entities/post"

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
