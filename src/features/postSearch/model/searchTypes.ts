import { Tag } from '../../../entities/tag/model/tagTypes';

export interface PostSearchParams {
  skip: number
  limit: number
  search: string
  sortBy: string
  sortOrder: "asc" | "desc"
  tag: string
}

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

export interface SearchParams {
  search: string
}
