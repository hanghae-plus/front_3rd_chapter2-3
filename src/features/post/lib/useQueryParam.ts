import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useSearchStore } from "@/features/search"

export const useQueryParam = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const {
    skip,
    setSkip,
    limit,
    setLimit,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    selectedTag,
    setSelectedTag,
  } = useSearchStore()

  const initialize = () => {
    setSkip(queryParams.get("skip") || "0")
    setLimit(queryParams.get("limit") || "10")
    setSearchQuery(queryParams.get("search") || "")
    setSortBy(queryParams.get("sortBy") || "")
    setSortOrder(queryParams.get("sortOrder") || "asc")
    setSelectedTag(queryParams.get("tag") || "")
  }

  const updateURL = () => {
    const params = new URLSearchParams()
    if (skip) params.set("skip", skip.toString())
    if (limit) params.set("limit", limit.toString())
    if (searchQuery) params.set("search", searchQuery)
    if (sortBy) params.set("sortBy", sortBy)
    if (sortOrder) params.set("sortOrder", sortOrder)
    if (selectedTag) params.set("tag", selectedTag)
    navigate(`?${params.toString()}`)
  }

  const updateSkip = (newSkip: number) => {
    setSkip(newSkip.toString())
  }

  const updateLimit = (newLimit: number) => {
    setLimit(newLimit.toString())
  }

  const updateSearchQuery = (newSearchQuery: string) => {
    setSearchQuery(newSearchQuery.toString())
  }

  const updateSortBy = (newSortBy: string) => {
    setSortBy(newSortBy.toString())
  }

  const updateSortOrder = (newSortOrder: string) => {
    setSortOrder(newSortOrder.toString())
  }

  const updateSelectedTag = (newSelectedTag: string) => {
    setSelectedTag(newSelectedTag.toString())
  }

  useEffect(() => {
    initialize()
  }, [])

  useEffect(() => {
    updateURL()
  }, [skip, limit, searchQuery, sortBy, sortOrder, selectedTag])

  return {
    skip,
    limit,
    searchQuery,
    sortBy,
    sortOrder,
    selectedTag,
    updateSkip,
    updateLimit,
    updateSearchQuery,
    updateSortBy,
    updateSortOrder,
    updateSelectedTag,
    updateURL,
  }
}
