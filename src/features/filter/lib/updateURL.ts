import { SearchParams } from "@features/filter/model"
import { NavigateFunction } from "react-router-dom"

export const updateURL = (
  navigate: NavigateFunction,
  searchParams: Partial<SearchParams>,
) => {
  const { skip, limit, searchQuery, sortBy, sortOrder, selectedTag } = searchParams

  const params = new URLSearchParams()
  if (skip) params.set("skip", skip.toString())
  if (limit) params.set("limit", limit.toString())
  if (searchQuery) params.set("search", searchQuery)
  if (sortBy) params.set("sortBy", sortBy)
  if (sortOrder) params.set("sortOrder", sortOrder)
  if (selectedTag) params.set("tag", selectedTag)

  navigate(`?${params.toString()}`)
} 