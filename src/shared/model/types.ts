export type PaginationType = {
  skip: number
  limit: number
}

export type SortOrder = "asc" | "desc"

export type SortType = {
  sortBy: string
  sortOrder: SortOrder
}
