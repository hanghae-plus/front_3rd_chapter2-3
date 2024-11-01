import { SearchParams } from "@features/filter/model"

export const buildURLPath = ({
  skip,
  limit,
  searchQuery,
  sortBy,
  sortOrder,
  selectedTag,
}: SearchParams) => {
  const params = new URLSearchParams()
  if (skip) params.set("skip", skip.toString())
  if (limit) params.set("limit", limit.toString())
  if (searchQuery) params.set("search", searchQuery)
  if (sortBy) params.set("sortBy", sortBy)
  if (sortOrder) params.set("sortOrder", sortOrder)

  const hasTag = selectedTag && selectedTag !== "all"
  const hasSearch = searchQuery && searchQuery !== ""

  if (hasTag) return `/tag/${selectedTag}?${params.toString()}`
  if (hasSearch) return `/search?q=${searchQuery}&${params.toString()}`
  return `?${params.toString()}`
} 