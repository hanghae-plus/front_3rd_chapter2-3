export interface PostFilterState {
  tagFilter: string
  sortField: "id" | "title" | "reactions"
  sortOrder: "asc" | "desc"
  setTagFilter: (tag: string) => void
  setSortField: (field: "id" | "title" | "reactions") => void
  setSortOrder: (order: "asc" | "desc") => void
}
