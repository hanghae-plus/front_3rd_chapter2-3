import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export const useFilter = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const [searchQuery, setSearchQuery] = useState(queryParams.get("search") || "")
  const [selectedTag, setSelectedTag] = useState(queryParams.get("tag") || "all")
  const [sortBy, setSortBy] = useState(queryParams.get("sortBy") || "none")
  const [sortOrder, setSortOrder] = useState(queryParams.get("sortOrder") || "asc")
  const [skip, setSkip] = useState(parseInt(queryParams.get("skip") || "0"))
  const [limit, setLimit] = useState(parseInt(queryParams.get("limit") || "10"))

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

  return {
    updateURL,
    searchQuery,
    setSearchQuery,
    selectedTag,
    setSelectedTag,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    skip,
    setSkip,
    limit,
    setLimit,
  }
}
