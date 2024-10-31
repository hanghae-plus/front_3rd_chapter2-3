export interface PostFiltersState {
  sortBy: string
  sortOrder: "asc" | "desc"
  selectedTag: string
  limit: number
  skip: number
}
