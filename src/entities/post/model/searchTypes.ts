import { PostSearchParams } from "../../../features/post/model/searchTypes"
import { Tag } from "../../tag/model/tagTypes"

export interface SearchStore {
  skip: number
  limit: number
  search: string
  sortBy: string
  sortOrder: "asc" | "desc"
  tag: string
  tags: Tag[]
  setSearch: (search: string) => void
  setTag: (tag: string) => void
  setSortBy: (sortBy: string) => void
  setSortOrder: (order: "asc" | "desc") => void
  setSkip: (skip: number) => void
  setLimit: (limit: number) => void
  updateSearchParams: (params: Partial<PostSearchParams>) => void
  syncWithUrl: () => void
}
